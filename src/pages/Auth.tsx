
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import CodeExample from '@/components/CodeExample';

const Auth = () => {
  const loginExample = {
    javascript: `// Logging in a user
const mutation = \`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
\`;

const variables = {
  email: "user@example.com",
  password: "yourpassword"
};

fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: mutation,
    variables
  })
})
.then(res => res.json())
.then(data => {
  // Store the token for future authenticated requests
  if (data.data && data.data.login && data.data.login.token) {
    localStorage.setItem('authToken', data.data.login.token);
  }
  console.log(data);
});`,
    python: `import requests

mutation = '''
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}
'''

variables = {
  'email': 'user@example.com',
  'password': 'yourpassword'
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
print(data)

# Store the token for future authenticated requests
if 'data' in data and 'login' in data['data'] and 'token' in data['data']['login']:
    token = data['data']['login']['token']
    # Use this token in subsequent requests`
  };

  const authenticatedRequestExample = {
    javascript: `// Making an authenticated request
const query = \`
  query GetMyProfile {
    me {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

// Get the token from storage
const token = localStorage.getItem('authToken');

fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({
    query
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  const apiKeyExample = {
    javascript: `// Using API Key authentication
const query = \`
  query GetAnalytics {
    analytics {
      totalUsers
      totalPosts
      activeUsers
      postsByDay {
        date
        count
      }
    }
  }
\`;

fetch('https://your-api.example/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  },
  body: JSON.stringify({
    query
  })
})
.then(res => res.json())
.then(data => console.log(data));`
  };

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Authentication</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Authentication Methods</h2>
          <p className="mb-6">
            Our GraphQL API supports multiple authentication methods to secure your requests:
          </p>
          
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li><strong>JWT Authentication</strong> - Token-based authentication using JSON Web Tokens</li>
            <li><strong>API Key Authentication</strong> - For service-to-service communication</li>
            <li><strong>OAuth 2.0</strong> - For third-party application integration</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Most API endpoints require authentication. Unauthenticated requests will return an error with a 401 status code.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">User Authentication (JWT)</h2>
          <p className="mb-4">
            To authenticate a user, you need to call the <code>login</code> mutation with the user's credentials.
            This will return a JWT token that you can use for subsequent requests.
          </p>
          
          <CodeExample
            title="User Login"
            description="Authenticate a user and retrieve a JWT token:"
            codeExamples={loginExample}
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Making Authenticated Requests</h3>
            <p className="mb-4">
              Once you have a token, include it in the <code>Authorization</code> header of your requests:
            </p>
            
            <CodeExample
              title="Authenticated Request"
              description="Use the JWT token to make authenticated requests:"
              codeExamples={authenticatedRequestExample}
            />
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">API Key Authentication</h2>
          <p className="mb-4">
            For service-to-service communication, you can use API key authentication.
            API keys can be generated in your account dashboard.
          </p>
          
          <CodeExample
            title="API Key Authentication"
            description="Use an API key to authenticate your request:"
            codeExamples={apiKeyExample}
          />
          
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Security Warning:</strong> Keep your API keys secure and never expose them in client-side code or public repositories.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Token Expiration and Refresh</h2>
          <p className="mb-4">
            JWT tokens have a limited lifetime (typically 24 hours). When a token expires, you need to refresh it using the <code>refreshToken</code> mutation:
          </p>
          
          <pre className="font-code text-sm p-4 bg-gray-100 rounded-md mb-6">
{`mutation RefreshToken {
  refreshToken {
    token
    expiresAt
  }
}`}
          </pre>
          
          <p className="text-gray-600">
            The refresh token endpoint uses a secure HTTP-only cookie that is automatically included in your request when you authenticate.
            This helps to maintain security while providing a seamless user experience.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><a href="/getting-started" className="text-docs-primary hover:underline">Getting Started Guide</a></li>
            <li><a href="/examples" className="text-docs-primary hover:underline">Code Examples</a></li>
            <li><a href="/cors" className="text-docs-primary hover:underline">CORS & Security</a></li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Auth;
