
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GettingStarted = () => {
  const graphqlAuthExamples = {
    javascript: `// GraphQL with authorization header
fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: \`
      query {
        me {
          id
          name
        }
      }
    \`
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}

query = '''
query {
  me {
    id
    name
  }
}
'''

response = requests.post(
    'https://api.constructionintelligence.com/graphql',
    json={'query': query},
    headers=headers
)

print(response.json())`
  };

  const restAuthExamples = {
    javascript: `// REST API with authorization header
fetch('https://api.constructionintelligence.com/rest/user/me', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
}

response = requests.get(
    'https://api.constructionintelligence.com/rest/user/me',
    headers=headers
)

print(response.json())`
  };

  const graphqlVariableExamples = {
    javascript: `// GraphQL with variables
const variables = {
  id: "123",
  limit: 10
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: \`
      query GetUserPosts($id: ID!, $limit: Int) {
        user(id: $id) {
          posts(limit: $limit) {
            id
            title
          }
        }
      }
    \`,
    variables: variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

variables = {
    'id': '123',
    'limit': 10
}

query = '''
query GetUserPosts($id: ID!, $limit: Int) {
  user(id: $id) {
    posts(limit: $limit) {
      id
      title
    }
  }
}
'''

response = requests.post(
    'https://api.constructionintelligence.com/graphql',
    json={
        'query': query,
        'variables': variables
    },
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
)

print(response.json())`
  };

  const restParameterExamples = {
    javascript: `// REST API with query parameters
const params = new URLSearchParams({
  limit: '10',
  offset: '0',
  filter: 'active'
});

fetch(\`https://api.constructionintelligence.com/rest/users/123/posts?\${params}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

params = {
    'limit': 10,
    'offset': 0,
    'filter': 'active'
}

response = requests.get(
    'https://api.constructionintelligence.com/rest/users/123/posts',
    params=params,
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Accept': 'application/json'
    }
)

print(response.json())`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Getting Started</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="mb-4">
            This guide will walk you through the basics of using our APIs. We offer both GraphQL and REST endpoints 
            to give you flexibility in how you integrate with our construction intelligence platform.
          </p>
          
          <Tabs defaultValue="graphql" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="graphql">GraphQL API</TabsTrigger>
              <TabsTrigger value="rest">REST API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="graphql" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GraphQL Endpoint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">All GraphQL requests are sent to a single endpoint:</p>
                    <code className="block bg-gray-100 p-3 rounded-md font-code" style={{overflow: 'auto'}}>
                      https://api.constructionintelligence.com/graphql
                    </code>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>HTTP Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Use POST requests with a JSON payload containing your GraphQL query in the request body.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="rest" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>REST Base URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">All REST requests use this base URL:</p>
                    <code className="block bg-gray-100 p-3 rounded-md font-code" style={{overflow: 'auto'}}>
                      https://api.constructionintelligence.com/rest/
                    </code>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>HTTP Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Use standard HTTP methods: GET for retrieval, POST for creation, PUT for updates, DELETE for removal.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Authentication</h2>
          <p className="mb-4">
            Both APIs use the same authentication method. Include an Authorization header with a valid API key.
            You can obtain an API key from your account dashboard.
          </p>
          
          <Tabs defaultValue="graphql-auth" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="graphql-auth">GraphQL Authentication</TabsTrigger>
              <TabsTrigger value="rest-auth">REST Authentication</TabsTrigger>
            </TabsList>
            
            <TabsContent value="graphql-auth">
              <CodeExample
                title="GraphQL Authentication Example"
                description="Here's how to make authenticated GraphQL requests:"
                codeExamples={graphqlAuthExamples}
              />
            </TabsContent>
            
            <TabsContent value="rest-auth">
              <CodeExample
                title="REST Authentication Example"
                description="Here's how to make authenticated REST requests:"
                codeExamples={restAuthExamples}
              />
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Parameters and Variables</h2>
          <p className="mb-4">
            Learn how to pass parameters to customize your API requests in both GraphQL and REST.
          </p>
          
          <Tabs defaultValue="graphql-vars" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="graphql-vars">GraphQL Variables</TabsTrigger>
              <TabsTrigger value="rest-params">REST Parameters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="graphql-vars">
              <CodeExample
                title="Using Variables in GraphQL"
                description="GraphQL allows you to parameterize your queries with variables:"
                codeExamples={graphqlVariableExamples}
              />
            </TabsContent>
            
            <TabsContent value="rest-params">
              <CodeExample
                title="Using Parameters in REST"
                description="REST APIs use query parameters and path parameters:"
                codeExamples={restParameterExamples}
              />
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
          <p className="mb-4">
            Both APIs return errors in standardized formats to help you identify and fix issues.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GraphQL Error Response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-3 rounded-md font-code text-sm overflow-auto">
{`{
  "errors": [
    {
      "message": "Cannot query field 'emails' on type 'User'",
      "locations": [{ "line": 4, "column": 5 }],
      "path": ["query", "user", "emails"]
    }
  ],
  "data": null
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>REST Error Response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-3 rounded-md font-code text-sm overflow-auto">
{`{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with ID 123 not found",
    "status": 404
  }
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <p className="mb-4">
            Now that you understand the basics, you can:
          </p>
          
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Explore our APIs using the <a href="/playground" className="text-docs-primary hover:underline">Interactive Playground</a></li>
            <li>Learn about available <a href="/queries" className="text-docs-primary hover:underline">GraphQL Queries</a> and <a href="/mutations" className="text-docs-primary hover:underline">Mutations</a></li>
            <li>Browse our <a href="/examples" className="text-docs-primary hover:underline">Code Examples</a> for common use cases</li>
            <li>Understand our <a href="/types" className="text-docs-primary hover:underline">Type System</a> for better integration</li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
};

export default GettingStarted;