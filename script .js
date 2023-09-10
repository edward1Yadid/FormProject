///////////////////////////////////////////form validation////////////////////////////////////////////////////
const formMajorData = document.getElementById("form-Major-Data");
///////////////////////////////////////////inputs validation////////////////////////////////////////////////////
const fullName = document.getElementById("Name");
const creditNumber = document.getElementById("Card-Number");
const Expiry = document.getElementById("Expiry");
const CVC = document.getElementById("CVC");
const discount = document.getElementById("Discount-Code");

/////regex check for inputs
const nameRegex = /^[A-Za-z\s]+$/;
const numberRegex = /^[0-9]+$/;
const ExpairyRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

const CVCRegex = /^\d{3,4}$/;
///valitaions of name input and email input

formMajorData.addEventListener("submit", validation);
function validation(event) {
  event.preventDefault();

  if (
    !formValidation(
      fullName,
      creditNumber,
      Expiry,
      CVC,
      discount,
      test1,
      test2,
      test3
    )
  ) {
    if (!nameRegex.test(fullName.value)) {
      fullName.classList.add("invalidInput");
      alert("Please provide a valid names!");
    } else {
      fullName.classList.add("validInput");
    }
    if (!numberRegex.test(creditNumber.value.split(" ").join(""))) {
      creditNumber.classList.add("invalidInput");
      alert("Please provide a valid creditNumber!");
    } else {
      creditNumber.classList.add("validInput");
    }
    if (!ExpairyRegex.test(Expiry.value) && !checkDateExpairy()) {
      Expiry.classList.add("invalidInput");
      alert("Please provide a valid Expiry Date!");
    } else {
      Expiry.classList.add("validInput");
    }
    if (!CVCRegex.test(CVC.value)) {
      CVC.classList.add("invalidInput");
      alert("Please provide a valid CVC number!");
    } else {
      CVC.classList.add("validInput");
    }
    if (!checkDscount()) {
      discount.classList.add("invalidInput");
      alert("Please provide a valid discount cupon!");
    } else {
      discount.classList.add("validInput");
    }
  } else {
    alert("hi");
  }
}

function formValidation(
  fullName,
  creditNumber,
  Expiry,
  CVC,
  test1,
  test2,
  test3
) {
  return (
    nameRegex.test(fullName.value) &&
    numberRegex.test(creditNumber.value) &&
    spaceRegex.test(Expiry.value) &&
    numberRegex.test(CVC.value) &&
    test1 &&
    test2 &&
    test3
  );
}

////reset button
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", removeAll);
const inputsForClear = document.querySelectorAll("input");
function removeAll() {
  inputsForClear.forEach((input) => {
    input.classList.remove("invalidInput");
    input.classList.remove("validInput");
    Expiry.value = "";
    discountArray = [];
  });
}

////////////////////////////////////////////////4 digits with whitespace

creditNumber.addEventListener("keyup", addSpaceAfter4digits);

function addSpaceAfter4digits() {
  let formattedNumber = "";

  let cardNumber = creditNumber.value.replace(/\s/g, "");

  for (let i = 0; i < cardNumber.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedNumber += " ";
    }
    formattedNumber += cardNumber.charAt(i);
  }
  creditNumber.value = formattedNumber.slice(0, 19); //max-length 19 automaticly
}
////////////////////////////////identify the Visa card number and insert a matching card////////////////////////

///visa regex
const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const mastercardPattern = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
const amexPattern = /^3[47][0-9]{12}$/;
const src = document.getElementById("imagemster");
creditNumber.addEventListener("keyup", function () {
  if (visaPattern.test(creditNumber.value.split(" ").join(""))) {
    src["src"] = "./images/visa.png";
  } else if (mastercardPattern.test(creditNumber.value.split(" ").join(""))) {
    src["src"] = "./images/mastercard.jpeg";
  } else if (amexPattern.test(creditNumber.value.split(" ").join(""))) {
    src["src"] = "./images/amex.PNG";
  }
});

///////////////////////////////////////////////////////////--Expiry Date///////////////////////////////////
Expiry.addEventListener("keyup", function () {
  if (Expiry.value.length === 2) {
    Expiry.value += "/";
  }
});
const expiryArray = Expiry.value.split("/").join("");

const currentDate = new Date();
const yearCurent = currentDate.getFullYear();
const monthCurent = `0${currentDate.getMonth() + 1}`;

const yearUser = `20${Expiry.value[3] + Expiry.value[4]}`;
const monthUser = Expiry.value[0] + Expiry.value[1];

function checkDateExpairy(yearCurent, yearUser, monthCurent, monthUser) {
  if (yearCurent > yearUser) {
    return false;
  }
  if (yearCurent == yearUser && monthCurent > monthUser) {
    return false;
  }
}

//--Discount Code
const regex1 = /^[A-Z]{8,8}$/;
const regex2 = /^[0-9]{2,2}$/;
const regex3 = /^[A-Z]{3,3}$/;

///discount Code
let test1 = "";
let test2 = "";
let test3 = "";
discount.addEventListener("input", checkDscount);
function checkDscount(test1, test2, test3) {
  let discountArray = discount.value.split("-");
  test1 = regex1.test(discountArray[0]);
  test2 = regex2.test(discountArray[1]);
  test3 = regex3.test(discountArray[2]);
  console.log(discountArray);
  return test1 && test2 && test3;
}

console.log(checkDscount());
