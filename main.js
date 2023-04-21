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
	currentSpan.textContent = current;

	const previousSpan = card.querySelector(".previous");
	previousSpan.textContent = previous;

	previousSpan.classList.remove("daily", "weekly", "monthly");
	previousSpan.classList.add(period);
}

// Change all card data
function setPeriodicDataAll(cards, data, period = "weekly") {
	cards.forEach((card) => {
		setPeriodicData(card, data, period);
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
		setPeriodicData(card, data);
	});

	// Add button functionality
	periodBtns.forEach((button) => {
		const period = button.textContent.toLowerCase();
		button.addEventListener("click", () => {
			setPeriodicDataAll(cards, data, period);
		});
	});
}

main();
