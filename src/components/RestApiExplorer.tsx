import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Send, Copy, Clock, Check, X, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Header {
  key: string;
  value: string;
}

interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  duration: number;
}

const RestApiExplorer = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:9000/graphql');
  const [headers, setHeaders] = useState<Header[]>([
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Authorization', value: 'Bearer your-token-here' }
  ]);
  const [body, setBody] = useState('{\n  "query": "{ __typename }"\n}');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      toast({
        title: "Response copied!",
        description: "The response has been copied to your clipboard.",
        duration: 2000,
      });
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const requestHeaders: Record<string, string> = {};
      headers.forEach(header => {
        if (header.key && header.value) {
          requestHeaders[header.key] = header.value;
        }
      });

      const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (method !== 'GET' && method !== 'HEAD' && body) {
        fetchOptions.body = body;
      }

      const response = await fetch(url, fetchOptions);
      const duration = Date.now() - startTime;
      
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        headers: responseHeaders,
        duration
      });

      toast({
        title: "Request sent!",
        description: `Received ${response.status} response in ${duration}ms`,
        duration: 3000,
      });

    } catch (error) {
      const duration = Date.now() - startTime;
      setResponse({
        status: 0,
        statusText: 'Network Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        headers: {},
        duration
      });

      toast({
        title: "Request failed",
        description: error instanceof Error ? error.message : 'Network error occurred',
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (exampleType: string) => {
    switch (exampleType) {
      case 'graphql':
        setMethod('POST');
        setUrl('http://localhost:9000/graphql');
        setHeaders([
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Authorization', value: 'Bearer your-token-here' }
        ]);
        setBody('{\n  "query": "query { __typename }"\n}');
        break;
      case 'rest-get':
        setMethod('GET');
        setUrl('http://localhost:9000/rest/people');
        setHeaders([
          { key: 'Authorization', value: 'Bearer your-token-here' }
        ]);
        setBody('');
        break;
      case 'rest-post':
        setMethod('POST');
        setUrl('http://localhost:9000/rest/people');
        setHeaders([
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Authorization', value: 'Bearer your-token-here' }
        ]);
        setBody('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
        break;
    }
  };

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'POST': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'PATCH': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'DELETE': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusIcon = () => {
    if (loading) return <Clock className="w-4 h-4 animate-spin" />;
    if (!response) return <Send className="w-4 h-4" />;
    return response.status >= 200 && response.status < 300 ? 
      <Check className="w-4 h-4 text-green-600" /> : 
      <X className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Quick Examples */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Quick Start Examples</h3>
            <p className="text-muted-foreground text-sm">Choose a template to get started quickly</p>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button 
              variant="outline" 
              onClick={() => loadExample('graphql')}
              className="flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              GraphQL Query
            </Button>
            <Button 
              variant="outline" 
              onClick={() => loadExample('rest-get')}
              className="flex items-center gap-2"
            >
              <Badge className={getMethodBadgeColor('GET')}>GET</Badge>
              REST API
            </Button>
            <Button 
              variant="outline" 
              onClick={() => loadExample('rest-post')}
              className="flex items-center gap-2"
            >
              <Badge className={getMethodBadgeColor('POST')}>POST</Badge>
              Create Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main API Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Request Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Method and URL */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">API Endpoint</Label>
              <div className="flex gap-2">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => (
                      <SelectItem key={m} value={m}>
                        <Badge className={getMethodBadgeColor(m)}>{m}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="https://api.example.com/endpoint"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Headers */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Headers</Label>
                <Button variant="ghost" size="sm" onClick={addHeader}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {headers.map((header, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Key"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      className="flex-1 text-sm"
                    />
                    <Input
                      placeholder="Value"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      className="flex-1 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHeader(index)}
                      className="p-1 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Body */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Request Body</Label>
              <Textarea
                placeholder={method === 'GET' || method === 'HEAD' ? 
                  'Request body not applicable for this method' : 
                  '{\n  "key": "value"\n}'
                }
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-32 font-mono text-sm resize-none"
                disabled={method === 'GET' || method === 'HEAD'}
              />
            </div>

            {/* Send Button */}
            <Button 
              onClick={sendRequest} 
              disabled={loading || !url}
              className="w-full flex items-center gap-2"
              size="lg"
            >
              {getStatusIcon()}
              {loading ? 'Sending Request...' : 'Send Request'}
            </Button>
          </CardContent>
        </Card>

        {/* Response Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Response
              </div>
              {response && (
                <div className="flex items-center gap-3">
                  <Badge className={`${
                    response.status >= 200 && response.status < 300 
                      ? 'bg-green-100 text-green-800' 
                      : response.status >= 400 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {response.status} {response.statusText}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {response.duration}ms
                  </span>
                  <Button variant="ghost" size="sm" onClick={copyResponse}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Response Body</Label>
                  <div className="bg-muted rounded-lg p-4 max-h-80 overflow-auto">
                    <pre className="text-sm">
                      <code>
                        {typeof response.data === 'string' 
                          ? response.data 
                          : JSON.stringify(response.data, null, 2)
                        }
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Response Headers</Label>
                  <div className="bg-muted rounded-lg p-4 max-h-32 overflow-auto">
                    <pre className="text-sm">
                      <code>{JSON.stringify(response.headers, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Send className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">No Response Yet</h3>
                <p className="text-sm">Configure your request and click "Send Request" to see the response here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestApiExplorer;