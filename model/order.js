// Define order class
module.exports = class Order {
    constructor(orderNumber, type) {
        this.orderNumber = orderNumber;
        this.type = type;
        this.status = 'PENDING';
        this.processingTime = 1; // 10 seconds
    }
}