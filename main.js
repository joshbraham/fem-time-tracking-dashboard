// Set backdrop colours & icons
function styleCard(card) {
	const category = card.dataset.category;

	const titleSpan = card.querySelector(".card-title");
	titleSpan.textContent = category;

	const iconUrl = `url("../images/icon-${category.replaceAll(" ", "-")}.svg")`;
	card.style.setProperty("--icon", iconUrl);

	const bdRef = category.replaceAll(" ", "");
	const backdropColor = `var(--clr-accent-${bdRef})`;
	card.style.setProperty("--backdrop-color", backdropColor);
}

// Change individual card data
function setPeriodicData(card, data, period = "weekly") {
	const { current, previous } = data.find((obj) => {
		return obj.title.toLowerCase() === card.dataset.category;
	}).timeframes[period];

	const currentSpan = card.querySelector(".current");
	currentSpan.textContent = String(current) + (current === 1 ? "hr" : "hrs");

	const previousSpan = card.querySelector(".previous");
	previousSpan.textContent = String(previous) + (previous === 1 ? "hr" : "hrs");

	previousSpan.classList.remove("daily", "weekly", "monthly");
	previousSpan.classList.add(period);
}

// Change all card data & give relevant button an active class
function setPeriodicDataAll(cards, data, period = "weekly", buttons = null) {
	cards.forEach((card) => {
		setPeriodicData(card, data, period);
	});

	setActive(period, buttons);
}

function setActive(period, elements) {
	elements.forEach((element) => {
		element.classList.remove("active");
		if (element.id === period) element.classList.add("active");
	});
}

// Main
async function main() {
	// Fetch data
	const response = await fetch("./data.json");
	const data = await response.json();

	const periodBtns = document.querySelectorAll(".btn-period");
	const cards = document.querySelectorAll(".card");

	// Style cards, set initial data
	cards.forEach((card) => {
		styleCard(card);
	});
	setPeriodicDataAll(cards, data, "weekly", periodBtns);

	// Add button functionality
	periodBtns.forEach((button) => {
		const period = button.id;
		button.addEventListener("click", () => {
			setPeriodicDataAll(cards, data, period, periodBtns);
		});
	});
}

main();
