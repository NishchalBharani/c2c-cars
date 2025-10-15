import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../store/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthInitializer;