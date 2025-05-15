import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    CheckCircleIcon,
    FlagIcon,
    ChartBarIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon },
        { name: 'Tasks', href: '/tasks', icon: CheckCircleIcon },
        { name: 'Goals', href: '/goals', icon: FlagIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        PlanVibe
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-10 bg-gray-900/80 backdrop-blur-md">
                    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900/90 backdrop-blur-lg border-r border-gray-700/50 p-4 transform transition-transform duration-300">
                        <div className="flex flex-col h-full pt-16">
                            <nav className="flex-1 space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${isActive(item.href)
                                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg shadow-blue-500/10'
                                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="border-t border-gray-700/50 pt-4">
                                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all duration-200">
                                    <UserCircleIcon className="w-5 h-5 mr-3" />
                                    Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-gray-900/90 backdrop-blur-lg border-r border-gray-700/50 z-20 justify-between">
                <div>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            PlanVibe
                        </h1>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive(item.href) ? 'bg-mint/20 text-mint' : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                {/* User info and logout at the bottom */}
                <div className="px-6 py-4 border-t border-gray-700/50 flex items-center gap-4 bg-transparent">
                    <Link to="/profile" className="flex items-center gap-2 hover:underline">
                        <UserCircleIcon className="w-7 h-7 text-mint" />
                        <div>
                            <div className="font-semibold text-gray-100 text-sm">{user?.username || user?.email}</div>
                            <div className="text-xs text-gray-400">{user?.email}</div>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-lg bg-coral/80 text-white hover:bg-coral/90 text-xs font-semibold"
                        style={{ marginLeft: 'auto' }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout; 