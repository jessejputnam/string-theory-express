"use strict";

const burger = document.querySelector(".burger-container");
const burgerTop = document.querySelector(".top-burger");
const burgerMid = document.querySelector(".mid-burger");
const burgerBottom = document.querySelector(".bottom-burger");

const mobileMenu = document.querySelector(".mobile-header-nav");

const cart = document.querySelector(".header-cart");

const check = () => {
  console.log("Check");
};

cart.addEventListener("click", check);

burger.addEventListener("click", (e) => {
  const clicked = e.target.closest(".burger-container");
  if (clicked.classList.contains("open")) {
    clicked.classList.remove("open");
    burgerTop.classList.remove("burger-top-open");
    burgerMid.classList.remove("burger-mid-open");
    burgerBottom.classList.remove("burger-bottom-open");

    mobileMenu.classList.add("hidden");
  } else {
    clicked.classList.add("open");
    burgerTop.classList.add("burger-top-open");
    burgerMid.classList.add("burger-mid-open");
    burgerBottom.classList.add("burger-bottom-open");

    mobileMenu.classList.remove("hidden");
  }
});
