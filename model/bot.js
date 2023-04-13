// Define bot class
module.exports = class Bot {
    constructor(botNumber) {
        this.botNumber = botNumber;
        this.status = 'IDLE';
        this.currentOrder = null;
        this.timeoutId = null; // initialize timeout ID to null
        this.processStartTime = null;
    }

    processOrder(order, checkPendingOrders, completedOrders) {
        this.status = 'PROCESSING';
        this.currentOrder = order;
        console.log(`Bot ${this.botNumber} is now processing order ${order.orderNumber} (${order.type})`);
        this.processStartTime = new Date()
        let processingTime = this.currentOrder.processingTime
        let count = processingTime/1000;
        const intervalId = setInterval(() => {
            console.log(`Bot ${this.botNumber} is processing order ${order.orderNumber} (${order.type}), remaining ${count} seconds`)
            count--
            if (count === 0) {
                this.currentOrder.status = 'COMPLETE';
                completedOrders.push(this.currentOrder)
                console.log(`Bot ${this.botNumber} has completed processing order ${order.orderNumber} (${order.type})`);
                this.currentOrder = null;
                this.status = 'IDLE';
                checkPendingOrders();
                this.processStartTime = null;
                clearInterval(intervalId);
                console.log('intervalid', intervalId)
                this.timeoutId = null

            }
        }, 1000);
        this.timeoutId = intervalId
    }

    cancelOrder() {
        if (this.currentOrder && this.status === 'PROCESSING') {
            clearInterval(this.timeoutId);
            this.currentOrder.status = 'PENDING';
            console.log(`Order ${this.currentOrder.orderNumber} (${this.currentOrder.type}) has been cancelled`);
            this.currentOrder = null;
            this.status = 'IDLE';
        } else {
            console.log(`Bot ${this.botNumber} has no order to cancel`);
        }
    }
}