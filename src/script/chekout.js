import { getProduct, postAdminInfo } from "../service/service.js"
import sendData from "../service/sendOrder.js"

let getCartList = getProduct("cart-list")
let prodList = getCartList ? getCartList : []

let prodListBox = document.querySelector(".products")

let totalProdsPrice = document.querySelector(".total-price span")

let form = document.querySelector("form")
let name = document.querySelector(".name-inp")
let phone = document.querySelector(".phone-inp")
let city = document.querySelector(".city-select")
let post = document.querySelector(".post-select")
let street = document.querySelector(".street-inp")
let comment = document.querySelector(".comment-inp")

let totalPrice = 0

if (prodList.length == 0) {
    location.pathname = "/src/pages/cart.html"
}

function renderProdList() {

    prodList.forEach((element) => {
        totalPrice += element.price * element.count
    })

    prodListBox.innerHTML = ""
    if (prodList.length > 0) {
        prodList.forEach(element => {
            prodListBox.innerHTML += `
            <div class="product">
                <img src="../images/products/${element.photos[0]}">
            
                <div class="about">
                    <h3>${element.title}</h3>
            
                    <div class="about-bottom">
                        <p class="count">[Amount: ${element.count}]</p>

                        <div class="price">$${(element.price * element.count).toFixed(2)}</div>
                    </div>
                </div>
            </div>`
        });
    }
    
    totalProdsPrice.innerHTML = totalPrice.toFixed(2)
}

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let orders = ""

    let orderSentModal = document.querySelector(".order-sent-modal")

    let adminData = {
        sum: totalPrice,
        date: Date.now(),
        client: {
            name: name.value,
            number: phone.value,
            address: city.value + " - " + street.value,
            delivery: post.value,
            comment: comment.value
        },
        products: prodList,
        status: "Очікує",
    }

    prodList.forEach(prod => {
        orders += `${prod.title} [${prod.id}]\nРозмір: ${prod.sizes}\nКількість: ${prod.count}\nЦіна: ${prod.price*prod.count}\n--------------------------------\n`
    })

    let message = `Нове замовлення\n\nДанні отримувача:\nІм'я: ${name.value}\nТелефон: ${phone.value}\nАдрес: ${city.value} - ${street.value}\nДоставка: ${post.value}\nКоментар:\n${comment.value}\n\nТовари:\n${orders}Загальна сума: ${totalPrice}`

    sendData(message).then(() => {
        orderSentModal.classList.add("active")
        name.value = ""
        phone.value = ""
        city.value = ""
        post.value = ""
        street.value = ""
        comment.value = ""
        localStorage.removeItem("cart-list")
    })

    postAdminInfo("orders", adminData).then( () => {console.log("ok")})
})

renderProdList()