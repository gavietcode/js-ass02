"use strict";
const breedInput = document.getElementById("input-breed");

const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Bắt sự kiện click
btnSubmit.addEventListener("click", function () {
  // Nhập dữ liệu
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Thêm dữ liệu vào breed
  const isValidate = validate(data);

  if (isValidate) {
    // Đẩy dữ liệu vào
    breedArr.push(data);

    // Lưu dữ liệu
    saveToStorage("breedArr", breedArr);

    renderTableBreed(breedArr);

    // Xóa dữ liệu
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;
  // không nhập liệu, để trống sẽ báo lỗi

  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed...");
    isValidate = false;
  }

  // Phải chọn dữ liệu trong type
  if (data.type === "Select Type") {
    alert("Please select type...");
    isValidate = false;
  }

  return isValidate;
}

renderTableBreed(breedArr);
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";

  // Thêm dữ liệu
  breedArr.forEach((breedItem, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1} </td>
    <td>${breedItem.breed}</td>
    <td>${breedItem.type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedItem.breed
    }')">Delete</button></td> 
    `;
    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa dữ liệu sau khi nhập xong
const deleteForm = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

// Hàm xóa breed
function deleteBreed(breed) {
  const isdeleteBreed = confirm("Are you sure...?");

  if (isdeleteBreed) {
    let breedArrLength = breedArr.length;
    for (let i = 0; i < breedArrLength; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
