// pages/services/analytics.js
import { useState, useEffect } from 'react';
import AnalyticsService from '@/services/AnalyticsService';
import { motion } from 'framer-motion';
import { FiActivity, FiTrendingUp, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Динамічний імпорт для графіків (щоб не завантажувати на сервері)
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function AnalyticsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Імітація завантаження даних
                await new Promise(resolve => setTimeout(resolve, 1500));
                const analyticsData = await AnalyticsService.getOrderAnalytics();
                setData(analyticsData);
            } catch (error) {
                console.error("Error loading analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    // Налаштування графіка
    const chartOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#3B82F6', '#10B981', '#F59E0B'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        tooltip: { theme: 'dark' }
    };

    const chartSeries = [
        {
            name: 'Orders',
            data: [30, 40, 45, 50, 49, 60, 70]
        },
        {
            name: 'Completed',
            data: [20, 30, 35, 40, 39, 50, 60]
        },
        {
            name: 'Revenue',
            data: [1000, 2000, 3000, 2500, 4000, 5000, 6000]
        }
    ];

    const stats = [
        {
            title: "Total Orders",
            value: data?.totalOrders || 0,
            icon: <FiActivity className="text-blue-500" size={24} />,
            change: "+12%",
            trend: "up"
        },
        {
            title: "Completed",
            value: data?.completedOrders || 0,
            icon: <FiCheckCircle className="text-green-500" size={24} />,
            change: "+8%",
            trend: "up"
        },
        {
            title: "Pending",
            value: data?.pendingOrders || 0,
            icon: <FiClock className="text-yellow-500" size={24} />,
            change: "-3%",
            trend: "down"
        },
        {
            title: "Revenue",
            value: `$${(data?.totalRevenue || 0).toLocaleString()}`,
            icon: <FiDollarSign className="text-purple-500" size={24} />,
            change: "+24%",
            trend: "up"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">Crunching the numbers...</p>
                    <p className="text-sm text-gray-500">Your analytics will be ready in a moment</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-gray-600">Monitor your business performance</p>
                    </div>

                    <div className="flex space-x-2 mt-4 md:mt-0">
                        {['day', 'week', 'month', 'year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    timeRange === range
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {range.charAt(0).toUpperCase() + range.slice(1)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-gray-50 flex items-center justify-center">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className={`mt-4 flex items-center text-sm font-medium ${
                                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {stat.change}
                                <FiTrendingUp className={`ml-1 ${
                                    stat.trend === 'up' ? 'rotate-0' : 'rotate-180'
                                }`} />
                                <span className="ml-1 text-gray-500">vs last {timeRange}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Chart */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-900">Performance Overview</h2>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">
                                Orders
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">
                                Revenue
                            </button>
                        </div>
                    </div>
                    <div className="h-80">
                        {typeof window !== 'undefined' && (
                            <DynamicChart
                                options={chartOptions}
                                series={chartSeries}
                                type="area"
                                height="100%"
                            />
                        )}
                    </div>
                </motion.div>

                {/* Bottom Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <FiActivity className="text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Order #{1000 + item}</p>
                                            <p className="text-sm text-gray-500">2 days ago</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Activity */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { icon: '📊', text: 'New report generated', time: '2 min ago' },
                                { icon: '💰', text: 'Payment received from Client X', time: '1 hour ago' },
                                { icon: '🛒', text: 'New order #1042 placed', time: '3 hours ago' },
                                { icon: '📈', text: 'Performance improved by 12%', time: '5 hours ago' },
                                { icon: '👤', text: 'New user registered', time: '1 day ago' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-xl mr-3">{activity.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-medium">{activity.text}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}