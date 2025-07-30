
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OperationCard from '@/components/graphql/OperationCard';
import operationsData from '@/data/accountSettingOperations.json';
import { useFragmentScroll } from '../lib/utils';
import RestApiCard from '@/components/RestApiCard';

const AccountSettings = () => {

  const [activeTab, setActiveTab] = React.useState("queries");
   const restApiEndpoints = [
    {
      id: "create-scenario",
      title: "Create Scenario",
      description: "Create a new scenario with the specified configuration.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/scenarios",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
        "name": "Demo rest apis",
        "projectsRef": [],
        "isMasterPlan": false
      }
    },
    {
      id: "list-scenarios",
      title: "Get all Scenarios list",
      description: "Retrieve a list of scenarios with optional filtering.",
      method: "POST" as const,
      url: "https://api.constructionintelligence.com/api/scenarios/list",
      headers: {
        "content-type": "application/json",
        "Authorization": " "
      },
      body: {
        "first": 20,
        "filterByName": "Test with sumi12"
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
        <h1 className="text-3xl font-bold mb-6">Account Settings API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Account Settings API allows you to manage global account configurations and preferences.
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
            <p className="mb-4">Use these queries to fetch information about account settings in different formats and contexts.</p>
            
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
            <p className="mb-4">Use these mutations to create, update, delete, and manage account settings.</p>
            
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
                These are GraphQL fragments used in account settings queries and mutations.
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
               <div className="max-w-4xl mx-auto"> 
                <h2 className="text-2xl font-bold mb-4">REST API</h2>
                <section className="docs-section mb-8">
                  <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                  <p className="mb-6">
                    Documentation for this section is currently under development. Check back soon for detailed
                    information on querying and managing tags.
                  </p>
                </section>
              </div>
            </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  );
};

export default AccountSettings;
