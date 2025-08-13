import HeadTag from "../../components/HeadTag";
import Navbar from "../../components/Navbar/Navbar";
import BannerContainer from "../../components/BannerContainer";
import TrustedExp from "../../components/TrustedExp";
import PreWork from "../../components/PreWork";
import Flexible from "../../components/Flexible";
import QuestionAsk from "../../components/QuestionAsk";
import FindFreelancer from "../../components/FindFreelancer";
import Footer from "../../components/Footer";

const PetCareServices = () => {
    // ================ Card Data =================
    const CardData = [
        {
            id: 1,
            groupName: "Dog Walkers",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/dog-walker1.jpg"},
                {id: 2, img: "/images/dog-walker2.jpg"},
                {id: 3, img: "/images/dog-walker3.jpg"},
            ],
            link: "#"
        },
        {
            id: 2,
            groupName: "Pet Sitters",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pet-sitter1.jpg"},
                {id: 2, img: "/images/pet-sitter2.jpg"},
                {id: 3, img: "/images/pet-sitter3.jpg"},
            ],
            link: "#"
        },
        {
            id: 3,
            groupName: "Veterinary Assistants",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/vet-assistant1.jpg"},
                {id: 2, img: "/images/vet-assistant2.jpg"},
                {id: 3, img: "/images/vet-assistant3.jpg"},
            ],
            link: "#"
        },
        {
            id: 4,
            groupName: "Pet Groomers",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/groomer1.jpg"},
                {id: 2, img: "/images/groomer2.jpg"},
                {id: 3, img: "/images/groomer3.jpg"},
            ],
            link: "#"
        },
        {
            id: 5,
            groupName: "Pet Trainers",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/trainer1.jpg"},
                {id: 2, img: "/images/trainer2.jpg"},
                {id: 3, img: "/images/trainer3.jpg"},
            ],
            link: "#"
        },
        {
            id: 6,
            groupName: "Pet Taxi Services",
            rating: "4.8/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pet-taxi1.jpg"},
                {id: 2, img: "/images/pet-taxi2.jpg"},
                {id: 3, img: "/images/pet-taxi3.jpg"},
            ],
            link: "#"
        },
        {
            id: 7,
            groupName: "Pet Photographers",
            rating: "4.9/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/pet-photographer1.jpg"},
                {id: 2, img: "/images/pet-photographer2.jpg"},
                {id: 3, img: "/images/pet-photographer3.jpg"},
            ],
            link: "#"
        },
        {
            id: 8,
            groupName: "Pet Nutritionists",
            rating: "4.7/5",
            ratingText: "Average Rating",
            imgSection: [
                {id: 1, img: "/images/nutritionist1.jpg"},
                {id: 2, img: "/images/nutritionist2.jpg"},
                {id: 3, img: "/images/nutritionist3.jpg"},
            ],
            link: "#"
        },
    ];

    // ======================= List =============================
    const WorkList = [
        {
            id: 1,
            name: "Daily Dog Walking",
        },
        {
            id: 2,
            name: "Overnight Pet Sitting",
        },
        {
            id: 3,
            name: "Pet Grooming",
        },
        {
            id: 4,
            name: "Obedience Training",
        },
        {
            id: 5,
            name: "Veterinary Support",
        },
        {
            id: 6,
            name: "Pet Transportation",
        }
    ];

    // ===================== Find Professionals List ==========================
    const ProfessionalsList = {
        headText: "Pet Care Services",
        listItem: [
            {id: 1, text: "Cat Sitting", link: "#"},
            {id: 2, text: "Puppy Training", link: "#"},
            {id: 3, text: "Exotic Pet Care", link: "#"},
            {id: 4, text: "Pet First Aid", link: "#"},
            {id: 5, text: "Pet Massage", link: "#"},
            {id: 6, text: "Pet Acupuncture", link: "#"},
            {id: 7, text: "Dog Running", link: "#"},
            {id: 8, text: "Pet Daycare", link: "#"},
            {id: 9, text: "Pet Behaviorist", link: "#"},
            {id: 10, text: "Pet Reiki", link: "#"},
            {id: 11, text: "Pet Chiropractic", link: "#"},
            {id: 12, text: "Pet Swimming", link: "#"},
            {id: 13, text: "Pet Funeral", link: "#"},
            {id: 14, text: "Pet Portrait", link: "#"},
            {id: 15, text: "Pet Boarding", link: "#"},
            {id: 16, text: "Pet Adoption", link: "#"},
            {id: 17, text: "Pet Waste Removal", link: "#"},
            {id: 18, text: "Pet Therapy", link: "#"},
            {id: 19, text: "Pet Insurance", link: "#"},
            {id: 20, text: "Pet ID Tags", link: "#"}
        ]
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Professional Pet Care Services | Find Trusted Pet Professionals"/>

            {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>

                {/* ============ Head Container ============ */}
                <BannerContainer
                    heading="Loving care for your furry family members"
                    des="Connect with trusted pet care professionals for all your pet's needs - from walks to grooming to training."
                    btnI={{text: "Find Pet Care", link: "#"}}
                    btnII={{text: "Offer Services", link: "#"}}
                    img="/images/pet-care-banner.jpg"
                />
            </header>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= Services section ================ */}
                <TrustedExp
                    headText="Trusted pet care professionals"
                    rating="4.9/5"
                    ratingText="Average pet owner satisfaction"
                    contracts="35K+ bookings"
                    contractsText="Completed through our platform"
                    skills="50+ services"
                    skillsText="Available for your pets"
                    cardData={CardData}
                />

                {/* ============== Processing work Section ================== */}
                <PreWork
                    headText="Popular pet care services"
                    headDes="Quality care for every type of pet"
                    list={WorkList}
                    imageI="/images/dog-walking.jpg"
                    imageII="/images/pet-sitting.jpg"
                    imageIII="/images/pet-grooming.jpg"
                    imageIv="/images/pet-training.jpg"
                    imageV="/images/vet-care.jpg"
                    imageVi="/images/pet-transport.jpg"
                    btn={{text: "Browse Services", link: "#"}}
                />

                {/* ========================== Flexible Section =========================== */}
                <Flexible
                    firstHead="Transformative pet training"
                    firstSubHead="A professional trainer helped rehabilitate an aggressive dog"
                    first_F_LeftRating="5/5"
                    first_F_RightText="Results:"
                    first_F_RightValue="Complete behavior change"
                    firstDes="Our rescue dog had severe anxiety and aggression issues. After 8 weeks with the trainer, he's a completely different dog - calm and obedient and happy. The trainer used positive reinforcement methods that really worked."
                    first_S_LeftText="Services:"
                    first_S_F_RightValue="Behavior Modification"
                    first_S_S_RightValue="Obedience Training"
                    first_S_T_RightValue="Anxiety Reduction"
                    firstImage="/images/dog-training.jpg"
                    secondImage="/images/pet-grooming.jpg"
                    secondHead="How professional grooming improved a pet's health"
                    secondDes="A long-haired cat was suffering from painful matting and skin issues. Regular grooming sessions not only improved the cat's coat but revealed underlying skin conditions that were then treated by a veterinarian."
                    secondRightText="100% of pets show health improvement"
                    secondLeftBtn={{text: "Read Success Stories", link: "#"}}
                />

                {/* ========================== Frequently Asked Questions ========================== */}
                <QuestionAsk
                    firstHeadText="How do I book a pet care service?"
                    firstDesText="Simply browse our directory of pet professionals, read reviews, and book directly through their profile. Most services can be scheduled same-day or in advance."
                    secondHeadText="Are your pet care providers certified?"
                    secondDesText="All providers are vetted for experience and many hold certifications in pet first aid, grooming, training, or other specialties."
                    thirdHeadText="What if I need to cancel a booking?"
                    thirdDesText="You can cancel or reschedule through your account dashboard. Cancellation policies vary by provider."
                    fourHeadText="Do you offer services for exotic pets?"
                    fourDesText="Yes, we have specialists for birds, reptiles, small mammals, and other exotic pets."
                    lastLeftText="Need help choosing a service?"
                    lastRightBtn={{text: "Contact Support", link: "#"}}
                />

                {/* ================== Find Professionals Section ====================== */}
                <FindFreelancer
                    headText="Explore all pet care services"
                    FindFreelancerList={ProfessionalsList}
                />
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    );
};

export default PetCareServices;