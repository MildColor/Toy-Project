import { cal } from "./cal.js";

let calInput = document.querySelector("#cal-display");
const calOn = document.querySelector(".cal-on");
const calContainer = document.querySelector(".cal-container");
const NUMS_KEY = "nums";
const RESULT_KEY = "result";
let nums = [];
let results = [];

function saveNums() {
  localStorage.setItem(NUMS_KEY, JSON.stringify(nums));
}
function saveResult() {
  localStorage.setItem(RESULT_KEY, JSON.stringify(results));
}

// making number btn
function createNum(e) {
  e.preventDefault();
  for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.innerText = `${i}`;
    btn.className = "cal__btns";
    calContainer.appendChild(btn);
    btn.addEventListener("click", pressNum);
  }

  //making operator btn
  const operator = ["+", "-", "x", "/", "="];
  operator.forEach(function (a) {
    const btn = document.createElement("button");
    btn.innerText = `${a}`;
    btn.className = "cal__btns";
    calContainer.appendChild(btn);
    btn.addEventListener("click", pressOp);
  });
}
//Display on INPUT tag
function pressNum(e) {
  e.preventDefault();
  const num = e.target.innerText;
  calInput.value += num;
}
//When press Operator, save data as obj
function pressOp(e) {
  e.preventDefault();
  let numA = calInput.value;
  const operatorBtn = e.target.innerText;
  const newCalObj = {
    init: 0,
    number: numA,
    op: operatorBtn,
  };
  calInput.value = "";
  nums.push(newCalObj);
  saveNums();
  calNums();
}

function calNums() {
  const savedNums = localStorage.getItem(NUMS_KEY);
  const parsedNums = JSON.parse(savedNums);
  if (parsedNums[0].op == "+") {
    const result = cal.plus(
      parseInt(parsedNums[0].init),
      parseInt(parsedNums[0].number)
    );
    results.push(result);
    saveResult();
  }
}

calOn.addEventListener("click", createNum);
