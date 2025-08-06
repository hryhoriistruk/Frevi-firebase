import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function JobsIndex() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Jobs | Frevi" />
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Your Next Opportunity</h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/jobs/all-jobs" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-3">All Jobs</h2>
                            <p className="text-gray-600">Browse all available positions</p>
                        </Link>

                        <Link href="/jobs/todays-jobs" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-3">Today's Jobs</h2>
                            <p className="text-gray-600">Fresh job postings from today</p>
                        </Link>

                        <Link href="/jobs/post-job" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-3">Post a Job</h2>
                            <p className="text-gray-600">Looking to hire? Post your opening</p>
                        </Link>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}