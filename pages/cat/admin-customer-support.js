import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Services Marketplace Platform =================== */}
const ServicesMarketplace = () => {

    // ================ Popular Services Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Home Cleaning",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/cleaning1.jpg"},
                {id: 2, img: "/images/cleaning2.jpg"},
                {id: 3, img: "/images/cleaning3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Tutoring Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/tutor1.jpg"},
                {id: 2, img: "/images/tutor2.jpg"},
                {id: 3, img: "/images/tutor3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "Photography",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/photo1.jpg"},
                {id: 2, img: "/images/photo2.jpg"},
                {id: 3, img: "/images/photo3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Handyman Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/handyman1.jpg"},
                {id: 2, img: "/images/handyman2.jpg"},
                {id: 3, img: "/images/handyman3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "Beauty Services",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/beauty1.jpg"},
                {id: 2, img: "/images/beauty2.jpg"},
                {id: 3, img: "/images/beauty3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Moving Assistance",
            rating: "4.6/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/moving1.jpg"},
                {id: 2, img: "/images/moving2.jpg"},
                {id: 3, img: "/images/moving3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Pet Care",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pet1.jpg"},
                {id: 2, img: "/images/pet2.jpg"},
                {id: 3, img: "/images/pet3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
            groupName: "Personal Training",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/trainer1.jpg"},
                {id: 2, img: "/images/trainer2.jpg"},
                {id: 3, img: "/images/trainer3.jpg"},
            ],
            link: "#"
        },
    ];

    // ======================= Service Categories =============================
    const ServiceCategories = [
        {
            id: 1,
            name: "Home Services",
        },

        {
            id: 2,
            name: "Education & Tutoring",
        },

        {
            id: 3,
            name: "Health & Wellness",
        },

        {
            id: 4,
            name: "Event Services",
        },

        {
            id: 5,
            name: "Professional Services",
        },

        {
            id: 6,
            name: "Creative Services",
        }
    ]

    // ===================== Find Service Providers List ==========================
    const ServiceProvidersList = {
        headText: "Popular Service Categories",

        listItem: [
            {id: 1, text: "Cleaning Services", link: "#"},
            {id: 2, text: "Babysitting & Childcare", link: "#"},
            {id: 3, text: "Plumbing Services", link: "#"},
            {id: 4, text: "Electrical Work", link: "#"},
            {id: 5, text: "Carpentry Services", link: "#"},
            {id: 6, text: "Gardening & Landscaping", link: "#"},
            {id: 7, text: "Catering Services", link: "#"},
            {id: 8, text: "Personal Styling", link: "#"},
            {id: 9, text: "Massage Therapy", link: "#"},
            {id: 10, text: "Language Lessons", link: "#"},
            {id: 11, text: "Music Lessons", link: "#"},
            {id: 12, text: "Car Repair Services", link: "#"},
            {id: 13, text: "IT Support", link: "#"},
            {id: 14, text: "Senior Care", link: "#"},
            {id: 15, text: "Interior Design", link: "#"},
            {id: 16, text: "Fitness Training", link: "#"},
            {id: 17, text: "Yoga Instruction", link: "#"},
            {id: 18, text: "Photography Services", link: "#"},
            {id: 19, text: "Videography Services", link: "#"},
            {id: 20, text: "Graphic Design", link: "#"},
            {id: 21, text: "Writing & Editing", link: "#"},
            {id: 22, text: "Translation Services", link: "#"},
            {id: 23, text: "Business Consulting", link: "#"},
            {id: 24, text: "Legal Services", link: "#"},
            {id: 25, text: "Accounting Services", link: "#"},
            {id: 26, text: "Marketing Services", link: "#"},
            {id: 27, text: "Web Development", link: "#"},
            {id: 28, text: "App Development", link: "#"},
            {id: 29, text: "Social Media Management", link: "#"},
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Find Local Services & Professionals | Services Marketplace"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Find trusted professionals for any task"}
                    des={"Connect with skilled service providers in your area for all your needs - from home repairs to personal wellness."}
                    btnI = {{text: "Find Services", link: "#"}}
                    btnII = {{text: "Offer Services", link: "#"}}
                    img={"/images/services-marketplace.png"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= Popular Services section ================ */}
                <TrustedExp
                    headText="Top-rated service professionals in your area"
                    rating="4.8/5"
                    ratingText="Average customer rating across all services"
                    contracts="50K+ bookings"
                    contractsText="Completed through our platform each month"
                    skills="200+ categories"
                    skillsText="Of services available"
                    cardData={CardData}
                />

                {/* ============== Service Categories Section ================== */}
                <PreWork
                    headText="Services for every aspect of your life"
                    headDes="Whatever you need to get done, there's a professional ready to help."
                    list={ServiceCategories}
                    imageI="/images/home-services.jpg"
                    imageII="/images/education-services.jpg"
                    imageIII="/images/wellness-services.jpg"
                    imageIv="/images/event-services.jpg"
                    imageV="/images/professional-services.jpg"
                    imageVi="/images/creative-services.jpg"
                    btn={{text: "Browse All Categories"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Quality home services at your convenience"
                    firstSubHead="Professional cleaners transformed this home in just 3 hours"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Price:"
                    first_F_RightValue="$120"
                    firstDes='"The cleaning team was absolutely fantastic! They arrived on time, brought all their own supplies, and left my home sparkling clean. I was amazed at how thorough they were - they even organized my closet without me asking! Will definitely book again."'
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Deep Cleaning"
                    first_S_S_RightValue="Organization"
                    first_S_T_RightValue="Window Washing"
                    firstImage="/images/cleaning-service.jpg"

                    secondImage="/images/tutoring-service.jpg"
                    secondHead="How personalized tutoring helped improve grades by 2 levels"
                    secondDes="Sarah was struggling with math in her freshman year of high school. After connecting with a certified math tutor through our platform, she not only improved her grades from C to A, but also gained confidence in her abilities. The tutor customized lessons to Sarah's learning style and was flexible with scheduling sessions around her extracurricular activities."
                    secondRightText="92% of students improve grades with our tutors"
                    secondLeftBtn={{text: "Read Success Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How does the services marketplace work?"
                    firstDesText="Our platform connects people who need services with qualified professionals. Simply search for the service you need, compare providers based on ratings and prices, and book directly through the platform. Service providers will come to your location or provide the service remotely, depending on the type of service."

                    secondHeadText="How do I know if a service provider is qualified?"
                    secondDesText="All providers on our platform are vetted through a verification process. You can check their ratings and reviews from previous customers, view their certifications (where applicable), and see how many jobs they've completed through our platform. Many providers also include portfolios of their previous work."

                    thirdHeadText="What if I need to cancel or reschedule a service?"
                    thirdDesText="You can cancel or reschedule directly through your booking dashboard. Cancellation policies vary by provider - most require at least 24 hours notice for a full refund. In case of emergencies, our customer support team can help mediate any issues."

                    fourHeadText="How are payments handled?"
                    fourDesText="Payments are processed securely through our platform. You pay when booking, but the funds are only released to the provider after the service is completed to your satisfaction. We offer multiple payment methods including credit cards, debit cards, and digital wallets."

                    lastLeftText="Need more information?"
                lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Service Providers Section ====================== */}
                <FindFreelancer
                    headText="Explore service categories"
                    FindFreelancerList={ServiceProvidersList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default ServicesMarketplace;