import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../../api/auth';

const SignUp = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        const res = await register(form);
        if (res.message === 'User registered successfully') {
            // Redirect to login with success flag
            navigate('/login?registered=1');
        } else {
            setError(res.error || 'Registration failed');
        }
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
                        <p className="mt-2 text-gray-600">Create your account and start planning!</p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="input-field mt-1"
                                placeholder="johndoe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
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
                                value={form.password}
                                onChange={handleChange}
                                className="input-field mt-1"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary flex justify-center"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-coral hover:text-coral/80 font-medium">
                            Sign in
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
                                <span className="sr-only">Sign up with Google</span>
                                Google
                            </button>
                            <button className="btn-secondary flex justify-center items-center">
                                <span className="sr-only">Sign up with GitHub</span>
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp; 