import React from 'react';

function Contact() {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-center">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <p className="text-lg text-gray-700">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.</p>
      <div className="mt-6">
        <a href="mailto:jorgegarro@protonmail.com" className="text-xl text-blue-600 hover:underline">
          jorgegarro@protonmail.com
        </a>
      </div>
    </div>
  );
}

export default Contact;