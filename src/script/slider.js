import { getPublicInfo } from "../service/service.js"
import initialProdHandler from "./productHandler.js"

function initialSlider(param = "?popular=true") {
	let swiperWrapper = document.querySelector(".content .swiper-wrapper")


	getPublicInfo("products", param).then(data => {
		renderSlider(swiperWrapper, data)
		initialProdHandler()
	})

	function renderSlider(selector, prods) {
		selector.innerHTML = ""
		prods.forEach(prod => {
			selector.innerHTML += `<div class="swiper-slide">
					<a href="${(param === '?popular=true' ? './src/pages/product.html' : './product.html')}" class="product-card" data-id="${prod.id}">
						<img src="${(param === '?popular=true' ? './src/images/products/' : '../images/products/') + prod.photos[0]}">
		
						<h3>${prod.title}</h3>
		
						<div class="row">
							<p>${prod.price}$</p>
		
							<button>Show</button>
						</div>
					</a>
			   </div>`
		})
	}
}

export default initialSlider

