"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

const findBtn = document.getElementById("find-btn");

// Bắt sự kiện cho type của breed
// typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị các loại breed không phân biệt type: chó mèo
renderBreed();
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}

// Bắt sự kiện Click vào nút "Find"
// Lấy dữ liệu từ các Form Input
findBtn.addEventListener("click", function () {
  let findPet = petArr;

  // Tìm theo id
  if (idInput.value) {
    findPet = findPet.filter((pet) => pet.id.includes(idInput.value));
  }

  // Tìm theo name
  if (nameInput.value) {
    findPet = findPet.filter((pet) => pet.name.includes(nameInput.value));
  }

  // Tìm theo type
  if (typeInput.value != "Select Type") {
    findPet = findPet.filter((pet) => pet.type === typeInput.value);
  }

  // Tìm theo breed
  if (breedInput.value != "Select Breed") {
    findPet = findPet.filter((pet) => pet.breed === breedInput.value);
  }

  // Tìm theo vaccimated
  if (vaccinatedInput.checked === true) {
    findPet = findPet.filter((pet) => pet.vaccinated === true);
  }

  // Tìm theo dewormed
  if (dewormedInput.checked === true) {
    findPet = findPet.filter((pet) => pet.dewormed === true);
  }

  // Tìm theo sterilized
  if (sterilizedInput.checked === true) {
    findPet = findPet.filter((pet) => pet.sterilized === true);
  }

  // Sau khi lọc thì hiển thị thú cưng đủ điều kiện
  renderTableData(findPet);
});

// Thêm thú cưng vào danh sách
// Hiển thị danh sách thú cưng
renderTableData(petArr);
function renderTableData(petArr) {
  // Giá trị ban đầu sẽ trống
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr"); // Tạo thẻ tr
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td> 
    <td>${pet.type}</td>    
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
       
    <td>
    ${displayTime(pet.date).slice(8, 10)}
    /${displayTime(pet.date).slice(5, 7)}
    /${displayTime(pet.date).slice(0, 4)}
    </td>
    <td>
	`;
    tableBodyEl.appendChild(row);
  });
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
