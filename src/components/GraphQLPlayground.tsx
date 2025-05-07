
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GraphQLPlayground() {
  const [query, setQuery] = useState(`# Try running a project stage query!
query ProjectStagesTable_Query($first: Int, $filterByName: String) {
  ...ProjectStagesTable_ProjectStageListFragment
    @arguments(first: $first, filterByName: $filterByName)
}

fragment ProjectStagesTable_ProjectStageListFragment on Query
@refetchable(queryName: "ProjectStagesTable_Refetch")
@argumentDefinitions(
  first: { type: "Int", defaultValue: 20 }
  after: { type: "String" }
  filterByName: { type: "String" }
) {
  Project {
    ProjectStages(first: $first, after: $after, filterByName: $filterByName)
      @connection(key: "ProjectStagesTable_ProjectStages") {
      __id
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
        startCursor
      }
      edges {
        node {
          id
          name
          sortOrder
          reverseProjectOrderInReports
          color
        }
      }
    }
  }
}`);
  const [response, setResponse] = useState('# Response will appear here');
  const [variables, setVariables] = useState('{\n  "first": 10,\n  "filterByName": "Planning"\n}');
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer YOUR_TOKEN"\n}');

  const handleRunQuery = () => {
    // In a real application, this would send the query to your GraphQL endpoint
    const mockResponse = {
      data: {
        Project: {
          ProjectStages: {
            __id: "client:ProjectStagesTable_ProjectStages",
            pageInfo: {
              endCursor: "YXJyYXljb25uZWN0aW9uOjk=",
              hasPreviousPage: false,
              hasNextPage: false,
              startCursor: "YXJyYXljb25uZWN0aW9uOjA="
            },
            edges: [
              {
                node: {
                  id: "stage-1",
                  name: "Planning",
                  sortOrder: 1,
                  reverseProjectOrderInReports: false,
                  color: "#4299E1"
                }
              },
              {
                node: {
                  id: "stage-2",
                  name: "Design",
                  sortOrder: 2,
                  reverseProjectOrderInReports: false,
                  color: "#ED8936"
                }
              },
              {
                node: {
                  id: "stage-3",
                  name: "Construction",
                  sortOrder: 3,
                  reverseProjectOrderInReports: true,
                  color: "#48BB78"
                }
              }
            ]
          }
        }
      }
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
  };

  const handleDownloadSchema = () => {
    // In a real app, this would download the actual schema
    const schema = `type Project {
  id: ID!
  name: String!
  startDate: String
  endDate: String
  durationInMonths: Int
  skills: [Skill!]
  address: Address
  avatar: Image
}

type ProjectStage {
  id: ID!
  name: String!
  sortOrder: Int
  reverseProjectOrderInReports: Boolean
  color: String
}

type Query {
  Project: ProjectQueries!
  Scenario: ScenarioQueries!
  Dynamics: DynamicsQueries!
  Rand: RandQueries!
}

type ProjectQueries {
  Projects(first: Int, filterByName: String, alwaysIncludeIds: [ID!]): ProjectConnection!
  ProjectStages(first: Int, excludeIds: [ID!], filterByName: String, alwaysIncludeIds: [ID!]): ProjectStageConnection!
}

type ProjectConnection {
  edges: [ProjectEdge!]!
}

type ProjectEdge {
  node: Project!
}

type ProjectStageConnection {
  pageInfo: PageInfo!
  __id: ID!
  edges: [ProjectStageEdge!]!
}

type ProjectStageEdge {
  node: ProjectStage!
}

type PageInfo {
  endCursor: String
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
  startCursor: String
}`;

    const blob = new Blob([schema], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.graphql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">GraphQL Playground</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadSchema} className="flex items-center gap-1">
            <Download size={16} />
            Schema
          </Button>
          <Button onClick={handleRunQuery} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
            <Play size={16} />
            Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Query</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="query">
              <TabsList className="mb-2">
                <TabsTrigger value="query">Query</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent value="query">
                <textarea 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  className="playground-editor w-full"
                />
              </TabsContent>
              <TabsContent value="variables">
                <textarea 
                  value={variables} 
                  onChange={(e) => setVariables(e.target.value)} 
                  className="playground-editor w-full"
                />
              </TabsContent>
              <TabsContent value="headers">
                <textarea 
                  value={headers} 
                  onChange={(e) => setHeaders(e.target.value)} 
                  className="playground-editor w-full"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="playground-editor w-full">{response}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
