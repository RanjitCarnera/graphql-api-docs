
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const RestAPI = () => {
  const generateTokenExamples = {
    javascript: `// Generate API Key
fetch('http://localhost:9000/api/generate-public-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  },
  body: JSON.stringify({
    name: 'My API Key',
    groupId: 'group-123'
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

url = 'http://localhost:9000/api/generate-public-token'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
}
data = {
    'name': 'My API Key',
    'groupId': 'group-123'
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
  };

  const listTokensExamples = {
    javascript: `// List API Keys
fetch('http://localhost:9000/api/token', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

url = 'http://localhost:9000/api/token'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
}

response = requests.get(url, headers=headers)
print(response.json())`
  };

  const deleteTokenExamples = {
    javascript: `// Delete API Key
const tokenId = 'token-id-123';
fetch(\`http://localhost:9000/api/token/deactivate/\${tokenId}\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

token_id = 'token-id-123'
url = f'http://localhost:9000/api/token/deactivate/{token_id}'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
}

response = requests.get(url, headers=headers)
print(response.json())`
  };

  const createScenarioExamples = {
    javascript: `// Create Scenario
fetch('http://localhost:9000/api/scenarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  },
  body: JSON.stringify({
    name: 'Test with RP June05',
    projectsRef: [],
    isMasterPlan: false
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

url = 'http://localhost:9000/api/scenarios'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
}
data = {
    'name': 'Test with RP June05',
    'projectsRef': [],
    'isMasterPlan': False
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">REST API Reference</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Base URL</h2>
          <p className="mb-4">
            All REST API requests are made to the following base URL:
          </p>
          <code className="block bg-gray-100 p-3 rounded-md font-code mb-6">
            http://localhost:9000/api
          </code>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Authentication</h2>
          <p className="mb-4">
            All API endpoints require authentication using a Bearer token in the Authorization header.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-blue-800">
              <strong>Authorization Header:</strong> <code>Authorization: Bearer YOUR_AUTH_TOKEN</code>
            </p>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">API Key Management</h2>
          
          <div className="space-y-8">
            {/* Generate API Key */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Generate API Key</CardTitle>
                  <Badge variant="default">POST</Badge>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded">
                  POST /api/generate-public-token
                </code>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Creates a new API key for accessing the public API.</p>
                
                <Tabs defaultValue="request" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="request" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Headers</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><code>Content-Type: application/json</code></li>
                        <li><code>Authorization: Bearer YOUR_AUTH_TOKEN</code></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Request Body</h4>
                      <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`{
  "name": "string",
  "groupId": "string"
}`}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples">
                    <CodeExample
                      title="Generate API Key Examples"
                      description="Create a new API key with name and group ID"
                      codeExamples={generateTokenExamples}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* List API Keys */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">List API Keys</CardTitle>
                  <Badge variant="secondary">GET</Badge>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded">
                  GET /api/token
                </code>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Retrieves a list of all API keys associated with your account.</p>
                
                <Tabs defaultValue="request" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="request" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Headers</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><code>Content-Type: application/json</code></li>
                        <li><code>Authorization: Bearer YOUR_AUTH_TOKEN</code></li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples">
                    <CodeExample
                      title="List API Keys Examples"
                      description="Retrieve all API keys for your account"
                      codeExamples={listTokensExamples}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Delete API Key */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Delete API Key</CardTitle>
                  <Badge variant="destructive">GET</Badge>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded">
                  GET /api/token/deactivate/{`{id}`}
                </code>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Deactivates an existing API key by its ID.</p>
                
                <Tabs defaultValue="request" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="request" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Path Parameters</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><code>id</code> (string, required) - The ID of the API key to deactivate</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Headers</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><code>Content-Type: application/json</code></li>
                        <li><code>Authorization: Bearer YOUR_AUTH_TOKEN</code></li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples">
                    <CodeExample
                      title="Delete API Key Examples"
                      description="Deactivate an API key by its ID"
                      codeExamples={deleteTokenExamples}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Scenarios</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Create Scenario</CardTitle>
                <Badge variant="default">POST</Badge>
              </div>
              <code className="text-sm bg-gray-100 p-2 rounded">
                POST /api/scenarios
              </code>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Creates a new scenario for project planning and management.</p>
              
              <Tabs defaultValue="request" className="mb-4">
                <TabsList>
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="request" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><code>Content-Type: application/json</code></li>
                      <li><code>Authorization: Bearer YOUR_AUTH_TOKEN</code></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Request Body</h4>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto">
{`{
  "name": "string",
  "projectsRef": ["string"],
  "isMasterPlan": boolean
}`}
                    </pre>
                    
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Field Descriptions:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>name:</strong> The name of the scenario</li>
                        <li><strong>projectsRef:</strong> Array of project references (can be empty)</li>
                        <li><strong>isMasterPlan:</strong> Boolean indicating if this is a master plan</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="examples">
                  <CodeExample
                    title="Create Scenario Examples"
                    description="Create a new scenario with project references"
                    codeExamples={createScenarioExamples}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Error Responses</h2>
          <p className="mb-4">
            All endpoints may return the following error responses:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>401 Unauthorized</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-3 rounded-md text-sm">
{`{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>400 Bad Request</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-3 rounded-md text-sm">
{`{
  "error": "Bad Request",
  "message": "Invalid request body"
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
};

export default RestAPI;
