import * as model from './model.js';

const tblProduct = document.querySelector('#tblProduct');
const tblProducttd = document.querySelector('#tblProducttd');
const totalPriceResult = document.querySelector('.totalprice');
let cartData = model.Products();
let cart = [];

const loadShoppingCart = function () {
  cartData.forEach(item => {
    cart.push({ ...item, numberOfUnits: 1, totalPrice: 0 });
  });
};
const renderShoppingCart = function () {
  tblProducttd.innerHTML = ' ';
  cart.forEach(item => {
    let cartRow = `
    <tr class="shoprow">
                  <td class="p-4">
                    <div class="media align-items-center">
                      <img
                        src="${item.image}"
                        class="d-block ui-w-40 ui-bordered mr-4"alt=""/>
                      <div class="media-body">
                        ${item.name}
                        <small>
                          <span class="text-muted">${item.description}</span>
                        </small>
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-right font-weight-semibold align-middle p-4 price">
                    ${item.price}
                  </td>
                  <td class="align-middle p-4">
                    <input
                      type="text"
                      class="form-control text-center quantity"
                      value="${item.numberOfUnits}"
                      data-id="${item.id}"
                    />
                  </td>
                  <td id="${item.id}"
                    class="text-right font-weight-semibold align-middle p-4 total">
                    ${item.numberOfUnits * item.price}
                  </td>
                  <td class="text-center align-middle px-0">
                    <a
                      href="#"
                      class="shop-tooltip close float-none text-danger remove"
                      title="Delete Item"
                      data-id="${item.id}"
                      >×</a
                    >
                  </td>
                </tr>
    
    `;
    tblProducttd.insertAdjacentHTML('beforeend', cartRow);
  });
};
const removeItemFromShoppingCart = function () {
  document.querySelector('#tblProduct').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove')) {
      let rowId = +e.target.dataset.id;
      cart = cart.filter(item => item.id !== rowId);
      renderShoppingCart();
      calcTotalPrice();
    }
  });
};
const calcTotalPrice = function () {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach(item => {
    totalPrice += +item.price * +item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalPriceResult.innerHTML = `Total Price : $${totalPrice.toFixed()} ( ${totalItems} items )`;
};
const calcQuantityPrice = function () {
  let quantity;
  let price;
  document.querySelector('#tblProduct').addEventListener('keyup', function (e) {
    if (e.target.classList.contains('quantity')) {
      quantity = e.target.value;
      let rowId = +e.target.dataset.id;
      let tempData;
      if (quantity > 0) {
        tempData = cart
          .filter(item => item.id === rowId)
          .map(item => item.price * quantity);
        document.getElementById(`${rowId}`).innerHTML = tempData;
        changeNumberOfUnits(quantity, rowId);
        renderShoppingCart();
        calcTotalPrice();
      } else {
        alert('Please enter a number greater than zero.');
        e.target.value = 1;
      }
    }
  });
};
const clearShoppingCart = function () {
  document
    .querySelector('.btndeletecart')
    .addEventListener('click', function () {
      tblProducttd.innerHTML = ' ';
      tblProduct.innerHTML = 'There is nothing in your shopping cart.';
      totalPriceResult.innerHTML = '0';
    });
};
const changeNumberOfUnits = function (number, id) {
  cart = cart.map(item => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      numberOfUnits = +number;
    }
    let totalPrice = numberOfUnits * item.price;
    return {
      ...item,
      numberOfUnits,
      totalPrice,
    };
  });

  renderShoppingCart();
};
const init = function () {
  loadShoppingCart();
  renderShoppingCart();
  removeItemFromShoppingCart();
  clearShoppingCart();
  calcQuantityPrice();
  calcTotalPrice();
};
init();
