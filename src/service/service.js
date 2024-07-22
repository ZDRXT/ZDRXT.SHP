import { PUBLIC_URL } from "./key.js";

async function getPublicInfo(route, param = "") {
	let res = await fetch(PUBLIC_URL + route + param)
	let data = await res.json()
	return data
}

async function postPublicInfo(route, body) {
	let res = await fetch(PUBLIC_URL + route, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body)
	})
	let data = await res.json()
	return data
}

function saveCategory(category) {
	localStorage.setItem("zdrxt-category", category)
}

function saveProduct(key, data) {
	localStorage.setItem(key, JSON.stringify(data))
}

function getProduct(key) {
	let prod = JSON.parse(localStorage.getItem(key))

	if (prod) return prod

	return null
}

function getCategory() {
	let category = localStorage.getItem("zdrxt-category")

	if (category) {
		return category
	}

	location.pathname = "/"
}

export { getPublicInfo, saveCategory, getCategory, saveProduct, getProduct, postPublicInfo }
