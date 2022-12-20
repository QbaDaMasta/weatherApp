const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
// const API_LINK = "https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15";
const API_KEY = "&appid=c45a6242a8af632306d2abc8dc6a19cc";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = input.value || "London";
	const URL = API_LINK + city + API_KEY + API_UNITS;
	// console.log(URL);
	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			// const weath = res.data.weather[0]; to samo co na dole ale inaczej zapisane
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.round(temp) + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = status.main;

			warning.textContent = "";
			input.value = "";

			if (status.id >= 200 && status.id <= 232) {
				photo.setAttribute("src", "thunderstorm.png");
			} else if (status.id >= 300 && status.id <= 321) {
				photo.setAttribute("src", "drizzle.png");
			} else if (status.id >= 500 && status.id <= 531) {
				photo.setAttribute("src", "rain.png");
			} else if (status.id >= 600 && status.id <= 622) {
				photo.setAttribute("src", "ice.png");
			} else if (status.id === 800) {
				photo.setAttribute("src", "sun.png");
			} else if (status.id >= 801 && status.id <= 804) {
				photo.setAttribute("src", "cloud.png");
			} else if (status.id >= 701 && status.id <= 781) {
				photo.setAttribute("src", "fog.png");
			} else photo.setAttribute("src", "unknow.png");

			// console.log(res.data);
		})
		.catch(() => (warning.textContent = "Wpisz poprawna nazwę miasta"));
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		getWeather();
	}
};

getWeather();
button.addEventListener("click", getWeather);
input.addEventListener("keyup", enterKeyCheck);
