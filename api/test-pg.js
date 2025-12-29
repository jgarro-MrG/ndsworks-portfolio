module.exports = async function handler(request, response) {
  try {
    // Try to load pg
    const pg = require('pg');
    response.status(200).json({
      success: true,
      message: 'pg loaded successfully',
      pgVersion: pg.version || 'unknown'
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      moduleSearchPaths: require.resolve.paths('pg')
    });
  }
};
