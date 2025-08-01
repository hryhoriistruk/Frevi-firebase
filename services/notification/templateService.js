// services/notification/templateService.js
class TemplateService {
    constructor() {
        this.templates = {
            order_created: {
                sms: (order) => `New order #${order.id}`,
                email: (order) => ({
                    subject: `Order Confirmation #${order.id}`,
                    html: `<p>Thank you for order!</p>`
                })
            }
        };
    }

    render(templateName, data, channel) {
        return this.templates[templateName][channel](data);
    }
}