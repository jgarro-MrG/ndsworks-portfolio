const { verifyToken } = require('../../lib/auth.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    verifyToken(req);
    res.status(200).json({ ok: true });
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
