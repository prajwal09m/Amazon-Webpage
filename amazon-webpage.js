let quantity = 0;
document.querySelector(".cartQuantity").innerHTML = `${quantity}`
function cartQuantityfun() {
    quantity += 1
    document.querySelector(".cartQuantity").innerHTML = `${quantity}`
    localStorage.setItem("Cart_Quantity", quantity)
}

totalPrice = 0;

function calcPrice(Price) {
    totalPrice = Number(totalPrice) + Number(Price)
    totalPrice = Number(totalPrice.toFixed(2));
    console.log(`${totalPrice}`)
    localStorage.setItem("Total_Price", totalPrice)
}

function goToPage() {
    window.location.href = "checkout.html"
}

let productArray = [];

function productN(productName) {
    productArray.push(productName);
    console.log(productArray);
    localStorage.setItem("product_array", JSON.stringify(productArray));
}