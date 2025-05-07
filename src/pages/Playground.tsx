
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import GraphQLPlayground from '@/components/GraphQLPlayground';

const Playground = () => {
  return (
    <DocsLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">GraphQL Playground</h1>
          <p className="text-gray-600">
            Use this interactive playground to explore and test our GraphQL API. Write queries, examine responses, 
            and experiment with variables and headers to get familiar with the API.
          </p>
        </div>
        
        <GraphQLPlayground />
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Tips for using the playground</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Press "Run" to execute your query</li>
            <li>Use the tabs to switch between Query, Variables, and Headers</li>
            <li>Variables must be valid JSON</li>
            <li>Add authentication tokens in the Headers tab</li>
            <li>You can download the full schema using the "Schema" button</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Playground;
