
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/assignmentsOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const Assignments = () => {
 
   const [activeTab, setActiveTab] = React.useState("queries");
    const restApiEndpoints = [
    {
      id: "create-assignment",
      title: "Create Assignment",
      description: "Create a new assignment with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assignments",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "scenarioId": "sample-scenario-id",
          "projectId": "sample-project-id",
          "data": {
            "validAssignmentRolesRef": ["sample-role-ref-id"],
            "startDate": "2026-08-28",
            "endDate": "2026-11-29",
            "personRef": "sample-person-ref-id",
            "isExecutive": false,
            "comment": null,
            "weight": null
          },
          "setTagsInput": {
            "tagsRef": [],
            "tagNames": []
          }
        }
    },
    {
      id: "assignments-in-project",
      title: "Get Assignments in specific project",
      description: "Retrieve assignments records within specific project.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assignments/project/projectId",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
        'projectId': 'project-id',
      }
    },
     {
      id: "delete-assignment",
      title: "Delete Assignment record",
      description: "Delete a assignment record by its ID.",
      method: "DELETE" as const,
      url: "https://api.constructionintelligence.com/api/assignments/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
       payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
          
      }
    },
    {
      id: "Assign-people-to-assignment",
      title: "Assign poeple to assignment",
      description: "Assign people to an assignment with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assignments/fill",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "assignmentId": "assignment-id",
        "personId": "person-id"
      }
    },
  ];
   const {
     fragmentRefs,
     scrollToFragment,
     fragmentIdToRefKey
   } = useFragmentScroll();

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Assignments API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Assignments API allows you to manage project assignments, including creating, updating, and deleting assignments,
            as well as importing and exporting assignment data.
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="mutations">Mutations</TabsTrigger>
            <TabsTrigger value="fragments">Fragments</TabsTrigger>
            <TabsTrigger value="rest-api">REST API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="queries" className="space-y-6">
           {operationsData.queries.length > 0 ? <> <h2 className="text-2xl font-bold mb-4">Queries</h2>
            <p className="mb-4">Use these queries to fetch information about assignments in different formats and contexts.</p>
            
            {operationsData.queries.map((query) => (
              <OperationCard
                key={query.id}
                id={query.id}
                title={query.title}
                description={query.description}
                code={query.code}
                usedFragments={query.usedFragments}
                onViewFragment={
                  query.usedFragments && query.usedFragments.length > 0
                    ? () => 
                      scrollToFragment(query.usedFragments, {
                      onBeforeScroll: () => setActiveTab("fragments")
                    })
                    : null
                }
              />
            ))}</>
          :
          <div>
            <h2 className="text-2xl font-bold mb-4">Queries</h2>
            <p className="mb-4">No queries available for this API.</p>
          </div>}
          </TabsContent>
          
          <TabsContent value="mutations" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Mutations</h2>
            <p className="mb-4">Use these mutations to create, update, delete, and manage assignments.</p>
            
            {operationsData.mutations.map((mutation) => (
              <OperationCard
                key={mutation.id}
                id={mutation.id}
                title={mutation.title}
                description={mutation.description}
                code={mutation.code}
                usedFragments={mutation.usedFragments}
                onViewFragment={
                  mutation.usedFragments && mutation.usedFragments.length > 0
                    ? () => 
                      scrollToFragment(mutation.usedFragments, {
                      onBeforeScroll: () => setActiveTab("fragments")
                    })
                    : null
                }
              />
            ))}
          </TabsContent>
          <TabsContent value="fragments" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Fragments</h2>
            <p className="mb-4">
              These are GraphQL fragments used in Staffing Template queries and mutations.
            </p>
            {operationsData.fragments?.map((fragment) => {
               const anchorKey = fragmentIdToRefKey(
                fragment.fragmentId || fragment.title
              );
              return (
                <div
                  key={fragment.id}
                  ref={(el) => {
                    fragmentRefs.current[anchorKey] = el;
                  }}
                  id={anchorKey}
                >
                 <OperationCard
                    key={fragment.id}
                    id={fragment.id}
                    title={fragment.title}
                    description={fragment.description || ""}
                    code={fragment.code}
                  />
                </div>
              );              
            })}
          </TabsContent>
          <TabsContent value="rest-api" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">REST API</h2>
            <p className="mb-4">
              Use these REST API endpoints to interact with assignments programmatically.
            </p>  
            {restApiEndpoints.map((endpoint) => (
              <RestApiCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  );
};

export default Assignments;
