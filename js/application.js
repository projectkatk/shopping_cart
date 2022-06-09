
//function that generates multiple rows in the shopping cart
function generateShoppingCart (product, price, qty=0, total="0.00") {       
    $('tbody').append(`
        <tr>
            <td class="product">${product}</td>
            <td class="price">$${price}</td>
            <td class="quantity">
            <strong>QTY</strong>
            <input type="text" value=${qty} class="border-0 rounded px-1">           
            </td>
            <td class="subtotal">$${total}</td>
            <td class="cancelIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="remove bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            </td>            
        </tr>
    `)
    // call the function to calculate total value of the product after applying the qty
    calculatesubtotal(price, qty, total);   
    deleteItem(); // add delete item to the local scope to target the specific row
};


//function to calculate the total value of the product after applying the qty
function calculatesubtotal(price, qty, total) {
    $('input').change(function() {
        if($(this).val() && $(this).val() >= 0) {
            qty = parseFloat($(this).val()); 
            price = parseFloat($(this).parent().prev().text().slice(1));
            total = $(this).parent().next().text(`$${(qty * price).toFixed(2)}`);   
        }
        else {
            $(this).val(0); 
        }       
    });   
}

{/* <tr class="createItem">
        <td class="newProduct border-0"><input type="text" name="product" placeholder="Product"></td>
        <td class="newPrice border-0"><input type="text" name="price" placeholder="Price"></td>
        <td class="quantity border-0">
        <button class="create btn btn-sm btn-secondary py-0">Add</button>
        </td>
    </tr> */}

//function to add a new item on top of the row within the table
function addNewItem () {
    //this represents the input items where the user can plug in the data
    $('form').append(`
        <input type="text" name="product" placeholder="Product" class=" rounded border-0 shadow p-1 newProduct">
        <input type="text" name="price" placeholder="Price" class="mx-2 rounded border-0 shadow p-1 newPrice">        
        <button class="create btn btn-sm btn-outline-primary py-1">Add</button>
    `)    
    //upon clicking the 'Add' button, create a new row with the corresponding information user put through
    $('.create').click(function(e, qty, total) {
        // save the input values to the variables
        e.preventDefault();
        var product = $('.newProduct').val();
        var price = $('.newPrice').val();

        // this works only if the price is positive. assign the defined values within the new row elements
        if(!(price <= 0) && !(isNaN(price))) {
                $('tbody').prepend(`<tr>
                <td class="product">${product}</td>
                <td class="price">$${price}</td>
                <td class="quantity">
                <strong>QTY</strong>
                <input type="text" value=${0} class="border-0 rounded px-1">
                </td>
                <td class="subtotal">$0.00</td>
                <td class="cancelIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="remove bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                </td>
            </tr>
            `);           
            calculatesubtotal(price, qty,total);
            deleteItem(); // apply delete item here to make sure newly added row can be also deleted
        }        
    })
}

// on button click, delete the entire row
function deleteItem () {
    $('.remove').click(function(e) {
        $(e.delegateTarget).parent().parent().remove();
    });
}

// to calculate grandTotal on the bottom of the page
function grandTotal () {
    var totalValueCollection = [];
    var result;
    $('.grandTotal').click(function() {
        totalValueCollection = [];
       $('.subtotal').each(function(index, ele) {
           var eachSubtotal = parseFloat(ele.textContent.slice(1)).toFixed(2);
           totalValueCollection.push(eachSubtotal);
           if(totalValueCollection.length > 1) {
            result = totalValueCollection.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr));
           } else {
               result = parseFloat(totalValueCollection[0]);
           }
       })
       $('.totalPrice').text(result.toFixed(2))
    })
}


//Global function call
$(document).ready(function() {
    generateShoppingCart('Salmon', 60);
    generateShoppingCart('Tuna', 50);
    generateShoppingCart('Carp', 40);
    generateShoppingCart('Pork', 50);
    generateShoppingCart('Beef', 40);
    addNewItem();
    grandTotal();
})


