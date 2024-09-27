"use strict";
// Accounts
const account1 = {
   owner: "Jonas Schmedtmann",
   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
   interestRate: 1.2,
   pin: 1111,
};

const account2 = {
   owner: "Jessica Davis",
   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
   interestRate: 1.5,
   pin: 2222,
};

const account3 = {
   owner: "Steven Thomas Williams",
   movements: [200, -200, 340, -300, -20, 50, 400, -460],
   interestRate: 0.7,
   pin: 3333,
};

const account4 = {
   owner: "Sarah Smith",
   movements: [430, 1000, 700, 50, 90],
   interestRate: 1,
   pin: 4444,
};
const accounts = [account1, account2, account3, account4];

const main = document.querySelector("main");
const footer = document.querySelector("footer");
const welcome = document.querySelector(".welcome");
const userName = document.querySelector(".username");
const PIN = document.querySelector(".PIN");
const loginBtn = document.querySelector(".login-btn");
const date = document.querySelector(".date");
const balanceValue = document.querySelector(".balance-value");
const movements = document.querySelector(".movements");
const transferInput1 = document
   .querySelector(".transfer > .container")
   .children[0].querySelector("input");
const transferInput2 = document
   .querySelector(".transfer > .container")
   .children[1].querySelector("input");
const transferBtn = document.querySelector(".transfer > .container").children[2];
const loanInput = document.querySelector(".loan > .container").children[0].querySelector("input");
const loanBtn = document.querySelector(".loan > .container").children[1];
const closeAccInput1 = document
   .querySelector(".closeAcc > .container")
   .children[0].querySelector("input");
const closeAccInput2 = document
   .querySelector(".closeAcc > .container")
   .children[1].querySelector("input");
const closeAccBtn = document.querySelector(".closeAcc > .container").children[2];
const profit = document.querySelector(".profit");
const loss = document.querySelector(".loss");
const sortBtn = document.querySelector(".sort-btn");

// main.style.opacity = "0";
// footer.style.opacity = "0";
date.innerHTML = Date();
function displayMovements(account) {
   movements.innerHTML = "";
   let balance = 0;
   account.movements.forEach(function (mov, i) {
      const type = mov > 0 ? "deposit" : "withdrawal";
      const html = `<div class="movement">
      <div class="active-type ${type}">${i + 1} ${type.toUpperCase()}</div>
      <div class="price">${mov}$</div>
      </div>`;
      movements.insertAdjacentHTML("afterbegin", html);
      // OR
      //    movements.innerHTML += `<div class="movement">
      //    <div class="active-type ${type}">${i + 1} ${type.toUpperCase()}</div>
      //    <div class="price">${mov}$</div>
      // </div>`;
      balance += mov;
   });
   balanceValue.innerHTML = balance + "$";
}
function displayFooter(account) {
   let p = 0,
      l = 0;
   for (let mov of account.movements) {
      if (mov > 0) {
         p += mov;
      } else l += Math.abs(mov);
   }
   profit.textContent = p + "$";
   loss.textContent = l + "$";
   // balanceValue.textContent = p - l + '$'
}
function isUpperCase(char) {
   return char === char.toUpperCase() && char !== char.toLowerCase();
}
let usernames = [];
let PINs = [];
for (const acc of accounts) {
   // console.log(acc);
   let username = "";
   for (const letter of acc.owner) {
      if (isUpperCase(letter)) {
         username += letter;
      }
   }
   usernames.push(username.toLowerCase());
   PINs.push(acc.pin);
}
function checkEnter() {
   for (let i = 0; i < usernames.length; i++) {
      if (userName.value == usernames[i] && PINs[i] == PIN.value) {
         main.style.opacity = "1";
         footer.style.opacity = "1";
         userName.value = "";
         PIN.value = "";
         welcome.textContent = `Welcome back, ${accounts[i].owner}`;
         displayMovements(accounts[i]);
         displayFooter(accounts[i]);
         break;
      }
   }
}
loginBtn.addEventListener("click", checkEnter);
document.addEventListener("keydown", (key) => {
   if (key.code === "Enter" || key.code === "NumpadEnter") {
      checkEnter();
   }
});
