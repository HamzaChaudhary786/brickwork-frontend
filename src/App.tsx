import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import { defineAbilityFor, type AppAbility, type Subjects, type Actions } from './casl/ability';
import { fetchUserRole } from './apis/getUserRole';

function App() {
  const { data, isPending } = authClient.useSession();

  const [user, setUser] = useState<any>(null);
  const [ability, setAbility] = useState<AppAbility | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Use null to indicate unresolved state
  const [isLoading, setIsLoading] = useState(true);

  // Apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  // Setup user session and ability
  useEffect(() => {
    const setupSession = async () => {
      if (!isPending && data?.user) {
        const userData = data.user;
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));

        try {
          const userRoleResponse = await fetchUserRole();
          const { roles, permissions } = userRoleResponse.result;

          const abilityInstance = defineAbilityFor(
            roles,
            permissions as { subject: Subjects; action: Actions; conditions?: any }[]
          );
          setAbility(abilityInstance);
        } catch (error) {
          console.error('Error fetching user role:', error);
          setAbility(null);
          setIsAuthenticated(false); // Set to false on error to show login
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setAbility(null);
        localStorage.removeItem('user');
      }

      setIsLoading(false); // Done loading
    };

    setupSession();
  }, [data, isPending]);

  // Show loading screen while session or abilities are being set up
  if (isLoading || isPending || isAuthenticated === null) {
    return <LoadingScreen message="Initializing GameHub..." />;
  }

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // App UI
  return (
    <Router>
      <Layout
        onLogout={async () => {
          await authClient.signOut();
          setIsAuthenticated(false);
          setUser(null);
          setAbility(null);
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