import { PUBLIC_URL } from "./key.js";

async function getPublicInfo(route, param = "") {
	let res = await fetch(PUBLIC_URL + route + param)
	let data = await res.json()
	return data
}

function saveCategory(category) {
	localStorage.setItem("zdrxt-category", category)
}

function getCategory() {
	let category = localStorage.getItem("zdrxt-category")

	if (category) {
		return category
	}

	location.pathname = "/"
}

export { getPublicInfo, saveCategory, getCategory }
