import CustomerModel from "../model/customerModel.js";
import {customers,searchedCustomersArr} from "../db/db.js";

let selectedIndex;



function loadTable() {
    $('#customer-tbl-tbody').empty();
    customers.map(customer => {
        var record = `<tr>
            <td id="cus-id-tbl">${customer.id}</td>
            <td id="cus-name-tbl">${customer.name}</td>
            <td id="cus-address-tbl">${customer.address}</td>
            <td id="cus-contact-tbl">${customer.contact}</td>
        </tr>`;
        $("#customer-tbl-tbody").append(record);
    })
}

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

$('#customer-tbl-tbody').on('click', 'tr', function () {
    let selectedCusId = $(this).find("#cus-id-tbl").text();
    let selectedCusName = $(this).find("#cus-name-tbl").text();
    let selectedCusAddress = $(this).find("#cus-address-tbl").text();
    let selectedCusContact = $(this).find("#cus-contact-tbl").text();


    $('#customerId').val(selectedCusId);
    $('#customerFullName').val(selectedCusName);
    $('#customerAddress').val(selectedCusAddress);
    $('#customerContact').val(selectedCusContact);

    selectedIndex = $(this).index();
    console.log("Customer Selected : ", selectedIndex);
})
$('#btnUpdateCustomer').on('click', () => {
    let id = $('#customerId').val();
    let name = $('#customerFullName').val();
    let address = $('#customerAddress').val();
    let contact = $('#customerContact').val();
    customers[selectedIndex].id = id;
    customers[selectedIndex].name = name;
    customers[selectedIndex].address = address;
    customers[selectedIndex].contact = contact;
    loadTable();
    console.log("Customer Updated : ", customers[selectedIndex]);
    setTimeout(() => {
        alert("Customer Updated")
    }, 800);
});
$('#btnDeleteCustomerModal').on('click', () => {
    $('#btnDeleteCustomer').click();
    $('#deleteUserIdField').val(customers[selectedIndex].id);
});
$('#btnDeleteCustomer').on('click', () => {
    $('#deleteUserIdField').val(customers[selectedIndex].id);
})
$('#btnConfirmDeleteCustomer').on('click', () => {
    customers.splice(selectedIndex, 1);
    $('#cancelDeleteCustomer').click();
    loadTable();
    setTimeout(() => {
        alert("Customer Deleted Successfully")
    }, 800);
})
$('#btnClearCustomer').on('click', () => {
    loadTable();
})

$('#btnSearchCustomer').on('click', () => {
    console.log("Search Customer Clicked");
    try {
        let selectedSearchingType = $('#cmbSearchByCustomer').val();
        console.log(selectedSearchingType);
        searchedCustomersArr.splice(0, searchedCustomersArr.length);
        let searchText = $('#searchCustomerReference').val();
        if(selectedSearchingType==="1"){
            let matchedCustomer =customers.find(customer => customer.name === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }
        else if(selectedSearchingType==="2"){
            let matchedCustomer =customers.find(customer => customer.id === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }else if(selectedSearchingType==="3"){
            let matchedCustomer =customers.find(customer => customer.address === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }
        console.log(searchedCustomersArr);
        loadSearchedCustomersToTable()

    }catch (error) {
        alert("No Customer Found");
    }
});

function loadSearchedCustomersToTable() {
    $('#customer-tbl-tbody').empty();
    searchedCustomersArr.map(customer => {
        var record = `<tr>
            <td id="cus-id-tbl">${customer.id}</td>
            <td id="cus-name-tbl">${customer.name}</td>
            <td id="cus-address-tbl">${customer.address}</td>
            <td id="cus-contact-tbl">${customer.contact}</td>
        </tr>`;
        $("#customer-tbl-tbody").append(record);
    })
}