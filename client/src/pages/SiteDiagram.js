import React from 'react';

function SiteDiagram() {
  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Site Architecture</h1>
      <p className="mb-4">This website is built as a full-stack application using the MERN stack and follows the Model-View-Controller (MVC) design pattern. Here’s a breakdown of how it works:</p>
      
      <div className="space-y-4 text-left p-4 border rounded-lg bg-gray-50">
        <p><strong>1. Front-End (View):</strong> What you're seeing in your browser. It's built with <strong>React.js</strong> and styled with <strong>Tailwind CSS</strong>. It manages the user interface and handles user interactions. When you click on "Blog" or "Projects", React makes an API request to the back-end to fetch the necessary data.</p>
        
        <p><strong>2. Back-End (Controller):</strong> A server built with <strong>Node.js</strong> and the <strong>Express.js</strong> framework. It acts as the middleman. It receives API requests from the front-end, processes them, and communicates with the database.</p>
        
        <p><strong>3. Database (Model):</strong> A <strong>MongoDB</strong> database hosted on their Atlas cloud service. This is where all the content for the blog posts and projects is stored in a structured, JSON-like format. The back-end retrieves data from here and sends it to the front-end to be displayed.</p>
      </div>

      <div className="mt-6 font-mono text-sm p-4 bg-gray-800 text-white rounded-lg">
        <p>User Request Flow:</p>
        <p>Browser (React) → API Request → Server (Express) → Database Query (MongoDB) → Database Response → Server Logic → API Response → Browser (React UI Update)</p>
      </div>
    </div>
  );
}

export default SiteDiagram;