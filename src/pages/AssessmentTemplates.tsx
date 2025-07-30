import React, { useRef } from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import operationsData from "@/data/assessmentTemplateOperations.json";
import { useFragmentScroll } from '../lib/utils';
import OperationCard from '@/components/graphql/OperationCard';
import RestApiCard from '@/components/RestApiCard';

const AssessmentTemplates = () => {

  const [activeTab, setActiveTab] = React.useState("queries");
   const restApiEndpoints = [
    {
      id: "create-assessment-template",
      title: "Create Assessment Template",
      description: "Create a new assessment template with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assessment-templates",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
        "data": {
          "name": "Senior Project Manager Assessment",
          "associatedRoleIds": [
            "QXNzaWdubWVudFJvbGU6QXNzaWdubWVudFJvbGU6ZmE4NTgyZGEtMzg3Ny00NTI4LTg1MjctOTBmMTkyYjA5Zjk0"
          ],
          "assessedSkillIds": [
            "U2tpbGw6U2tpbGw6ZDUyM2VlOGItN2FlNy00NmE3LWJiZGItZjNiYWQ3MTlkNjA0"
          ],
          "distributionList": {
            "role": ["AssessedPerson", "Supervisor"],
            "emails": ["manager@company.com", "hr@company.com"]
          }
        }
      }
    },
    {
      id: "list-assessment-templates",
      title: "Get all Assessment Template list",
      description: "Retrieve a list of assessment template with optional filtering.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/assessment-templates/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "filterByName": "",
          "first": 10
        }
    },
    {
      id: "delete-assessment-template",
      title: "Delete Assessment Template record",
      description: "Delete a assessment template record by its ID.",
      method: "DELETE" as const,
      url: "https://api.constructionintelligence.com/api/assessment-templates/id",
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
      id: "update-assessment-template",
      title: "Update Assessment Template record",
      description: "Update a assessment template record by its ID.",
      method: "PUT" as const,
      url: "https://api.constructionintelligence.com/api/assessment-templates/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
          "data": {
            "name": "Updated Senior Project Manager Assessment",
            "associatedRoleIds": [
              "QXNzaWdubWVudFJvbGU6QXNzaWdubWVudFJvbGU6ZmE4NTgyZGEtMzg3Ny00NTI4LTg1MjctOTBmMTkyYjA5Zjk0"
            ],
            "assessedSkillIds": [
              "U2tpbGw6U2tpbGw6ZDUyM2VlOGItN2FlNy00NmE3LWJiZGItZjNiYWQ3MTlkNjA0"
            ],
            "distributionList": {
              "role": ["AssessedPerson", "Supervisor", "Admin"],
              "emails": ["manager@company.com", "hr@company.com", "admin@company.com"]
            }
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
        <h1 className="text-3xl font-bold mb-6">Assessment Templates API</h1>
        <section className="mb-8">
          <p className="mb-6">
            The Assessment Templates API allows you to manage templates for assessments, including creation,
            modification, and querying of assessment templates with their associated roles and skills.
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
            <p className="mb-4">Use these queries to fetch information about assessment templates in different formats and contexts.</p>
            
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
            <p className="mb-4">Use these mutations to create, update, delete, and manage assessment templates.</p>
            
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
                Use these REST API endpoints to interact with assessment template programmatically.
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

export default AssessmentTemplates;
