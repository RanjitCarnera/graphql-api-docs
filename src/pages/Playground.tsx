
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import GraphQLPlayground from '@/components/GraphQLPlayground';
// import GraphQLSearch from '@/components/GraphQLSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Playground = () => {
  return (
    <DocsLayout>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">API Playground</h1>
          <p className="text-gray-600">
            Use these interactive tools to explore and test both our GraphQL and REST APIs. 
            Write queries, examine responses, and experiment with different parameters to get familiar with our APIs.
          </p>
        </div>
        
        <Tabs defaultValue="graphql" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="graphql">GraphQL Playground</TabsTrigger>
            <TabsTrigger value="rest">REST API Explorer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="graphql" className="space-y-6">
            <GraphQLPlayground />
            {/* <GraphQLSearch /> */}
          </TabsContent>
          
          <TabsContent value="rest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>REST API Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">REST API explorer coming soon!</p>
                  <p className="text-sm text-gray-400">
                    In the meantime, you can use tools like Postman or curl to test our REST endpoints.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sample REST Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Projects</h4>
                    <code className="block bg-gray-100 p-2 rounded text-sm">
                      GET /rest/projects
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">People</h4>
                    <code className="block bg-gray-100 p-2 rounded text-sm">
                      GET /rest/people
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">User Profile</h4>
                    <code className="block bg-gray-100 p-2 rounded text-sm">
                      GET /rest/user/me
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Tips for using the playground</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-1">GraphQL</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                <li>Press "Run" to execute your query</li>
                <li>Use the tabs to switch between Query, Variables, and Headers</li>
                <li>Variables must be valid JSON</li>
                <li>You can download the full schema using the "Schema" button</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">REST</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                <li>Use standard HTTP methods (GET, POST, PUT, DELETE)</li>
                <li>Add query parameters for filtering and pagination</li>
                <li>Include proper Content-Type headers for POST/PUT requests</li>
                <li>Add authentication tokens in the Authorization header</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Playground;
