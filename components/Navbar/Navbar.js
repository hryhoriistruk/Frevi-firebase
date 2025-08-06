import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-[#0C4A6E]">F</div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            <Link href="/find-talent" className="font-medium text-[#0C4A6E] hover:text-[#0a3a56]">
                                Find Talent
                            </Link>
                            <Link href="/find-jobs" className="font-medium text-[#0C4A6E] hover:text-[#0a3a56]">
                                Find Jobs
                            </Link>
                        </div>

                        <div className="border-l border-gray-300 h-6 mx-2"></div>

                        <div className="flex space-x-6">
                            <Link href="/why-frevi" className="text-[#0C4A6E] hover:text-[#0a3a56]">
                                Why Frevi
                            </Link>
                            <Link href="/enterprise" className="text-[#0C4A6E] hover:text-[#0a3a56]">
                                Enterprise
                            </Link>
                        </div>
                    </div>

                    {/* Search and Auth - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="search"
                                className="border rounded-full py-1 px-4 text-sm w-40 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-2 text-gray-400" />
                        </div>
                        <Link href="/login" className="text-[#0C4A6E] hover:text-[#0a3a56]">
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-[#0C4A6E] text-white px-4 py-2 rounded-full hover:bg-[#0a3a56] transition"
                        >
                            SignUp
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#0C4A6E]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="search"
                                className="border rounded-full py-2 px-4 w-full focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />
                        </div>

                        <div className="flex flex-col space-y-3">
                            <Link href="/find-talent" className="text-[#0C4A6E] hover:text-[#0a3a56] py-2">
                                Find Talent
                            </Link>
                            <Link href="/find-jobs" className="text-[#0C4A6E] hover:text-[#0a3a56] py-2">
                                Find Jobs
                            </Link>
                            <Link href="/why-frevi" className="text-[#0C4A6E] hover:text-[#0a3a56] py-2">
                                Why Frevi
                            </Link>
                            <Link href="/enterprise" className="text-[#0C4A6E] hover:text-[#0a3a56] py-2">
                                Enterprise
                            </Link>
                        </div>

                        <div className="flex space-x-4 pt-2">
                            <Link href="/login" className="text-[#0C4A6E] hover:text-[#0a3a56]">
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-[#0C4A6E] text-white px-4 py-2 rounded-full hover:bg-[#0a3a56] transition"
                            >
                                SignUp
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;