import {OrderModel} from "../model/OrderModel.js";
import {customers} from "../db/db.js";
import {items} from "../db/db.js";
import {orders} from "../db/db.js";
import {orderDetails} from "../db/db.js";
import {OrderDetailModel} from "../model/OrderDetailModel.js";
import {loadOrderTable} from "./orderDetails.js";

var index = 0;
var current_id = orders.length + 1;
let cart = [];

const order_id = $('#order_Id');
const customer_id = $('#custId');
const date = $('#orderDate');
const item_Id = $('#item_Id');
const order_qty = $('#order_quantity');

const customer_name = $('#custName');
const qty_on_hand = $('#qtyOnHand');
const description = $('#desc');
const unit_price = $('#unit_price');
const net_total = $('.net_total span:nth-child(2)');
const sub_total = $('.sub_total span:nth-child(2)');
const discount = $('#discount');
const cash = $('#cash');
const balance = $('#balance');

const cart_btn = $('.cart_btn');
const order_btn = $('.order_btn');


initialize()

function initialize() {
   var newId = generateOrderId(); order_id.val(newId)
    setCustomerIds(customers)
}

export function setCustomerIds(data) {
    customer_id.empty();
    customer_id.append('<option selected>select the customer</option>');

    for (let i = 0; i < data.length; i++) {
        customer_id.append('<option value="' + (i + 1) + '">' + data[i].id + '</option>');
    }
}

export function setItemIds(data) {
    item_Id.empty();
    item_Id.append('<option selected>select the item</option>');

    for (let i = 0; i < data.length; i++) {
        item_Id.append('<option value="' + (i + 1) + '">' + data[i].itemCode + '</option>');
    }
}

customer_id.on('input', () => {
    if (customer_id.val() !== 'select the customer'){
        customer_name.val(customers[customer_id.val() - 1].name);
    }else{
        customer_name.val('');
    }
});

item_Id.on('input', () => {
    if (item_Id.val() !== 'select the customer'){
        description.val(items[item_Id.val() - 1].description);
        qty_on_hand.val(items[item_Id.val() - 1].qty);
        unit_price.val(items[item_Id.val() - 1].unitPrice);
    }else{
        description.val('');
        qty_on_hand.val('');
        unit_price.val('');
    }
});
//set date value
const formattedDate = new Date().toISOString().substr(0, 10);
date.val(formattedDate);

//add to cart part
cart_btn.on('click', () => {
    let itemId = item_Id.val();
    let orderQTY = parseInt(order_qty.val());
    let unitPrice = unit_price.val();
    let qty = qty_on_hand.val();

        let total = unitPrice * orderQTY;

        if (qty >= orderQTY) {
            let cartItemIndex = cart.findIndex(cartItem => cartItem.itemId === itemId);
            if (cartItemIndex < 0) {
                let cart_item = {
                    itemId: itemId,
                    unitPrice: unitPrice,
                    qty: orderQTY,
                    total: total
                }
                cart.push(cart_item);
                loadCart();
                setTotalValues()
                clearItemSection();
            } else {
                cart[cartItemIndex].qty += orderQTY;
                cart[cartItemIndex].total = cart[cartItemIndex].qty * cart[cartItemIndex].unitPrice;
                loadCart();
                setTotalValues()
                clearItemSection();
            }
        } else {
            swal.fire({icon:'warning',title:'please enter a available quantity',});

        }

});

function loadCart() {
    $('tbody').eq(2).empty();
    cart.map((item) => {
        $('tbody').eq(2).append(
            `<tr>
                <th scope="row">${item.itemId}</th>
                <td>${item.unitPrice}</td>
                <td>${item.qty}</td>
                <td>${item.total}</td>
                <td><button class="cart_remove" data-id="${item.itemId}">Remove</button></td>
            </tr>`
        );
    });
}

function setTotalValues(){
    let netTotal = calculateTotal();
    net_total.text(`${netTotal}/=`);

    let discount_percentage = discount.val() || 0;
    let discountAmount = (netTotal * discount_percentage) / 100;
    sub_total.text(`${netTotal - discountAmount}/=`);
}

function calculateTotal(){
    let netTotal = 0;
    cart.map((cart_item) => {
        netTotal += cart_item.total;
    });
    return netTotal;
}

function clearItemSection() {
    item_Id.val('select the item');
    description.val('');
    qty_on_hand.val('');
    unit_price.val('');
    order_qty.val('');
}

function setBalance(){
    let subTotal = parseFloat(sub_total.text());
    let cashAmount = parseFloat(cash.val());
    balance.val(cashAmount - subTotal);
}

cash.on('input', () => setBalance());

//get total value
discount.on('input', () => {
    let discountValue = parseFloat(discount.val()) || 0;
    if (discountValue < 0 || discountValue > 100) {
        discountValue = Math.min(100, Math.max(0, discountValue));
        discount.val(discountValue);
    }

    let total_value = calculateTotal();
    let discountAmount = (total_value * discountValue) / 100;
    sub_total.text(`${total_value - discountAmount}/=`);
    setBalance();
});

$('tbody').on('click', '.cart_remove', function() {
    const item_Id = $(this).data('id');
    console.log(item_Id)
    const index = item_Id - 1;

            if (index !== -1) {
                cart.splice(index, 1);
                loadCart();
                setTotalValues();
            }

});

order_btn.on('click', () => {
    let orderId = order_id.val();
    let order_date = date.val();
    let customerId = customer_id.val();
    let subTotal = parseFloat(sub_total.text());
    let cashAmount = parseFloat(cash.val());
    let discountValue = parseInt(discount.val()) || 0;

        if (cashAmount >= subTotal) {
            if (cart.length !== 0) {

                let order = new OrderModel(orderId, order_date, discountValue, subTotal, customerId);
                orders.push(order);
                loadOrderTable();

                        cart.forEach((cart_item) => {
                            let order_detail = new OrderDetailModel(orderId, cart_item.itemId, cart_item.qty, cart_item.unitPrice, cart_item.total);
                            orderDetails.push(order_detail);
                        });
                                        cart.splice(0, cart.length);
                                        loadCart();
                                        clearItemSection();
                                        customer_id.val('select the customer');
                                        customer_name.val('');
                                        discount.val('');
                                        cash.val('');
                                        balance.val('');
                                        net_total.text('0/=');
                                        sub_total.text('0/=');


                                      swal.fire({icon:'success',title:'Order placed successfully',});
                                        initialize();

                                        console.log(orderDetails);

            } else {
               swal.fire({icon:'warning',title:'Cart is empty',});
            }
        } else {
            swal.fire({icon:'error',title:'Please enter a valid cash amount',});
        }

});
function generateOrderId(){
    let lastId = 'O-001'; // Default if array is empty

    if (customers.length > 0){
        let lastElement = orders[orders.length - 1].orderId;
        let lastIdParts = lastElement.split('-');
        let lastNumber = parseInt(lastIdParts[1]);

        lastId = `O-${String(lastNumber + 1).padStart(3, '0')}`;
    }

    return lastId;
}