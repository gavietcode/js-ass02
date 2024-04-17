"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");

// let deleteList = document.querySelectorAll(".btn.btn-danger");

// Bắt sự kiện cho type của breed
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị các loại breed
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Lọc hết các phần tử có type là 'Dog': (Chó Ngao, Chó Mực)
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");

  // Lọc hết các phần tử có type là 'Cat': (Mèo Vàng, Giống Lai)
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  // Nếu là Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  // Nếu là Cat
  else if (typeInput.value === "Cat") {
    breedCats.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Bắt sự kiện Click vào nút "Submit"
// Lấy dữ liệu từ các Form Input
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // console.log(data);

  const validate = validateData(data);
  // console.log(validate);
  if (validate) {
    // Đẩy dữ liệu vào
    petArr.push(data);

    // Lưu dữ liệu vào
    saveToStorage("petArr", petArr);

    // Show dữ liệu ra
    renderTableData(petArr);

    // Xóa dữ liệu
    deleteForm();
  }
});

// Validate dữ liệu
// -- Nếu hợp lệ thì thực thi
// -- Nếu không hợp lệ thì báo lỗi - cảnh báo
function validateData(data) {
  // Các trường nhập dữ liệu phải có dữ liệu

  // Khai báo biến flag - cờ hiệu.
  let isValidate = true;

  // trim() xóa khoảng trắng đầu cuối văn bản
  // if (data.id === "") Dùng cái này sẽ không đúng với space - khoảng trắng vẫn nhận
  // Xóa Khoảng trắng đầu cuối văn bản = ''
  if (idInput.value.trim().length === 0) {
    alert("Please input for id...");
    isValidate = false;
  }
  if (nameInput.value.trim().length === 0) {
    alert("Please input for name...");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please input for age...");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Please input for weight...");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Please input for length...");
    isValidate = false;
  }

  // Kiểm tra xem có bị trùng id hay không.
  if (!petArr.every((pet) => (pet.id != data.id ? true : false))) {
    alert("Id must unique...");
    isValidate = false;
  }
  if (data.age < 1 || data.age > 15) {
    // Tuổi từ 1->15
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  // Cân nặng 1->15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  // Dài từ 1->100
  if (data.length < 1 || data.length > 100) {
    alert("Weight must be between 1 and 100!");
    isValidate = false;
  }

  // Chọn loại chó hay mèo
  if (data.type === "Select Type") {
    alert("Please Select Type!");
    isValidate = false;
  }

  // Chọn giống loài cho thú cưng
  if (data.breed === "Select Breed") {
    alert("Please Select Breed!");
    isValidate = false;
  }

  // Đúng trả lại true
  return isValidate;
}

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
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} Kg </td>
    <td>${pet.length} Cm</td>
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
	<button class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button>
</td>`;
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
// Xóa các dữ liệu nhập trong Form Input
const deleteForm = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Xóa phần tử theo id
function deletePet(petId) {
  let isDelete = confirm("Are you sure?");

  if (isDelete) {
    let petArrLength = petArr.length;
    for (let i = 0; i < petArrLength; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
        break;
      }
    }
  }
}

// Hiển thị thú cứng có sức khỏe
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    // Hiển thị thú cưng khẻo mạnh và nút bấm có text: "Show All Pet"
    showHealthyPet();
    // Kết thúc for sẽ show thú cưng khỏe mạnh ra.

    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    // Hiển thị toàn bộ thú cưng và "Show Healthy Pet"
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Hàm show thú cưng khỏe mạnh
function showHealthyPet() {
  let healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  renderTableData(healthyPetArr);
}
