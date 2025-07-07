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
import { AbilityContext } from './casl/AbilityContext';
import { fetchUserRole } from './apis/getUserRole';

function App() {
  const { data, isPending } = authClient.useSession();

  console.log(data, "data is ");

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [ability, setAbility] = useState<AppAbility | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setupUserAndAbility = async () => {
      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));

        try {
          const userRoleResponse = await fetchUserRole();
          console.log("User role response", userRoleResponse);

          const { roles, permissions } = userRoleResponse.result;
          // let roles: any = "admin";
          const abilityInstance = defineAbilityFor(
            roles,
            permissions as { subject: Subjects; action: Actions; conditions?: any }[]
          );
          setAbility(abilityInstance);
        } catch (error) {
          console.error("Error setting up user roles and ability", error);
          setAbility(null);
        }

      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        setAbility(null);
      }
    };

    setupUserAndAbility();
  }, [data]);



  // 👇 First check auth, then ability
  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;
  if (isInitialLoading || isPending || !ability) return <LoadingScreen message="Initializing GameHub..." />;

  return (
    <AbilityContext.Provider value={ability}>
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
    </AbilityContext.Provider>
  );
}

export default App;
