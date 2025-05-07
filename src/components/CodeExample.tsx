
import React, { useState } from 'react';
import LanguageSelector, { ProgrammingLanguage } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CodeExampleProps {
  title: string;
  description?: string;
  codeExamples: {
    [key in ProgrammingLanguage]?: string;
  };
}

export default function CodeExample({ title, description, codeExamples }: CodeExampleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('javascript');
  const { toast } = useToast();

  const handleCopyCode = () => {
    const code = codeExamples[selectedLanguage] || '';
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
      duration: 2000,
    });
  };

  return (
    <div className="mb-8 text-left">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      
      <div className="flex justify-between items-center">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyCode}
          className="flex items-center gap-1"
        >
          <Copy size={14} />
          Copy
        </Button>
      </div>
      
      <pre className="code-block text-left">
        <code>{codeExamples[selectedLanguage] || 'Example not available for this language'}</code>
      </pre>
    </div>
  );
}
