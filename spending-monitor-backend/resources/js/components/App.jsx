import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';

// Pages
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import ProfilePage from '../pages/Profile';
import AboutPage from '../pages/About';
import HomePage from '../pages/Home';
import ForgotPasswordPage from '../pages/ForgotPassword';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route 
                        path="/" 
                        element={<HomePage />}
                    />
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/forgot-password" 
                        element={<ForgotPasswordPage />}
                    />
                    <Route 
                        path="/register" 
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        } 
                    />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Protected Routes */}
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all route - redirect to dashboard or login */}
                    <Route 
                        path="*" 
                        element={
                            <Navigate to="/" replace />
                        } 
                    />
                   

                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
