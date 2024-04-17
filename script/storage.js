"use strict";

const navEl = document.getElementById("sidebar");

// Bắt sự kiện click
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Dữ liệu được nhập vào sắn
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#ff0000",
  breed: "Mèo Vàng",
  vaccinated: true,
  dewormed: true,
  sterilized: true,

  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#0000ff",
  breed: "Chó Mực",
  vaccinated: false,
  dewormed: false,
  sterilized: false,

  date: new Date(),
};

// Thêm Dữ liệu cho breed.

const breed1 = {
  breed: "Chó Mực",
  type: "Dog",
};

const breed2 = {
  breed: "Mèo Vàng",
  type: "Cat",
};

// Lấy dữ liệu cho thú cưng
if (!getFromStorage("petArr")) {
  //Lưu dữ liệu
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

// Lấy dữ liệu cho loại giống
if (!getFromStorage("breedArr")) {
  //Lưu dữ liệu
  saveToStorage("breedArr", [breed1, breed2]);
}
const breedArr = getFromStorage("breedArr");

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
