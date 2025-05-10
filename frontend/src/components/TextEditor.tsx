import React, { useState, useRef, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FloatingToolbar from "./FloatingToolbar";
import api from "@/lib/api";

interface TextEditorProps {
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ placeholder = "Enter or paste your text here..." }) => {
  const [text, setText] = useState("");
  const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showToolbar, setShowToolbar] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTextSelection = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);

    if (start === end || selected.trim() === "") {
      setSelection(null);
      setShowToolbar(false);
      return;
    }

    const lineHeight = 24;
    const linesBefore = text.slice(0, start).split("\n").length;
    const approxTop = textarea.offsetTop + linesBefore * lineHeight;

    setToolbarPosition({
      top: approxTop - 32,
      left: textarea.offsetLeft + 120,
    });

    setSelection({ start, end, text: selected });
    setShowToolbar(true);
  };

  const handleParaphrase = async () => {
    if (!selection) return;

    try {
      setLoading(true);
      const res = await api.post("/paraphrase", {
        prompt: selection.text,
      });

      const { paraphrasedText } = res.data;

      setText((prev) =>
        prev.slice(0, selection.start) +
        paraphrasedText +
        prev.slice(selection.end)
      );

      setSelection(null);
      setShowToolbar(false);
    } catch (err: any) {
      toast({
        title: "Paraphrasing failed",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSelection(null);
    setShowToolbar(false);
    editorRef.current?.focus();
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const editor = editorRef.current;
    const toolbar = toolbarRef.current;
    const target = e.target as Node;

    if (
      editor &&
      !editor.contains(target) &&
      toolbar &&
      !toolbar.contains(target)
    ) {
      setShowToolbar(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative w-full">
      <Textarea
        ref={editorRef}
        placeholder={placeholder}
        value={text}
        onChange={handleTextChange}
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
        className="min-h-[300px] md:min-h-[400px] p-4 text-base leading-relaxed resize-none focus:ring-2 focus:ring-primary/20"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      />

      {showToolbar && selection && (
        <div
          ref={toolbarRef}
          className="absolute z-50"
          style={{
            top: toolbarPosition.top,
            left: toolbarPosition.left,
            transform: "translate(-50%, -100%)",
          }}
        >
          <FloatingToolbar
            position={toolbarPosition}
            onParaphrase={handleParaphrase}
            loading={loading}
            characterCount={selection.text.length}
          />
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
