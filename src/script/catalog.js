import { getPublicInfo } from "../service/service.js"

getPublicInfo("products").then(data => {
	console.log(data)
	// renderProducts(swiperWrapper, data)
})

function renderProducts(selector, prods) {
	selector.innerHTML = ""

	prods.forEach(prod => {
		selector.innerHTML += `<div class="product-card">
				<img src="../images/products/${prod.photos[0]}">

				<h3>T-Shirt with watercolor print on back</h3>

				<div class="row">
					<p>20$</p>

					<button>Buy</button>
				</div>
			</div>`
	})
}
