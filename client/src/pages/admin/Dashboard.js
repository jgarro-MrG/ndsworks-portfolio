import React from 'react';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  return <Navigate to="/admin/posts" replace />;
}

export default Dashboard;
