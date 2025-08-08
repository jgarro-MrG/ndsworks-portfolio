import React from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

function SiteDiagram() {
    return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Site Architecture</h1>
      <p className="mb-4">This website is a full-stack application built with the PERN stack (PostgreSQL, Express, React, Node.js) and deployed on Vercel's serverless platform. It follows the Model-View-Controller (MVC) design pattern. Here’s a breakdown of the architecture:</p>

      <div className="space-y-4 text-left p-4 border rounded-lg bg-gray-50">
        <p><strong>1. Front-End (View):</strong> What you're seeing in your browser. It's a <strong>React.js</strong> application, styled with <strong>Tailwind CSS</strong>, and hosted on <strong>Vercel's</strong> global Edge Network. This ensures fast delivery of the user interface. When you click on "Blog" or "Projects", React makes an API request to the serverless back-end to fetch the necessary data.</p>

        <p><strong>2. Back-End (Controller & Serverless Functions):</strong> The back-end logic is built with <strong>Node.js</strong> and the <strong>Express.js</strong> framework. It's deployed on <strong>Vercel</strong> as Serverless Functions. These functions act as the middleman: they receive API requests from the front-end, process them, and communicate with the database. This serverless architecture allows the back-end to scale automatically with demand.</p>

        <p><strong>3. Database (Model):</strong> A <strong>PostgreSQL</strong> database. This is where all the content for the blog posts and projects is stored. The back-end uses the <strong>Sequelize</strong> ORM to interact with the database, retrieve data, and send it to the front-end to be displayed.</p>
      </div>

      <ArchitectureDiagram />
    </div>
  );

}

export default SiteDiagram;