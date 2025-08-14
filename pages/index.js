import { FaRobot } from 'react-icons/fa';
import React from 'react';
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import Image from 'next/image';
import Category from '../components/Category';
import ClintCat from '../components/ClintCat';
import { FaStar, FaUber, FaAtlassian } from 'react-icons/fa';
import { IoLogoUsd } from 'react-icons/io';
import { ImCheckmark, ImGoogle } from 'react-icons/im';
import { BsFillTrophyFill, BsWordpress } from 'react-icons/bs';
import { SiAdobe, SiUdacity } from 'react-icons/si';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import JobSuccessCard from '../components/JobSuccessCard';
import Link from 'next/link';
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import JobFeed from '../components/JobFeed';
import CompanySlider from '../components/CompanySlider';

export default function Home() {
    const router = useRouter();

    // Navigation links data with consistent button styling
    const navButtons = [
        // Main actions (original buttons)
        {
            path: "/jobs",
            name: "Find Services",
            className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/jobs/post-job",
            name: "Post a Service",
            className: "border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition"
        },
        {
            path: "service",
            name: "Services",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/friends",
            name: "My Friends",
            className: "bg-[#0C4A6E] hover:bg-[#083344] text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/feed",
            name: "Community Posts",
            className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition"
        },

        // Admin pages
        {
            path: "/admin",
            name: "Admin Page",
            className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/admin/dashboard",
            name: "Admin Dashboard",
            className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold transition"
        },

        // Messaging
        {
            path: "/messages/page",
            name: "Messages Page",
            className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/messenger",
            name: "Messenger",
            className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/messages",
            name: "Messages",
            className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition"
        },

        // User pages
        {
            path: "/users/[id]",
            as: "/users/1",
            name: "User Profile",
            className: "bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/users/edit",
            name: "Edit User",
            className: "bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/users/list",
            name: "Users List",
            className: "bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-bold transition"
        },

        // Other pages
        {
            path: "/orders/page",
            name: "Orders Page",
            className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/services/assistance",
            name: "Assistance Service",
            className: "bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/services/analytics",
            name: "Analytics",
            className: "bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-bold transition"
        },

        // Messaging Service
        {
            path: "/services/messaging",
            name: "Messaging",
            className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/assistance",
            name: "Assistance",
            className: "bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            className: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/notifications",
            name: "Notifications",
            className: "bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/orders",
            name: "Orders",
            className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/payment",
            name: "Payment",
            className: "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold transition"
        },
        {
            path: "/gpt",
            name: "AI Assistant",
            className: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold transition"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Frevi - Professional Network"/>
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <Link href="/gpt" passHref>
                    <button
                        className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all w-14 h-14">
                        <FaRobot className="text-xl"/>
                    </button>
                </Link>
            </motion.div>

            <header className="header-bg">
                <Navbar/>

                <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3">
                    <section className="mt-7 flex items-center justify-between">
                        <div className="flex flex-col space-y-5">
                            <motion.h1 className="xl:text-7xl lg:text-6xl text-4xl font-bold text-[#0C4A6E]"
                                       initial={{y: "100%", opacity: 0}}
                                       animate={{y: 0, opacity: 1}}
                                       transition={{duration: 0.9}}
                            >
                                Frevi <br/> Marketplace
                            </motion.h1>
                            <motion.h6 className='text-zinc-500 xl:text-3xl lg:text-xl text-lg font-semibold'
                                       initial={{y: "100%", opacity: 0}}
                                       animate={{y: 0, opacity: 1}}
                                       transition={{duration: 1.5}}
                            >
                                Forget the old rules. You can have the best people. <br className='lg:block md:hidden block'/>
                                Right now. Right here.
                            </motion.h6>

                            <motion.div className="flex flex-wrap gap-4 pt-4"
                                        initial={{y: 20, opacity: 0}}
                                        animate={{y: 0, opacity: 1}}
                                        transition={{delay: 0.4}}
                            >
                                {navButtons.map((button, index) => (
                                    <Link
                                        key={index}
                                        href={button.path}
                                        as={button.as || button.path}
                                        passHref
                                    >
                                        <button className={button.className}>
                                            {button.name}
                                        </button>
                                    </Link>
                                ))}
                            </motion.div>
                        </div>

                        <div className="relative">
                            <Link href="/jobs/todays-jobs">
                                <div
                                    className="absolute lg:flex hidden flex-col items-center z-[9] bg-[#F3FFFC] shadow-2xl py-2 px-3 rounded-xl cursor-pointer left-[-3rem] top-0 transition hover:scale-105">
                  <span className="text-[11px] font-semibold text-zinc-700 mb-1">
                    Today's Job
                  </span>
                                    <Image src="/images/bag.png" height={30} width={40} alt="bag-image"/>
                                </div>
                            </Link>

                            <div className="mr-10 mt-5 md:block hidden">
                                <Image src="/images/headerimg.png" height={350} width={450} alt="header-img"/>
                            </div>

                            <JobSuccessCard/>
                        </div>
                    </section>
                </div>
            </header>

            <main>
                <section className="container mx-auto mt-16 py-3 md:px-5 sm:px-7 px-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[#0C4A6E] text-2xl font-bold">Recommended Jobs For You</h2>
                        <button
                            onClick={() => router.push("/jobs")}
                            className="text-cyan-700 hover:underline font-semibold"
                        >
                            See all jobs
                        </button>
                    </div>
                    <JobFeed limit={4}/>
                </section>

                <section className="container mx-auto mt-16 py-3 md:px-5 sm:px-7 px-3">
                    <h2 className="text-[#0C4A6E] text-2xl font-bold mb-6">Top Companies Hiring Now</h2>
                    <CompanySlider/>
                </section>

                <section className="container mx-auto mt-3 md:mt-7 py-3 md:px-5 sm:px-7 px-3">
                    <h2 className="text-[#0C4A6E] lg:text-4xl text-3xl font-bold mb-3">
                        Browse talent by category
                    </h2>
                    <span className="text-zinc-600 font-semibold lg:text-lg text-md">
            Looking for work?
            <Link href="/jobs/all-jobs" legacyBehavior><a className="ml-2 text-cyan-700 cursor-pointer hover:underline">
                Browse Job
              </a></Link>
          </span>
                    <div
                        className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:gap-x-20 gap-x-10 xl:gap-y-7 sm:gap-y-4 gap-y-3 lg:mt-10 mt-7 md:px-0 sm:px-7">
                        <Category/>
                    </div>
                </section>

                <section className="container mx-auto lg:mt-5 mt-3 py-3 md:px-5 sm:px-7 px-0 space-y-3">
                    <div
                        className="bg-[url('/images/girlswork.png')] bg-top w-full sm:rounded-xl rounded-none xl:px-14 px-5 py-8">
                        <motion.h2 className="text-white font-semibold lg:text-3xl text-xl"
                                   initial={{y: "100%", opacity: 0}}
                                   whileInView={{y: 0, opacity: 1}}
                                   transition={{duration: 1}}
                        >
                            For Clients
                        </motion.h2>

                        <motion.h3
                            className="text-white 2xl:font-bold font-semibold lg:text-6xl text-4xl lg:mt-28 mt-20 leading-tight my-3"
                            initial={{y: "100%", opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{duration: 1}}
                        >
                            Find Talent <br/>
                            Your Way
                        </motion.h3>

                        <motion.p className="text-white font-semibold lg:text-xl text-md"
                                  initial={{y: "100%", opacity: 0}}
                                  whileInView={{y: 0, opacity: 1}}
                                  transition={{duration: 1}}
                        >
                            Work with the largest network of independent <br/>
                            professionals and get things done—from quick <br/>
                            turnarounds to big transformations. <br/>
                        </motion.p>

                        <motion.div
                            className="grid md:grid-cols-3 grid-cols-1 2xl:gap-x-10 md:gap-y-0 gap-y-3 xl:gap-x-7 gap-x-5 mt-10"
                            initial={{y: "100", opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{duration: 1}}
                        >
                            <ClintCat/>
                        </motion.div>
                    </div>
                </section>

                <section className="container mx-auto lg:mt-5 mt-1 py-3 md:px-5 sm:px-7">
                    <div className="grid lg:grid-cols-3 grid-cols-1">
                        <div
                            className="md:bg-[#E4FDF7] bg-none col-span-2 lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl sm:px-7 px-5 pt-10 pb-14 relative">
                            <motion.h2 className="text-zinc-700 font-semibold 2xl:text-6xl lg:text-5xl text-4xl"
                                       initial={{y: "100", opacity: 0}}
                                       whileInView={{y: 0, opacity: 1}}
                                       transition={{duration: 1}}
                            >
                                Why business <br/>
                                turn to Frevi
                            </motion.h2>

                            <motion.div className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                                        initial={{y: "100", opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{duration: 1}}
                            >
              <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                <FaStar/>
              </span>
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                                        Proof of quality
                                    </h3>
                                    <span className="text-zinc-500 font-semibold xl:text-md">
                  Check any pro's work samples, client reviews, <br className="md:block hidden"/>
                  and identity verification.
                </span>
                                </div>
                            </motion.div>

                            <motion.div className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                                        initial={{y: "100", opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{duration: 1}}
                            >
              <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                <IoLogoUsd/>
              </span>
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                                        No cost until you hire
                                    </h3>
                                    <span className="text-zinc-500 font-semibold text-md">
                  Interview potential fits for your job, negotiate <br className="md:block hidden"/>
                  rates, and only pay for work you approve.
                </span>
                                </div>
                            </motion.div>

                            <motion.div className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                                        initial={{y: "100", opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{duration: 1}}
                            >
              <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                <ImCheckmark/>
              </span>
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                                        Safe and secure
                                    </h3>
                                    <span className="text-zinc-500 font-semibold text-md">
                  Focus on your work knowing we help protect <br className="md:block hidden"/>
                  your data and privacy. We're here with 24/7 <br className="md:block hidden"/>
                  support if you need it.
                </span>
                                </div>
                            </motion.div>

                            <div className="absolute lg:right-[-1rem] right-0 bottom-3 md:block hidden">
                                <Image
                                    src="/images/man-prog.png"
                                    width={250}
                                    height={400}
                                    alt="man-image"
                                />
                            </div>
                        </div>

                        <div
                            className="bg-gradient-to-b from-[#99F6E4] to-[#A5F3FC] lg:rounded-r-xl lg:rounded-bl-none md:rounded-b-xl md:rounded-none sm:rounded-xl rounded-none px-7 pt-10 pb-15 py-10">
                            <motion.h2 className="text-zinc-700 font-semibold 2xl:text-5xl xl:text-4xl text-3xl"
                                       initial={{y: "100", opacity: 0}}
                                       whileInView={{y: 0, opacity: 1}}
                                       transition={{duration: 1}}
                            >
                                we're <br/>
                                the world's work
                                marketplace
                            </motion.h2>

                            <motion.div className="flex items-start space-x-7 mt-10"
                                        initial={{y: "100", opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{duration: 1}}
                            >
              <span className="2xl:text-4xl xl:text-3xl text-2xl text-zinc-700 mt-1">
                <FaStar/>
              </span>

                                <div className="flex flex-col md:space-y-3 space-y-2">
                                    <h3 className="font-semibold 2xl:text-4xl xl:text-3xl text-2xl text-zinc-700">
                                        4.9/5
                                    </h3>
                                    <span className="2xl:text-xl lg:text-md text-zinc-500">
                  Clients rate professionals on Frevi
                </span>
                                </div>
                            </motion.div>

                            <motion.div className="flex items-start space-x-7 xl:mt-10 md:mt-7 mt-5"
                                        initial={{y: "100", opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{duration: 1}}
                            >
              <span className="2xl:text-4xl xl:text-3xl text-2xl text-zinc-700 mt-1">
                <BsFillTrophyFill/>
              </span>

                                <div className="flex flex-col md:space-y-3 space-y-2">
                                    <h3 className="font-semibold 2xl:text-4xl xl:text-3xl text-2xl text-zinc-700">
                                        Award winner
                                    </h3>
                                    <span className="2xl:text-xl lg:text-md text-zinc-500">
                  G2's 2021 Best Software Awards
                </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto md:mt-5 mt-3 py-3 md:px-5 sm:px-7 px-0 space-y-3">
                    <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        <Image
                            src="/images/manworking.png"
                            width={1200}
                            height={1200}
                            alt="manworking-image"
                            className="md:rounded-l-xl md:rounded-tr-none sm:rounded-t-xl rounded-none flex flex-grow"
                        />

                        <div
                            className="bg-gradient-to-b from-[#A5F3FC] to-[#7DD3FC] 2xl:col-span-2 col-span-1 md:rounded-r-xl md:rounded-bl-none sm:rounded-b-xl rounded-none xl:px-10 px-5 lg:py-7 py-5">
                            <motion.h5 className="font-semibold lg:text-2xl text-xl text-zinc-700"
                                       initial={{y: "100", opacity: 0}}
                                       whileInView={{y: 0, opacity: 1}}
                                       transition={{duration: 1}}
                            >
                                For Talent
                            </motion.h5>
                            <motion.h3 className="font-semibold lg:text-5xl text-4xl text-zinc-700 lg:mt-7 mt-5 lg:mb-3 mb-1"
                                       initial={{y: "100", opacity: 0}}
                                       whileInView={{y: 0, opacity: 1}}
                                       transition={{duration: 1}}
                            >
                                Find great work
                            </motion.h3>
                            <motion.p className="text-zinc-500 font-semibold"
                                      initial={{y: "100", opacity: 0}}
                                      whileInView={{y: 0, opacity: 1}}
                                      transition={{duration: 1}}
                            >
                                Meet clients you're excited to work with and take <br className="lg:block hidden"/>
                                your career or business to new heights.
                            </motion.p>

                            <motion.div
                                className="grid lg:grid-cols-3 grid-cols-2 2xl:gap-x-14 xl:gap-x-10 gap-x-5 gap-y-5 lg:gap-y-0 lg:mt-14 mt-4 border-t border-zinc-500 lg:py-5 py-3"
                                initial={{y: "100", opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                transition={{duration: 1}}
                            >
              <span className="2xl:text-xl xl:text-lg text-md text-zinc-700 font-semibold">
                Find opportunities for every stage of your freelance career
              </span>
                                <span className="2xl:text-xl xl:text-lg text-md text-zinc-700 font-semibold">
                Control when, where, and how you work
              </span>
                                <span className="2xl:text-xl xl:text-lg text-md text-zinc-700 font-semibold">
                Explore different ways to earn
              </span>
                            </motion.div>

                            <motion.button
                                className="bg-zinc-700 py-2 px-5 text-white transition hover:bg-zinc-600 font-semibold rounded-full xl:mt-16 lg:mt-7 mt-3"
                                onClick={() => router.push("#")}
                                initial={{x: 30, opacity: 0}}
                                whileInView={{x: 0, opacity: 1}}
                                transition={{duration: 1}}
                            >
                                Find Opportunities
                            </motion.button>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto lg:my-7 my-3 py-3 md:px-5 sm:px-7 px-3 space-y-3">
                    <Skills/>
                </section>
            </main>

            <Footer/>
        </div>
    )
}