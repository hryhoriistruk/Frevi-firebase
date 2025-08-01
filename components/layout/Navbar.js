import Link from 'next/link';
import { useAuth } from '../../lib/context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Frevi
                </Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link href="/chat" className="hover:underline">
                                Chat
                            </Link>
                            <Link href="/orders" className="hover:underline">
                                Orders
                            </Link>
                            <Link href="/services" className="hover:underline">
                                Services
                            </Link>

                            <NotificationBell />

                            <div className="flex items-center space-x-2">
                                <span>{user.name || user.email}</span>
                                <button
                                    onClick={logout}
                                    className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="hover:underline">
                                Login
                            </Link>
                            <Link
                                href="/auth/register"
                                className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-100"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}