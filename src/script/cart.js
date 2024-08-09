import { getProduct, saveProduct } from "../service/service.js"

let getCartList = getProduct("cart-list")
let cartList = getCartList ? getCartList : []

let cartListBox = document.querySelector(".cart__list")

let totalPayPrice = document.querySelector(".amount span")

cartListBox.addEventListener("click", (event) => {
    let dataSize = event.target.closest(".cart__list-item").dataset.size
    let dataId = event.target.closest(".cart__list-item").dataset.id
    let prodIndex = cartList.findIndex(element => element.id == dataId && element.sizes == dataSize)

    if (event.target.closest(".cart__minus")) {
        if (cartList[prodIndex].count > 1) {
            cartList[prodIndex].count = cartList[prodIndex].count - 1
            renderCart()
            saveProduct("cart-list", cartList)
        }
    }

    if (event.target.closest(".cart__plus")) {
        cartList[prodIndex].count = cartList[prodIndex].count + 1
        renderCart()
        saveProduct("cart-list", cartList)
    }

    if (event.target.closest(".remove__item-btn")) {
        cartList.splice(prodIndex, 1)
        renderCart()
        saveProduct("cart-list", cartList)
    }
})

function renderCart() {
    let totalPrice = 0

    cartList.forEach((element) => {
        totalPrice += element.price * element.count
    })

    totalPayPrice.innerHTML = totalPrice.toFixed(2)

    cartListBox.innerHTML = ""
    if (cartList.length > 0) {
        cartList.forEach(element => {
            cartListBox.innerHTML += `
                <div data-id="${element.id}" data-size="${element.sizes}" class="cart__list-item">
                <img src="../images/products/${element.photos[0]}">

                <div class="about">
                    <h3>${element.title} [ ${element.sizes.toUpperCase()} ]</h3>

                    <div class="about-bottom">
                        <div class="amount">
                            <button class="cart__minus">-</button>

                            <input type="number" value="${element.count}" min="5" max="100">

                            <button class="cart__plus">+</button>
                        </div>

                        <div class="price">$${(element.price * element.count).toFixed(2)}</div>
                    </div>
                </div>

                <button class="remove__item-btn">&#10006;</button>
            </div>
            `
        });
    }
    let prices = cartListBox.querySelectorAll(".price")


    let inputs = cartListBox.querySelectorAll("input").forEach((inp, i) => {
        inp.addEventListener("input", (event) => {
            if (+event.target.value<1) {
                event.target.value = 1
            } if (+event.target.value>25) {
                event.target.value = 25
            }


            let dataSize = event.target.closest(".cart__list-item").dataset.size
            let dataId = event.target.closest(".cart__list-item").dataset.id
            let prodIndex = cartList.findIndex(element => element.id == dataId && element.sizes == dataSize)

            cartList[prodIndex].count = +event.target.value
            saveProduct("cart-list", cartList)

            prices[i].innerHTML = (cartList[prodIndex].count * cartList[prodIndex].price).toFixed(2)
        })
    })
}

renderCart()