///////////////////////////////////////////form validation////////////////////////////////////////////////////
const formMajorData = document.getElementById("form-Major-Data");
///////////////////////////////////////////inputs validation////////////////////////////////////////////////////
const fullName = document.getElementById("Name");
const creditNumber = document.getElementById("Card-Number");
const Expiry = document.getElementById("Expiry");
const CVC = document.getElementById("CVC");
const discount = document.getElementById("Discount-Code");
/////error
const nameError = document.getElementById("name-error");
const creditCardError = document.getElementById("card-error");
const ExpiryError = document.getElementById("Expiry-error");
const cvcError = document.getElementById("cvc-error");
/////regex check for inputs
const nameRegex = /^[A-Za-z\s]+$/;
const numberRegex = /^[0-9]+$/;

///valitaions of CardHolderName
fullName.addEventListener("blur", (event) => {
  const validationCardHolderNameResult = validationCardHolderName(
    event.target.value
  );
  if (validationCardHolderNameResult) {
    fullName.classList.add("validInput");
    nameError.innerHTML = `<i class="fas fa-check-circle"></i>`;
  } else {
    fullName.classList.add("invalidInput");
    nameError.innerHTML = `<i class="fas fa-times-circle"></i>`;
  }
});

function validationCardHolderName(value) {
  return nameRegex.test(fullName.value);
}

///valitaions of CardHolderNumber
creditNumber.addEventListener("blur", (event) => {
  const validationCardNumbereResult = validationCardNumber(event.target.value);
  if (validationCardNumbereResult) {
    creditNumber.classList.add("validInput");
    creditCardError.innerHTML = `<i class="fas fa-check-circle"></i>`;
  } else {
    creditNumber.classList.add("invalidInput");
    creditCardError.innerHTML = `<i class="fas fa-times-circle"></i>`;
  }
});

function validationCardNumber(value) {
  return numberRegex.test(creditNumber.value.split(" ").join(""));
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
// ////////////////////////////////identify the Visa card number and insert a matching card////////////////////////
///visa regex
const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const mastercardPattern = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
const amexPattern = /^3[47][0-9]{12}$/;
const src = document.getElementById("imagemster");
creditNumber.addEventListener("keyup", function () {
  if (visaPattern.test(creditNumber.value.split(" ").join(""))) {
    src.style.display = "block";
    src["src"] = "./images/visa.png";
  } else if (mastercardPattern.test(creditNumber.value.split(" ").join(""))) {
    src.style.display = "block";
    src["src"] = "./images/mastercard.jpeg";
  } else if (amexPattern.test(creditNumber.value.split(" ").join(""))) {
    src.style.display = "block";
    src["src"] = "./images/amex.PNG";
  }
});

///valitaions of EpairyDate

let checkDateExpairyResult;
let validationExpairyDateResult;

Expiry.addEventListener("blur", (event) => {
  const currentDate = new Date();
  const yearCurent = currentDate.getFullYear();
  const monthCurent = `0${currentDate.getMonth() + 1}`;

  const secondToLast = Expiry.value[Expiry.value.length - 2];
  const Last = Expiry.value[Expiry.value.length - 1];

  const yearUser = `20${secondToLast + Last}`;
  const monthUser = Expiry.value[0] + Expiry.value[1];

  function checkDateExpairy() {
    if (
      yearCurent > yearUser ||
      (yearCurent == yearUser && monthCurent > monthUser)
    ) {
      return false;
    } else {
      return true;
    }
  }
  checkDateExpairy();
  console.log(validationExpairyDate(event.target.value));
  console.log(checkDateExpairy());
  checkDateExpairyResult = checkDateExpairy();
  validationExpairyDateResult = validationExpairyDate(event.target.value);
  if (validationExpairyDateResult && checkDateExpairyResult) {
    Expiry.classList.add("validInput");
    ExpiryError.innerHTML = `<i class="fas fa-check-circle"></i>`;
  } else {
    Expiry.classList.add("invalidInput");
    ExpiryError.innerHTML = `<i class="fas fa-times-circle"></i>`;
  }
  Expiry.value = Expiry.value.slice(0, 5);
});

const ExpairyRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

Expiry.addEventListener("keyup", function () {
  if (Expiry.value.length === 2) {
    Expiry.value += "/";
  }
});

function validationExpairyDate() {
  return ExpairyRegex.test(Expiry.value);
}

///valitaions of CVC
const CVCRegex = /^\d{3,4}$/;
CVC.addEventListener("blur", (event) => {
  const validationCvcResult = validationCvc();
  if (validationCvcResult) {
    CVC.classList.add("validInput");
    cvcError.innerHTML = `<i class="fas fa-check-circle"></i>`;
  } else {
    CVC.classList.add("invalidInput");
    ExpcvcErroriryError.innerHTML = `<i class="fas fa-times-circle"></i>`;
  }
});

function validationCvc() {
  CVC.value = CVC.value.slice(0, 4);
  return CVCRegex.test(CVC.value);
}

//--Discount Code
const regex1 = /^[A-Z]{8,8}$/;
const regex2 = /^[0-9]{2,2}$/;
const regex3 = /^[A-Z]{3,3}$/;

///discount Code
let test1 = "";
let test2 = "";
let test3 = "";

discount.addEventListener("blur", checkDscount);
function checkDscount(test1, test2, test3) {
  let discountArray = discount.value.split("-");
  test1 = regex1.test(discountArray[0]);
  test2 = regex2.test(discountArray[1]);
  test3 = regex3.test(discountArray[2]);

  return test1 && test2 && test3;
}

const formBtnPay = document.getElementById("form-btns");
formBtnPay.addEventListener("click", toggelSubmitBtn);
function toggelSubmitBtn(event) {
  event.preventDefault();
  if (
    validationCardHolderName() &&
    validationCardNumber() &&
    validationExpairyDate() &&
    checkDateExpairyResult &&
    validationCvc()
  ) {
    alert(
      "The validation was successful; we are passing your details to the credit company for processing."
    );
  } else {
    alert(
      "The validation failed. We are unable to proceed with your credit card details at this time"
    );
  }
}

// ////reset button
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", removeAll);
const inputsForClear = document.querySelectorAll("input");
const spanErrorClear = document.querySelectorAll(".error");
function removeAll() {
  inputsForClear.forEach((input) => {
    input.classList.remove("invalidInput");
    input.classList.remove("validInput");
  });
  spanErrorClear.forEach((error) => {
    error.innerHTML = "";
  });
  Expiry.value = "";
  discountArray = [];
  src["src"] = "";
}
