import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import store from './store/store';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AuthInitializer from './components/AuthInitializer'; // Add this
import './index.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer /> {/* Add this component */}
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/*" element={<MainLayout />} />
              {/* Auth Routes */}
              <Route path="/auth/*" element={<AuthLayout />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;