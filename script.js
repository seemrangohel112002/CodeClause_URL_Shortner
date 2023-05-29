const API_URL = "https://api.shrtco.de/v2/shorten";

const inputField = document.getElementById("url-input");
const shortenButton = document.getElementById("shorten-btn");
const resultDiv = document.getElementById("result");

shortenButton.addEventListener("click", async () => {
	const longUrl = inputField.value;

	if (!isValidUrl(longUrl)) {
		resultDiv.innerHTML = "Invalid URL";
		return;
	}

	resultDiv.innerHTML = "Loading...";

	try {
		const response = await fetch(`${API_URL}?url=${longUrl}`);
		const data = await response.json();

		if (response.ok) {
			resultDiv.innerHTML=`Your Shortened URL is: => `
			resultDiv.innerHTML += `<a href="${data.result.full_short_link}">${data.result.full_short_link}</a>`;
		} else {
			resultDiv.innerHTML = "Error: " + data.error;
		}
	} catch (err) {
		console.error(err);
		resultDiv.innerHTML = "Error: " + err.message;
	}
});

function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}