"use strict";

var productName = document.getElementById("ProName");
var productPrice = document.getElementById("ProPrice");
var productCategory = document.getElementById("ProCategory");
var productDescription = document.getElementById("ProDesc");
var productImage = document.getElementById("ProImage");
var row = document.getElementById("rowData");
var addBtn = document.getElementById("addPro");
var updateBtn = document.getElementById("updatePro");
var searchResult = document.getElementById("searchPro");
var alertForm = document.getElementById("alertForm");
var updatedIndex;

var productList = [];

if (localStorage.getItem("productlist") != null) {
  productList = JSON.parse(localStorage.getItem("productlist"));
  displayProduct(productList);
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDescription.value,
    image: "./images/" + productImage.files[0].name,
  };

  if (
    productName.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid") &&
    productCategory.classList.contains("is-valid") &&
    productDescription.classList.contains("is-valid")
  ) {
    productList.push(product);
    localStorage.setItem("productlist", JSON.stringify(productList));
    displayProduct(productList);
    clearForm();
    alertForm.classList.add("d-none");
  } else {
    alertForm.classList.remove("d-none");
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productImage.value = "";
}

function displayProduct(list) {
  var cartoona = "";

  for (var i = 0; i < list.length; i++) {
    cartoona += `<div class="col-lg-3">
    <div class="card ">
      <img src="${list[i].image}" class="rounded" alt="food">
      <div class="card-body">
        <h1 class="text-center">${list[i].name}</h1>
        <h3 class="h5">Price : ${list[i].price}</h3>
        <h3 class="h5">Category : ${list[i].category}</h3>
        <h3 class="h5">Desc : ${list[i].desc}.</h3>
        <button class="btn btn-danger w-100 my-3" onclick="deleteProduct(${i})">Delete</button>
        <button class="btn btn-warning w-100" onclick="updateItem(${i})">Update</button>  
      </div>
    </div>
  </div>`;
  }
  row.innerHTML = cartoona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productlist", JSON.stringify(productList));
  displayProduct(productList);
}

function updateItem(up) {
  updatedIndex = up;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
  productName.value = productList[up].name;
  productPrice.value = productList[up].price;
  productCategory.value = productList[up].category;
  productDescription.value = productList[up].desc;
  productImage.value = productList[up].image;
}

function search() {
  var searchItem = [];

  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchResult.value.toLowerCase()) == true
    ) {
      searchItem.push(productList[i]);
    }
  }
  displayProduct(searchItem);
}

function updateProduct() {
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");

  productList[updatedIndex].name = productName.value;
  productList[updatedIndex].price = productPrice.value;
  productList[updatedIndex].category = productCategory.value;
  productList[updatedIndex].desc = productDescription.value;

  localStorage.setItem("productlist", JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
}

function validateInputs(element) {
  var regex = {
    ProName: /^[A-Z]\w{3,10}\s?\w{0,5}$/,
    ProPrice: /^[1-9][0-9][0-9][0-9][0-9]?$/,
    ProCategory: /^(Mobile|Tv|Tab|Watch)$/,
    ProDesc: /^.{4,300}$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
