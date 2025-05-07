import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Github, Package, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SDKs = () => {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SDKs & Libraries</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Official Client Libraries</h2>
          <p className="mb-6">
            We provide official client libraries for popular programming languages to help you integrate with our GraphQL API quickly and easily.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  JavaScript / TypeScript
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our official JavaScript SDK with TypeScript support for browser and Node.js environments.</p>
                <div className="text-sm bg-gray-100 p-3 rounded-md font-code mb-4">
                  npm install @your-api/js-sdk
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Full TypeScript support</li>
                  <li>Automatic authentication handling</li>
                  <li>Built-in query caching</li>
                  <li>React hooks available</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Github size={16} />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={16} />
                  Documentation
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  Python
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our official Python SDK for server-side integration.</p>
                <div className="text-sm bg-gray-100 p-3 rounded-md font-code mb-4">
                  pip install your-api-python
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Python 3.6+ support</li>
                  <li>Async/await support</li>
                  <li>Type hints for IDE integration</li>
                  <li>Automatic rate limiting</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Github size={16} />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={16} />
                  Documentation
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  PHP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our official PHP SDK for web applications.</p>
                <div className="text-sm bg-gray-100 p-3 rounded-md font-code mb-4">
                  composer require your-api/php-sdk
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>PHP 7.4+ and 8.0+ support</li>
                  <li>PSR-18 HTTP client compatibility</li>
                  <li>Laravel integration available</li>
                  <li>Symfony integration available</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Github size={16} />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={16} />
                  Documentation
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  Ruby
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our official Ruby SDK for Rails and other Ruby applications.</p>
                <div className="text-sm bg-gray-100 p-3 rounded-md font-code mb-4">
                  gem install your_api_ruby
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ruby 2.7+ support</li>
                  <li>Rails integration</li>
                  <li>Automatic type casting</li>
                  <li>Subscription support</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Github size={16} />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={16} />
                  Documentation
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-2">More Languages Coming Soon</h3>
            <p className="text-gray-600">
              We're actively working on SDKs for Go, C#, Java, and more. 
              <br />In the meantime, you can use our GraphQL API with standard HTTP clients.
            </p>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Community Libraries</h2>
          <p className="mb-6">
            Our community has developed several useful libraries that integrate with our GraphQL API:
          </p>
          
          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>GraphQL Code Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Generate type-safe code for your GraphQL operations using the GraphQL Code Generator with our API schema.
                </p>
              </CardContent>
              <CardFooter>
                <a href="https://the-guild.dev/graphql/codegen" className="text-docs-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  Learn more <ArrowRight size={16} />
                </a>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>GraphQL Playground</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A standalone desktop application for exploring and testing GraphQL APIs, including ours.
                </p>
              </CardContent>
              <CardFooter>
                <a href="https://github.com/graphql/graphql-playground" className="text-docs-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  Learn more <ArrowRight size={16} />
                </a>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Apollo DevTools</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Browser extension for debugging Apollo Client applications that use our GraphQL API.
                </p>
              </CardContent>
              <CardFooter>
                <a href="https://www.apollographql.com/docs/react/development-testing/developer-tooling/" className="text-docs-primary hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  Learn more <ArrowRight size={16} />
                </a>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Schema Files</h2>
          <p className="mb-6">
            You can download our GraphQL schema in various formats to generate code, set up tooling, or explore offline:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download size={16} />
              Download schema.graphql
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download size={16} />
              Download schema.json
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download size={16} />
              Download TypeScript types
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Download size={16} />
              Download SDL (Schema Definition Language)
            </Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Contributing</h2>
          <p className="mb-4">
            We welcome contributions to our SDKs and tools. If you're interested in contributing or have built a library that integrates with our API,
            please check out our <a href="#" className="text-docs-primary hover:underline">contribution guidelines</a> or <a href="#" className="text-docs-primary hover:underline">contact us</a>.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default SDKs;
