import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Home Cleaning Services Page =================== */}
const HomeCleaningServices = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Standard Cleaning",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/standard-clean1.jpg"},
                {id: 2, img: "/images/standard-clean2.jpg"},
                {id: 3, img: "/images/standard-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Deep Cleaning",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/deep-clean1.jpg"},
                {id: 2, img: "/images/deep-clean2.jpg"},
                {id: 3, img: "/images/deep-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "Move In/Out Cleaning",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/move-clean1.jpg"},
                {id: 2, img: "/images/move-clean2.jpg"},
                {id: 3, img: "/images/move-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Office Cleaning",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/office-clean1.jpg"},
                {id: 2, img: "/images/office-clean2.jpg"},
                {id: 3, img: "/images/office-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "Carpet Cleaning",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/carpet-clean1.jpg"},
                {id: 2, img: "/images/carpet-clean2.jpg"},
                {id: 3, img: "/images/carpet-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Window Cleaning",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/window-clean1.jpg"},
                {id: 2, img: "/images/window-clean2.jpg"},
                {id: 3, img: "/images/window-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Eco-Friendly Cleaning",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/eco-clean1.jpg"},
                {id: 2, img: "/images/eco-clean2.jpg"},
                {id: 3, img: "/images/eco-clean3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
            groupName: "Post-Construction Cleaning",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/construction-clean1.jpg"},
                {id: 2, img: "/images/construction-clean2.jpg"},
                {id: 3, img: "/images/construction-clean3.jpg"},
            ],
            link: "#"
        },
    ];

    // ===================== Find Services List ==========================
    const ServicesList = {
        headText: "Home Cleaning Services",

        listItem: [
            {id: 1, text: "Regular Home Cleaning", link: "#"},
            {id: 2, text: "Deep Cleaning Services", link: "#"},
            {id: 3, text: "Move-In/Move-Out Cleaning", link: "#"},
            {id: 4, text: "Office Cleaning", link: "#"},
            {id: 5, text: "Carpet Cleaning", link: "#"},
            {id: 6, text: "Upholstery Cleaning", link: "#"},
            {id: 7, text: "Window Cleaning", link: "#"},
            {id: 8, text: "Post-Construction Cleaning", link: "#"},
            {id: 9, text: "Eco-Friendly Cleaning", link: "#"},
            {id: 10, text: "Disinfection Services", link: "#"},
            {id: 11, text: "Airbnb Cleaning", link: "#"},
            {id: 12, text: "Spring Cleaning", link: "#"},
            {id: 13, text: "Laundry Services", link: "#"},
            {id: 14, text: "Oven Cleaning", link: "#"},
            {id: 15, text: "Fridge Cleaning", link: "#"},
            {id: 16, text: "Bathroom Deep Cleaning", link: "#"},
            {id: 17, text: "Kitchen Deep Cleaning", link: "#"},
            {id: 18, text: "Floor Polishing", link: "#"},
            {id: 19, text: "Tile and Grout Cleaning", link: "#"},
            {id: 20, text: "Pet Hair Removal", link: "#"},
            {id: 21, text: "Mattress Cleaning", link: "#"},
            {id: 22, text: "Curtain Cleaning", link: "#"},
            {id: 23, text: "Chandelier Cleaning", link: "#"},
            {id: 24, text: "Commercial Cleaning", link: "#"},
            {id: 25, text: "Industrial Cleaning", link: "#"},
            {id: 26, text: "Pressure Washing", link: "#"},
            {id: 27, text: "Gutter Cleaning", link: "#"},
            {id: 28, text: "Pool Cleaning", link: "#"},
            {id: 29, text: "Special Event Cleanup", link: "#"},
            {id: 30, text: "Hoarding Cleanup", link: "#"}
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Home Cleaning Services | Book Top Cleaners Near You"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Professional cleaning services for your home or office"}
                    des={"Book trusted, vetted cleaners with all supplies included. 100% satisfaction guaranteed."}
                    btnI = {{text: "Book a Cleaner", link: "#"}}
                    btnII = {{text: "Become a Cleaner", link: "#"}}
                    img={"/images/cleaning-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>

                {/* ================= Cleaning Services section ================ */}
                <TrustedExp
                    headText="Specialized cleaning services you can trust"
                    rating="4.9/5"
                    ratingText="Average customer rating across all services"
                    contracts="50K+ bookings"
                    contractsText="Completed through our platform each month"
                    skills="30+ services"
                    skillsText="Available for your cleaning needs"
                    cardData={CardData}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How does the cleaning service work?"
                    firstDesText="Our platform connects you with professional cleaners in your area. Simply choose your service, select a date and time that works for you, and our vetted cleaners will arrive with all necessary supplies. You can relax while they take care of your cleaning needs."

                    secondHeadText="What's included in a standard cleaning?"
                    secondDesText="Our standard cleaning includes dusting all surfaces, vacuuming and mopping floors, cleaning bathrooms (toilets, showers, sinks), kitchen cleaning (countertops, sink, exterior of appliances), and general tidying up. You can always customize your cleaning checklist."

                    thirdHeadText="Are your cleaners insured and vetted?"
                    thirdDesText="Yes, all cleaners on our platform go through a rigorous vetting process including background checks and cleaning tests. They are also insured, so you're protected in case of any accidental damage."

                    fourHeadText="Can I book recurring cleaning services?"
                    fourDesText="Absolutely! Many of our customers set up weekly, bi-weekly, or monthly cleaning schedules. You'll get the same trusted cleaner each time for consistency, and you can easily adjust or cancel your schedule at any time."

                    lastLeftText="Need more information?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Services Section ====================== */}
                <FindFreelancer
                    headText="Explore our cleaning services"
                    FindFreelancerList={ServicesList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default HomeCleaningServices;