
import React from 'react';

const RelatedResources: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>View all available <a href="/fragments#peopleTableList" className="text-blue-600 hover:underline">People Fragments</a></li>
        <li>Learn about projects through the <a href="/projects" className="text-blue-600 hover:underline">Projects API</a></li>
        <li>Explore the <a href="/queries" className="text-blue-600 hover:underline">Queries</a> documentation</li>
        <li>Try these queries in the <a href="/playground" className="text-blue-600 hover:underline">Playground</a></li>
      </ul>
    </section>
  );
};

export default RelatedResources;
