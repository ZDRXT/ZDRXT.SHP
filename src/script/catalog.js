import { getPublicInfo, getCategory } from "../service/service.js"

let category = getCategory()

getPublicInfo("products", `?category=${category}`).then(data => {
	let catalogList = document.querySelector(".catalog__list")
	let filteredData = data.filter(el => el.category === category)

	renderProducts(catalogList, filteredData)
})

function renderProducts(selector, prods) {
	selector.innerHTML = ""

	prods.forEach(prod => {
		selector.innerHTML += `<div class="product-card">
				<img src="../images/products/${prod.photos[0]}">

				<h3>${prod.title}</h3>

				<div class="row">
					<p>${prod.price}$</p>

					<button>Buy</button>
				</div>
			</div>`
	})
}
