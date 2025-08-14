import { useEffect, useState } from 'react';

// Default placeholder avatar
const defaultAvatar = "https://via.placeholder.com/150?text=User";

// Mock data for demonstration
const mockUser = {
    id: "0",
    name: "Name Username",
    email: "example@example.com",
    phone: "",
    title: "Freelancer / Service Provider",
    location: "Not specified",
    avatar: defaultAvatar,
    isOnline: false,
    isVerified: false,
    bio: "Describe yourself and your services here.",
    joinDate: new Date().toISOString(),
    socialLinks: {},
    skills: [],
    stats: {
        projects: 0,
        followers: 0,
        following: 0,
        contributions: 0
    },
    services: [
        {
            id: "1",
            name: "Example Service",
            description: "Describe your service here",
            price: "Negotiable"
        }
    ],
    projects: [],
    activity: []
};

// Additional components
const SocialLinks = ({ links }) => (
    <div className="flex space-x-4 mt-4">
        {links?.twitter && (
            <a
                href={`https://twitter.com/${links.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors"
            >
                <TwitterIcon />
            </a>
        )}
        {links?.github && (
            <a
                href={`https://github.com/${links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors"
            >
                <GithubIcon />
            </a>
        )}
        {links?.linkedin && (
            <a
                href={`https://linkedin.com/in/${links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
            >
                <LinkedInIcon />
            </a>
        )}
    </div>
);

const StatsCard = ({ value, label }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-sm transition-shadow">
        <div className="text-2xl font-bold text-indigo-600">{value}</div>
        <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
);

const SkillsList = ({ skills }) => (
    <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
                <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition-colors"
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const ProjectsPreview = ({ projects }) => (
    <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects?.slice(0, 4).map(project => (
                <div
                    key={project.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => console.log(`View project ${project.id}`)}
                >
                    <h3 className="font-medium text-lg">{project.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{project.year}</span>
                        <span className="text-indigo-600 text-sm hover:underline">
                            View Project
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ServicesList = ({ services }) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">My Services</h2>
        {services?.length > 0 ? (
            <div className="space-y-4">
                {services.map(service => (
                    <div key={service.id} className="border p-4 rounded-lg shadow-sm">
                        <h3 className="font-medium text-lg">{service.name}</h3>
                        <p className="text-gray-600">{service.description}</p>
                        <p className="text-gray-800 font-semibold mt-2">Price: {service.price}</p>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500">No services added yet.</p>
        )}
    </div>
);

const EditProfileButton = ({ userId }) => (
    <button
        onClick={() => console.log(`Edit profile for user ${userId}`)}
        className="absolute top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
    >
        Edit Profile
    </button>
);

// Icon components
const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default function UserProfile() {
    const [user, setUser] = useState(mockUser);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        setUser(mockUser);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-indigo-700 text-white pb-20 pt-10 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                {user.isOnline && (
                                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {user.name}
                                    {user.isVerified && (
                                        <span className="ml-2 text-blue-300">
                                            <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                            </svg>
                                        </span>
                                    )}
                                </h1>
                                <p className="text-indigo-200">{user.title}</p>
                                <p className="text-indigo-100 mt-1">{user.location}</p>
                                <SocialLinks links={user.socialLinks} />
                            </div>
                        </div>
                        <EditProfileButton userId={user.id} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 -mt-12">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-gray-500 text-sm">Email</h3>
                                    <p className="text-gray-800">{user.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-sm">Phone</h3>
                                    <p className="text-gray-800">{user.phone || 'Not provided'}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-sm">Joined</h3>
                                    <p className="text-gray-800">{new Date(user.joinDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Stats</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <StatsCard value={user.stats?.projects || 0} label="Projects" />
                                <StatsCard value={user.stats?.followers || 0} label="Followers" />
                                <StatsCard value={user.stats?.following || 0} label="Following" />
                                <StatsCard value={user.stats?.contributions || 0} label="Contributions" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px">
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'about' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('projects')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'projects' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Projects
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('services')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'services' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activity')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Activity
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'about' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">About Me</h2>
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {user.bio}
                                        </p>
                                        <SkillsList skills={user.skills} />
                                    </div>
                                )}

                                {activeTab === 'projects' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-semibold">Projects</h2>
                                            <button
                                                onClick={() => console.log('View all projects')}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                            >
                                                View All Projects
                                            </button>
                                        </div>
                                        <ProjectsPreview projects={user.projects} />
                                    </div>
                                )}

                                {activeTab === 'services' && (
                                    <ServicesList services={user.services} />
                                )}

                                {activeTab === 'activity' && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                                        {user.activity?.length > 0 ? (
                                            <div className="space-y-4">
                                                {user.activity.map((item, index) => (
                                                    <div key={index} className="border-l-2 border-indigo-500 pl-4 py-2">
                                                        <div className="text-sm text-gray-500">{new Date(item.date).toLocaleString()}</div>
                                                        <p className="text-gray-800">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No recent activity.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
