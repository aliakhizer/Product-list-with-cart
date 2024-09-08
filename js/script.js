const cardsContainer = document.querySelector('.products-card')
const cartContainer = document.querySelector('.cart-container')

let cartArray = []
let orderCard = null
let total = 0

fetch('./data.json')
  .then((response) => {
    return response.json()
  })
  .then((products) => {
    products.forEach((product, i) => {
      let card = document.createElement('div')
      card.innerHTML = `
     <div class="product-card">
            <img
              src=${product.image.desktop}
              alt="${product.name}"
              class="desert-img"
            />
            <button class="cart-btn" data-add-to-cart="${product.id}">
              <img src="./assets/images/icon-add-to-cart.svg" alt="" />
              add to cart
            </button>
            <div class="product-card-content">
              <p class="product-flavours">${product.name}</hp>
              <div class="product-extra-flavour">${product.category}</div>
              <div class="product-price">${product.price}</div>
            </div>
       </div> `
      cardsContainer.appendChild(card)

      const addToCart = card.querySelector(`[data-add-to-cart="${product.id}"]`)

      addToCart.addEventListener('click', () => {
        // console.log(product)
        // console.log(product.id === cartArray.includes(product.id))
        // if (product.id !== cartArray.includes(product.id)) {
        //   return
        // }
        cartArray.push(product)
        getCartItems()
      })
    })
  })
  .catch((error) => {
    console.log(error)
  })

function getCartItems() {
  if (cartArray.length !== 0) {
    cartContainer.innerHTML = ''
    cartArray.forEach((item) => {
      let cartItem = document.createElement('div')
      cartItem.innerHTML = `
      <div class="order-container">
      <div class="order-title">Your Cart(${cartArray.length})</div>
      <div class="order-details">
        <div class="order-flavours">
          <h3 class="order-title-flvr">${item.name}</h3>
          <div class="order-price-details">
            <p class="order-size">1x</p>
            <div class="order-price">
              <p class="price">${item.price}</p>
              <p class="order-total-price">$5.50</p>
            </div>
          </div>
        </div>
        <div class="order-cancel" data-remove-from-cart="${item.id}">
          <img
            src="./assets/images/icon-remove-item.svg"
            alt="remove item"
            class="cancel"
          />
        </div>
      </div>
      <hr class="order-divider" />
      `
      cartContainer.appendChild(cartItem)

      const removeFromCart = cartItem.querySelector(
        `[data-remove-from-cart="${item.id}"]`
      )
      removeFromCart.addEventListener('click', () => {
        cartArray = cartArray.filter((cartItem) => cartItem.id !== item.id)
        getCartItems()
      })
    })
  }
}
