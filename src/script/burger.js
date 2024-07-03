function initialBurger() {
	let burger = document.querySelector(".header__burger")
	let categoriesMenu = document.querySelector(".categories")

	burger.addEventListener('click', () => {
		burger.classList.toggle("active")
		categoriesMenu.classList.toggle("active")
	})
}

export default initialBurger
