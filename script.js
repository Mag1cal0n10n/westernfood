const mealPrices = {
    "Fish and Chips": 19.90,
    "Black Pepper Chicken": 25.50,
    "Spaghetti": 12.90,
    "Chicken Burger": 9.90
};
const drinkPrices = {
    "Coke": 4.50,
    "Coffee": 3.00,
    "Ice Cream": 4.00,
    "Lemon Tea": 3.00
};

function updateDateTime() {
    document.getElementById("datetime").textContent =
        "Date & Time: " + new Date().toLocaleString();
}

function calculateTotal() {
    const mealInputs = document.querySelectorAll('input[name="meal"]');
    const drinkInputs = document.querySelectorAll('input[name="drink"]');
    let total = 0;
    mealInputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            total += mealPrices[input.getAttribute('data-meal')] * qty;
        }
    });
    drinkInputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            total += drinkPrices[input.getAttribute('data-drink')] * qty;
        }
    });
    document.getElementById("total").textContent =
        "Total Price: RM" + total.toFixed(2);
}

function resetForm() {
    document.getElementById("orderForm").reset();
    document.querySelectorAll('input[name="meal"], input[name="drink"]').forEach(input => input.value = 0);
    document.getElementById("total").textContent = "Total Price: RM0.00";
    document.getElementById("errorMsg").textContent = "";
    updateDateTime();
}

function submitForm(event) {
    event.preventDefault();
    updateDateTime();

    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = "";

    const nameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const mealInputs = document.querySelectorAll('input[name="meal"]');
    const drinkInputs = document.querySelectorAll('input[name="drink"]');
    const notes = document.getElementById("notes").value;

    // Validation
    const namePattern = /^[A-Za-z\s]{2,}$/;
    if (!namePattern.test(nameInput.value)) {
        errorMsg.textContent = "Please enter a valid Full Name (letters and spaces only, at least 2 characters).";
        nameInput.focus();
        return;
    }
    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMsg.textContent = "Please enter a valid Email Address.";
        emailInput.focus();
        return;
    }
    
    const phonePattern = /^\d{3}-\d{3} \d{4}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        errorMsg.textContent = "Please enter your Phone Number in xxx-xxx xxxx format.";
        phoneInput.focus();
        return;
    }

    let mealSelected = false, drinkSelected = false;
    let total = 0;
    let mealTextArr = [], drinkTextArr = [];

    mealInputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            mealSelected = true;
            mealTextArr.push(`${input.getAttribute('data-meal')} x${qty} (RM${(mealPrices[input.getAttribute('data-meal')]*qty).toFixed(2)})`);
            total += mealPrices[input.getAttribute('data-meal')] * qty;
        }
    });
    drinkInputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            drinkSelected = true;
            drinkTextArr.push(`${input.getAttribute('data-drink')} x${qty} (RM${(drinkPrices[input.getAttribute('data-drink')]*qty).toFixed(2)})`);
            total += drinkPrices[input.getAttribute('data-drink')] * qty;
        }
    });

    if (!mealSelected) {
        errorMsg.textContent = "Please select at least one meal.";
        return;
    }
    if (!drinkSelected) {
        errorMsg.textContent = "Please select at least one drink.";
        return;
    }

    alert(
        "Order Summary:\n" +
        "Name: " + nameInput.value + "\n" +
        "Email: " + emailInput.value + "\n" +
        "Phone: " + phoneInput.value + "\n" +
        "Meal(s): " + mealTextArr.join(", ") + "\n" +
        "Drink(s): " + drinkTextArr.join(", ") + "\n" +
        "Notes: " + notes + "\n" +
        "Total Price: RM" + total.toFixed(2) + "\n" +
        document.getElementById("datetime").textContent
    );

    resetForm();
}

window.onload = function() {
    updateDateTime();
    document.querySelectorAll('input[name="meal"], input[name="drink"]').forEach(function(el) {
        el.value = 0;
        el.addEventListener('input', calculateTotal);
    });
};