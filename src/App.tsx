import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { LoadingScreen } from './components/LoadingScreen';
import { Login } from './screens/Login';
import { Marketplace } from './screens/Marketplace';
import { Dashboard } from './screens/Dashboard';
import { Profile } from './screens/Profile';
import { Missions } from './screens/Missions';
import { Groups } from './screens/Groups';
import { AllGroups } from './screens/AllGroups';
import { ItemDetail } from './screens/ItemDetail';
import { Cart } from './screens/Cart';
import { Checkout } from './screens/Checkout';
import { AdminDashboard } from './screens/AdminDashboard';
import { InventoryManagement } from './screens/InventoryManagement';

import authClient from './config/authConfig';

function App() {
  const { data, error, isPending } = authClient.useSession(); // ✅ Hook used correctly
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null); // Replace `any` with your User type if available

  // Apply saved theme (light/dark)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Simulate splash screen / loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Update user/auth status when session changes
  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    }
  }, [data]);

  // Show loading screen during initialization or session fetching
  if (isInitialLoading || isPending) {
    return <LoadingScreen message="Initializing GameHub..." />;
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Layout
        onLogout={async () => {
          await authClient.signOut();
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('user');

        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/marketplace" element={<Marketplace user={user} />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/all" element={<AllGroups />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/inventory" element={<InventoryManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
