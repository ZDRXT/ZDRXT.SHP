import { saveCategory } from "../service/service.js"

function initialCategories() {
	let allCategories = document.querySelectorAll(".categories__nav-btn")

	allCategories.forEach(category => {
		category.addEventListener("click", () => {
			let currCategory = category.dataset.categorie
			saveCategory(currCategory)
		})
	})
}

export default initialCategories
