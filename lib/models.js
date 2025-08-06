// lib/models.js
export const userRoles = {
    JOB_SEEKER: 'job_seeker',
    EMPLOYER: 'employer'
};

export const jobPostSchema = {
    title: '',
    companyId: '',
    companyName: '',
    description: '',
    location: '',
    remote: false,
    salaryRange: {
        min: 0,
        max: 0,
        currency: 'USD'
    },
    skillsRequired: [],
    createdAt: new Date()
};