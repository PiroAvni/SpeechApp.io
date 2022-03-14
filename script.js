/** @format */

const main = document.querySelector("main");
const voicesSelector = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/pain.png",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy1.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/Anger.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad1.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/fear-2.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// Create Speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item; // Destructing the sata array to pull the items (image and text)
  box.classList.add("box");
  box.innerHTML = `
  <img src="${image}" alt="${text}"/>
  <p class="info">${text}</p>
  
  `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active  effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });
  main.appendChild(box);
}
// Init speech synth
const message = new SpeechSynthesisUtterance();
/**
 * * Store Voice
 */
/**
 * *  Option 1 for Voice change code
 */
/* let voices = [];
//Get all available Voices
async function getVoices() {
  // The speechSynthesis.getVoice() returns an array but the process is actually asyncronous, we need to treat it as a promise.
  const getVoicesAPI = new Promise((resolve, reject) => {
    // Call Mutiple times
    let id = setInterval(() => {
      let voicesAPI = speechSynthesis.getVoices();
      // Only need to run this method twice since it returns []at the first time.
      //console.log(id);
      if (voicesAPI.length > 0) {
        resolve(voicesAPI);
        clearInterval(id);
      }
    }, 10);
  });
  // Get all voices from speech API
  voices = await getVoicesAPI;

  console.log(voices);

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    // Add new option to select list
    voicesSelector.appendChild(option);
  });
} */
/**
 * * Another Option 2 for Voice change code
 */
/* let voices = [];

function setSpeech() {
  return new Promise(function (resolve, reject) {
    let synth = window.speechSynthesis;
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

let s = setSpeech();
s.then((voices) => console.log(voices));

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voices) => {
    const option = document.createElement("option");
    option.value = voices.name;
    option.innerText = `${voices.name} ${voices.lang}`;

    voicesSelector.appendChild(option);
  });
} */
/**
 * * Another Option 3 for Voice change code
 */
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voices) => {
    const option = document.createElement("option");
    option.value = voices.name;
    option.innerText = `${voices.name} ${voices.lang}`;

    voicesSelector.appendChild(option);
  });
}

// set text s
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

/**
 * * Set Voice
 */
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

/**
 * * Voices Changed
 */
speechSynthesis.addEventListener("voiceschanged", getVoices);
/**
 
 * * Toggle Text Box
 */
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

/**
 * * Close Button
 */
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

/**
 * * Change Voice
 */
voicesSelector.addEventListener("change", setVoice);

//read Text Button

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
