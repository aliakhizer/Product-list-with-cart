let count = 0;

const cartButtons = document.querySelectorAll(".cart-btn");
cartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    count++;
    console.log(count);
    document.getElementById("cart-count").innerHTML = count;
  });
});


