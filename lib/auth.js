const jwt = require('jsonwebtoken');

function signToken(payload) {
  return jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(req) {
  let token = null;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  if (!token) {
    const cookieHeader = req.headers['cookie'];
    if (cookieHeader) {
      const match = cookieHeader.match(/admin_token=([^;]+)/);
      if (match) token = match[1];
    }
  }

  if (!token) throw new Error('No token provided');
  return jwt.verify(token, process.env.ADMIN_JWT_SECRET);
}

module.exports = { signToken, verifyToken };
