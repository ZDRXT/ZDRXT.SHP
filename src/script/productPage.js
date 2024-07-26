import { getPublicInfo, getProduct, postPublicInfo, saveProduct } from "../service/service.js";
import initialSlider from "./slider.js";

let cardId = getProduct("ZDRXT.SHP-PROD-ID")

// Slider
let mainSlider = document.querySelector(".product__gallery-main .swiper-wrapper")
let helperSlider = document.querySelector(".product__gallery-track .swiper-wrapper")
let productInfo = document.querySelector(".product__info")

// Modal and Comments
let modal = document.querySelector(".modal")
let closeButton = document.querySelector(".close-btn");
let addComment = document.querySelector(".add-comment-btn")
let reviewsContainer = document.querySelector(".reviews__container")
let feedbackForm = document.querySelector(".feedback")
let authotInp = document.querySelector(".modal .feedback__name")
let commentTitle = document.querySelector(".modal .feedback__title")
let commentBody = document.querySelector(".modal .feedback__body")
let commentRec = document.querySelector("#rec")
let reviewsAmount = document.querySelector(".reviews-amount")

// Cart
let getCartList = getProduct("cart-list")
let cartList = getCartList ? getCartList : []

productInfo.addEventListener("click", (event) => {

	if (event.target.closest(".product__info-buy")) {
		getPublicInfo("products/", cardId).then(data => {
			if (data.title && data.price) {
				cartList.push({ ...data, count: 1 })
				saveProduct("cart-list", cartList)
			}
		})
	}
})

feedbackForm.addEventListener("submit", (event) => {
	event.preventDefault()
	let newComment = {
		productId: +cardId,
		title: commentTitle.value,
		text: commentBody.value,
		author: authotInp.value,
		reccomended: commentRec.checked,
		date: Date.now()
	}

	postPublicInfo("Comments", newComment).then(data => {
		getPublicInfo("Comments", `?productId=${cardId}`).then(data => {
			let filteredComments = data.filter(comm => comm.productId == cardId)
			renderComments(filteredComments)
			modal.classList.remove('active');
		})
	})
})

if (cardId) {
	getPublicInfo("products/", cardId).then(data => {
		renderProduct(data)
		initialSlider(`?category=${data.category}`)
	})

	getPublicInfo("Comments", `?productId=${cardId}`).then(data => {
		let filteredComments = data.filter(comm => comm.productId == cardId)

		renderComments(filteredComments)
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

function renderComments(comments) {
	reviewsAmount.innerHTML = comments.length
	reviewsContainer.innerHTML = ""

	comments.sort((a, b) => +b.date - +a.date).forEach(el => {
		reviewsContainer.innerHTML += `<div class="reviews__container-item">
						<p class="reviews__author">${el.author}</p>
						<h3 class="reviews__title">${el.title}</h3>
						<p class="reviews__text">${el.text}</p>
						<div class="row">
							<p class="reviews__recommend">
							${el.reccomended ? "The author recommends this product" : "The author is not recommends this product"}							
							</p>
							<p class="reviews__date">${formatDate(el.date)}</p>
						</div>
					</div>`
	})
}

function formatDate(timestamp) {
	const date = new Date(timestamp);

	let day = date.getDate().toString().padStart(2, '0');
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

closeButton.addEventListener("click", () => {
	modal.classList.remove('active');
});

modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.classList.remove('active');
	}
});

addComment.addEventListener("click", () => {
	modal.classList.add('active');
})
