import { useAuth } from '../../lib/context/AuthContext'; // Fixed path
import Navbar from './Navbar';

export default function Layout({ children }) {
    const { loading } = useAuth();

    // Only show loading state in browser environment
    if (typeof window !== 'undefined' && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading application...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="container mx-auto text-center">
                    © {new Date().getFullYear()} Frevi. All rights reserved.
                </div>
            </footer>
        </div>
    );
}