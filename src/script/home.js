import { saveCategory } from "../service/service.js"

let allCategories = document.querySelectorAll(".content__top-item")

allCategories.forEach(category => {
    category.addEventListener("click", () => {
        let currCategory = category.dataset.categorie
        saveCategory(currCategory)
    })
})