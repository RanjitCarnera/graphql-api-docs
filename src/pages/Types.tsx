
import React from 'react';
import DocsLayout from '@/components/DocsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Types = () => {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GraphQL Types</h1>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Core Types</h2>
          <p className="mb-6">
            Our GraphQL schema includes the following core types that represent the main entities in our API:
          </p>
          
          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>User</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]
  comments: [Comment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Post</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`type Post {
  id: ID!
  title: String!
  content: String!
  summary: String
  published: Boolean!
  author: User!
  comments: [Comment!]
  tags: [String!]
  category: String
  publishedAt: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`type Comment {
  id: ID!
  content: String!
  author: User!
  post: Post!
  createdAt: DateTime!
  updatedAt: DateTime!
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Input Types</h2>
          <p className="mb-6">
            These input types are used in mutations to create or update entities:
          </p>
          
          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>CreateUserInput</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`input CreateUserInput {
  name: String!
  email: String!
  password: String!
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>UpdateUserInput</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`input UpdateUserInput {
  name: String
  email: String
  password: String
}`}
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>CreatePostInput</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`input CreatePostInput {
  title: String!
  content: String!
  summary: String
  published: Boolean
  tags: [String!]
  category: String
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Filter Types</h2>
          <p className="mb-6">
            These filter types are used in queries to filter collections of entities:
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>PostFilter</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-code text-sm p-4 bg-gray-100 rounded-md">
{`input PostFilter {
  searchTerm: String
  category: String
  tags: [String!]
  authorId: ID
  published: Boolean
  publishedAfter: DateTime
  publishedBefore: DateTime
}`}
              </pre>
            </CardContent>
          </Card>
        </section>
        
        <section className="docs-section">
          <h2 className="text-2xl font-bold mb-4">Scalar Types</h2>
          <p className="mb-4">
            In addition to the standard GraphQL scalar types (String, Int, Float, Boolean, ID), our API includes the following custom scalars:
          </p>
          
          <ul className="list-disc list-inside mb-6">
            <li><strong>DateTime</strong> - An ISO-8601 formatted date-time string</li>
            <li><strong>Upload</strong> - Represents a file upload in a mutation</li>
            <li><strong>JSON</strong> - Represents arbitrary JSON data</li>
            <li><strong>URL</strong> - A valid URL string</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Complete Schema</h2>
          <p className="mb-4">
            You can download the complete schema definition or explore it interactively in the playground:
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="/playground" className="px-4 py-2 bg-docs-primary text-white rounded-md hover:bg-indigo-700">
              Explore in Playground
            </a>
            <a href="#" className="px-4 py-2 border border-docs-primary text-docs-primary rounded-md hover:bg-gray-50">
              Download Schema (GraphQL)
            </a>
            <a href="#" className="px-4 py-2 border border-docs-primary text-docs-primary rounded-md hover:bg-gray-50">
              Download Schema (JSON)
            </a>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Types;
