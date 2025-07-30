
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CORS = () => {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">CORS & Security</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">CORS Configuration</h2>
          <p className="mb-6">
            Our GraphQL API supports Cross-Origin Resource Sharing (CORS), allowing you to make requests from browsers on different domains.
            This is important for web applications that need to call our API directly from the client side.
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Allowed Origins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">By default, our API allows requests from these origins:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>https://*.your-application.com</li>
                <li>http://localhost:*</li>
              </ul>
              <p className="mt-4">
                If you need to add additional origins, you can do so in your account settings.
              </p>
            </CardContent>
          </Card>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important:</strong> For security reasons, we recommend implementing authentication server-side when possible,
                  rather than making API calls directly from client-side JavaScript.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Security Best Practices</h2>
          <p className="mb-4">
            When integrating with our GraphQL API, please follow these security best practices:
          </p>
          
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Protect Your API Keys</h3>
              <p className="text-gray-600">
                Never expose your API keys in client-side code or public repositories. For browser applications,
                use a backend proxy to make authenticated requests to our API.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Validate Input</h3>
              <p className="text-gray-600">
                Always validate user input before sending it to our API, especially for mutations that modify data.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Implement Rate Limiting</h3>
              <p className="text-gray-600">
                Our API has rate limiting to protect against abuse. Implement retry logic with exponential backoff
                for handling rate limit errors.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Use HTTPS</h3>
              <p className="text-gray-600">
                Always use HTTPS when making requests to our API to ensure that data is encrypted in transit.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Secure Storage of Tokens</h3>
              <p className="text-gray-600">
                In web applications, store authentication tokens securely. For browsers, use HTTPOnly cookies
                or securely managed localStorage/sessionStorage.
              </p>
            </div>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Rate Limiting</h2>
          <p className="mb-4">
            To ensure fair usage and protect our infrastructure, we implement rate limiting on all API endpoints:
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rate Limit Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our API returns the following headers with each response:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><code className="font-code">X-RateLimit-Limit</code>: Maximum requests per time window</li>
                <li><code className="font-code">X-RateLimit-Remaining</code>: Remaining requests in the current window</li>
                <li><code className="font-code">X-RateLimit-Reset</code>: Timestamp when the limit resets</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-gray-100 rounded-md mb-6">
            <h4 className="font-semibold mb-2">Rate Limit by Plan</h4>
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Plan</th>
                  <th className="text-left py-2">Limit</th>
                  <th className="text-left py-2">Time Window</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Free</td>
                  <td className="py-2">60 requests</td>
                  <td className="py-2">per minute</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Basic</td>
                  <td className="py-2">300 requests</td>
                  <td className="py-2">per minute</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Pro</td>
                  <td className="py-2">1,000 requests</td>
                  <td className="py-2">per minute</td>
                </tr>
                <tr>
                  <td className="py-2">Enterprise</td>
                  <td className="py-2">Custom</td>
                  <td className="py-2">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
          <p className="mb-4">
            When rate limits are exceeded or other security issues occur, our API returns appropriate error responses:
          </p>
          
          <div className="p-4 bg-gray-100 rounded-md mb-6 font-code text-sm">
<pre>{`// Rate limit exceeded
{
  "errors": [
    {
      "message": "Rate limit exceeded. Try again in 30 seconds.",
      "extensions": {
        "code": "RATE_LIMITED",
        "retryAfter": 30
      }
    }
  ]
}

// Invalid API key
{
  "errors": [
    {
      "message": "Invalid API key",
      "extensions": {
        "code": "UNAUTHORIZED"
      }
    }
  ]
}

// CORS error
{
  "errors": [
    {
      "message": "Origin not allowed",
      "extensions": {
        "code": "CORS_ERROR"
      }
    }
  ]
}`}</pre>
          </div>
          
          <p>
            For more information on error handling, please see our <a href="/getting-started" className="text-docs-primary hover:underline">Getting Started Guide</a>.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default CORS;
