import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Healthcare & Wellness Services Page =================== */}
const HealthcareWellness = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "General Practitioners",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/gp1.jpg"},
                {id: 2, img: "/images/gp2.jpg"},
                {id: 3, img: "/images/gp3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Physical Therapists",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pt1.jpg"},
                {id: 2, img: "/images/pt2.jpg"},
                {id: 3, img: "/images/pt3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "Nutritionists",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/nutri1.jpg"},
                {id: 2, img: "/images/nutri2.jpg"},
                {id: 3, img: "/images/nutri3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Mental Health Counselors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/mhc1.jpg"},
                {id: 2, img: "/images/mhc2.jpg"},
                {id: 3, img: "/images/mhc3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "Yoga Instructors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/yoga1.jpg"},
                {id: 2, img: "/images/yoga2.jpg"},
                {id: 3, img: "/images/yoga3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Massage Therapists",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/massage1.jpg"},
                {id: 2, img: "/images/massage2.jpg"},
                {id: 3, img: "/images/massage3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Dentists",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/dentist1.jpg"},
                {id: 2, img: "/images/dentist2.jpg"},
                {id: 3, img: "/images/dentist3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
            groupName: "Personal Trainers",
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

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Medical Consultations",
        },

        {
            id: 2,
            name: "Physical Rehabilitation",
        },

        {
            id: 3,
            name: "Nutrition Planning",
        },

        {
            id: 4,
            name: "Mental Health Support",
        },

        {
            id: 5,
            name: "Fitness Training",
        },

        {
            id: 6,
            name: "Preventive Care",
        }
    ]

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {

        headText: "Healthcare & Wellness Services",

        listItem: [
            {id: 1, text: "Acupuncturists", link: "#"},
            {id: 2, text: "Allergists", link: "#"},
            {id: 3, text: "Ayurvedic Practitioners", link: "#"},
            {id: 4, text: "Cardiologists", link: "#"},
            {id: 5, text: "Chiropractors", link: "#"},
            {id: 6, text: "Dermatologists", link: "#"},
            {id: 7, text: "Dietitians", link: "#"},
            {id: 8, text: "Ear Nose Throat Specialists", link: "#"},
            {id: 9, text: "Endocrinologists", link: "#"},
            {id: 10, text: "Family Medicine Doctors", link: "#"},
            {id: 11, text: "Functional Medicine Doctors", link: "#"},
            {id: 12, text: "Geriatric Specialists", link: "#"},
            {id: 13, text: "Health Coaches", link: "#"},
            {id: 14, text: "Holistic Practitioners", link: "#"},
            {id: 15, text: "Immunologists", link: "#"},
            {id: 16, text: "Lactation Consultants", link: "#"},
            {id: 17, text: "Naturopathic Doctors", link: "#"},
            {id: 18, text: "Occupational Therapists", link: "#"},
            {id: 19, text: "Osteopaths", link: "#"},
            {id: 20, text: "Pediatricians", link: "#"},
            {id: 21, text: "Pilates Instructors", link: "#"},
            {id: 22, text: "Psychiatrists", link: "#"},
            {id: 23, text: "Reflexologists", link: "#"},
            {id: 24, text: "Speech Therapists", link: "#"},
            {id: 25, text: "Surgeons", link: "#"},
            {id: 26, text: "Traditional Chinese Medicine", link: "#"},
            {id: 27, text: "Urologists", link: "#"},
            {id: 28, text: "Veterinarians", link: "#"},
            {id: 29, text: "Weight Loss Specialists", link: "#"},
            {id: 30, text: "Wellness Coaches", link: "#"}
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Healthcare & Wellness Services | Find Doctors & Specialists"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Your health and wellness journey starts here"}
                    des={"Connect with licensed healthcare providers and wellness experts for personalized care."}
                    btnI = {{text: "Find Providers", link: "#"}}
                    btnII = {{text: "Join as Provider", link: "#"}}
                    img={"/images/healthcare-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>

                {/* ================= Services section ================ */}
                <TrustedExp
                    headText="Trusted healthcare and wellness professionals"
                    rating="4.9/5"
                    ratingText="Average patient satisfaction rating"
                    contracts="50K+ consultations"
                    contractsText="Completed through our platform monthly"
                    skills="100+ specialties"
                    skillsText="Available for your health needs"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Comprehensive health and wellness services"
                    headDes="From preventive care to specialized treatments, find the right professional for your needs"
                    list={WorkList}
                    imageI="/images/consultation.jpg"
                    imageII="/images/rehab.jpg"
                    imageIII="/images/nutrition.jpg"
                    imageIv="/images/mental-health.jpg"
                    imageV="/images/fitness.jpg"
                    imageVi="/images/preventive.jpg"
                    btn={{text: "Browse Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Personalized care that makes a difference"
                    firstSubHead="A nutritionist helped transform a client's health journey"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Cost:"
                    first_F_RightValue="$1,200"
                    firstDes='"Working with my nutritionist completely changed my relationship with food. She created a customized plan that fit my lifestyle and health goals. After 6 months, I lost 25 pounds and my blood work improved dramatically!"'
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Meal Planning"
                    first_S_S_RightValue="Nutrition Coaching"
                    first_S_T_RightValue="Lifestyle Changes"
                    firstImage="/images/nutrition-success.jpg"

                    secondImage="/images/pt-success.jpg"
                    secondHead="How physical therapy helped recover from injury"
                    secondDes="After a serious knee injury, the patient was matched with a specialized physical therapist who developed a progressive rehabilitation program. Through virtual and in-person sessions over 12 weeks, the patient regained full mobility and returned to their active lifestyle pain-free."
                    secondRightText="95% recovery rate for similar cases"
                    secondLeftBtn={{text: "Read Success Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How do I book an appointment with a healthcare provider?"
                    firstDesText="Simply browse our directory of providers, select the professional that matches your needs, and book an appointment directly through their profile. Many providers offer same-day or next-day availability."

                    secondHeadText="Are all providers licensed and verified?"
                    secondDesText="Yes, we verify all healthcare providers' licenses and credentials before they join our platform. You can view each provider's qualifications and certifications on their profile."

                    thirdHeadText="Can I use insurance for these services?"
                    thirdDesText="Many providers accept insurance. You can filter providers by insurance acceptance and check individual profiles for specific insurance information."

                    fourHeadText="What if I need to cancel or reschedule an appointment?"
                    fourDesText="You can easily cancel or reschedule appointments through your account dashboard. Please check each provider's cancellation policy, as cancellation fees may apply for late changes."

                    lastLeftText="Need help finding the right provider?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all healthcare specialties"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default HealthcareWellness;