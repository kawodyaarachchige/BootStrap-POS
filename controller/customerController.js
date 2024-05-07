
import CustomerModel  from "../model/customerModel.js";
import {customers} from "../db/db.js";

$(`#btnSaveCustomer`).on('click', () => {

    let id = $('#customerId').val();
    let name = $('#customerFullName').val();
    let address = $('#customerAddress').val();
    let contact = $('#customerContact').val();

    let customer = new CustomerModel(id, name, address, contact);
    customers.push(customer);
    console.log(customers);
    loadTable();
})
function loadTable() {
    $(`#customer-tbl-tbody`).empty();
    customers.map(customer => {
        var record = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.contact}</td>
        </tr>`;
        $(`#customer-tbl-tbody`).append(record);
    })


}
