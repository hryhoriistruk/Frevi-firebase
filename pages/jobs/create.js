import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeadTag from '../../components/HeadTag';
import Navbar from '../../components/Navbar/Navbar';
import JobFeed from '../../components/JobFeed';
import CompanySlider from '../../components/CompanySlider';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Professional Network - Find Services"/>

            <header className="bg-gradient-to-r from-blue-800 to-blue-600">
                <Navbar/>

                <div className="container mx-auto py-10 px-5 text-white">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold mb-4"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Welcome to your professional community
                            </motion.h1>

                            <motion.p
                                className="text-xl mb-8"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Find the right job or candidate for your business
                            </motion.p>

                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={() => router.push("/jobs")}
                                    className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition"
                                >
                                    Find Services
                                </button>
                                <button
                                    onClick={() => router.push("/post-job")}
                                    className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                                >
                                    Post a Service
                                </button>
                            </motion.div>
                        </div>

                        <div className="md:w-1/2">
                            <Image
                                src="/images/professional-network.png"
                                width={600}
                                height={400}
                                alt="Professional Network"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-5 py-10">
                {/* Секція популярних компаній */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Companies Hiring Now</h2>
                    <CompanySlider/>
                </section>

                {/* Секція рекомендуваних вакансій */}
                <section className="mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Recommended Jobs For You</h2>
                        <button
                            onClick={() => router.push("/jobs")}
                            className="text-blue-600 hover:underline"
                        >
                            See all jobs
                        </button>
                    </div>
                    <JobFeed limit={4}/>
                </section>

                {/* Секція для роботодавців */}
                <section className="bg-blue-50 rounded-xl p-8 mb-16">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Are you hiring?</h2>
                            <p className="text-gray-600 mb-6">
                                Post your job to millions of professionals looking for work. Find the perfect candidate faster.
                            </p>
                            <button
                                onClick={() => router.push("/post-job")}
                                className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                            >
                                Post a Service
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <Image
                                src="/images/hiring.png"
                                width={500}
                                height={300}
                                alt="Hiring"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}