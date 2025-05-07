
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Mutations = () => {
  const createProjectExample = {
    javascript: `// Creating a project
const mutation = \`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        name
        startDate
        endDate
      }
    }
  }
\`;

const variables = {
  input: {
    name: "New Construction Project",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    address: {
      lineOne: "123 Main St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      postalCode: "94105"
    }
  }
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

mutation = '''
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        name
        startDate
        endDate
      }
    }
  }
'''

variables = {
  'input': {
    'name': 'New Construction Project',
    'startDate': '2025-01-01',
    'endDate': '2025-12-31',
    'address': {
      'lineOne': '123 Main St',
      'city': 'San Francisco',
      'state': 'CA',
      'country': 'USA',
      'postalCode': '94105'
    }
  }
}

response = requests.post(
    'https://api.constructionintelligence.com/graphql',
    json={
        'query': mutation,
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

mutation = '
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      id
      name
      startDate
      endDate
    }
  }
}'

variables = {
  'input' => {
    'name' => 'New Construction Project',
    'startDate' => '2025-01-01',
    'endDate' => '2025-12-31',
    'address' => {
      'lineOne' => '123 Main St',
      'city' => 'San Francisco',
      'state' => 'CA',
      'country' => 'USA',
      'postalCode' => '94105'
    }
  }
}

request.body = JSON.generate({
  query: mutation,
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
	
	type Address struct {
		LineOne    string \`json:"lineOne"\`
		City       string \`json:"city"\`
		State      string \`json:"state"\`
		Country    string \`json:"country"\`
		PostalCode string \`json:"postalCode"\`
	}
	
	type ProjectInput struct {
		Name      string  \`json:"name"\`
		StartDate string  \`json:"startDate"\`
		EndDate   string  \`json:"endDate"\`
		Address   Address \`json:"address"\`
	}
	
	type Variables struct {
		Input ProjectInput \`json:"input"\`
	}
	
	type RequestBody struct {
		Query     string    \`json:"query"\`
		Variables Variables \`json:"variables"\`
	}
	
	mutation := \`
	mutation CreateProject($input: CreateProjectInput!) {
	  createProject(input: $input) {
		project {
		  id
		  name
		  startDate
		  endDate
		}
	  }
	}
	\`
	
	variables := Variables{
		Input: ProjectInput{
			Name:      "New Construction Project",
			StartDate: "2025-01-01",
			EndDate:   "2025-12-31",
			Address: Address{
				LineOne:    "123 Main St",
				City:       "San Francisco",
				State:      "CA",
				Country:    "USA",
				PostalCode: "94105",
			},
		},
	}
	
	reqBody := RequestBody{
		Query:     mutation,
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
        
        var mutation = @"
        mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
            project {
              id
              name
              startDate
              endDate
            }
          }
        }";
        
        var variables = new {
            input = new {
                name = "New Construction Project",
                startDate = "2025-01-01",
                endDate = "2025-12-31",
                address = new {
                    lineOne = "123 Main St",
                    city = "San Francisco",
                    state = "CA",
                    country = "USA",
                    postalCode = "94105"
                }
            }
        };
        
        var requestBody = new {
            query = mutation,
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

public class CreateProjectMutation {
    public static void main(String[] args) throws Exception {
        String url = "https://api.constructionintelligence.com/graphql";
        String mutation = """
            mutation CreateProject($input: CreateProjectInput!) {
              createProject(input: $input) {
                project {
                  id
                  name
                  startDate
                  endDate
                }
              }
            }
            """;
        
        // Create address map
        Map<String, Object> addressMap = new HashMap<>();
        addressMap.put("lineOne", "123 Main St");
        addressMap.put("city", "San Francisco");
        addressMap.put("state", "CA");
        addressMap.put("country", "USA");
        addressMap.put("postalCode", "94105");
        
        // Create input map
        Map<String, Object> inputMap = new HashMap<>();
        inputMap.put("name", "New Construction Project");
        inputMap.put("startDate", "2025-01-01");
        inputMap.put("endDate", "2025-12-31");
        inputMap.put("address", addressMap);
        
        // Create variables map
        Map<String, Object> variables = new HashMap<>();
        variables.put("input", inputMap);
        
        // Create request body with query and variables
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", mutation);
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

my $mutation = '
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      id
      name
      startDate
      endDate
    }
  }
}';

my $variables = {
    input => {
        name => 'New Construction Project',
        startDate => '2025-01-01',
        endDate => '2025-12-31',
        address => {
            lineOne => '123 Main St',
            city => 'San Francisco',
            state => 'CA',
            country => 'USA',
            postalCode => '94105'
        }
    }
};

my $req = HTTP::Request->new(POST => 'https://api.constructionintelligence.com/graphql');
$req->header('Content-Type' => 'application/json');
$req->header('Authorization' => 'Bearer YOUR_API_KEY');
$req->content(encode_json({
    query => $mutation,
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

  const updateProjectExample = {
    javascript: `// Updating a project
const mutation = \`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      startDate
      endDate
      address {
        city
        country
      }
    }
  }
\`;

const variables = {
  id: "project-123",
  input: {
    name: "Updated Project Name",
    endDate: "2026-06-30",
    address: {
      city: "Los Angeles",
      country: "USA"
    }
  }
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  const importProjectExample = {
    javascript: `// Importing a project from external source
const mutation = \`
  mutation ImportProjectFromDynamics($input: ImportProjectInput!) {
    importProjectFromDynamics(input: $input) {
      project {
        id
        name
        startDate
        endDate
      }
    }
  }
\`;

const variables = {
  input: {
    dynamicsProjectId: "dynamics-123",
    scenarioId: "scenario-456"
  }
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  const assignPersonToAssignmentExample = {
    javascript: `// Assign a person to an assignment
const mutation = \`
  mutation AssignmentCard_AssignMutation($input: FillAssignmentInput!) {
    Scenario {
      fillAssignment(input: $input) {
        update {
          project {
            id
            ...projectCard_ProjectFragment
          }
        }
      }
    }
  }
\`;

const variables = {
  input: {
    assignmentId: "assignment-123",
    personId: "person-456",
    clientMutationId: "client-mutation-1"
  }
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mutations</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Introduction to Mutations</h2>
          <p className="mb-6">
            In GraphQL, mutations are used to modify server-side data. They allow you to create, update, and import projects and other resources. 
            Our API provides various mutations for working with projects and related data.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> All mutations that modify data require authentication. Make sure to include your API key in the Authorization header.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Creating a Project</h2>
          <p className="mb-4">
            This mutation creates a new project with the specified details.
          </p>
          
          <CodeExample
            title="Create Project Mutation"
            description="Register a new project:"
            codeExamples={createProjectExample}
          />
          
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h4 className="font-semibold mb-2">Example Response:</h4>
            <pre className="font-code text-sm overflow-auto text-left">
{`{
  "data": {
    "createProject": {
      "project": {
        "id": "project-789",
        "name": "New Construction Project",
        "startDate": "2025-01-01",
        "endDate": "2025-12-31"
      }
    }
  }
}`}
            </pre>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Updating a Project</h2>
          <p className="mb-4">
            This mutation updates an existing project with new data.
          </p>
          
          <CodeExample
            title="Update Project Mutation"
            description="Update an existing project:"
            codeExamples={updateProjectExample}
          />
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Importing a Project</h2>
          <p className="mb-4">
            This mutation imports a project from an external system like Dynamics.
          </p>
          
          <CodeExample
            title="Import Project Mutation"
            description="Import a project from Dynamics:"
            codeExamples={importProjectExample}
          />
          
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Project import operations may take some time to complete as they synchronize data between systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Assignment Mutations</h2>
          <p className="mb-4">
            These mutations allow you to manage assignments within scenarios.
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Assign Person to Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Assign a person to an assignment in a scenario.</p>
              <pre className="code-block text-left">
{`mutation AssignmentCard_AssignMutation($input: FillAssignmentInput!) {
  Scenario {
    fillAssignment(input: $input) {
      update {
        project {
          id
          ...projectCard_ProjectFragment
        }
      }
    }
  }
}`}
              </pre>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = '/fragments#projectCard';
                  }}
                  className="flex items-center gap-1"
                >
                  <span>View Fragment Definition</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4">
                <CodeExample
                  title="Example Usage"
                  description="Assign a person to an existing assignment:"
                  codeExamples={assignPersonToAssignmentExample}
                />
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Input Validation</h2>
          <p className="mb-6">
            All mutations perform validation on the input data. If validation fails, the API will return an error response with details about what went wrong.
          </p>
          
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="font-semibold mb-2">Example Error Response:</h4>
            <pre className="font-code text-sm overflow-auto text-left">
{`{
  "errors": [
    {
      "message": "End date must be after start date",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["createProject"],
      "extensions": {
        "code": "VALIDATION_ERROR",
        "field": "endDate"
      }
    }
  ],
  "data": null
}`}
            </pre>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Learn about <a href="/queries" className="text-blue-600 hover:underline">Queries</a></li>
            <li>Explore the available <a href="/types" className="text-blue-600 hover:underline">Types</a></li>
            <li>Understand <a href="/auth" className="text-blue-600 hover:underline">Authentication</a></li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Mutations;
