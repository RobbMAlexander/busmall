'use strict';

let maxSelectedCountTotal = 24;
let selectedCountTotal = 0;
let productList = [];
// let shownGroupSize = 3;

let shownContainer = document.getElementById('display-frame');

let shownProductOne = document.getElementById('shown-product-one');
let shownProductTwo = document.getElementById('shown-product-two');
let shownProductThree = document.getElementById('shown-product-three');
let selectedData = document.getElementById('display-frame');

function Product(name, imgFormat = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${imgFormat}`;
  this.shownCount = 0;
  this.selectedCount = 0;
  this.lastSelectedCount = 'new';
  productList.push(this);
}

let loadProductData = localStorage.getItem('BusMall data');

if (loadProductData) {
  let runningProductTotals = JSON.parse(loadProductData);
  productList = runningProductTotals;
  for (let i= 0; i < productList.length; i++) {
    productList[i].lastSelectedCount = 'new';
  }
} else {

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
}



// for (let i = 0; i < productList.length; i++) {
//   productList[i].idNumber = i;
// }

function renderImgGroup() {
  // let productDupeCheckArr = productList;
  let tooSoon = selectedCountTotal;
  tooSoon--;
  let productDupeCheckArr = [];
  function genProductIndex() {
    return Math.floor(Math.random() * productList.length);
  }
  while (productDupeCheckArr.length < 3) {
    let productShown = genProductIndex();
    while (productList[productShown].lastSelectedCount === tooSoon) {
      productShown = genProductIndex();
    }
    while (!productDupeCheckArr.includes(productShown)) {
      productDupeCheckArr.push(productShown);
      productList[productShown].lastSelectedCount = selectedCountTotal;
    }
  }

  shownProductOne.src = productList[productDupeCheckArr[0]].src;
  shownProductOne.alt = productList[productDupeCheckArr[0]].name;
  productList[productDupeCheckArr[0]].shownCount++;

  shownProductTwo.src = productList[productDupeCheckArr[1]].src;
  shownProductTwo.alt = productList[productDupeCheckArr[1]].name;
  productList[productDupeCheckArr[1]].shownCount++;

  shownProductThree.src = productList[productDupeCheckArr[2]].src;
  shownProductThree.alt = productList[productDupeCheckArr[2]].name;
  productList[productDupeCheckArr[2]].shownCount++;

}

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

function renderGraph() {
  const ctx = document.getElementById('graph').getContext('2d');//eslint-disable-line
  let productName = [];
  let productShown = [];
  let productSelected = [];
  let productDiff = [];

  for (let i = 0; i < productList.length; i++) {
    productName.push(productList[i].name);
    productShown.push(productList[i].shownCount);
    productSelected.push(productList[i].selectedCount);
    let shown = productList[i].shownCount;
    let selected = productList[i].selectedCount;
    let selectedDiff = shown - selected;
    productDiff.push(selectedDiff);
  }
  let graphData = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Times Selected',
        data: productSelected,
        backgroundColor: 'rgba(36, 185, 36, 1)',
        borderColor: 'rgba(36, 185, 36, 1)',
        borderWidth: 1
      },
      {
        label: 'Times NOT Selected',
        data: productDiff,
        backgroundColor: 'rgba(110, 108, 108, 0.3)',
        borderColor: 'rgba(36, 185, 36, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        },
      }
    }
  };
  let graph = new Chart(ctx, graphData);//eslint-disable-line
}

function handleDisplayData(event) { //eslint-disable-line

  if (selectedCountTotal === maxSelectedCountTotal) {
    renderGraph();

    let savedProductData = JSON.stringify(productList);
    localStorage.setItem('BusMall data', savedProductData);
  }

  // outdated list data -- replaced with chart

  // let displayData = document.getElementById('focus-group-data');
  // if (selectedCountTotal === maxSelectedCountTotal) {
  //   // for (let i = 0; i < productList.length; i++) {
  //   //   let li = document.createElement('li');
  //   //   li.textContent = `Product "${productList[i].name}": Selected ${productList[i].selectedCount} of ${productList[i].shownCount} times`;
  //   //   displayData.appendChild(li);
  //   // }
  // }
}
renderImgGroup();

shownContainer.addEventListener('click', handleProductClick);
selectedData.addEventListener('click', handleDisplayData);
