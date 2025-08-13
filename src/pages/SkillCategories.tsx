
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/skillCategoriesOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const SkillCategories = () => {


    const [activeTab, setActiveTab] = React.useState("queries");
     const restApiEndpoints = [
    {
      id: "create-skill-categories",
      title: "Create Skill Category",
      description: "Create a new skill categories with the specified configuration.",
      method: "POST" as const,
      url: "http://localhost:9000/api/skill-categories",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "data": {
            "name": "Technical Skills"
          }
        }
    },
    {
      id: "list-skill-categories",
      title: "Get all Skill Categories list",
      description: "Retrieve a list of skill categories with optional filtering.",
      method: "POST" as const,
      url: "http://localhost:9000/api/skill-categorie/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "filterByName": "j",
          "alwaysIncludeIds": null
      }
    },
    {
      id: "delete-skill-categories",
      title: "Delete Skill Categories record",
      description: "Delete a skill categories record by its ID.",
      method: "DELETE" as const,
      url: "http://localhost:9000/api/skill-categories/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
       payload: {
        "id": "U2tpbGxDYXRlZ29yeTpTa2lsbENhdGVnb3J5OjEyMzQ1Njc4OTBhYmNkZWY="
      },
      body: {
          
      }
    },
    {
      id: "update-skill-categories",
      title: "Update Skills Categories record",
      description: "Update a skill categories record by its ID.",
      method: "PUT" as const,
      url: "http://localhost:9000/api/skill-categories/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "data": {
          "name": "Advanced Technical Skills"
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
        <h1 className="text-3xl font-bold mb-6">Skill Categories API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Skill Categories API allows you to manage and organize skill classifications in your system.
            It provides functionality for creating, updating, deleting, and organizing skill categories.
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
            <p className="mb-4">Use these queries to fetch information about skills categories in different formats and contexts.</p>
            
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
            <p className="mb-4">Use these mutations to create, update, delete, and manage skills categories.</p>
            
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
                  Use these REST API endpoints to interact with skill categories programmatically.
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

export default SkillCategories;
