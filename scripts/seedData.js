// scripts/seedData.js
async function seedTestData() {
    await User.create({
        email: 'admin@example.com',
        role: 'ADMIN',
        password: await hashPassword('admin123')
    });
}