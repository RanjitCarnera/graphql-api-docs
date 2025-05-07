
import React from 'react';
import DocsLayout from '@/components/DocsLayout';

const Tags = () => {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tags API</h1>
        
        <section className="mb-8">
          <p className="mb-6">
            The Tags API allows you to manage metadata tags for various resources across the system.
          </p>
        </section>
        
        <section className="docs-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="mb-6">
            Documentation for this section is currently under development. Check back soon for detailed
            information on querying and managing tags.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Tags;
