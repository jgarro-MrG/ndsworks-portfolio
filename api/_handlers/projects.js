const { ProjectConfig } = require('../../lib/models/projectConfig.model.js');

const GITHUB_USERNAME = 'jgarro-MrG';
const DEFAULT_PROJECT_IMAGE = '/img/projects/pankaj-patel-_SgRNwAVNKw-unsplash.jpg';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`;

module.exports = async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      const configs = await ProjectConfig.findAll({ where: { active: true }, order: [['displayOrder', 'ASC']] });
      const whitelist = configs.map(c => c.repoName);
      const imageMap = {};
      configs.forEach(c => { if (c.imageUrl) imageMap[c.repoName] = c.imageUrl; });

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
        .filter(repo => whitelist.includes(repo.name))
        .sort((a, b) => {
          const oa = configs.find(c => c.repoName === a.name)?.displayOrder ?? 0;
          const ob = configs.find(c => c.repoName === b.name)?.displayOrder ?? 0;
          return oa - ob;
        })
        .map(repo => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          description: repo.description || 'No description provided.',
          githubLink: repo.html_url,
          imageUrl: imageMap[repo.name] || DEFAULT_PROJECT_IMAGE,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
        }));

      response.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      response.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else {
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
