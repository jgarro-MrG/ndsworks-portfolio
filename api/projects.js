const GITHUB_USERNAME = 'jgarro-MrG';
// Define the specific repositories you want to showcase.
// The names must match your repository names on GitHub exactly.
const REPO_WHITELIST = [
  'ndsworks-portfolio',
  'eloquent-javascript'
];

// Map repository names to their image URLs.
// Images should be placed in the `client/public/img/projects/` directory.
const REPO_IMAGES = {
  'ndsworks-portfolio': '/img/projects/ndsworks-portfolio.png',
  'eloquent-javascript': '/img/projects/eloquent-javascript.png'

};

// A default placeholder image for projects without a specific image.
const DEFAULT_PROJECT_IMAGE = '/img/projects/pankaj-patel-_SgRNwAVNKw-unsplash.jpg';

const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;


// The exported function is the handler
module.exports = async function handler(request, response) {
  // You can check the HTTP method to handle different request types
  if (request.method === 'GET') {
    try {
      const githubResponse = await fetch(GITHUB_API_URL, {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
       if (!githubResponse.ok) {
        throw new Error(`GitHub API responded with ${githubResponse.status}`);
      }

      const repos = await githubResponse.json();

      const projects = repos
        .filter(repo => !repo.fork && REPO_WHITELIST.includes(repo.name)) // Filter for whitelisted repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
        .map(repo => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          description: repo.description || 'No description provided.',
          githubLink: repo.html_url,
          imageUrl: REPO_IMAGES[repo.name] || DEFAULT_PROJECT_IMAGE,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
        }));

      response.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects from GitHub:', error);
      response.status(500).json({ error: 'Failed to fetch projects from GitHub' });
    }
  } else {
    // If any other HTTP method is used, return a 405 Method Not Allowed error
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
