import { getPublicInfo, getProduct } from "../service/service.js";
import initialSlider from "./slider.js";

let cardId = getProduct("ZDRXT.SHP-PROD-ID")

let mainSlider = document.querySelector(".product__gallery-main .swiper-wrapper")
let helperSlider = document.querySelector(".product__gallery-track .swiper-wrapper")
let productInfo = document.querySelector(".product__info")

let reviewsAmount = document.querySelector(".reviews-amount")

if (cardId) {
	getPublicInfo("products/", cardId).then(data => {
		renderProduct(data)
		initialSlider(`?category=${data.category}`)
	})
} else {
	location.pathname = "/"
}

function renderProduct(product) {
	mainSlider.innerHTML = ""
	helperSlider.innerHTML = ""

	product.photos.forEach(image => {
		mainSlider.innerHTML += `<div class="swiper-slide">
			<img src="../images/products/${image}"></img>
		</div>
	`})

	product.photos.forEach(image => {
		helperSlider.innerHTML += `<div class="swiper-slide">
			<img src="../images/products/${image}"></img>
		</div>
	`})

	let sizeHTML = product.sizes.map(size => `<input type="radio" name="size" id="${size}-id"><label for="${size}-id">${size}</label>`).join("")

	productInfo.innerHTML = `<h2 class="product__info-title">${product.title}</h2>
				<p class="product__info-descr">${product.about}</p>

				<div class="product__info-sizes row">
					${sizeHTML}
				</div>	

				<div class="row">
					<div class="product__info-price">$${product.price}</div>

					<button class="product__info-buy" data-id="${product.id}">Add to cart</button>
				</div>`

	productInfo.querySelector("input").checked = true

	var swiper = new Swiper(".product__gallery-track", {
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
	});

	var swiper2 = new Swiper(".product__gallery-main", {
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});
}

