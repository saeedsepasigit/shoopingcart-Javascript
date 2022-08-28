import * as model from './model.js';
const tblProduct = document.querySelector('#tblProduct');
const tblProducttd = document.querySelector('#tblProducttd');
const totalPriceResult = document.querySelector('.totalprice');
const totalPriceBadge = document.querySelector('.badge');

let cartData = model.Products();
let cart = [];
const loadShoppingCart = () => {
  cartData.forEach(item => {
    cart.push({ ...item, numberOfUnits: 1, totalPrice: 0 });
  });
};
const renderShoppingCart = () => {
  tblProducttd.innerHTML = ' ';
  cart.forEach(item => {
    let cartRow = `
    <tr class="shoprow">
                  <td class="p-4">
                    <div class="media align-items-center">
                        <div title="${item.name}" class="zoomBlur">
                        <img
                        src="${item.image}"
                        class="d-block widthItemCart ui-w-40 ui-bordered mr-4 "alt="${
                          item.name
                        }"/>
                        </div>
                      <div class="media-body">
                        ${item.name}
                        </br>
                        <small>
                          <span class="text-muted">${item.description}</span>
                          </br>
                          <span class="text-muted">Color :</span>
                            <span class="ui-product-color ui-product-color-sm align-text-bottom" style="background-color:${
                              item.color
                            };"></span>
                            </br>
                            <span class="text-muted">Category : </span> ${
                              item.category
                            }
                        </small>
                      </div>
                    </div>
                  </td>
                  <td
                    class="text-right font-weight-semibold align-middle p-4 price">
                    ${formatCurrencyToUsd.format(item.price).slice(0, -3)}
                  </td>
                  <td class="align-middle p-4">
                    <input
                      type="number"
                      class="form-control text-center quantity"
                      value="${item.numberOfUnits}"
                      data-id="${item.id}"
                      min="1"
                      max="100"
                    />
                  </td>
                  <td id="${item.id}"
                    class="text-right font-weight-semibold align-middle p-4 total">
                    ${formatCurrencyToUsd
                      .format(item.numberOfUnits * item.price)
                      .slice(0, -3)}
                  </td>
                  <td class="text-center align-middle px-0">
                    <a
                      href="#"
                      class="shop-tooltip close float-none text-danger"
                      title="Delete Product"
                      >
                      <i data-id="${
                        item.id
                      }" class="fa fa-trash remove" aria-hidden="true" ></i>
                      </a
                    >
                  </td>
                </tr>
    
    `;
    tblProducttd.insertAdjacentHTML('beforeend', cartRow);
  });
};
const removeItemFromShoppingCart = () => {
  document.querySelector('#tblProduct').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove')) {
      let rowId = +e.target.dataset.id;
      cart = cart.filter(item => item.id !== rowId);
      renderShoppingCart();
      calcTotalPrice();
    }
  });
};
const calcTotalPrice = () => {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach(item => {
    totalPrice += +item.price * +item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalPriceResult.innerHTML = `Total Price : ${formatCurrencyToUsd
    .format(totalPrice)
    .slice(0, -3)} ( ${totalItems} Product )`;
  totalPriceBadge.innerHTML = totalItems;
};
const calcQuantityPrice = () => {
  let quantity;
  let price;
  document.querySelector('#tblProduct').addEventListener('click', function (e) {
    if (e.target.classList.contains('quantity')) {
      quantity = e.target.value;
      let rowId = +e.target.dataset.id;
      let tempData;
      if (quantity > 0) {
        tempData = cart
          .filter(item => item.id === rowId)
          .map(item => item.price * quantity);
        document.getElementById(`${rowId}`).innerHTML = tempData;
        changeNumberOfQuantity(quantity, rowId);
        renderShoppingCart();
        calcTotalPrice();
      } else {
        alert('Please enter a number greater than zero.');
        e.target.value = 1;
      }
    }
  });
};
const clearShoppingCart = () => {
  document
    .querySelector('.btndeletecart')
    .addEventListener('click', function () {
      tblProducttd.innerHTML = ' ';
      tblProduct.innerHTML = 'There is nothing in your shopping cart.';
      totalPriceResult.innerHTML = '0';
      totalPriceBadge.innerHTML = '0';
    });
};
const changeNumberOfQuantity = (number, id) => {
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
const formatCurrencyToUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const init = () => {
  loadShoppingCart();
  renderShoppingCart();
  removeItemFromShoppingCart();
  clearShoppingCart();
  calcQuantityPrice();
  calcTotalPrice();
};
init();
