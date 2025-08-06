import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                {/* Category Links */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[
                        'Development and IT',
                        'Design & Creative',
                        'Sales & Marketing',
                        'Writing & Translation',
                        'Admin & Custom Support',
                        'More'
                    ].map((category) => (
                        <Link
                            key={category}
                            href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            className="text-[#0C4A6E] hover:underline"
                        >
                            {category}
                        </Link>
                    ))}
                </div>

                {/* Main Hero Content */}
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-lg font-semibold text-[#0C4A6E] mb-2">Development and IT</h3>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0C4A6E] mb-4">
                        How Work Should Work
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Forget the old rules. You can have the best people.<br />
                        Right now. Right here.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <Link
                            href="/browse-talent"
                            className="bg-[#0C4A6E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0a3a56] transition text-center"
                        >
                            Browse talent by category
                        </Link>
                        <Link
                            href="/browse-jobs"
                            className="border border-[#0C4A6E] text-[#0C4A6E] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition text-center"
                        >
                            Looking for work? Browse Jobs
                        </Link>
                    </div>

                    {/* Secondary Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Link href="/why-frevi" className="text-[#0C4A6E] hover:underline">
                            Why Frevi
                        </Link>
                        <Link href="/enterprise" className="text-[#0C4A6E] hover:underline">
                            Enterprise
                        </Link>
                        <Link href="/search" className="text-[#0C4A6E] hover:underline">
                            Search
                        </Link>
                        <Link href="/login" className="text-[#0C4A6E] hover:underline">
                            Login
                        </Link>
                        <Link href="/signup" className="text-[#0C4A6E] hover:underline">
                            SignUp
                        </Link>
                    </div>

                    {/* Job Highlights */}
                    <div className="flex justify-center gap-8">
                        <Link href="/todays-jobs" className="text-[#0C4A6E] hover:underline font-medium">
                            Today's Jobs
                        </Link>
                        <Link href="/job-success" className="text-[#0C4A6E] hover:underline font-medium">
                            Today Job Success
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}