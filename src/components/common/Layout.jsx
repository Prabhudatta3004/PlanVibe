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

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                                <button className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all duration-200">
                                    <UserCircleIcon className="w-5 h-5 mr-3" />
                                    Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-gray-900/90 backdrop-blur-lg border-r border-gray-700/50">
                    <div className="flex items-center justify-center h-16 border-b border-gray-700/50">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            PlanVibe
                        </h1>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
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

                    <div className="p-4 border-t border-gray-700/50">
                        <button className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all duration-200">
                            <UserCircleIcon className="w-5 h-5 mr-3" />
                            Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 h-screen w-full flex items-stretch">
                <main className="h-full w-full flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout; 