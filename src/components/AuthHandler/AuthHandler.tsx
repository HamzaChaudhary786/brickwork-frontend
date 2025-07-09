import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthHandlerProps {
  isAuthenticated: boolean;
}

const AuthHandler: React.FC<AuthHandlerProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default AuthHandler;
