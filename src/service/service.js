import { PUBLIC_URL } from "./key.js";

async function getPublicInfo(route, param = "") {
	let res = await fetch(PUBLIC_URL + route + param)
	let data = await res.json()
	return data
}

export { getPublicInfo }
