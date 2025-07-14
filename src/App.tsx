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
import { AbilityContext } from './casl/AbilityContext';
import { PrivateRoute } from './components/PrivateRoutes/PrivateRoute';
import AuthHandler from './components/AuthHandler/AuthHandler'; // 🧠 Custom redirection component
import { RecruiterDashboard } from './screens/RecruiterDashboard';
import { PublicDashboard } from './screens/PublicDashboard';
import { MembershipApplication } from './screens/MembershipApplication';
import { NewsUpdates } from './screens/NewsUpdates';

function App() {
  const { data, isPending } = authClient.useSession();

  const [user, setUser] = useState<any>(null);
  const [ability, setAbility] = useState<AppAbility | null>(null);
  const [abilityLoading, setAbilityLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Theme Setup
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  // Session & Role Setup
  useEffect(() => {
    const setupSession = async () => {
      setAbilityLoading(true);

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
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setAbility(null);
        localStorage.removeItem('user');
      }

      setIsLoading(false);
      setAbilityLoading(false);
    };

    setupSession();
  }, [data, isPending]);

  // Show loading screen while session is being initialized
  if (isLoading || abilityLoading || isPending || isAuthenticated === null) {
    return <LoadingScreen message="Initializing GameHub..." />;
  }

  return (
    <AbilityContext.Provider value={ability!}>
      <Router>
        <Routes>
          {/* 🔐 Login Route (public but redirects if already logged in) */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/profile" replace />
              ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* 🔁 Root Route (Dynamic Redirect) */}
          <Route path="/" element={<AuthHandler isAuthenticated={isAuthenticated} />} />

          {/* 🛡️ Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
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
            <Route path="/public-dashboard" element={<PublicDashboard />} />
            <Route path="/news-updates" element={<NewsUpdates />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/marketplace" element={<Marketplace user={user} />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/all" element={<AllGroups />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
          </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AbilityContext.Provider>
  );
}

export default App;
