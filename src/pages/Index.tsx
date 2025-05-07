
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Play, FileText, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Project-focused example query
  const exampleQuery = {
    javascript: `// Using fetch
fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    query: \`
      query {
        Project {
          Projects(first: 20) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    \`
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `# Using the requests library
import requests

url = 'https://api.constructionintelligence.com/graphql'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
}
query = '''
query {
  Project {
    Projects(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
'''

response = requests.post(url, json={'query': query}, headers=headers)
print(response.json())`,
    php: `<?php
// Using cURL
$url = 'https://api.constructionintelligence.com/graphql';
$query = '
query {
  Project {
    Projects(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}';

$data = ['query' => $query];

$curl = curl_init($url);
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer YOUR_TOKEN'
    ],
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($curl);
curl_close($curl);

$result = json_decode($response, true);
print_r($result);`,
    ruby: `# Using the HTTParty gem
require 'httparty'

url = 'https://api.constructionintelligence.com/graphql'
query = '
query {
  Project {
    Projects(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}'

response = HTTParty.post(
  url,
  headers: {
    'Content-Type' => 'application/json',
    'Authorization' => 'Bearer YOUR_TOKEN'
  },
  body: { query: query }.to_json
)

puts response.parsed_response`,
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
	query := \`
	query {
		Project {
			Projects(first: 20) {
				edges {
					node {
						id
						name
					}
				}
			}
		}
	}
	\`

	requestBody, _ := json.Marshal(map[string]string{
		"query": query,
	})

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer YOUR_TOKEN")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
}`,
    csharp: `// Using HttpClient
using System;
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
        query {
          Project {
            Projects(first: 20) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }";
        
        var content = new StringContent(
            JsonConvert.SerializeObject(new { query }), 
            Encoding.UTF8, 
            "application/json");
            
        client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_TOKEN");
        
        var response = await client.PostAsync("https://api.constructionintelligence.com/graphql", content);
        var responseContent = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(responseContent);
    }
}`,
    java: `// Using HttpClient (Java 11+)
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class GraphQLDemo {
    public static void main(String[] args) throws Exception {
        String url = "https://api.constructionintelligence.com/graphql";
        String query = """
            query {
              Project {
                Projects(first: 20) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
            """;
        
        String requestBody = String.format("{\"query\":\"%s\"}", query.replace("\n", "\\n"));
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer YOUR_TOKEN")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
    perl: `# Using LWP::UserAgent
use strict;
use warnings;
use LWP::UserAgent;
use JSON;
use Data::Dumper;

my $ua = LWP::UserAgent->new;

my $query = '
query {
  Project {
    Projects(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}';

my $req = HTTP::Request->new(POST => 'https://api.constructionintelligence.com/graphql');
$req->header('Content-Type' => 'application/json');
$req->header('Authorization' => 'Bearer YOUR_TOKEN');
$req->content(encode_json({query => $query}));

my $resp = $ua->request($req);

if ($resp->is_success) {
    my $data = decode_json($resp->decoded_content);
    print Dumper($data);
} else {
    print "HTTP POST error: ", $resp->status_line, "\n";
}`,
    c: `// Using libcurl
#include <stdio.h>
#include <curl/curl.h>
#include <string.h>

size_t write_callback(char *ptr, size_t size, size_t nmemb, void *userdata) {
    size_t realsize = size * nmemb;
    printf("%.*s", (int)realsize, ptr);
    return realsize;
}

int main(void) {
    CURL *curl;
    CURLcode res;
    struct curl_slist *headers = NULL;
    
    const char *query = "query { Project { Projects(first: 20) { edges { node { id name } } } } }";
    char data[1024];
    sprintf(data, "{\"query\":\"%s\"}", query);

    curl = curl_easy_init();
    if(curl) {
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer YOUR_TOKEN");

        curl_easy_setopt(curl, CURLOPT_URL, "https://api.constructionintelligence.com/graphql");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        
        res = curl_easy_perform(curl);
        
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    return 0;
}`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">GraphQL API Documentation</h1>
          <p className="text-xl text-gray-600 mb-6">
            Welcome to the documentation for our GraphQL API. This guide will help you understand how to integrate with our API using any programming language or framework.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/getting-started">
                <Play className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/playground">
                <FileText className="mr-2 h-4 w-4" />
                Try the API
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Single API Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our GraphQL API is accessible through a single endpoint that handles all requests:</p>
              <code className="mt-2 block bg-gray-100 p-3 rounded-md font-code" style={{overflow: 'auto'}}>
                https://api.constructionintelligence.com/graphql
              </code>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Language Agnostic</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The API can be used with any programming language that can make HTTP requests, including JavaScript, Python, PHP, Ruby, Go, C#, Java, Perl, and C.</p>
            </CardContent>
          </Card>
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Quick Example</h2>
          <p className="mb-4">
            Here's a simple example of how to query our API in different programming languages:
          </p>
          
          <CodeExample
            title="Fetching Projects"
            description="This example shows how to fetch a list of projects from our API."
            codeExamples={exampleQuery}
          />
        </section>

        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema Introspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Explore our API schema using GraphQL's built-in introspection capabilities.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Strongly Typed</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Benefit from GraphQL's strong typing system that provides clear contracts and validation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Efficient Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Request only the data you need, reducing bandwidth and improving performance.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/getting-started">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="mr-2 h-5 w-5" />
                    Getting Started Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Learn the basics of using our GraphQL API, including authentication and making your first query.</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/playground">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Interactive Playground
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Experiment with our API in an interactive environment where you can build and test queries.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Index;
