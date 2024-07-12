import { getPublicInfo, getProduct } from "../service/service.js";

let cardId = getProduct("ZDRXT.SHP-PROD-ID")

if (cardId) {
	getPublicInfo("products/", cardId).then(data => console.log(data))
} else {
	location.pathname = "/"
}

// renderProduct() {}