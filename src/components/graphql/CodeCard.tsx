
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface CodeCardProps {
  title: string;
  description: string;
  code: string;
}

const CodeCard: React.FC<CodeCardProps> = ({ title, description, code }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mt-2">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
};

export default CodeCard;
