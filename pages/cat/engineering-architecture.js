import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Legal Services Page =================== */}
const LegalServices = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Corporate Lawyers",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/corp-lawyer1.jpg"},
                {id: 2, img: "/images/corp-lawyer2.jpg"},
                {id: 3, img: "/images/corp-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Family Law Attorneys",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/family-lawyer1.jpg"},
                {id: 2, img: "/images/family-lawyer2.jpg"},
                {id: 3, img: "/images/family-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "Immigration Lawyers",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/immigration-lawyer1.jpg"},
                {id: 2, img: "/images/immigration-lawyer2.jpg"},
                {id: 3, img: "/images/immigration-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Intellectual Property Attorneys",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/ip-lawyer1.jpg"},
                {id: 2, img: "/images/ip-lawyer2.jpg"},
                {id: 3, img: "/images/ip-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "Real Estate Lawyers",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/re-lawyer1.jpg"},
                {id: 2, img: "/images/re-lawyer2.jpg"},
                {id: 3, img: "/images/re-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Tax Attorneys",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/tax-lawyer1.jpg"},
                {id: 2, img: "/images/tax-lawyer2.jpg"},
                {id: 3, img: "/images/tax-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Criminal Defense Lawyers",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/criminal-lawyer1.jpg"},
                {id: 2, img: "/images/criminal-lawyer2.jpg"},
                {id: 3, img: "/images/criminal-lawyer3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
            groupName: "Contract Specialists",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/contract-spec1.jpg"},
                {id: 2, img: "/images/contract-spec2.jpg"},
                {id: 3, img: "/images/contract-spec3.jpg"},
            ],
            link: "#"
        },
    ];

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Business Formation",
        },

        {
            id: 2,
            name: "Contract Review",
        },

        {
            id: 3,
            name: "Trademark Registration",
        },

        {
            id: 4,
            name: "Will & Estate Planning",
        },

        {
            id: 5,
            name: "Immigration Paperwork",
        },

        {
            id: 6,
            name: "Legal Consultation",
        }
    ]

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {

        headText: "Legal Services & Specializations",

        listItem: [
            {id: 1, text: "Bankruptcy Attorneys", link: "#"},
            {id: 2, text: "Business Lawyers", link: "#"},
            {id: 3, text: "Contract Lawyers", link: "#"},
            {id: 4, text: "Copyright Lawyers", link: "#"},
            {id: 5, text: "Corporate Attorneys", link: "#"},
            {id: 6, text: "Criminal Defense Lawyers", link: "#"},
            {id: 7, text: "Divorce Lawyers", link: "#"},
            {id: 8, text: "Employment Lawyers", link: "#"},
            {id: 9, text: "Estate Planning Attorneys", link: "#"},
            {id: 10, text: "Family Law Attorneys", link: "#"},
            {id: 11, text: "General Practice Lawyers", link: "#"},
            {id: 12, text: "Immigration Lawyers", link: "#"},
            {id: 13, text: "Intellectual Property Lawyers", link: "#"},
            {id: 14, text: "International Law Specialists", link: "#"},
            {id: 15, text: "Labor Lawyers", link: "#"},
            {id: 16, text: "Landlord-Tenant Lawyers", link: "#"},
            {id: 17, text: "Legal Consultants", link: "#"},
            {id: 18, text: "Litigation Attorneys", link: "#"},
            {id: 19, text: "Mediation Specialists", link: "#"},
            {id: 20, text: "Medical Malpractice Lawyers", link: "#"},
            {id: 21, text: "Mergers & Acquisitions Lawyers", link: "#"},
            {id: 22, text: "Notary Services", link: "#"},
            {id: 23, text: "Patent Attorneys", link: "#"},
            {id: 24, text: "Personal Injury Lawyers", link: "#"},
            {id: 25, text: "Real Estate Attorneys", link: "#"},
            {id: 26, text: "Tax Attorneys", link: "#"},
            {id: 27, text: "Trademark Lawyers", link: "#"},
            {id: 28, text: "Trust & Estate Lawyers", link: "#"},
            {id: 29, text: "Workers Compensation Lawyers", link: "#"},
            {id: 30, text: "Legal Document Reviewers", link: "#"}
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Legal Services & Attorneys for Hire | Find Legal Experts"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Expert legal services for businesses and individuals"}
                    des={"Connect with qualified attorneys and legal professionals for all your legal needs."}
                    btnI = {{text: "Find Legal Help", link: "#"}}
                    btnII = {{text: "Offer Legal Services", link: "#"}}
                    img={"/images/legal-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>

                {/* ================= Legal Services section ================ */}
                <TrustedExp
                    headText="Trusted legal professionals in your area"
                    rating="4.9/5"
                    ratingText="Average client satisfaction rating"
                    contracts="25K+ cases"
                    contractsText="Handled through our platform"
                    skills="50+ specializations"
                    skillsText="Available for your legal needs"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Common legal services we provide"
                    headDes="From business formation to personal legal matters, find the right professional for your needs"
                    list={WorkList}
                    imageI="/images/business-formation.jpg"
                    imageII="/images/contract-review.jpg"
                    imageIII="/images/trademark.jpg"
                    imageIv="/images/estate-planning.jpg"
                    imageV="/images/immigration.jpg"
                    imageVi="/images/legal-consult.jpg"
                    btn={{text: "Browse Legal Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Corporate legal support that scales with your business"
                    firstSubHead="A startup secured their intellectual property with expert legal guidance"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Fees:"
                    first_F_RightValue="$2,500"
                    firstDes='"The IP attorney we found through this platform was incredibly knowledgeable and helped us secure trademarks for our brand and products. They explained everything in plain English and made sure we were protected as we expanded."'
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Trademark Filing"
                    first_S_S_RightValue="Patent Search"
                    first_S_T_RightValue="Legal Consultation"
                    firstImage="/images/ip-protection.jpg"

                    secondImage="/images/divorce-case.jpg"
                    secondHead="How a family law attorney helped navigate a complex divorce"
                    secondDes="Facing a complicated divorce with significant assets and custody issues, the client was matched with an experienced family law attorney who specialized in high-net-worth divorces. The attorney negotiated a favorable settlement while maintaining professionalism throughout the emotionally charged process."
                    secondRightText="90% of clients report satisfaction with case outcomes"
                    secondLeftBtn={{text: "Read Client Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How does the legal services platform work?"
                    firstDesText="Our platform connects you with qualified legal professionals for your specific needs. You can browse attorney profiles, read reviews, and schedule consultations directly through our system."

                    secondHeadText="Are the lawyers on your platform licensed?"
                    secondDesText="Yes, all legal professionals on our platform are verified to be in good standing with their state bar associations. We confirm their licenses and check for any disciplinary history."

                    thirdHeadText="What if I need emergency legal help?"
                    thirdDesText="For urgent legal matters, we can connect you with available attorneys within hours. Look for professionals marked as 'Available Now' in their profiles."

                    fourHeadText="How are legal fees structured?"
                    fourDesText="Fees vary by service and professional. Many attorneys offer free initial consultations, flat fees for specific services, or hourly rates. All fee structures are clearly displayed before you book."

                    lastLeftText="Need legal advice?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all legal specializations"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default LegalServices;