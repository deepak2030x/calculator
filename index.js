let leftOprndVal,
  rightOprndVal = null;
let answer,
  tmpAnswer = ""; // output.innerText
let isAnyOperatorClicked,
  isZeroClicked = false;
let lastClickedOperator = "";

const inp = document.querySelector("input");
const output = document.querySelector(".output");
// console.dir(inp)
const cancel = document.querySelector(".cancel");

cancel.addEventListener("click", (e) => {
  inp.value = "0";
  output.innerText = "";
  leftOprndVal = null;
  rightOprndVal = null;
  tmpAnswer = "";
  answer = "";
  operator.innerText = "";
  isAnyOperatorClicked = false;
  isZeroClicked = false;
  lastClickedOperator = "";
});

const numbers = document.querySelectorAll(".pad.numKeyPad");
// console.log(numbers)
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    let displayNumber = inp.value; // string
    if (displayNumber.length === 12) {
      return;
    }

    if (displayNumber.includes(".")) {
      inp.value += e.target.dataset.val;
    } else if (Number(displayNumber) === 0) {
      inp.value = e.target.dataset.val;
    } else {
      inp.value += e.target.dataset.val;
    }
  });
});

const zero = document.querySelector(".pad.zero");
zero.addEventListener("click", (e) => {
  isZeroClicked = true;
  let displayNumber = inp.value; // string
  if (displayNumber.length === 12) {
    return;
  }

  if (displayNumber.includes(".")) {
    inp.value += e.target.dataset.val;
  } else if (Number(displayNumber) === 0) {
    return;
  } else {
    inp.value += e.target.dataset.val;
  }
});

const point = document.querySelector(".pad.point");
point.addEventListener("click", (e) => {
  let displayNumber = inp.value; // string

  if (displayNumber.includes(".")) {
    return;
  } else {
    // e.preventDefault()
    inp.value += e.target.dataset.val;
  }
});

const clear = document.querySelector(".pad.clear");
clear.addEventListener("click", (e) => {
  let displayNumber = inp.value; // string
  if (displayNumber !== "0" && displayNumber.length > 1) {
    let newVal = displayNumber.substring(0, displayNumber.length - 1);
    console.log(newVal);
    inp.value = newVal;
  } else {
    inp.value = "0";
  }
});

const addition = document.querySelector(".pad.addKeyPad");
const mul = document.querySelector(".pad.mulKeyPad");
const div = document.querySelector(".pad.divKeyPad");
const minus = document.querySelector(".pad.minusKeyPad");
const operator = document.querySelector(".answer .operator");

console.dir(answer);
addition.addEventListener("click", (e) => {
  isAnyOperatorClicked = true;
  lastClickedOperator = "+";
  if (leftOprndVal === null) {
    leftOprndVal = inp.value;
    inp.value = "0";
  }
  if (rightOprndVal === null) {
    rightOprndVal = inp.value;
    answer = Number(leftOprndVal) + Number(rightOprndVal);
    tmpAnswer = answer;
    leftOprndVal = answer;
    rightOprndVal = null;
    answer = "";
    output.innerText = tmpAnswer;
    operator.innerText = lastClickedOperator;
    inp.value = "0";
  }
});

mul.addEventListener("click", (e) => {
  isAnyOperatorClicked = true;
  lastClickedOperator = "*";
  if (leftOprndVal === null) {
    leftOprndVal = inp.value;
    inp.value = "0";
  }
  if (rightOprndVal === null) {
    rightOprndVal =
      Number(inp.value) === 0 && isZeroClicked ? "0" : Number(inp.value) || 1;
    console.log(rightOprndVal);
    answer = Number(leftOprndVal) * Number(rightOprndVal);
    tmpAnswer = answer;
    leftOprndVal = answer;
    rightOprndVal = null;
    answer = "";
    output.innerText = tmpAnswer;
    operator.innerText = lastClickedOperator;
    inp.value = "0";
  }
});

div.addEventListener("click", (e) => {
  isAnyOperatorClicked = true;
  lastClickedOperator = "/";
  if (leftOprndVal === null) {
    leftOprndVal = inp.value;
    inp.value = "0";
  }
  if (rightOprndVal === null) {
    rightOprndVal =
      Number(inp.value) === 0 && isZeroClicked ? "0" : Number(inp.value) || 1;
    answer = Number(leftOprndVal) / Number(rightOprndVal);
    tmpAnswer = answer;
    leftOprndVal = answer;
    rightOprndVal = null;
    answer = "";
    output.innerText = tmpAnswer;
    operator.innerText = lastClickedOperator;
    inp.value = "0";
  }
});

minus.addEventListener("click", (e) => {
  if (inp.value === "0" && leftOprndVal === null) {
    inp.value = "-";
    return;
  }
  isAnyOperatorClicked = true;
  lastClickedOperator = "-";
  if (leftOprndVal === null) {
    leftOprndVal = inp.value;
    inp.value = "0";
  }
  if (rightOprndVal === null) {
    rightOprndVal = inp.value;
    answer = Number(leftOprndVal) - Number(rightOprndVal);
    tmpAnswer = answer;
    leftOprndVal = answer;
    rightOprndVal = null;
    answer = "";
    output.innerText = tmpAnswer;
    operator.innerText = lastClickedOperator;
    inp.value = "0";
  }
});

function reduce() {
  lastClickedOperator = "";
  operator.innerText = lastClickedOperator;
  rightOprndVal = null;
}

const equal = document.querySelector(".equal");
equal.addEventListener("click", (e) => {
  switch (lastClickedOperator) {
    case "+":
      reduce();
      output.innerText = (Number(leftOprndVal) + Number(inp.value)).toFixed(2);
      leftOprndVal = (Number(leftOprndVal) + Number(inp.value)).toFixed(2);
      break;
    case "*":
      reduce();
      output.innerText = (Number(leftOprndVal) * Number(inp.value)).toFixed(2);
      leftOprndVal = (Number(leftOprndVal) * Number(inp.value)).toFixed(2);
      break;
    case "/":
      reduce();
      output.innerText = (Number(leftOprndVal) / Number(inp.value)).toFixed(2);
      leftOprndVal = (Number(leftOprndVal) / Number(inp.value)).toFixed(2);
      break;
    case "-":
      reduce();
      output.innerText = (Number(leftOprndVal) - Number(inp.value)).toFixed(2);
      leftOprndVal = (Number(leftOprndVal) - Number(inp.value)).toFixed(2);
      break;
  }
  inp.value = 0;
});
