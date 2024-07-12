import { getPublicInfo, getCategory } from "../service/service.js"
import { capitalizeFirstLetter } from "../service/utils.js"

let catalogList = document.querySelector(".catalog__list")

let category = getCategory()

let catalogTitleText = document.querySelector(".catalog__title-text")

let catalogFilter = document.querySelector(".catalog__filter")
let currFilter = "newest-arrivals"

let productsData

catalogFilter.addEventListener("change", () => {
	currFilter = catalogFilter.value
	renderProducts(catalogList, productsData)
})

catalogTitleText.innerHTML = capitalizeFirstLetter(category)

getPublicInfo("products", `?category=${category}`).then(data => {
	let filteredData = data.filter(el => el.category === category)

	productsData = filteredData

	renderProducts(catalogList, filteredData)
})

function renderProducts(selector, prods) {
	selector.innerHTML = ""

	let filteredProds = []

	switch (currFilter) {
		case "newest-arrivals":
			filteredProds = prods.slice().sort((a, b) => b.id - a.id)
			console.log(filteredProds)
			break;

		case "price-low":
			filteredProds = prods.slice().sort((a, b) => b.price - a.price)
			break;

		case "price-high":
			filteredProds = prods.slice().sort((a, b) => a.price - b.price)
			break;
	}

	filteredProds.forEach(prod => {
		selector.innerHTML += `<a href="./product.html" class="product-card">
				<img src="../images/products/${prod.photos[0]}">

				<h3>${prod.title}</h3>

				<div class="row">
					<p>${prod.price}$</p>

					<button>Buy</button>
				</div>
			</a>`
	})
}