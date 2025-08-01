// services/order/eventStore.js
class OrderEventStore {
    constructor() {
        this.events = [];
    }

    addEvent(orderId, eventType, payload) {
        const event = {
            eventId: uuidv4(),
            orderId,
            timestamp: new Date(),
            eventType,
            payload
        };
        this.events.push(event);
        // Send to Kafka
        kafka.produce('order-events', JSON.stringify(event));
    }

    getOrderHistory(orderId) {
        return this.events.filter(e => e.orderId === orderId);
    }
}