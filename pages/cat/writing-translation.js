import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

/* ============== Fitness & Personal Training Services Page =================== */
const FitnessTraining = () => {
    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Personal Trainers",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/personal-trainer1.jpg"},
                {id: 2, img: "/images/personal-trainer2.jpg"},
                {id: 3, img: "/images/personal-trainer3.jpg"},
            ],
            link: "#"
        },
        {
            id: 2,
            groupName: "Yoga Instructors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/yoga-instructor1.jpg"},
                {id: 2, img: "/images/yoga-instructor2.jpg"},
                {id: 3, img: "/images/yoga-instructor3.jpg"},
            ],
            link: "#"
        },
        {
            id: 3,
            groupName: "Pilates Instructors",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pilates-instructor1.jpg"},
                {id: 2, img: "/images/pilates-instructor2.jpg"},
                {id: 3, img: "/images/pilates-instructor3.jpg"},
            ],
            link: "#"
        },
        {
            id: 4,
            groupName: "Nutrition Coaches",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/nutrition-coach1.jpg"},
                {id: 2, img: "/images/nutrition-coach2.jpg"},
                {id: 3, img: "/images/nutrition-coach3.jpg"},
            ],
            link: "#"
        },
        {
            id: 5,
            groupName: "CrossFit Trainers",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/crossfit-trainer1.jpg"},
                {id: 2, img: "/images/crossfit-trainer2.jpg"},
                {id: 3, img: "/images/crossfit-trainer3.jpg"},
            ],
            link: "#"
        },
        {
            id: 6,
            groupName: "Dance Instructors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/dance-instructor1.jpg"},
                {id: 2, img: "/images/dance-instructor2.jpg"},
                {id: 3, img: "/images/dance-instructor3.jpg"},
            ],
            link: "#"
        },
        {
            id: 7,
            groupName: "Martial Arts Coaches",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/martial-arts-coach1.jpg"},
                {id: 2, img: "/images/martial-arts-coach2.jpg"},
                {id: 3, img: "/images/martial-arts-coach3.jpg"},
            ],
            link: "#"
        },
        {
            id: 8,
            groupName: "Senior Fitness Specialists",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/senior-fitness1.jpg"},
                {id: 2, img: "/images/senior-fitness2.jpg"},
                {id: 3, img: "/images/senior-fitness3.jpg"},
            ],
            link: "#"
        }
    ];

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Personal Training",
        },
        {
            id: 2,
            name: "Group Fitness",
        },
        {
            id: 3,
            name: "Online Coaching",
        },
        {
            id: 4,
            name: "Nutrition Planning",
        },
        {
            id: 5,
            name: "Rehabilitation",
        },
        {
            id: 6,
            name: "Sports Conditioning",
        }
    ];

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {
        headText: "Fitness & Training Services",
        listItem: [
            {id: 1, text: "Weight Loss Coaches", link: "#"},
            {id: 2, text: "Strength Coaches", link: "#"},
            {id: 3, text: "Postnatal Fitness", link: "#"},
            {id: 4, text: "Prehab Specialists", link: "#"},
            {id: 5, text: "TRX Instructors", link: "#"},
            {id: 6, text: "Kettlebell Trainers", link: "#"},
            {id: 7, text: "Barre Instructors", link: "#"},
            {id: 8, text: "Spin Instructors", link: "#"},
            {id: 9, text: "Bootcamp Trainers", link: "#"},
            {id: 10, text: "Functional Trainers", link: "#"},
            {id: 11, text: "Corrective Exercise", link: "#"},
            {id: 12, text: "Athletic Performance", link: "#"},
            {id: 13, text: "Bodybuilding Coaches", link: "#"},
            {id: 14, text: "Mind-Body Instructors", link: "#"},
            {id: 15, text: "Kids Fitness", link: "#"},
            {id: 16, text: "Aqua Fitness", link: "#"},
            {id: 17, text: "Corporate Wellness", link: "#"},
            {id: 18, text: "Injury Prevention", link: "#"},
            {id: 19, text: "Flexibility Training", link: "#"},
            {id: 20, text: "Endurance Coaching", link: "#"}
        ]
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Fitness & Personal Training Services | Find Trainers Near You"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading="Achieve your fitness goals with expert trainers"
                    des="Connect with certified fitness professionals for personalized training, nutrition guidance, and wellness coaching."
                    btnI={{text: "Find a Trainer", link: "#"}}
                    btnII={{text: "Offer Services", link: "#"}}
                    img="/images/fitness-banner.jpg"
                />
            </header>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= Services section ================ */}
                <TrustedExp
                    headText="Certified fitness professionals you can trust"
                    rating="4.9/5"
                    ratingText="Average client satisfaction"
                    contracts="25K+ sessions"
                    contractsText="Completed through our platform"
                    skills="50+ specialties"
                    skillsText="Available for your fitness needs"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Comprehensive fitness services"
                    headDes="From personal training to specialized coaching, find the right professional for your goals"
                    list={WorkList}
                    imageI="/images/personal-training.jpg"
                    imageII="/images/group-fitness.jpg"
                    imageIII="/images/online-coaching.jpg"
                    imageIv="/images/nutrition-planning.jpg"
                    imageV="/images/rehabilitation.jpg"
                    imageVi="/images/sports-conditioning.jpg"
                    btn={{text: "Browse Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Transformative fitness journeys"
                    firstSubHead="A personal trainer helped client lose 50 pounds"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Results:"
                    first_F_RightValue="50 lbs lost in 6 months"
                    firstDes="My trainer was incredibly knowledgeable and supportive throughout my entire journey. They created customized workouts that fit my schedule and adapted as my fitness improved. I couldn't have done it without their guidance!"
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Weight Loss"
                    first_S_S_RightValue="Strength Training"
                    first_S_T_RightValue="Nutrition Coaching"
                    firstImage="/images/weight-loss.jpg"
                    secondImage="/images/senior-fitness.jpg"
                    secondHead="How fitness training improved mobility for seniors"
                    secondDes="A group of seniors participating in specialized fitness classes saw dramatic improvements in mobility, balance, and overall quality of life. Many reported reduced joint pain and increased independence in daily activities."
                    secondRightText="85% improvement in mobility scores"
                    secondLeftBtn={{text: "Read Success Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How do I choose the right trainer?"
                    firstDesText="Consider your fitness goals, preferred training style, and schedule. Our platform lets you filter trainers by specialty, certification, and availability to find the perfect match."
                    secondHeadText="What certifications do your trainers have?"
                    secondDesText="All trainers are verified for current certifications from accredited organizations like NASM, ACE, ACSM, or other nationally recognized programs."
                    thirdHeadText="Can I do online training sessions?"
                    thirdDesText="Yes, many trainers offer virtual sessions via video call. You can filter for online-only trainers or those offering both in-person and virtual options."
                    fourHeadText="What if I need to cancel a session?"
                    fourDesText="Cancellation policies vary by trainer but typically require 24 hours notice. You can manage bookings through your account dashboard."
                    lastLeftText="Need help finding the right trainer?"
                    lastRightBtn={{text: "Get Personalized Recommendations", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all fitness specialties"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    );
};

export default FitnessTraining;