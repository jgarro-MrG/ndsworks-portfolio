# ndsworks-portfolio: Technical Manual

This document provides a comprehensive technical overview of the `ndsworks-portfolio` application, a full-stack personal portfolio website for Jorge Garro. The site is designed to showcase professional experience, projects, and a personal blog, all served through a modern, serverless architecture.

## Technology Stack

The application is built with the following technologies:

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Deployment**: Vercel (Edge Network for frontend, Serverless Functions for backend)

## Application Architecture

The application is built on the **PERN (PostgreSQL, Express, React, Node.js)** stack and follows the Model-View-Controller (MVC) design pattern. It is deployed on Vercel's serverless platform.

### 1. Frontend (View)

The user interface is a **React.js** single-page application, styled with **Tailwind CSS**. It is hosted on **Vercel's global Edge Network**, which ensures fast delivery of static assets to users worldwide. The frontend is responsible for rendering the UI and making API requests to the backend to fetch dynamic content like blog posts and resume data.

### 2. Backend (Controller)

The backend logic is built with **Node.js** and the **Express.js** framework. It is deployed on **Vercel as Serverless Functions**. These functions act as the API layer, receiving requests from the frontend, processing them, and communicating with the database. This serverless architecture allows the backend to scale automatically with demand.

### 3. Database (Model)

A **PostgreSQL** database serves as the data layer. It stores the content for the blog posts and the structured resume data (experience, education, skills). The backend uses the **Sequelize** ORM to define models and interact with the database in a structured way.

### 4. GitHub Integration

The "Projects" page does not use the local database. Instead, it fetches project information directly from the **GitHub API** in real-time, providing an always-up-to-date showcase of public repositories.

## Project Structure

- `/api`: Contains the serverless function handlers for the backend API. Each file corresponds to an API endpoint (e.g., `api/posts.js`).
- `/client`: The React frontend application, created with Create React App.
- `/lib`: Shared libraries for the backend, including the database connection (`db.js`) and Sequelize models (`/models`).
- `/scripts`: Node.js scripts for database management and content administration.

## Setup and Installation

Follow these steps to set up the project for local development.

### 1. Prerequisites

- Node.js and npm
- Access to a PostgreSQL database

### 2. Clone and Install

```bash
git clone <repository_url>
cd ndsworks-portfolio
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root. This file is required to connect to the database and the GitHub API.

```env
# .env

# Connection string for your PostgreSQL database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# GitHub Personal Access Token for fetching projects
# Required to avoid API rate limits.
# Generate one at: https://github.com/settings/tokens/new?scopes=public_repo
GITHUB_TOKEN="your_github_personal_access_token"
```

## Database and Content Management

The following scripts are used to manage the database schema and content.

### 1. Synchronizing the Database Schema

The `sync-db.js` script creates the database tables based on your Sequelize models. It is non-destructive and will only create tables if they don't already exist.

**Usage:**
```bash
node scripts/sync-db.js
```

### 2. Seeding Initial Data

The `seed.js` script populates the database with the initial data found in the script file. This includes your core resume information and initial blog posts. It is safe to run this script multiple times; it will not create duplicate posts and will update your resume information to match the file.

**Usage:**
```bash
node scripts/seed.js
```

### 3. Adding a New Blog Post

To add a new blog post, use the `add-post.js` script.

1.  Open `scripts/add-post.js`.
2.  Modify the `newPost` object with your new content.
3.  Run the script from your terminal:

```bash
node scripts/add-post.js
```

### 4. Updating the Resume

Your resume content is managed directly within the `scripts/seed.js` file in the `resumeData` object. To update your resume:

1.  Modify the `resumeData` object in `scripts/seed.js`.
2.  Re-run the seed script to apply the changes to the database.

```bash
node scripts/seed.js
```

### 5. Managing Projects

Projects are managed by editing the `api/projects.js` file.

- **To add or remove a project:** Modify the `REPO_WHITELIST` array with the exact names of the GitHub repositories you want to display.
- **To change a project's image:** Add the image file to `client/public/img/projects/` and update the `REPO_IMAGES` map in `api/projects.js`.

## Running the Application Locally

This application is designed for the Vercel platform. The recommended way to run it locally is with the Vercel CLI, which accurately simulates the serverless environment.

1.  **Install the Vercel CLI:**
    ```bash
    npm install -g vercel
    ```
2.  **Run the development server:**
    ```bash
    vercel dev
    ```

lo