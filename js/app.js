'use strict';

let maxSelectedCountTotal = 25;
let selectedCountTotal = 0;
const productList = [];
// let shownGroupSize = 3;

let shownContainer = document.getElementById('display-frame');

// for (let i = 0; i < shownGroupSize; i++) {

//   // let shownProduct ??? = document.getElementById(`product-${i+1}`)
// }

let shownProductOne = document.getElementById('shown-product-one');
let shownProductTwo = document.getElementById('shown-product-two');
let shownProductThree = document.getElementById('shown-product-three');
let selectedData = document.getElementById('display-frame');


// function freshProductIndex() {
//   let checkedIndex = genProductIndex();
//   while (productList[checkedIndex].lastSelectedCount === selectedCountTotal - 1)
//     genProductIndex();
// }

function Product(name, imgFormat = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${imgFormat}`;
  this.shownCount = 0;
  this.selectedCount = 0;
  this.lastSelectedCount = 0;
  productList.push(this);
  // this.productIndexId = productList.length;
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');

function renderImgGroup() {
  let productDupeCheckArr = productList;
  function genProductIndex() {
    return Math.floor(Math.random() * productDupeCheckArr.length);
  }
  let productOneIndex = genProductIndex();
  console.log(productDupeCheckArr);
  productDupeCheckArr = productDupeCheckArr.slice([productOneIndex], 1);

  // productList[productOneIndex].lastSelectedCount = selectedCountTotal;
  let productTwoIndex = genProductIndex();
  productDupeCheckArr = productDupeCheckArr.slice([productTwoIndex], 1);
  let productThreeIndex = genProductIndex();

  console.log(productList[productOneIndex].src);
  shownProductOne.src = productList[productOneIndex].src;
  console.log(shownProductOne);
  shownProductOne.alt = productList[productOneIndex].name;
  productList[productOneIndex].shownCount++;

  shownProductTwo.src = productList[productTwoIndex].src;
  shownProductTwo.alt = productList[productTwoIndex].name;
  productList[productTwoIndex].shownCount++;

  shownProductThree.src = productList[productThreeIndex].src;
  shownProductThree.alt = productList[productThreeIndex].name;
  productList[productThreeIndex].shownCount++;
}

renderImgGroup();

function handleProductClick(event) {

  let productSelected = event.target.alt;
  for (let i = 0; i < productList.length; i++)
    if (productSelected === productList[i].name) {
      productList[i].selectedCount++;
    }
  selectedCountTotal++;
  // else {

  // }
  renderImgGroup();

  if (selectedCountTotal === maxSelectedCountTotal) {
    shownContainer.removeEventListener('click', handleProductClick);
  }
}

function handleDisplayData(event) { //eslint-disable-line

  let displayData = document.getElementById('focus-group-data');
  if (selectedCountTotal === maxSelectedCountTotal) {
    for (let i = 0; i < productList.length; i++) {
      let li = document.createElement('li');
      li.textContent = `Product "${productList[i].name}": Selected ${productList[i].selectedCount} of ${productList[i].shownCount} times`;
      displayData.appendChild(li);
    }
  }
}

shownContainer.addEventListener('click', handleProductClick);
selectedData.addEventListener('click', handleDisplayData);
