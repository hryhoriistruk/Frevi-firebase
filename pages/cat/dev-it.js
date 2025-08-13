import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Home Repair & Maintenance Page =================== */}
const HomeRepairServices = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Plumbing Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/plumbing1.jpg"},
                {id: 2, img: "/images/plumbing2.jpg"},
                {id: 3, img: "/images/plumbing3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Electrical Work",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/electrical1.jpg"},
                {id: 2, img: "/images/electrical2.jpg"},
                {id: 3, img: "/images/electrical3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "HVAC Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/hvac1.jpg"},
                {id: 2, img: "/images/hvac2.jpg"},
                {id: 3, img: "/images/hvac3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Carpentry",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/carpentry1.jpg"},
                {id: 2, img: "/images/carpentry2.jpg"},
                {id: 3, img: "/images/carpentry3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "Appliance Repair",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/appliance1.jpg"},
                {id: 2, img: "/images/appliance2.jpg"},
                {id: 3, img: "/images/appliance3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Painting Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/painting1.jpg"},
                {id: 2, img: "/images/painting2.jpg"},
                {id: 3, img: "/images/painting3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Roofing",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/roofing1.jpg"},
                {id: 2, img: "/images/roofing2.jpg"},
                {id: 3, img: "/images/roofing3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
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
    ];

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Emergency Repairs",
        },

        {
            id: 2,
            name: "Home Renovations",
        },

        {
            id: 3,
            name: "Preventive Maintenance",
        },

        {
            id: 4,
            name: "Smart Home Installation",
        },

        {
            id: 5,
            name: "Furniture Assembly",
        },

        {
            id: 6,
            name: "Seasonal Maintenance",
        }
    ]

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {

        headText: "Home Repair & Maintenance Services",

        listItem: [
            {id: 1, text: "Plumbers", link: "#"},
            {id: 2, text: "Electricians", link: "#"},
            {id: 3, text: "HVAC Technicians", link: "#"},
            {id: 4, text: "Carpenters", link: "#"},
            {id: 5, text: "Appliance Repair", link: "#"},
            {id: 6, text: "Painters", link: "#"},
            {id: 7, text: "Roofers", link: "#"},
            {id: 8, text: "Handymen", link: "#"},
            {id: 9, text: "Flooring Specialists", link: "#"},
            {id: 10, text: "Window Repair", link: "#"},
            {id: 11, text: "Door Installation", link: "#"},
            {id: 12, text: "Drywall Repair", link: "#"},
            {id: 13, text: "Tile Work", link: "#"},
            {id: 14, text: "Masonry", link: "#"},
            {id: 15, text: "Deck Building", link: "#"},
            {id: 16, text: "Fence Installation", link: "#"},
            {id: 17, text: "Gutter Cleaning", link: "#"},
            {id: 18, text: "Pressure Washing", link: "#"},
            {id: 19, text: "Landscaping", link: "#"},
            {id: 20, text: "Pest Control", link: "#"},
            {id: 21, text: "Locksmiths", link: "#"},
            {id: 22, text: "Home Automation", link: "/"},
            {id: 23, text: "Insulation Installation", link: "#"},
            {id: 24, text: "Water Damage Repair", link: "#"},
            {id: 25, text: "Mold Remediation", link: "#"},
            {id: 26, text: "Chimney Sweeps", link: "#"},
            {id: 27, text: "Garage Door Repair", link: "#"},
            {id: 28, text: "Solar Panel Installation", link: "#"},
            {id: 29, text: "Home Inspectors", link: "#"},
            {id: 30, text: "Moving Assistance", link: "#"},
            {id: 31, text: "Junk Removal", link: "#"},
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Trusted Home Repair & Maintenance Professionals | Book Services Near You"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Reliable home repair and maintenance services"}
                    des={"Connect with licensed professionals for all your home improvement needs. Quality work guaranteed."}
                    btnI = {{text: "Book a Pro", link: "/"}}
                    btnII = {{text: "Become a Pro", link: "/"}}
                    img={"/images/home-repair-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>

                {/* ================= Services section ================ */}
                <TrustedExp
                    headText="Trusted home service professionals in your area"
                    rating="4.9/5"
                    ratingText="Average customer satisfaction rating"
                    contracts="35K+ bookings"
                    contractsText="Completed through our platform monthly"
                    skills="50+ services"
                    skillsText="Available for your home needs"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Home services for every need"
                    headDes="From emergency fixes to planned renovations, find the right professional for your project"
                    list={WorkList}
                    imageI="/images/emergency-repair.jpg"
                    imageII="/images/renovation.jpg"
                    imageIII="/images/maintenance.jpg"
                    imageIv="/images/smart-home.jpg"
                    imageV="/images/furniture-assembly.jpg"
                    imageVi="/images/seasonal.jpg"
                    btn={{text: "Browse Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Quality repairs you can trust"
                    firstSubHead="A licensed electrician resolved dangerous wiring issues"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Cost:"
                    first_F_RightValue="$320"
                    firstDes='"The electrician arrived on time, diagnosed the issue quickly, and fixed everything professionally. They explained what was wrong and how to prevent future problems. My home is safer now thanks to their expertise!"'
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Electrical Inspection"
                    first_S_S_RightValue="Wiring Repair"
                    first_S_T_RightValue="Safety Upgrade"
                    firstImage="/images/electrician-work.jpg"

                    secondImage="/images/kitchen-renovation.jpg"
                    secondHead="How a handyman transformed this outdated kitchen"
                    secondDes="The homeowners wanted to update their kitchen but didn't want a full renovation. A skilled handyman from our platform replaced cabinet hardware, installed a new backsplash, refinished the countertops, and updated lighting fixtures - all within budget and completed in just three days. The result was a completely refreshed look without the cost of a full remodel."
                    secondRightText="70% savings compared to full renovation"
                    secondLeftBtn={{text: "See More Projects", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How quickly can I get a home service professional?"
                    firstDesText="For emergency services, we can often connect you with a pro within 2-4 hours. Standard appointments are typically available within 24-48 hours, depending on the service and your location."

                    secondHeadText="Are your professionals licensed and insured?"
                    secondDesText="Yes, all professionals on our platform are verified for proper licensing (where required) and carry liability insurance. We also conduct background checks for your safety and peace of mind."

                    thirdHeadText="What if I'm not satisfied with the work?"
                    thirdDesText="We stand behind our professionals' work. If you're not completely satisfied, contact us within 7 days and we'll work with the professional to make it right or arrange for another qualified pro to complete the job."

                    fourHeadText="How are prices determined?"
                    fourDesText="Prices are based on the type of service, scope of work, and materials needed. Many services offer free estimates where the professional will assess your specific needs and provide a detailed quote before starting work."

                    lastLeftText="Need more information?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all home services"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default HomeRepairServices;