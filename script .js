const myForm = document.getElementById("form-Major-Data");
const cardnameInput = myForm.elements["Name"];
const cardnameInputError = myForm.elements["name-error"];
const cardnumberInput = myForm.elements["Card-Number"];
const expiryInput = myForm.elements["Expiry"];
const discountInput = myForm.elements["Discount-Code"];
const btn = document.getElementById("form-btn");

//-Cardholders Name
const nameRegex = /^[A-Za-z\s]+$/;

//--Card Number
const numberRegex = /^[0-9]/;
const cardNumber = cardnumberInput.value.replace(/\s/g, "");

//--Expiry
const spaceRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2[0-9]|3[01])$/;
const currentYear = new Date();
const yearOnly = currentYear.getFullYear();
const monthOnly = `0${currentYear.getMonth() + 1}`;
const monthUser = expiryInput.value[0] + expiryInput.value[1];
const monthAndYearRegex = /\d+/;
const expiryArray = expiryInput.value.split("/");
let year = `20${expiryInput.value[3] + expiryInput.value[4]}`;
let month = expiryArray[0];
let expiryRegexNumber = /^[0-9]{2}/;
let montTest = monthAndYearRegex.test(expiryArray[0]);
let yearTest = monthAndYearRegex.test(expiryArray[1]);
//--Discount Code
const regex1 = /^[A-Z]{8,8}$/;
const regex2 = /^[0-9]{2,2}$/;
const regex3 = /^[A-Z]{3,3}$/;
const discountArray = discountInput.value.split("-");

let test1 = regex1.test(discountArray[0]);
let test2 = regex2.test(discountArray[1]);
let test3 = regex3.test(discountArray[2]);

cardnumberInput.addEventListener("keyup", function () {
  let cardNumber = cardnumberInput.value.replace(/\s/g, "");
  console.log(cardNumber);

  let formattedNumber = "";
  for (let i = 0; i < cardNumber.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedNumber += " ";
    }
    formattedNumber += cardNumber.charAt(i);
  }

  cardnumberInput.value = formattedNumber;
});

const digit = cardnumberInput.value.replace(/[^0-9]/g, "");
const amexPattern = /^3[47][0-9]{12}$/;
const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const mastercardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
console.log(cardNumber);
const src = document.querySelector("img");
cardnumberInput.addEventListener("keypress", function () {
  if (visaPattern.test(cardNumber)) {
    src["src"] = "/images/visa.png";
  } else if (mastercardPattern.test(cardNumber)) {
    src["src"] = "/images/logo.jpeg";
  } else if (amexPattern.test(cardNumber)) {
    src["src"] = "/images/amex.PNG";
  }
});

expiryInput.addEventListener("keyup", function (event) {
  if (expiryInput.value.length === 2) {
    expiryInput.value += "/";
  }
});

//------------------------------------/////
myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!nameRegex.test(cardnameInput.value)) {
    document.getElementById("Name").style.color = "red";
    document.getElementById("name-error").innerText =
      "please wtire only letters";
    cardnameInput.value = "";
    btn.disabled = true;
    btn.style.backgroundColor = "red";
    return;
  } else if (!numberRegex.test(cardNumber)) {
    document.getElementById("Card-Number").style.color = "red";
    document.getElementById("card-error").innerText =
      "please wtire only number";
    cardnumberInput.value = "";
    btn.disabled = true;
    btn.style.backgroundColor = "red";
    return;
  } else if (!test1 || !test2 || !test3) {
    document.getElementById("Discount-Code").style.color = "red";
    document.getElementById("discountError").innerText =
      "please wtire codeCopun";
    btn.disabled = true;
    btn.style.backgroundColor = "red";
    return;
  } else if (!montTest || !yearTest) {
    document.getElementById("Expiry").style.color = "red";
    document.getElementById("Expiry-CVC-error").innerText =
      "please wtire MM/YY";
    btn.disabled = true;
    btn.style.backgroundColor = "red";
    return;
  } else if (montTest) {
    if (expiryInput.value[0] + expiryInput.value[1] > 12) {
      document.getElementById("Expiry").style.color = "red";
      document.getElementById("Expiry-CVC-error").innerText =
        "please wtire month between 1-12";
      btn.disabled = true;
      btn.style.backgroundColor = "red";
      return;
    } else if (year < currentYear.getFullYear()) {
      document.getElementById("Expiry").style.color = "red";
      document.getElementById("Expiry-CVC-error").innerText =
        "please wtire  futrue year";
      btn.disabled = true;
      btn.style.backgroundColor = "red";
      return;
    }
  }

  myForm.submit();
});
