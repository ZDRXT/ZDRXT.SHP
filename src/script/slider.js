import { getPublicInfo } from "../service/service.js"
import initialProdHandler from "./productHandler.js"

let swiperWrapper = document.querySelector(".swiper-wrapper")

getPublicInfo("products", "?popular=true").then(data => {
	renderSlider(swiperWrapper, data)
	initialProdHandler()
})

function renderSlider(selector, prods) {
	selector.innerHTML = ""
	prods.forEach(prod => {
		selector.innerHTML += `<div class="swiper-slide">
			<a href="./src/pages/product.html" class="product-card" data-id="${prod.id}">
				<img src="./src/images/products/${prod.photos[0]}">

				<h3>${prod.title}</h3>

				<div class="row">
					<p>${prod.price}$</p>

					<button>Buy</button>
				</div>
			</a>
	   </div>`
	})
}



