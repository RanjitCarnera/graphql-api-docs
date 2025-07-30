
import React, { useState } from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Examples = () => {
  const [selectedTab, setSelectedTab] = useState('basic');
  
  const basicExamples = {
    javascript: `// Basic query for fetching users
const query = \`
  query {
    users {
      id
      name
      email
    }
  }
\`;

fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log(data));`,
    python: `import requests

query = '''
query {
  users {
    id
    name
    email
  }
}
'''

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(
    'https://your-api.example/graphql',
    json={'query': query},
    headers=headers
)

print(response.json())`,
    php: `<?php
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer YOUR_API_KEY'
];

$query = '
query {
  users {
    id
    name
    email
  }
}';

$data = ['query' => $query];

$curl = curl_init('https://your-api.example/graphql');
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($curl);
curl_close($curl);

$result = json_decode($response, true);
print_r($result);`,
    c: `#include <stdio.h>
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
    
    const char *query = "query { users { id name email } }";
    char data[1024];
    sprintf(data, "{\\\"query\\\":\\\"%s\\\"}", query);

    curl = curl_easy_init();
    if(curl) {
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer YOUR_API_KEY");

        curl_easy_setopt(curl, CURLOPT_URL, "https://your-api.example/graphql");
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

  const authExamples = {
    javascript: `// Authentication with GraphQL
const mutation = \`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
\`;

const variables = {
  email: "user@example.com",
  password: "password123"
};

fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => {
  // Store token for future requests
  const token = data.data.login.token;
  localStorage.setItem('token', token);
  console.log('Logged in successfully:', data.data.login.user);
})
.catch(err => console.error('Login failed:', err));`,
    python: `import requests

# Authentication with GraphQL
mutation = '''
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
    }
  }
}
'''

variables = {
  'email': 'user@example.com',
  'password': 'password123'
}

response = requests.post(
    'https://your-api.example/graphql',
    json={
        'query': mutation,
        'variables': variables
    },
    headers={
        'Content-Type': 'application/json'
    }
)

data = response.json()
if 'data' in data and 'login' in data['data']:
    token = data['data']['login']['token']
    print('Logged in successfully:', data['data']['login']['user'])
    # Store token for future requests
else:
    print('Login failed:', data)
`
  };

  const uploadExamples = {
    javascript: `// File upload with GraphQL
// Note: This requires a GraphQL server that supports the multipart request specification

// First, create a FormData object
const operations = JSON.stringify({
  query: \`
    mutation UploadFile($file: Upload!) {
      uploadFile(file: $file) {
        url
        filename
        mimetype
        size
      }
    }
  \`,
  variables: {
    file: null // This will be replaced by the actual file
  }
});

// Create a map for the file variable
const map = JSON.stringify({
  "0": ["variables.file"]
});

// Get a file (e.g., from a file input)
const input = document.querySelector('input[type="file"]');
const file = input.files[0];

// Create a FormData object
const formData = new FormData();
formData.append('operations', operations);
formData.append('map', map);
formData.append('0', file);

// Send the request
fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
})
.then(res => res.json())
.then(data => console.log('File uploaded:', data))
.catch(err => console.error('Upload failed:', err));`,
    python: `import requests

# File upload with GraphQL
# Note: This requires a GraphQL server that supports the multipart request specification

query = '''
mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    url
    filename
    mimetype
    size
  }
}
'''

# Path to the file to upload
file_path = '/path/to/your/file.jpg'

# Create the operations object
operations = {
    'query': query,
    'variables': {
        'file': None  # This will be replaced by the actual file
    }
}

# Create the map
map_data = {
    '0': ['variables.file']
}

# Prepare the files object
files = {
    'operations': (None, json.dumps(operations), 'application/json'),
    'map': (None, json.dumps(map_data), 'application/json'),
    '0': ('filename.jpg', open(file_path, 'rb'), 'image/jpeg')
}

# Send the request
response = requests.post(
    'https://your-api.example/graphql',
    files=files,
    headers={
        'Authorization': 'Bearer YOUR_API_KEY'
    }
)

print(response.json())
`
  };

  const subscriptionExamples = {
    javascript: `// Using WebSocket for GraphQL subscriptions
import { Client, createClient } from 'graphql-ws';

// Create a WebSocket client
const client = createClient({
  url: 'wss://your-api.example/graphql',
  connectionParams: {
    authToken: 'YOUR_API_KEY',
  },
});

// Define the subscription
const subscription = {
  query: \`
    subscription OnNewMessage {
      newMessage {
        id
        text
        sender {
          id
          name
        }
        timestamp
      }
    }
  \`,
};

// Subscribe and handle events
const unsubscribe = client.subscribe(
  subscription,
  {
    next: (data) => {
      console.log('New message received:', data.data.newMessage);
      // Handle the new message (e.g., update UI)
    },
    error: (error) => {
      console.error('Subscription error:', error);
    },
    complete: () => {
      console.log('Subscription completed');
    },
  }
);

// To unsubscribe later
// unsubscribe();`,
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Code Examples</h1>
        
        <p className="mb-8 text-gray-600">
          This page provides common code examples to help you integrate with our GraphQL API in various programming languages.
        </p>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Queries</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="upload">File Uploads</TabsTrigger>
            <TabsTrigger value="subscription">Subscriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Basic Query Examples</h2>
              <p className="mb-6">
                These examples demonstrate how to make a simple query to fetch users from our GraphQL API.
              </p>
              
              <CodeExample
                title="Fetching Users"
                description="A simple query to retrieve users from the API:"
                codeExamples={basicExamples}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="auth">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Authentication Examples</h2>
              <p className="mb-6">
                These examples demonstrate how to authenticate with our GraphQL API.
              </p>
              
              <CodeExample
                title="User Authentication"
                description="How to log in and obtain an authentication token:"
                codeExamples={authExamples}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="upload">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">File Upload Examples</h2>
              <p className="mb-6">
                These examples demonstrate how to upload files using our GraphQL API.
              </p>
              
              <CodeExample
                title="Uploading Files"
                description="How to upload files using GraphQL mutations:"
                codeExamples={uploadExamples}
              />
              
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> File uploads require a GraphQL server that supports the multipart request specification.
                      Our API implements this specification according to the <a href="https://github.com/jaydenseric/graphql-multipart-request-spec" className="underline" target="_blank" rel="noopener noreferrer">graphql-multipart-request-spec</a>.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Subscription Examples</h2>
              <p className="mb-6">
                These examples demonstrate how to use GraphQL subscriptions for real-time updates.
              </p>
              
              <CodeExample
                title="Real-time Subscriptions"
                description="How to subscribe to real-time events:"
                codeExamples={subscriptionExamples}
              />
              
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Subscriptions use WebSockets for real-time communication. You'll need a client library that supports GraphQL subscriptions,
                      such as <a href="https://github.com/enisdenjo/graphql-ws" className="underline" target="_blank" rel="noopener noreferrer">graphql-ws</a> for JavaScript.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Client Libraries</h2>
          <p className="mb-4">
            While you can use plain HTTP requests to communicate with our GraphQL API, we recommend using dedicated GraphQL client libraries:
          </p>
          
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li><strong>JavaScript/TypeScript</strong>: <a href="https://www.apollographql.com/docs/react/" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">Apollo Client</a> or <a href="https://urql.dev/" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">URQL</a></li>
            <li><strong>Python</strong>: <a href="https://gql.readthedocs.io/" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">GQL</a> or <a href="https://github.com/graphql-python/graphene" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">Graphene</a></li>
            <li><strong>Ruby</strong>: <a href="https://graphql-ruby.org/" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">graphql-ruby</a></li>
            <li><strong>PHP</strong>: <a href="https://github.com/webonyx/graphql-php" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">webonyx/graphql-php</a></li>
            <li><strong>Go</strong>: <a href="https://github.com/machinebox/graphql" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">machinebox/graphql</a></li>
            <li><strong>Java</strong>: <a href="https://www.apollographql.com/docs/kotlin/" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">Apollo Android</a></li>
            <li><strong>C#</strong>: <a href="https://github.com/graphql-dotnet/graphql-client" className="text-docs-primary hover:underline" target="_blank" rel="noopener noreferrer">GraphQL.Client</a></li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Need More Examples?</h2>
          <p>
            Visit our <a href="/sdks" className="text-docs-primary hover:underline">SDKs & Libraries</a> page for more detailed examples and language-specific client libraries.
            If you need help with a specific integration, please contact our support team.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Examples;
