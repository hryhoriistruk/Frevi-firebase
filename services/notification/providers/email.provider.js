/**
 * Email notifications via Nodemailer.
 */
const nodemailer = require('nodemailer');

class EmailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
    }

    async send(to, subject, text) {
        await this.transporter.sendMail({ to, subject, text });
    }
}

module.exports = EmailProvider;