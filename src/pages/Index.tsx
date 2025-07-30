
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Play, FileText, Book, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Combined API examples for both GraphQL and REST
  const graphqlExample = {
    javascript: `// GraphQL API using fetch
fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    query: \`
      query {
        Project {
          Projects(first: 20) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    \`
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `# GraphQL API using requests
import requests

url = 'https://api.constructionintelligence.com/graphql'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
}
query = '''
query {
  Project {
    Projects(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
'''

response = requests.post(url, json={'query': query}, headers=headers)
print(response.json())`
  };

  const restExample = {
    javascript: `// REST API using fetch
fetch('https://api.constructionintelligence.com/rest/projects', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `# REST API using requests
import requests

url = 'https://api.constructionintelligence.com/rest/projects'
headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Accept': 'application/json'
}

response = requests.get(url, headers=headers)
print(response.json())`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">API Documentation</h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to the comprehensive documentation for our APIs. We provide both GraphQL and REST endpoints 
            to give you flexibility in how you integrate with our construction intelligence platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/getting-started">
                <Play className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/playground">
                <FileText className="mr-2 h-4 w-4" />
                Try the APIs
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                GraphQL API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">Flexible, efficient queries with a single endpoint. Request exactly the data you need.</p>
              <code className="block bg-gray-100 p-3 rounded-md font-code text-sm" style={{overflow: 'auto'}}>
                https://api.constructionintelligence.com/graphql
              </code>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                REST API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">Traditional REST endpoints for straightforward resource-based operations.</p>
              <code className="block bg-gray-100 p-3 rounded-md font-code text-sm" style={{overflow: 'auto'}}>
                https://api.constructionintelligence.com/rest/
              </code>
            </CardContent>
          </Card>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Quick Examples</h2>
          <p className="mb-4">
            Here are examples of how to fetch project data using both API approaches:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">GraphQL Query</h3>
              <CodeExample
                title="Fetching Projects with GraphQL"
                description="Query exactly the fields you need with GraphQL."
                codeExamples={graphqlExample}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">REST Request</h3>
              <CodeExample
                title="Fetching Projects with REST"
                description="Use standard HTTP methods with REST endpoints."
                codeExamples={restExample}
              />
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Choose Your Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>When to Use GraphQL</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Need precise data fetching</li>
                  <li>Want to minimize network requests</li>
                  <li>Building complex, data-heavy applications</li>
                  <li>Prefer strongly typed schemas</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>When to Use REST</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Simple CRUD operations</li>
                  <li>Familiar with traditional REST patterns</li>
                  <li>Need file uploads/downloads</li>
                  <li>Working with caching strategies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Unified Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Both APIs use the same authentication system with Bearer tokens for seamless integration.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access the same data and functionality through both GraphQL and REST endpoints.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Developer-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed documentation, code examples, and interactive testing tools for both API types.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/getting-started">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="mr-2 h-5 w-5" />
                    Getting Started Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Learn the basics of using our GraphQL API, including authentication and making your first query.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/playground">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Interactive Playground
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Experiment with our API in an interactive environment where you can build and test queries.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Index;
