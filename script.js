function setLastActiveSection(sectionId) {
    localStorage.setItem('lastActiveSection', sectionId);
}
function getLastActiveSection() {
    return localStorage.getItem('lastActiveSection');
}
$('#main-section').css({
    display:'none'
})
$('#item-section').css({
    display:'none'
})
$('#customer').css({
    display:'none'
})
$('#place-order-section').css({
    display:'none'
})
$('#order-details-section').css({
    display:'none'
})
$(document).ready(function() {
    const lastActiveSection = getLastActiveSection();
    if (lastActiveSection) {
        $(`#${lastActiveSection}`).css({
            display:'block'
        })

    }});
$('#nav-home').on('click', ()=>{
    $('#main-section').css({
        display:'block'
    })
    $('#item-section ,#customer , #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Main-Page')
    setLastActiveSection('main-section');
});
$('#nav-customer').on('click', ()=>{
    $('#customer').css({
        display:'block'
    })
    $('#item-section ,#main-section , #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Customer-Page')
    setLastActiveSection('customer');
});
$('#nav-item').on('click', ()=>{
    $('#item-section').css({
        display:'block'
    })
    $('#customer ,#main-section, #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Item-Page')
    setLastActiveSection('item-section');
});
$('#nav-order').on('click', ()=> {
    $('#place-order-section').css({
        display: 'block'
    })
    $('#item-section ,#customer , #main-section, #order-details-section').css({
        display: 'none'
    })
    console.log('Order-Page')
    setLastActiveSection('place-order-section');
});
$('#nav-order-details').on('click', ()=>{
    $('#order-details-section').css({
        display:'block'
    })
    $('#item-section ,#customer, #main-section , #place-order-section').css({
        display:'none'
    })
    console.log('Order-Details-Page')
    setLastActiveSection('order-details-section');
})