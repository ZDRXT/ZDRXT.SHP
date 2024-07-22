import { saveProduct } from "../service/service.js";

function initialProdHandler() {
	let allProds = document.querySelectorAll(".product-card")

	allProds.forEach(prod => {
		prod.addEventListener("click", (event) => {
			if (event.target.closest(".product-card")) {
				let prodId = event.target.closest(".product-card").dataset.id
				saveProduct("ZDRXT.SHP-PROD-ID", prodId)
			}
		})
	})
}

export default initialProdHandler
