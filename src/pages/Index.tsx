import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const { user, demoMode, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users to landing page
  useEffect(() => {
    if (!loading && !user && !demoMode) {
      navigate('/');
    }
  }, [user, demoMode, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && !demoMode) {
    return null; // The redirect will happen due to the useEffect above
  }

  return (
    <Dashboard />
  );
};

export default Index;
