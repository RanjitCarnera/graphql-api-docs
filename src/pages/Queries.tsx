import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Queries = () => {
  const projectQueryExamples = {
    javascript: `// Fetching a specific project
const query = \`
  query GetProject($id: ID!) {
    Scenario {
      ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
        id
        project {
          id
          name
          startDate
          endDate
          skills {
            name
          }
          address {
            city
            country
          }
        }
      }
    }
  }
\`;

const variables = {
  id: "project-123"
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

query = '''
query GetProject($id: ID!) {
  Scenario {
    ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
      id
      project {
        id
        name
        startDate
        endDate
        skills {
          name
        }
        address {
          city
          country
        }
      }
    }
  }
}
'''

variables = {
  'id': 'project-123'
}

response = requests.post(
    'https://api.constructionintelligence.com/graphql',
    json={
        'query': query,
        'variables': variables
    },
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
)

print(response.json())`,
    ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI.parse('https://api.constructionintelligence.com/graphql')
request = Net::HTTP::Post.new(uri)
request['Content-Type'] = 'application/json'
request['Authorization'] = 'Bearer YOUR_API_KEY'

query = '
query GetProject($id: ID!) {
  Scenario {
    ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
      id
      project {
        id
        name
        startDate
        endDate
        skills {
          name
        }
        address {
          city
          country
        }
      }
    }
  }
}'

variables = {
  'id' => 'project-123'
}

request.body = JSON.generate({
  query: query,
  variables: variables
})

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
  http.request(request)
end

puts JSON.parse(response.body)`,
    go: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "https://api.constructionintelligence.com/graphql"
	
	type Variables struct {
		ID string \`json:"id"\`
	}
	
	type RequestBody struct {
		Query     string    \`json:"query"\`
		Variables Variables \`json:"variables"\`
	}
	
	query := \`
	query GetProject($id: ID!) {
	  Scenario {
		ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
		  id
		  project {
			id
			name
			startDate
			endDate
			skills {
			  name
			}
			address {
			  city
			  country
			}
		  }
		}
	  }
	}
	\`
	
	variables := Variables{
		ID: "project-123",
	}
	
	reqBody := RequestBody{
		Query:     query,
		Variables: variables,
	}
	
	requestJSON, _ := json.Marshal(reqBody)
	
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(requestJSON))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
}`,
    csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();
        
        var query = @"
        query GetProject($id: ID!) {
          Scenario {
            ProjectInScenario(projectId: $id, scenarioId: ""scenario-123"") {
              id
              project {
                id
                name
                startDate
                endDate
                skills {
                  name
                }
                address {
                  city
                  country
                }
              }
            }
          }
        }";
        
        var variables = new {
            id = "project-123"
        };
        
        var requestBody = new {
            query = query,
            variables = variables
        };
        
        var content = new StringContent(
            JsonConvert.SerializeObject(requestBody), 
            Encoding.UTF8, 
            "application/json");
            
        client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_KEY");
        
        var response = await client.PostAsync("https://api.constructionintelligence.com/graphql", content);
        var responseContent = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(responseContent);
    }
}`,
    java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

public class GraphQLQuery {
    public static void main(String[] args) throws Exception {
        String url = "https://api.constructionintelligence.com/graphql";
        String query = """
            query GetProject($id: ID!) {
              Scenario {
                ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
                  id
                  project {
                    id
                    name
                    startDate
                    endDate
                    skills {
                      name
                    }
                    address {
                      city
                      country
                    }
                  }
                }
              }
            }
            """;
        
        // Create variables map
        Map<String, Object> variables = new HashMap<>();
        variables.put("id", "project-123");
        
        // Create request body with query and variables
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", query);
        requestBody.put("variables", variables);
        
        // Convert to JSON
        String jsonBody = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(requestBody);
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer YOUR_API_KEY")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
    perl: `use LWP::UserAgent;
use JSON;
use Data::Dumper;

my $ua = LWP::UserAgent->new;

my $query = '
query GetProject($id: ID!) {
  Scenario {
    ProjectInScenario(projectId: $id, scenarioId: "scenario-123") {
      id
      project {
        id
        name
        startDate
        endDate
        skills {
          name
        }
        address {
          city
          country
        }
      }
    }
  }
}';

my $variables = {
    id => 'project-123'
};

my $req = HTTP::Request->new(POST => 'https://api.constructionintelligence.com/graphql');
$req->header('Content-Type' => 'application/json');
$req->header('Authorization' => 'Bearer YOUR_API_KEY');
$req->content(encode_json({
    query => $query,
    variables => $variables
}));

my $resp = $ua->request($req);

if ($resp->is_success) {
    my $data = decode_json($resp->decoded_content);
    print Dumper($data);
} else {
    print "HTTP POST error: ", $resp->status_line, "\n";
}`
  };
  
  const paginationExamples = {
    javascript: `// Pagination example
const query = \`
  query GetProjects($first: Int!) {
    Project {
      Projects(first: $first) {
        edges {
          node {
            id
            name
            startDate
            endDate
          }
        }
      }
    }
  }
\`;

const variables = {
  first: 10
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };
  
  const filteringExamples = {
    javascript: `// Filtering example
const query = \`
  query SearchProjects($filterByName: String, $alwaysIncludeIds: [ID!]) {
    Project {
      Projects(filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
        edges {
          node {
            id
            name
            startDate
            endDate
          }
        }
      }
    }
  }
\`;

const variables = {
  filterByName: "Construction",
  alwaysIncludeIds: ["project-1", "project-2"]
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Queries</h1>
        
        <section className="docs-section mb-10">
          <h2 className="text-2xl font-bold mb-4">Available Queries</h2>
          <p className="mb-6">
            Our GraphQL API provides the following top-level queries that you can use to fetch data:
          </p>
          
          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Project.Projects(first: Int, filterByName: String, alwaysIncludeIds: [ID!]): ProjectConnection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch a paginated list of projects with optional filtering.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project.ProjectStages(first: Int, excludeIds: [ID!], filterByName: String, alwaysIncludeIds: [ID!]): ProjectStageConnection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch a filtered list of project stages.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scenario.ProjectInScenario(projectId: ID!, scenarioId: ID!): ProjectInScenario</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch details about a project in a specific scenario.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Staff.Executives(first: Int, filterByName: String, alwaysIncludeIds: [ID!], scenarioId: ID): PersonConnection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch a paginated list of executives with optional filtering for a specific scenario.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dynamics.NotYetImportedProjectsFromDynamics: [DynamicsProject!]!</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch projects that have not yet been imported from Dynamics.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rand.NotYetImportedProjectsFromRand: [RandProject!]!</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fetch projects that have not yet been imported from Rand.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="docs-section mb-12">
          <h2 className="text-2xl font-bold mb-4">Executives Query Example</h2>
          <p className="mb-4">
            This example shows how to fetch executives using a fragment to reuse field selections:
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>executivesSelect_Query Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="code-block overflow-x-auto">
                <code>{`query executivesSelect_Query($filterByName: String, $alwaysIncludeIds: [ID!], $scenarioId: ID) {
  Staff {
    Executives(
      first: 20
      filterByName: $filterByName
      alwaysIncludeIds: $alwaysIncludeIds
      scenarioId: $scenarioId
    ) {
      edges {
        node {
          ...executivesSelect_PersonFragment
        }
      }
    }
  }
}`}</code>
              </pre>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = '/fragments#executivesSelect';
                  }}
                  className="flex items-center gap-1"
                >
                  <span>View Fragment Definition</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h4 className="font-semibold mb-2">Example Response:</h4>
            <pre className="font-code text-sm overflow-auto">
{`{
  "data": {
    "Staff": {
      "Executives": {
        "edges": [
          {
            "node": {
              "id": "person-123",
              "name": "Jane Smith"
            }
          },
          {
            "node": {
              "id": "person-456",
              "name": "John Doe"
            }
          }
        ]
      }
    }
  }
}`}
            </pre>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Fetching a Specific Project</h2>
          <p className="mb-4">
            This example shows how to fetch a specific project by its ID, including details such as start and end dates, skills, and address information.
          </p>
          
          <CodeExample
            title="Project Query"
            description="Fetch a project by ID with detailed information:"
            codeExamples={projectQueryExamples}
          />
          
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h4 className="font-semibold mb-2">Example Response:</h4>
            <pre className="font-code text-sm overflow-auto">
{`{
  "data": {
    "Scenario": {
      "ProjectInScenario": {
        "id": "project-in-scenario-123",
        "project": {
          "id": "project-123",
          "name": "Construction Intelligence Platform",
          "startDate": "2023-01-15",
          "endDate": "2023-12-31",
          "skills": [
            {
              "name": "Project Management"
            },
            {
              "name": "Construction Engineering"
            }
          ],
          "address": {
            "city": "San Francisco",
            "country": "USA"
          }
        }
      }
    }
  }
}`}
            </pre>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Pagination</h2>
          <p className="mb-4">
            Our API supports pagination for collections of projects, allowing you to request specific numbers of projects.
          </p>
          
          <CodeExample
            title="Paginated Projects Query"
            description="Fetch a limited number of projects:"
            codeExamples={paginationExamples}
          />
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Filtering</h2>
          <p className="mb-4">
            You can filter projects by name and explicitly include specific projects by ID.
          </p>
          
          <CodeExample
            title="Filtered Projects Query"
            description="Search for projects with specific criteria:"
            codeExamples={filteringExamples}
          />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Learn about data <a href="/mutations" className="text-blue-600 hover:underline">Mutations</a></li>
            <li>Explore the available <a href="/types" className="text-blue-600 hover:underline">Types</a></li>
            <li>See reusable <a href="/fragments" className="text-blue-600 hover:underline">Fragments</a></li>
            <li>Try queries in the <a href="/playground" className="text-blue-600 hover:underline">Playground</a></li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Queries;
