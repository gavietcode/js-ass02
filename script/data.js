"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Bắt sự kiện click export

btnExport.addEventListener("click", function () {
  const isExport = confirm("Are you sure to Export...?");

  // Chọn yes sẽ lưu
  if (isExport) {
    saveToFile();
  }
});

// Hàm lưu file
function saveToFile() {
  // Tạo dữ liệu
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  // Lưu file
  saveAs(blob, "petName.json");
}

// Bắt sự kiện click import
btnImport.addEventListener("click", function () {
  // kiểm tra xem đã có file chưa
  if (!fileInput.value) {
    alert("Please, select your file want to import...");
  } else {
    // khi đã có file xác nhận import
    const isImport = confirm("Do you want to import..?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Load dữ liệu từ file
      reader.addEventListener(
        "load",
        function () {
          // kiểm tra cấu trúc file hợp lệ hay không
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            // Lưu dữ liệu vào localStorage
            saveToStorage("petArr", JSON.parse(reader.result));
            // Thông báo thành công
            alert("Import Success...");
          }
        },
        false
      );

      // Đọc file
      if (file) {
        reader.readAsText(file);
      }

      // Reset lại input
      fileInput.value = "";
    }
  }
});

// Hàm kiểm tra cấu trúc file

function checkFile(data) {
  if (!(data instanceof Array)) {
    alert("Need: Data = Array contain Object... ");
    return false;
  }

  // Nếu các phần tử trong mảng không hợp lệ
  if (!isPetObject(data)) {
    return false;
  }

  if (!isvalidate(data)) {
    return false;
  }

  return true;
}

// Hàm kiểm tra các phần tử mảng có phải object không
function isPetObject(data) {
  // Trả về false nếu có phần tử không phải object
  if (
    !data.every((item) => {
      return item instanceof Object;
    })
  ) {
    alert("Error: one of Elements in Array is not Object..");
    return false;
  }

  // Tất cả các phần tử trong mảng là object
  const isTrue = data.every((item) => {
    // Trả về tất cả là true
    return (
      Object.keys(item).length === 12 &&
      item.hasOwnProperty("id") &&
      item.hasOwnProperty("name") &&
      item.hasOwnProperty("age") &&
      item.hasOwnProperty("type") &&
      item.hasOwnProperty("weight") &&
      item.hasOwnProperty("length") &&
      item.hasOwnProperty("color") &&
      item.hasOwnProperty("breed") &&
      item.hasOwnProperty("vaccinated") &&
      item.hasOwnProperty("dewormed") &&
      item.hasOwnProperty("sterilized") &&
      item.hasOwnProperty("date")
    );
  });

  // Kiểm tra file có thuộc tính - có hợp lệ hay không
  if (!isTrue) {
    confirm("File is illegal: Have the property is not true...");
    return false;
  }

  return true;
}

function isvalidate(data) {
  // Kiểm tra tất cả các object có hệp lệ không
  // Hợp lệ khi tất có các điều kiện validate input vào của dữ liệu

  return data.every((pet) => {
    // Id không hợp lệ
    if (pet.id.trim().length === 0) {
      alert("Id is illigal..");
      return false;
    }

    // Name không hợp lệ
    if (pet.name.trim().length === 0) {
      alert("Name is illigal..");
      return false;
    }

    // Age không hợp lệ
    pet.age = parseInt(pet.age);
    if (isNaN(pet.age || pet.age < 1 || pet.age > 15)) {
      alert("Age is illigal..");
      return false;
    }

    // Weight không hợp lệ
    pet.weight = parseInt(pet.weight);
    if (isNaN(pet.weight || pet.weight < 1 || pet.weight > 15)) {
      alert("Weight is illigal..");
      return false;
    }

    // Length không hợp lệ
    pet.length = parseInt(pet.length);
    if (isNaN(pet.length || pet.length < 1 || pet.length > 100)) {
      alert("Length is illigal..");
      return false;
    }

    // Type không hợp lệ
    if (pet.type.trim().length === 0) {
      alert("Type is illigal..");
      return false;
    }

    // Color không hợp lệ
    if (pet.color.trim().length === 0) {
      alert("Color is illigal..");
      return false;
    }

    // Breed không hợp lệ
    if (pet.breed.trim().length === 0) {
      alert("Breed is illigal..");
      return false;
    }

    // Date không hợp lệ
    if (pet.date.trim().length === 0) {
      alert("Date is illigal..");
      return false;
    }

    // Vaccinated không hợp lệ
    if (typeof pet.vaccinated !== "boolean") {
      alert("Vaccinated is illigal..");
      return false;
    }

    // Dewormed không hợp lệ
    if (typeof pet.dewormed !== "boolean") {
      alert("Dewormed is illigal..");
      return false;
    }

    // Sterilized không hợp lệ
    if (typeof pet.sterilized !== "boolean") {
      alert("Sterilized is illigal..");
      return false;
    }

    // Kiểm tra id có trùng không
    let count = 1;
    for (let item of data) {
      if (pet.id === item.id) {
        if (count > 1) {
          alert("Have the same id...");
          return false;
        }
        count++;
      }
    }
    return true;
  });
}
