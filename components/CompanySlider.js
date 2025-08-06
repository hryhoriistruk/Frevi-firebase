import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const companies = [
    { id: 1, name: "Google", logo: "/images/google-logo.png" },
    { id: 2, name: "Microsoft", logo: "/images/microsoft-logo.png" },
    { id: 3, name: "Apple", logo: "/images/apple-logo.png" },
    { id: 4, name: "Amazon", logo: "/images/amazon-logo.png" },
    { id: 5, name: "Facebook", logo: "/images/facebook-logo.png" },
    { id: 6, name: "Netflix", logo: "/images/netflix-logo.png" },
];

const CompanySlider = () => {
    return (
        <div className="relative overflow-hidden py-4">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...companies, ...companies].map((company, index) => (
                    <motion.div
                        key={`${company.id}-${index}`}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-lg shadow-sm mx-2"
                    >
                        <div className="relative w-32 h-12">
                            <Image
                                src={company.logo}
                                alt={company.name}
                                layout="fill"
                                objectFit="contain"
                                className="filter grayscale hover:grayscale-0 transition"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
};

export default CompanySlider;