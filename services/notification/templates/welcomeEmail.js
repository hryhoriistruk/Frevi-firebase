// services/notification/templates/welcomeEmail.js
module.exports = (user) => ({
    subject: `Welcome, ${user.name}!`,
    html: `
    <h1>Account Activated</h1>
    <p>Your verification code: ${user.verificationCode}</p>
  `,
    text: `Welcome ${user.name}! Your code: ${user.verificationCode}`
});