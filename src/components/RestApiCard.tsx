import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RestApiEndpoint {
  id: string;
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  response?: any;
}

interface RestApiCardProps {
  endpoint: RestApiEndpoint;
}

const RestApiCard: React.FC<RestApiCardProps> = ({ endpoint }) => {
  const { toast } = useToast();
  
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500';
      case 'POST': return 'bg-green-500';
      case 'PUT': return 'bg-yellow-500';
      case 'DELETE': return 'bg-red-500';
      case 'PATCH': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
      duration: 2000,
    });
  };

  const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => copyToClipboard(code)}
        className="absolute top-2 right-2 z-10 flex items-center gap-1"
      >
        <Copy size={14} />
        Copy
      </Button>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );

  const curlExample = `curl -X ${endpoint.method} "${endpoint.url}" \\
${endpoint.headers ? Object.entries(endpoint.headers).map(([key, value]) => `  -H "${key}: ${value}"`).join(' \\\n') : ''}${endpoint.body ? ` \\\n  -d '${JSON.stringify(endpoint.body, null, 2)}'` : ''}`;

  const jsExample = `fetch("${endpoint.url}", {
  method: "${endpoint.method}",${endpoint.headers ? `
  headers: ${JSON.stringify(endpoint.headers, null, 4)},` : ''}${endpoint.body ? `
  body: JSON.stringify(${JSON.stringify(endpoint.body, null, 4)})` : ''}
})
.then(response => response.json())
.then(data => console.log(data));`;

  const pythonExample = `import requests
import json

url = "${endpoint.url}"
${endpoint.headers ? `headers = ${JSON.stringify(endpoint.headers, null, 4)}` : ''}
${endpoint.body ? `data = ${JSON.stringify(endpoint.body, null, 4)}` : ''}

response = requests.${endpoint.method.toLowerCase()}(url${endpoint.headers ? ', headers=headers' : ''}${endpoint.body ? ', json=data' : ''})
print(response.json())`;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
            {endpoint.method}
          </Badge>
          <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint.url}</code>
        </div>
        <CardTitle className="text-xl">{endpoint.title}</CardTitle>
        {endpoint.description && (
          <p className="text-muted-foreground">{endpoint.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curl">
            <CodeBlock code={curlExample} language="bash" />
          </TabsContent>
          
          <TabsContent value="javascript">
            <CodeBlock code={jsExample} language="javascript" />
          </TabsContent>
          
          <TabsContent value="python">
            <CodeBlock code={pythonExample} language="python" />
          </TabsContent>
        </Tabs>

        {endpoint.body && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Request Body:</h4>
            <CodeBlock code={JSON.stringify(endpoint.body, null, 2)} language="json" />
          </div>
        )}

        {endpoint.response && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Response:</h4>
            <CodeBlock code={JSON.stringify(endpoint.response, null, 2)} language="json" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestApiCard;