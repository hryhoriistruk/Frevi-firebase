import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Home Renovation Services Page =================== */}
const HomeRenovationServices = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "General Contractors",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/contractor1.jpg"},
                {id: 2, img: "/images/contractor2.jpg"},
                {id: 3, img: "/images/contractor3.jpg"},
            ],
            link: "#"
        },
        {
            id: 2,
            groupName: "Plumbing Specialists",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/plumber1.jpg"},
                {id: 2, img: "/images/plumber2.jpg"},
                {id: 3, img: "/images/plumber3.jpg"},
            ],
            link: "#"
        },
        {
            id: 3,
            groupName: "Electricians",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/electrician1.jpg"},
                {id: 2, img: "/images/electrician2.jpg"},
                {id: 3, img: "/images/electrician3.jpg"},
            ],
            link: "#"
        },
        {
            id: 4,
            groupName: "Carpenters",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/carpenter1.jpg"},
                {id: 2, img: "/images/carpenter2.jpg"},
                {id: 3, img: "/images/carpenter3.jpg"},
            ],
            link: "#"
        },
        {
            id: 5,
            groupName: "Painters",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/painter1.jpg"},
                {id: 2, img: "/images/painter2.jpg"},
                {id: 3, img: "/images/painter3.jpg"},
            ],
            link: "#"
        },
        {
            id: 6,
            groupName: "Flooring Experts",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/flooring1.jpg"},
                {id: 2, img: "/images/flooring2.jpg"},
                {id: 3, img: "/images/flooring3.jpg"},
            ],
            link: "#"
        },
        {
            id: 7,
            groupName: "HVAC Technicians",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/hvac-tech1.jpg"},
                {id: 2, img: "/images/hvac-tech2.jpg"},
                {id: 3, img: "/images/hvac-tech3.jpg"},
            ],
            link: "#"
        },
        {
            id: 8,
            groupName: "Handyman Services",
            rating: "4.7/5",
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
            name: "Kitchen Remodeling",
        },
        {
            id: 2,
            name: "Bathroom Renovation",
        },
        {
            id: 3,
            name: "Roofing Services",
        },
        {
            id: 4,
            name: "Window Installation",
        },
        {
            id: 5,
            name: "Deck Building",
        },
        {
            id: 6,
            name: "Basement Finishing",
        }
    ]

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {
        headText: "Home Improvement Services",
        listItem: [
            {id: 1, text: "Drywall Installation", link: "#"},
            {id: 2, text: "Tile Work", link: "#"},
            {id: 3, text: "Masonry", link: "#"},
            {id: 4, text: "Cabinet Installation", link: "#"},
            {id: 5, text: "Countertop Installation", link: "#"},
            {id: 6, text: "Appliance Installation", link: "#"},
            {id: 7, text: "Lighting Installation", link: "#"},
            {id: 8, text: "Fence Installation", link: "#"},
            {id: 9, text: "Gutter Cleaning", link: "#"},
            {id: 10, text: "Pressure Washing", link: "#"},
            {id: 11, text: "Landscaping", link: "#"},
            {id: 12, text: "Concrete Work", link: "#"},
            {id: 13, text: "Siding Installation", link: "#"},
            {id: 14, text: "Insulation Installation", link: "#"},
            {id: 15, text: "Waterproofing", link: "#"},
            {id: 16, text: "Smart Home Installation", link: "#"},
            {id: 17, text: "Home Additions", link: "#"},
            {id: 18, text: "Garage Door Repair", link: "#"},
            {id: 19, text: "Chimney Repair", link: "#"},
            {id: 20, text: "Pest Control", link: "#"}
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Home Renovation & Repair Services | Find Local Contractors"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Transform your home with trusted professionals"}
                    des={"From small repairs to complete renovations, connect with licensed contractors in your area."}
                    btnI = {{text: "Find a Pro", link: "#"}}
                    btnII = {{text: "Offer Services", link: "#"}}
                    img={"/images/renovation-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= Services section ================ */}
                <TrustedExp
                    headText="Top-rated home improvement professionals"
                    rating="4.9/5"
                    ratingText="Average customer satisfaction"
                    contracts="25K+ projects"
                    contractsText="Completed through our platform"
                    skills="50+ services"
                    skillsText="Available for your home"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Popular home renovation services"
                    headDes="Quality workmanship for every area of your home"
                    list={WorkList}
                    imageI="/images/kitchen-remodel.jpg"
                    imageII="/images/bathroom-reno.jpg"
                    imageIII="/images/roofing.jpg"
                    imageIv="/images/windows.jpg"
                    imageV="/images/deck.jpg"
                    imageVi="/images/basement.jpg"
                    btn={{text: "Browse Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Complete kitchen transformation"
                    firstSubHead="A contractor remodeled this outdated kitchen in just 3 weeks"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Project Cost:"
                    first_F_RightValue="$24,500"
                    firstDes='"The contractor was professional, on-time, and delivered exactly what we envisioned. Our new kitchen is both beautiful and functional. The team cleaned up every day and kept us informed throughout the process."'
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Cabinetry"
                    first_S_S_RightValue="Countertops"
                    first_S_T_RightValue="Lighting"
                    firstImage="/images/kitchen-before-after.jpg"

                    secondImage="/images/bathroom-reno.jpg"
                    secondHead="How a bathroom renovation increased home value"
                    secondDes="Homeowners invested in a complete bathroom remodel that not only improved their daily life but increased their property value by 15%. The project included new tile, fixtures, plumbing upgrades, and custom storage solutions."
                    secondRightText="72% ROI on renovation costs"
                    secondLeftBtn={{text: "View Project Gallery", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How do I find the right contractor?"
                    firstDesText="Browse profiles by specialty, read reviews from previous clients, and compare quotes. Our platform verifies all contractors' licenses and insurance."

                    secondHeadText="What's included in a free estimate?"
                    secondDesText="Most contractors provide a detailed breakdown of costs, timeline, materials, and scope of work during free consultations."

                    thirdHeadText="Do you offer financing options?"
                    thirdDesText="Many contractors partner with financing companies. Look for the 'Financing Available' badge on profiles."

                    fourHeadText="How are payments handled?"
                    fourDesText="We recommend paying in milestones - typically a deposit to start, progress payments, and final payment upon completion."

                    lastLeftText="Need help planning your project?"
                    lastRightBtn={{text: "Get Free Consultation", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all home improvement services"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default HomeRenovationServices;