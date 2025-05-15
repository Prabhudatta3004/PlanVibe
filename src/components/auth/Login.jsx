import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        onLogin();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint/30 via-coral/30 to-lavender/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-mint via-coral to-lavender bg-clip-text text-transparent">
                            PlanVibe
                        </h1>
                        <p className="mt-2 text-gray-600">Welcome back! Let's get organized.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field mt-1"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field mt-1"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-mint rounded border-gray-300 focus:ring-mint"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <button type="button" className="text-sm text-coral hover:text-coral/80">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary flex justify-center"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-coral hover:text-coral/80 font-medium">
                            Sign up
                        </Link>
                    </p>

                    {/* OAuth buttons */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="btn-secondary flex justify-center items-center">
                                <span className="sr-only">Sign in with Google</span>
                                Google
                            </button>
                            <button className="btn-secondary flex justify-center items-center">
                                <span className="sr-only">Sign in with GitHub</span>
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login; 