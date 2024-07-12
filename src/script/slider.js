import { getPublicInfo } from "../service/service.js"

let swiperWrapper = document.querySelector(".swiper-wrapper")

getPublicInfo("products", "?popular=true").then(data => {
	renderSlider(swiperWrapper, data)
})

function renderSlider(selector, prods) {
	selector.innerHTML = ""

	prods.forEach(prod => {
		selector.innerHTML += `<div class="swiper-slide">
			<div class="product-card">
				<img src="./src/images/products/${prod.photos[0]}">

				<h3>${prod.title}</h3>

				<div class="row">
					<p>${prod.price}$</p>

					<button>Buy</button>
				</div>
			</div>
	   </div>`
	})
}



