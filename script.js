const api_key = "1isOH6xAuxKOiLw5CFTBojg3KMSiNw5IKBt0ltI9";
// const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`;

async function getImageOfTheDay(date) {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`
  );

  const data = await response.json();
  //   console.log(data);
  saveDate(date);
  setdataToUI(data);
}

function getCurrentImageOfTheDay() {
  const date = new Date().toISOString().split("T")[0];
  getImageOfTheDay(date);
}

getCurrentImageOfTheDay();

function getImage() {
  const dateInput = document.getElementById("dateInput");
  const date = dateInput.value;
  getImageOfTheDay(date);
}

function setdataToUI(data) {
  const container = document.getElementById("container");

  container.innerHTML = `<div class="image">
  <img
    src="${data.hdurl}"
    alt=""
    height="700px"
  />
</div>
<div class="description">
    <h2>${data.title}</h2>
    <p>${data.explanation}</p>
</div>`;
}

function saveDate(date) {
  const storage = localStorage.getItem("searches");
  console.log(storage);
  const searchesSet = storage ? JSON.parse(storage) : [];
  if (!searchesSet.includes(date)) searchesSet.push(date);
  addDatesToUI(searchesSet);
  localStorage.setItem("searches", JSON.stringify(searchesSet));
}

function addDatesToUI(searchesSet) {
  const searches = document.getElementById("searches");
  searches.innerHTML = "";
  searchesSet.forEach((d) => {
    const a = document.createElement("a");
    a.innerHTML = `<p><a onclick="getFromList(event)" href="">${d}</a></p>`;
    searches.appendChild(a);
  });
}

function getFromList(event) {
  console.log(event);
  event.preventDefault();
  const date = event.target.innerText;
  //   console.log(date);
  getImageOfTheDay(date);
}
