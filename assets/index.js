const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;
let result = document.querySelector('.result');

let data = [];
let w = document.querySelector('input');

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.add("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    //.then((result) => data(result, word));
    .then(res => res.json())
    .then((data) => {
      for (let x = 0; x < data.length; x++) {
        result.innerHTML = `
      <ul>
          <li class="word">
            <div class="details">
              <p>${word}</p>
              <span>${data[x].phonetics[x].text || data[x].phonetic || '--'}</span>
            </div>
            <i class="fas fa-volume-up" onclick="playSound('${data[x].phonetics[x].audio}')"></i>
          </li>
          <div class="content">
            <li class="meaning">
              <div class="details">
                <p>Meaning</p>
                <span>${data[x].meanings[x].definitions[x]?.definition}</span>
              </div>
            </li>
            <li class="example">
              <div class="details">
                <p>Example</p>
                <span>${data[x].meanings[x].definitions[x]?.example || '--'}</span>
              </div>
            </li>
            <li class="synonym">
              <div class="details">
                <p>Synonyms</p>
                <div class="list">
                ${data[x].meanings[x].synonyms}
                </div>
              </div>
            </li>
          </div>
        </ul>
      `
      }

    })

}

function playSound(url) {
  audio = new Audio(url);
  audio.play();
}

w.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    let wd = w.value;
    console.log(wd);

    fetchApi(wd);
  }
})