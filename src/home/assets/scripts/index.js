/* eslint-disable no-useless-escape */
console.log(`
__  __           _ _ _
\ \/ /___  _____(_|_|_)____
 \  / __ \/ ___/ / / / ___/
 / / /_/ / /  / / / (__  )
/_/\____/_/  /_/_/_/____/

`);
/* eslint-enable no-useless-escape */

const packages = [
	"vlitejs",
	"chunks-webpack-plugin",
	"storelocatorjs",
	"before-after",
	"create-youtube-player",
	"create-videojs-player",
	"hopx",
	"validate-target",
	"lazy-observer",
	"get-youtube-instance",
	"polyfillr",
	"tracking-manager"
];

let urlApi = "https://api.npmjs.org/downloads/range/{{dateStart}}:{{dateEnd}}/{{package}}";
const range = 31; //days
const dates = getDates();

let listUrls = [];
packages.forEach(packageName => {
	listUrls.push(getUrl(packageName));
});

const requestsPromise = [];
listUrls.forEach(packageUrl => {
	requestsPromise.push(fetch(packageUrl).then(response => response.json()));
});

window.Promise.all(requestsPromise).then(([...responses]) => {
	const counter = calculateDownloadsCounter(responses);
	document.getElementById("download-counter").innerHTML = counter;
	document.querySelector(".liveCounter").classList.add("active");
});

function getUrl(packageName) {
	return urlApi
		.replace("{{package}}", packageName)
		.replace("{{dateStart}}", dates.dateStart)
		.replace("{{dateEnd}}", dates.dateEnd);
}

function getDates() {
	let date = new Date();
	date.setDate(date.getDate() - range);
	let dateStart = date.toISOString().split("T")[0];
	let dateEnd = new Date().toISOString().split("T")[0];

	return {
		dateStart: dateStart,
		dateEnd: dateEnd
	};
}

function calculateDownloadsCounter(responses) {
	let counter = 0;
	responses.forEach(response => {
		if (!response.error) {
			response.downloads.forEach(download => {
				counter += download.downloads;
			});
		}
	});
	return counter;
}
