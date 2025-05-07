
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GraphQLCodeCardProps {
  title: string;
  description: string;
  code: string;
  usedFragments?: string[];
  onViewFragment?: (() => void) | null;
}

const GraphQLCodeCard: React.FC<GraphQLCodeCardProps> = ({
  title,
  description,
  code,
  usedFragments,
  onViewFragment,
}) => {
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
      {!!onViewFragment && usedFragments && usedFragments.length > 0 && (
        <CardFooter className="pt-0">
          <Button variant="secondary" onClick={onViewFragment}>
            View Fragment Definition
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GraphQLCodeCard;
