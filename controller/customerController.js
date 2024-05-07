
import CustomerModel  from "../model/customerModel";
import {customers} from "../db/db";

$(`#save-btn`).on(`click`, () => {

    let cusId = $('#saveUserIdField').val();
    let cusName = $('#saveUserNameField').val();
    let cusEmail = $('#saveUserEmailField').val();
    let cusAddress = $('#saveUserAddressField').val();
    let cusBranch = $('#saveUserBranchField').val();

    if (!cusId ||!cusName ||!cusEmail ||!cusAddress ||!cusBranch) {
        alert('Please fill in all fields.');
        return;
    }
    var customer = new CustomerModel(id,name,address,contact);
    console.log(customer);
    customers.push(customer);
    console.log(customers);
    loadTable();
    $(`#clear-btn`).click();

});

function loadTable() {
    var tbody = $(`#customer-tbody`);
    tbody.empty();
    customers.map((customer) => {

        var record = `<tr>
                <td class="st-id-val">${customer.id}</td>
                <td class="st-name-val">${customer.name}</td>
                <td class="st-address-val">${customer.address}</td>
                <td class="st-contact-val">${customer.branch}</td>
            </tr>`;

        $('#st-tbody').append(record);
    });
}
 /*   customers.forEach((customer) => {


    }*/
       /* var tr = $(`<tr></tr>`);
        tr.append($(`<td>${customer.id}</td>`));
        tr.append($(`<td>${customer.name}</td>`));
        tr.append($(`<td>${customer.address}</td>`));
        tr.append($(`<td>${customer.contact}</td>`));
        tr.append($(`<td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-user-modal" id="update-btn"
onclick="update(${customer.id})">Update</button></td>`)); };
    tbody.append(tr);*/

