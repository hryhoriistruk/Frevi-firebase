import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

{/* ============== Education & Tutoring Services Page =================== */}
const EducationTutoring = () => {

    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Math Tutors",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/math-tutor1.jpg"},
                {id: 2, img: "/images/math-tutor2.jpg"},
                {id: 3, img: "/images/math-tutor3.jpg"},
            ],
            link: "#"
        },

        {
            id: 2,
            groupName: "Science Tutors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/science-tutor1.jpg"},
                {id: 2, img: "/images/science-tutor2.jpg"},
                {id: 3, img: "/images/science-tutor3.jpg"},
            ],
            link: "#"
        },

        {
            id: 3,
            groupName: "Language Tutors",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/language-tutor1.jpg"},
                {id: 2, img: "/images/language-tutor2.jpg"},
                {id: 3, img: "/images/language-tutor3.jpg"},
            ],
            link: "#"
        },

        {
            id: 4,
            groupName: "Test Prep Experts",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/testprep1.jpg"},
                {id: 2, img: "/images/testprep2.jpg"},
                {id: 3, img: "/images/testprep3.jpg"},
            ],
            link: "#"
        },

        {
            id: 5,
            groupName: "College Counselors",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/counselor1.jpg"},
                {id: 2, img: "/images/counselor2.jpg"},
                {id: 3, img: "/images/counselor3.jpg"},
            ],
            link: "#"
        },

        {
            id: 6,
            groupName: "Music Teachers",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/music-teacher1.jpg"},
                {id: 2, img: "/images/music-teacher2.jpg"},
                {id: 3, img: "/images/music-teacher3.jpg"},
            ],
            link: "#"
        },

        {
            id: 7,
            groupName: "Special Education Tutors",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/special-ed1.jpg"},
                {id: 2, img: "/images/special-ed2.jpg"},
                {id: 3, img: "/images/special-ed3.jpg"},
            ],
            link: "#"
        },

        {
            id: 8,
            groupName: "Coding Instructors",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/coding-teacher1.jpg"},
                {id: 2, img: "/images/coding-teacher2.jpg"},
                {id: 3, img: "/images/coding-teacher3.jpg"},
            ],
            link: "#"
        },
    ];

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Academic Tutoring",
        },

        {
            id: 2,
            name: "Test Preparation",
        },

        {
            id: 3,
            name: "College Admissions",
        },

        {
            id: 4,
            name: "Language Learning",
        },

        {
            id: 5,
            name: "Music Lessons",
        },

        {
            id: 6,
            name: "Professional Development",
        }
    ]

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {

        headText: "Education & Tutoring Services",

        listItem: [
            {id: 1, text: "Algebra Tutors", link: "#"},
            {id: 2, text: "Biology Tutors", link: "#"},
            {id: 3, text: "Chemistry Tutors", link: "#"},
            {id: 4, text: "English Tutors", link: "#"},
            {id: 5, text: "French Tutors", link: "#"},
            {id: 6, text: "German Tutors", link: "#"},
            {id: 7, text: "History Tutors", link: "#"},
            {id: 8, text: "IELTS Prep Tutors", link: "#"},
            {id: 9, text: "Japanese Tutors", link: "#"},
            {id: 10, text: "Kindergarten Tutors", link: "#"},
            {id: 11, text: "Literature Tutors", link: "#"},
            {id: 12, text: "Math Competition Tutors", link: "#"},
            {id: 13, text: "Physics Tutors", link: "#"},
            {id: 14, text: "Reading Tutors", link: "#"},
            {id: 15, text: "SAT Prep Tutors", link: "#"},
            {id: 16, text: "Spanish Tutors", link: "#"},
            {id: 17, text: "TOEFL Prep Tutors", link: "#"},
            {id: 18, text: "Writing Tutors", link: "#"},
            {id: 19, text: "ACT Prep Tutors", link: "#"},
            {id: 20, text: "Art Tutors", link: "#"},
            {id: 21, text: "Calculus Tutors", link: "#"},
            {id: 22, text: "Computer Science Tutors", link: "#"},
            {id: 23, text: "Drama Tutors", link: "#"},
            {id: 24, text: "Economics Tutors", link: "#"},
            {id: 25, text: "Essay Editing", link: "#"},
            {id: 26, text: "Geometry Tutors", link: "#"},
            {id: 27, text: "Grammar Tutors", link: "#"},
            {id: 28, text: "Mandarin Tutors", link: "#"},
            {id: 29, text: "Piano Teachers", link: "#"},
            {id: 30, text: "Statistics Tutors", link: "#"}
        ]
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Tutors & Educators | Find Learning Support Online"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading={"Personalized learning with expert educators"}
                    des={"Connect with qualified tutors and instructors for all subjects and skill levels."}
                    btnI = {{text: "Find a Tutor", link: "#"}}
                    btnII = {{text: "Become a Tutor", link: "#"}}
                    img={"/images/education-banner.jpg"}
                />
            </header>

            {/* ================= Main ==================== */}
            <main>

                {/* ================= Education Services section ================ */}
                <TrustedExp
                    headText="Top-rated educators and tutors"
                    rating="4.9/5"
                    ratingText="Average student satisfaction rating"
                    contracts="50K+ sessions"
                    contractsText="Completed through our platform monthly"
                    skills="100+ subjects"
                    skillsText="Available for your learning needs"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Comprehensive learning services"
                    headDes="From academic support to skill development, find the right educator for your needs"
                    list={WorkList}
                    imageI="/images/academic-tutoring.jpg"
                    imageII="/images/test-prep.jpg"
                    imageIII="/images/college-counseling.jpg"
                    imageIv="/images/language-learning.jpg"
                    imageV="/images/music-lessons.jpg"
                    imageVi="/images/prof-dev.jpg"
                    btn={{text: "Browse Learning Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Transformative learning experiences"
                    firstSubHead="A math tutor helped a struggling student achieve academic success"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Results:"
                    first_F_RightValue="Grade improved from D to A"
                    firstDes='"My daughter was struggling with algebra and nearly failing. After just 8 weeks with her tutor, she not only caught up but became one of the top students in her class. The personalized approach made all the difference!"'
                    first_S_LeftText="Subjects:"
                    first_S_F_RightValue="Algebra"
                    first_S_S_RightValue="Study Skills"
                    first_S_T_RightValue="Test Strategies"
                    firstImage="/images/math-success.jpg"

                    secondImage="/images/language-success.jpg"
                    secondHead="How language tutoring opened new opportunities"
                    secondDes="A professional needed to learn Spanish quickly for an international assignment. Through intensive sessions with a native-speaking tutor, they achieved conversational fluency in just 3 months, allowing them to confidently take on the new role abroad."
                    secondRightText="92% of students achieve their learning goals"
                    secondLeftBtn={{text: "Read Success Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How does online tutoring work?"
                    firstDesText="Our platform connects you with educators for virtual sessions via video chat. You can schedule sessions at convenient times and access learning materials through our secure platform."

                    secondHeadText="Are your tutors qualified?"
                    secondDesText="Yes, all tutors are vetted for subject expertise and teaching experience. Many hold advanced degrees and teaching certifications in their fields."

                    thirdHeadText="What technology do I need for sessions?"
                    thirdDesText="You'll need a computer or tablet with a webcam, microphone, and internet connection. Most sessions use our built-in video platform or Zoom."

                    fourHeadText="Can I get help with homework assignments?"
                    fourDesText="Yes, many tutors specialize in homework help. They'll guide you through concepts and problem-solving without providing direct answers."

                    lastLeftText="Need help choosing a tutor?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all tutoring subjects"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default EducationTutoring;