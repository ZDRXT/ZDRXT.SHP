import { getPublicInfo, getProduct, postPublicInfo } from "../service/service.js";
import initialSlider from "./slider.js";

let cardId = getProduct("ZDRXT.SHP-PROD-ID")

let mainSlider = document.querySelector(".product__gallery-main .swiper-wrapper")
let helperSlider = document.querySelector(".product__gallery-track .swiper-wrapper")
let productInfo = document.querySelector(".product__info")

let modal = document.querySelector(".modal")

let reviewsContainer = document.querySelector(".reviews__container")

let feedbackForm = document.querySelector(".feedback")
let authotInp = document.querySelector(".modal .feedback__name")
let commentTitle = document.querySelector(".modal .feedback__title")
let commentBody = document.querySelector(".modal .feedback__body")
let commentRec = document.querySelector("#rec")

let reviewsAmount = document.querySelector(".reviews-amount")

feedbackForm.addEventListener("submit", (event) => {
	event.preventDefault()

	let newComment = {
		productId: +cardId,
		title: commentTitle.value,
		text: commentBody.value,
		author: authotInp.value,
		reccomended: commentRec.checked,
	}

	postPublicInfo("Comments", newComment).then(data => {
		getPublicInfo("Comments", `?productId=${cardId}`).then(data => {
			let filteredComments = data.filter(comm => comm.productId == cardId)
			renderComments(filteredComments)
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
	reviewsContainer.innerHTML = ""

	comments.forEach(el => {
		reviewsContainer.innerHTML += `<div class="reviews__container-item">
						<p class="reviews__author">${el.author}</p>
						<h3 class="reviews__title">${el.title}</h3>
						<p class="reviews__text">${el.text}</p>
						<div class="row">
							<p class="reviews__recommend">
							${el.reccomended ? "The author recommends this product" : "The author is not recommends this product"}							
							</p>
							<p class="reviews__date">${el.date}</p>
						</div>
					</div>`
	})
}

let modalWindow = document.querySelector(".modal")

modalWindow.addEventListener("", () => {
    const modalWind = document.querySelector(".modal");
    const closeButton = document.querySelector(".close-btn");
    const sendButton = document.querySelector(".send-btn");
	const addComment = document.querySelector(".add-comment-btn")

	closeButton.addEventListener("click", function(event) {
        event.preventDefault();
        modalWind.classList.remove('active');
    });

	sendButton.addEventListener("click", function(event) {
        event.preventDefault();
        modalWind.classList.remove('active');
    });

	modalWindow.addEventListener("click", function(event) {
        if (event.target === modalWindow) {
            modalWind.classList.remove('active');
        }
    });

	addComment.addEventListener("click", function(event) {
		modalWind.classList.add('active');
		console.log("hello")
	})
});