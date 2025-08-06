let totalPrice = Number(localStorage.getItem("Total_Price"));
let cartQuantity = localStorage.getItem("Cart_Quantity") || 0;
let shippingFee = 0;
let productArray = JSON.parse(localStorage.getItem("product_array")) || [];
let productCounts = {};
let count = 0;

function checkingRemove() {
    if (count > 0) {
        if (productArray.length === 0) {
            document.querySelector(".items").innerHTML = `Items: 0`
            document.querySelector(".shipping").innerHTML = `Shipping & Handling: $0`
            document.querySelector(".beforeTax").innerHTML = `Total before Tax: $0`
            document.querySelector(".tax").innerHTML = `Estimated Tax (10%): $0`
            document.querySelector(".total").innerHTML = `Order Total: $0`
            noItems();

        }
        else {
            document.querySelector(".items").innerHTML = `Items: (${cartQuantity}):`
            shippingJS();
        }
    }
    else {
        shippingJS();
    }
    count += 1;
    console.log(count)
}
checkingRemove();
function shippingJS() {
    if (productArray.length > 0) {
        if (totalPrice < 100) {
            console.log(totalPrice)
            document.querySelector(".items").innerHTML = `Items: (${cartQuantity}):`
            shippingFee = 20;
            let totalPriceShip = Number(totalPrice.toFixed(2)) + shippingFee
            totalPriceShip = Number(totalPrice.toFixed(2))
            details(Number(totalPriceShip.toFixed(2)));
            console.log(totalPriceShip)
        }
        else {
            console.log(totalPrice)
            document.querySelector(".items").innerHTML = `Items: (${cartQuantity})`
            details();
            let totalPriceShip = Number(totalPrice.toFixed(2))
            details(Number(totalPriceShip.toFixed(2)))
        }
    }
    else {
        details();
    }

}

function noItems() {
    document.querySelector('.noItemsP').innerHTML = `No items available.
    Try adding items to checkout.`
}


function details(totalPriceShip) {
    console.log(totalPriceShip)
    if (productArray.length > 0) {
        let Tax = totalPriceShip / 10;
        Tax = Number(Tax.toFixed(2))
        document.querySelector(".beforeTax").innerHTML = `Total before Tax: $${Number(totalPriceShip).toFixed(2)}`
        totalPriceShip = Number(totalPriceShip) + Number(Tax)
        document.querySelector(".items").innerHTML = ` Items: ${cartQuantity}`
        document.querySelector(".shipping").innerHTML = `Shipping & Handling: $${shippingFee}`
        document.querySelector(".tax").innerHTML = `Estimated Tax (10%): $${Tax}`
        totalPriceShip = totalPriceShip.toFixed(2)
        document.querySelector(".total").innerHTML = `Order Total: $${totalPriceShip}`
    }
    else {
        Tax = 0;
        document.querySelector(".items").innerHTML = ` Items: ${cartQuantity}`
        document.querySelector(".shipping").innerHTML = `Shipping & Handling: $${shippingFee}`
        document.querySelector(".beforeTax").innerHTML = `Total before Tax: $${Number(totalPriceShip).toFixed(2)}`
        document.querySelector(".tax").innerHTML = `Estimated Tax (10%): $${Tax}`
        document.querySelector(".total").innerHTML = `Order Total: $${totalPriceShip}`
    }
}

function repeatedProducts() {
    let productCounts = {};
    productArray.forEach(function (str) {
        if (productCounts[str] > 0) {
            productCounts[str] += 1;
        } else {
            productCounts[str] = 1;
        }
    });

    document.querySelector(".order").innerHTML = "";

    for (let productName in productCounts) {
        gettingOrder(productName, productCounts[productName]);

    }
}

function gettingOrder(productName, count) {
    const deliveryText = getDeliveryDate();
    let imageSrc = "";
    let price = 0;

    if (productName === 'PUMA socks') {
        imageSrc = "th.jpg";
        price = 13.26;
    } else if (productName === 'WILSON NCAA Legend Basketballs') {
        imageSrc = "th (1).jpg";
        price = 28.79;
    } else if (productName === 'Adidas cleats') {
        imageSrc = "th (2).jpg";
        price = 62.27;
    } else if (productName === 'Football cones plastic') {
        imageSrc = "th (3).jpg";
        price = 27.16;
    } else if (productName === 'Water Bottle') {
        imageSrc = "th (4).jpg";
        price = 39.98;
    } else {
        return;
    }

    let productDiv = document.createElement('div');
    productDiv.className = 'eachProductOrder';
    productDiv.dataset.name = productName;

    productDiv.innerHTML = `
        <div class="productImage">
            <img src="${imageSrc}" class="imgOrder">
        </div>
        <div class="productDetails">
            <div class="deliveryDate">Delivery Date: ${deliveryText}</div>
            <div class="eachOrder"><strong>${productName}</strong></div>
            <div class="eachOrder quantitySection">
                Quantity: 
                <button class="plusBtn">+</button> 
                <strong class="qtyDisplay">${count}</strong> 
                <button class="minusBtn">-</button>
            </div>
            <div class="eachOrder priceDisplay">$${(price * count).toFixed(2)}</div>
        </div>
    `;

    document.querySelector(".order").appendChild(productDiv);
    eventButtons(productDiv, productName, count);
}


function eventButtons(productDiv, productName, count) {
    productDiv.querySelector(".plusBtn").addEventListener("click", () => updateQuantity(productName, 1, count, productDiv));
    productDiv.querySelector(".minusBtn").addEventListener("click", () => updateQuantity(productName, -1, count, productDiv));
}

let productCounts1 = {};

const productsArray = {
    'PUMA socks': 13.26,
    'WILSON NCAA Legend Basketballs': 28.79,
    'Adidas cleats': 62.27,
    'Football cones plastic': 27.16,
    'Water Bottle': 39.98
};

function updateQuantity(productName, delta, count, productDiv) {
    productDiv.remove();
    count += delta;

    if (count <= 0) {
        removeItem(productName);
        return;
    }

    gettingOrder(productName, count);

    let productPrice = productsArray[productName];

    if (delta < 0) {
        totalPrice = Number(totalPrice) - productPrice;
        cartQuantity = Number(cartQuantity) - 1;
    } else {
        totalPrice = Number(totalPrice) + productPrice;
        cartQuantity = Number(cartQuantity) + 1;
    }

    totalPrice = Number(totalPrice.toFixed(2));
    shippingJS();
}


function getDeliveryDate() {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[futureDate.getDay()];
    const dd = String(futureDate.getDate()).padStart(2, '0');
    const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
    const yyyy = futureDate.getFullYear();

    return `${dayName}, ${dd}-${mm}-${yyyy}`;
}

function removeItem(Name) {
    const givenOrder = document.querySelector(`.eachProductOrder[data-name="${Name}"]`);
    if (givenOrder) givenOrder.remove();

    productArray = productArray.filter(item => item !== Name);

    localStorage.setItem("product_array", JSON.stringify(productArray));
    console.log(productArray)

    repeatedProducts();

    removePrice(Name);

}

function removePrice(productNameRemove) {
    let productsCounts = JSON.parse(localStorage.getItem("productCounting")) || {};
    const productsArray = {
        'PUMA socks': 13.26,
        'WILSON NCAA Legend Basketballs': 28.79,
        'Adidas cleats': 62.27,
        'Football cones plastic': 27.16,
        'Water Bottle': 39.98
    };

    let itemCount = productsCounts[productNameRemove] || 1;

    if (productsArray[productNameRemove]) {
        let removingPrice = productsArray[productNameRemove] * itemCount;
        let taxRemove = removingPrice * 0.10;

        totalPrice = totalPrice - removingPrice - taxRemove;
        totalPrice = Number(totalPrice.toFixed(2));
    }

    checkingRemove();
}
repeatedProducts();

