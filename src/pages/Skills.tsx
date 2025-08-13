
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/skillsOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const Skills = () => {
    const [activeTab, setActiveTab] = React.useState("queries");
     const restApiEndpoints = [
    {
      id: "create-skills",
      title: "Create Skills",
      description: "Create a new skills with the specified configuration.",
      method: "POST" as const,
      url: "http://localhost:9000/api/skills",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "data": {
            "skillCategoryId": "U2tpbGxDYXRlZ29yeTpTa2lsbENhdGVnb3J5OjEyMzQ1Njc4OTBhYmNkZWY=",
            "name": "Project Management",
            "description": "Ability to manage complex projects effectively",
            "dimension": {
              "kind": "numerical",
              "dimensionCount": 5,
              "dimensionExplanations": [
                "Beginner - Basic project coordination",
                "Intermediate - Team leadership",
                "Advanced - Complex project management",
                "Expert - Strategic project planning",
                "Master - Enterprise-level project governance"
              ]
            }
          }
        }
    },
    {
      id: "list-skills",
      title: "Get all Skills list",
      description: "Retrieve a list of skills with optional filtering.",
      method: "POST" as const,
      url: "http://localhost:9000/api/skills/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
          "first": 20,
          "filterByName": null,
          "filterBySkillCategoryRef": null
      }
    },
    {
      id: "delete-skills",
      title: "Delete Skills record",
      description: "Delete a skill record by its ID.",
      method: "DELETE" as const,
      url: "http://localhost:9000/api/skills/id",
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
      id: "update-skills",
      title: "Update Skills record",
      description: "Update a skill record by its ID.",
      method: "PUT" as const,
      url: "http://localhost:9000/api/skills/id",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      payload: {
        "id": "UHJvamVjdDphYmMtZGVmLTQ1N2ctODllZi0xMjM0NTY3ODkwYWJ"
      },
      body: {
        "data": {
          "skillCategoryId": "U2tpbGxDYXRlZ29yeTpTa2lsbENhdGVnb3J5OjEyMzQ1Njc4OTBhYmNkZWY=",
          "name": "Advanced Project Management",
          "description": "Expert-level project management capabilities",
          "dimension": {
            "kind": "numerical",
            "dimensionCount": 7,
            "dimensionExplanations": [
              "Novice - Basic understanding",
              "Beginner - Simple project tasks",
              "Intermediate - Team coordination",
              "Advanced - Complex project leadership",
              "Expert - Strategic project management",
              "Master - Enterprise project governance",
              "Grand Master - Industry thought leadership"
            ]
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
        <h1 className="text-3xl font-bold mb-6">Skills API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Skills API allows you to manage and query individual skills in your system.
            It provides functionality for retrieving skills with filtering and pagination support.
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
            <p className="mb-4">Use these queries to fetch information about skills in different formats and contexts.</p>
            
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
            <p className="mb-4">Use these mutations to create, update, delete, and manage skills.</p>
            
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
                Use these REST API endpoints to interact with skills programmatically.
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

export default Skills;
