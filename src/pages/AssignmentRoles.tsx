
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/assignmentRoleOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const AssignmentRoles = () => {
    
  const [activeTab, setActiveTab] = React.useState("queries");
   const restApiEndpoints = [
    {
      id: "create-assignment-role",
      title: "Create Assignment Role",
      description: "Create a new assignment with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assignment-roles",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "data": {
            "name": "Senior Project Manager",
            "sortOrder": 1,
            "maxNumberOfProjects": 3,
            "utilizationProjectionCapInMonths": 12,
            "countAsFullyAllocatedAtPercentage": 80.0,
            "countAsOverallocatedAtPercentage": 120.0,
            "useEndDateOfLastAssignmentOverProjectionCap": true
          }
        }
    },
    {
      id: "list-assignment-roles",
      title: "Get all Assignment role list",
      description: "Retrieve a list of assignment with optional filtering.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assignment-roles/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "first": 20,
          "filterByName": ""
      }
    },
    {
      id: "delete-assignment-role",
      title: "Delete Assignment role record",
      description: "Delete a assignment role record by its ID.",
      method: "DELETE" as const,
      url: "https://api.constructionintelligence.com/api/assignment-roles/id",
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
      id: "update-assignment-role",
      title: "Update Assignment role record",
      description: "Update a assignment role record by its ID.",
      method: "PUT" as const,
      url: "https://api.constructionintelligence.com/api/assignment-roles/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "data": {
          "name": "Senior Project Manager Updated",
          "sortOrder": 2,
          "maxNumberOfProjects": 5,
          "utilizationProjectionCapInMonths": 18,
          "countAsFullyAllocatedAtPercentage": 85.0,
          "countAsOverallocatedAtPercentage": 125.0,
          "useEndDateOfLastAssignmentOverProjectionCap": false
        }
      }
    }
  ];
  const {
      fragmentRefs,
      scrollToFragment,
      fragmentIdToRefKey
    } = useFragmentScroll();
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Assignment Roles API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Assignment Roles API allows you to manage role definitions for project assignments. 
            These roles define how individuals are assigned to projects and their allocation parameters.
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
            <h2 className="text-2xl font-bold mb-4">Queries</h2>
            <p className="mb-4">Use these queries to fetch information about assignment roles in different formats and contexts.</p>
            
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
            ))}
          </TabsContent>
          
          <TabsContent value="mutations" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Mutations</h2>
            <p className="mb-4">Use these mutations to create, update, delete, and manage assignment roles.</p>
            
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
                Use these REST API endpoints to interact with assignment role programmatically.
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

export default AssignmentRoles;
