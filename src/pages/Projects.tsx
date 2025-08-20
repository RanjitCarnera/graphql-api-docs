import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/projectOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const Projects = () => {

  const [activeTab, setActiveTab] = React.useState("queries");
   const restApiEndpoints = [
    {
      id: "create-project",
      title: "Create Project",
      description: "Create a new project with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/projects",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body:  {
        "data": {
          "name": "sumit hello",
          "stageId": "UHJvamVjdFN0YWdlOjU1MTkyYTg0LTJmNGYtNGEyNi05NzY1LWJjMjhiZmE4MjExNw==",
          "projectIdentifier": "sumit12344hseljjjlo",
          "skillsIds": []
        },
        "milestoneCreationData": {
          "milestoneIds": [],
          "creationData": []
        }
    }
    },
    {
      id: "list-projects",
      title: "Get all Projects list",
      description: "Retrieve a list of project with optional filtering.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/projects/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "name": null,
          "excludeIds": null,
          "alwaysIncludeIds": null,
          "first": 3,
          "after": null,
          "before": null,
          "showDeactivated": false,
          "filterByDivisions": null,
          "filterByStages": null,
          "filterByRegions": null
      }
    },
    {
      id: "delete-projects",
      title: "Delete Project record",
      description: "Delete a project record by its ID.",
      method: "DELETE" as const,
      url: "https://api.constructionintelligence.com/api/projects/id",
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
      id: "update-projects",
      title: "Update Project record",
      description: "Update a project record by its ID.",
      method: "PUT" as const,
      url: "https://api.constructionintelligence.com/api/projects/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "data": {
          "name": "Updated Project Name",
          "stageId": "UHJvamVjdFN0YWdlOjU1MTkyYTg0LTJmNGYtNGEyNi05NzY1LWJjMjhiZmE4MjExNw==",
          "projectIdentifier": "PROJ-001-UPDATED",
          "startDate": "2024-02-01",
          "endDate": "2024-11-30",
          "volume": 1500000.00,
          "generalConditionsPercentage": 18.0,
          "budgetedLaborCosts": 750000.00,
          "clientName": "Updated ABC Corporation",
          "architectName": "Updated XYZ Architects",
          "address": {
            "lineOne": "456 Updated Street",
            "city": "Updated City",
            "postalCode": "54321",
            "state": "UT",
            "country": "USA",
            "latitude": 40.7589,
            "longitude": -73.9851
          },
          "divisionId": "RGl2aXNpb246ZGVmYXVsdC1kaXZpc2lvbi1pZA==",
          "regionId": "UmVnaW9uOmRlZmF1bHQtcmVnaW9uLWlk",
          "comments": "This project has been updated",
          "skillsIds": []
        },
        "milestoneCreationData": {
          "milestoneIds": [],
          "creationData": [
            {
              "name": "Updated Project Kickoff",
              "date": "2024-02-01"
            },
            {
              "name": "Updated Design Phase Complete",
              "date": "2024-04-01"
            },
            {
              "name": "Updated Construction Start",
              "date": "2024-07-01"
            },
            {
              "name": "Updated Project Completion",
              "date": "2024-11-30"
            }
          ]
        },
        "moveAssignmentStartDates": false,
        "moveAssignmentEndDates": false
      }
    },
    {
      id: "create-project-stage",
      title: "Create Project Stage",
      description: "Create a new project stage with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/project-stage",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body:  {
          "data": {
              "name": "project1",
              "reverseProjectOrderInReports": true,
              "sortOrder": 0,
              "color": "#214ce2"
          },
        "milestoneCreationData": {
          "milestoneIds": [],
          "creationData": []
        }
    }
    },
    {
      id: "list-project-stages",
      title: "Get all Project Stages list",
      description: "Retrieve a list of project stages with optional filtering.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/project-stages",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "name": "",
          "first": 20
        }
    },
    {
      id: "delete-project-stage",
      title: "Delete Project Stage record",
      description: "Delete a project stage record by its ID.",
      method: "DELETE" as const,
      url: "https://api.constructionintelligence.com/api/project-stages/id",
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
      id: "update-project-stage",
      title: "Update Project Stage record",
      description: "Update a project stage record by its ID.",
      method: "PUT" as const,
      url: "https://api.constructionintelligence.com/api/project-stages/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "data": {
            "name": "Preconstruction3.0",
            "reverseProjectOrderInReports": true,
            "sortOrder": 1,
            "color": "#3d4fdb"
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
        <h1 className="text-3xl font-bold mb-6">Projects API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            API provides the following project-related queries that you can use to fetch and manage projects:
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
            <p className="mb-4">Use these queries to fetch information about projects in different formats and contexts.</p>
            
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
            <p className="mb-4">Use these mutations to create, update, delete, and manage projects.</p>
            
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
          {operationsData.fragments.length == 0 
           ?
              <p className="mb-4">
              There is no fragments available for this API.
            </p>
          : <>
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
            </>}
          </TabsContent>
          <TabsContent value="rest-api" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">REST API</h2>
              <p className="mb-4">
                Use these REST API endpoints to interact with project and project stages programmatically.
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

export default Projects;
