
/**
 * Represents a line in an order
 */
export interface OrderLineItem {

    /**
     * Note for the given line
     */
    note: string | null;

    /**
     * Ref to the product
     */
    product_id: string;

    /**
     * Number of products in the given line
     */
    quantity: number;

    /**
     * Name of the product at the time of order
     */
    product_title: string;

    /**
     * Unit price of the product at the time of order
     */
    unit_price: number;

    /**
     * Total amount of the order
     */
    total_line: number;
}

/**
 * Status an order can be in
 */
export enum OrderStatus {
    /**
     * Order just created
     */
    OPEN = 'OPEN',
    /**
     * Order paid. Pending further processing
     */
    PAID_PENDING_PROCESSING = 'PAID_PENDING_PROCESSING',
    /**
     * Order in process (kitchen/bar)
     */
    IN_PROCESS = 'IN_PROCESS',
    /**
     * Order was processed and is ready for delivery by waitress
     */
    READY_FOR_DELIVERY = 'READY_FOR_DELIVERY',
    /**
     * Order was delivered and completed.
     */
    FULFILLED = 'FULFILLED'
}

/**
 * Represents a customer order
 */
export interface Order {

    /**
     * id of the order
     */
    id?: string;

    /**
     * Status of the current order
     */
     status: OrderStatus;

    /**
     * Date of when the order was created in the server
     */
    created_at?: Date;

    /**
     * Ref to the customer that created this order
     */
    customer_id: string | null;

    /**
     * Total discount of the order
     */
    discount: number;

    /**
     * Date and time of when the order was marked as fulfilled
     */
    fulfilled_at: Date | null;

    /**
     * General note for the complete ticket
     */
    general_note: string | null;

    /**
     * List of all lines within the order
     */
    line_items: OrderLineItem[]

    /**
     * In case of presential payment: Ref to the waiter that confirmed the payment, otherwise null
     */
     payment_confirmed_by_waiter_id: string | null;

    /**
     * Ref to the waiter that delivered the order. Otherwise null
     */
    delivered_by_waiter_id: string | null;
    
    /**
     * Destination of the order or null if the order is made directly in the restaurant
     */
    table_number: number | null;

    /**
     * Tip given by the user
     */
    tip: number;

    /**
     * total price of the order, including all lines, discounts and tip
     */
    total_price: number;
}