// ✅ Fully working FloatingToolbar for Textarea-based selection
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FloatingToolbarProps {
  position: {
    top: number;
    left: number;
  };
  onParaphrase: () => void;
  loading: boolean;
  characterCount: number;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  position,
  onParaphrase,
  loading,
  characterCount,
}) => {
  return (
    <div
      className="absolute z-50"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="flex items-center bg-white border border-gray-200 rounded shadow p-2 space-x-2">
        <Badge variant="outline" className="bg-muted">
          {characterCount} chars
        </Badge>
        <Button size="sm" onClick={onParaphrase} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 border-2 border-t-transparent border-primary/80 rounded-full animate-spin" />
            </div>
          ) : (
            "Paraphrase"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FloatingToolbar;
