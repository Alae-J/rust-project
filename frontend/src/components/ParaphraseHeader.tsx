
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ParaphraseHeader: React.FC = () => {
  return (
    <Card className="border-none shadow-none bg-transparent mb-6">
      <CardHeader className="text-center p-0">
        <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">Text Paraphraser</CardTitle>
        <CardDescription className="text-base sm:text-lg mt-2 max-w-2xl mx-auto">
          Select any text in the editor and click "Paraphrase" to rewrite it with different wording while preserving the original meaning.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ParaphraseHeader;
