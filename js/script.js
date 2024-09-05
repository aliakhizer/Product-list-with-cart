fetch("./data.json")
  .then((response) => {
    return response.json(); // Corrected: Call the function with parentheses
  })
  .then((products) => {
    let productArray = "";
    let cartArray = " ";
    let orderCard = " ";
    let Count = 0;

    products.forEach((product) => {
      productArray += `
     <div class="product-card">
            <img
              src=${product.image.desktop}
              alt="waffle img"
              class="desert-img"
            />
            <button class="cart-btn" data-product='${JSON.stringify(product)}'>
              <img src="./assets/images/icon-add-to-cart.svg" alt="" />
              add to cart
            </button>
            <div class="product-card-content">
              <p class="product-flavours">${product.name}</hp>
              <div class="product-extra-flavour">${product.category}</div>
              <div class="product-price">${product.price}</div>
            </div>
          
       </div> `;
    });
    cartArray += `<div class="cart-title">
            Your Cart(<span id="cart-count">0</span>)
          </div>
          <div class="cart-img">
            <img src="./assets/images/illustration-empty-cart.svg" alt="" />
          </div>
          <div class="cart-des">Your added items will appear here</div>
        </div>`;

    document.querySelector(".products-card").innerHTML = productArray;
    document.querySelector(".cart-container").innerHTML = cartArray;

    document.querySelectorAll(".cart-btn").forEach((button) => {
      button.addEventListener("click", function () {
        Count++;
        console.log(Count);
        const productData = JSON.parse(this.getAttribute("data-product"));
        console.log("productData", productData);

        updateCard(productData, Count);
      });
    });

    function updateCard(product, count) {
      console.log("product", product);

      const orderCard = `
        <div class="order-title">Your Cart(${count})</div>
        <div class="order-details">
          <div class="order-flavours">
            <h3 class="order-title-flvr">${product.name}</h3>
            <div class="order-price-details">
              <p class="order-size">1x</p>
              <div class="order-price">
                <p class="price">@$${product.price}</p>
                <p class="order-total-price">$${product.price}</p>
              </div>
            </div>
          </div>
          <div class="order-cancel">
            <img
              src="./assets/images/icon-remove-item.svg"
              alt=""
              class="cancel"
            />
          </div>
        </div>
        <hr class="order-divider" />
        <div class="total-amount">
          <p class="total-amount-title">Order Total</p>
          <div class="total-amount-price">$${product.price}</div>
        </div>
        
        <div class="order-confirm">
          <button class="confirm-btn">Confirm Order</button>
        </div>
      `;
      document.querySelector(".cart-container").innerHTML = orderCard;
    }
  })

  .catch((error) => {
    console.log("error");
  });
