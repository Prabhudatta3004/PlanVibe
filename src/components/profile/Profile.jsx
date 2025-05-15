import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
            <div className="space-y-4">
                <div>
                    <span className="block text-gray-600 text-sm">Username</span>
                    <span className="block text-lg font-semibold text-gray-900">{user?.username || '-'}</span>
                </div>
                <div>
                    <span className="block text-gray-600 text-sm">Email</span>
                    <span className="block text-lg font-semibold text-gray-900">{user?.email || '-'}</span>
                </div>
            </div>
            {/* Future: Add edit profile, change password, etc. */}
        </div>
    );
};

export default Profile; 