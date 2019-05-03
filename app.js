window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let degreeSection = document.querySelector('.degree-section');
	const degreeSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy='http://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/c3e95aff537c73cec655a72136ae039d/${lat},${long}`;
			console.log(api);
			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const { temperature, summary, icon } = data.currently;
				// set DOM Elements from the API
				temperatureDegree.textContent = Math.floor(temperature);
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				//formula for celsius
				let celsius = (temperature - 32)*(5/9);
				//Set Icon
				setIcons(icon, document.querySelector('.icon'));
				// toggle temperature from Celsius/Fahrenheit
				degreeSection.addEventListener('click', () => {
					if (degreeSpan.textContent === "F") {
						degreeSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celsius);
					} else {
						degreeSpan.textContent = "F";
						temperatureDegree.textContent = Math.floor(temperature);
					}
					});
				});
		});
	} else {
		h1.textContent = "no location enabled";
	}
});

function setIcons(icon,iconID) {
	const skycons = new Skycons({color: "white"});
	const currentIcon = icon.replace(/-/g,"_").toUpperCase();
	skycons.play();
	return skycons.set(iconID, Skycons[currentIcon]);
}