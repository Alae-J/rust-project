
import React from "react";
import ParaphraseHeader from "./ParaphraseHeader";
import TextEditor from "./TextEditor";
import { Card } from "@/components/ui/card";

const ParaphrasingApp: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ParaphraseHeader />
      <Card className="p-4 md:p-6 border shadow-md">
        <TextEditor />
      </Card>
    </div>
  );
};

export default ParaphrasingApp;
