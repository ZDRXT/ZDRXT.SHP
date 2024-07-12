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
				<img src="${prod.photos[0]}">

				<h3>T-Shirt with watercolor print on back</h3>

				<div class="row">
					<p>20$</p>

					<button>Buy</button>
				</div>
			</div>
	   </div>`
	})
}



