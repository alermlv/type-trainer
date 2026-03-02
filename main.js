const keyElemenets = document.querySelectorAll(".key");
const textElement = document.querySelector(".text");
const inputElement = document.querySelector(".input");
let text = "Some text to type";
let currentIndex = 0;
let resetTimer = null;
let isCapsLock = false;
let isShiftPressed = false;
let isFinishedTyping = false;

/* ==========
  Text Initialization
========== */

function initText() {
  textElement.innerHTML = "";

  text.split("").forEach((char) => {
    const spanElement = document.createElement("span");
    spanElement.textContent = char;
    textElement.appendChild(spanElement);
  });

  inputElement.value = "";
  currentIndex = 0;
  isFinishedTyping = false;
  inputElement.focus();
}

initText();

/* ==========
  Keyboard Highlight
========== */

window.addEventListener("keydown", (event) => {
  const key = document.querySelector(`.key[data-code=${event.code}]`);

  if (key) {
    key.classList.add("active");
  }
});

window.addEventListener("keyup", (event) => {
  const key = document.querySelector(`.key[data-code=${event.code}]`);

  if (key) {
    key.classList.remove("active");
  }
});

window.addEventListener("blur", () => {
  document.querySelectorAll(".key.active").forEach((key) => 
    key.classList.remove("active")
  );
});

/* ==========
  CapsLock & Shift
========== */

window.addEventListener("keydown", (event) => {
  isCapsLock = event.getModifierState("CapsLock");
  
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    isShiftPressed = true;
  }
  
  updateKeyboardLetters();
});

window.addEventListener("keyup", (event) => {
  isCapsLock = event.getModifierState("CapsLock");

  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    isShiftPressed = false;
  }

  updateKeyboardLetters();
});

function updateKeyboardLetters() {
  keyElemenets.forEach((key) => {
    const code = key.dataset.code;

    if (!code.startsWith("Key")) return;

    const letter = code.replace("Key", "");
    const isUpper = isCapsLock ^ isShiftPressed;

    key.textContent = isUpper ? letter.toUpperCase() : letter.toLowerCase();
  });
}

/* ==========
  Typing Validation
========== */

inputElement.addEventListener("keydown", (event) => {
  const currentChar = event.key;
  const expectedChar = text[currentIndex];
  const spanElements = textElement.querySelectorAll("span");
  const currentSpan = spanElements[currentIndex];

  if (isFinishedTyping) {
    event.preventDefault();
    resetTyping();
    return;
  }

  if(!isPrintableKey(event)) return;

  clearTimeout(resetTimer);
  resetTimer = setTimeout(resetTyping, 5000);

  if (currentChar === expectedChar) {
    currentSpan.classList.add("success");
    currentIndex++;

    if (text.length === currentIndex) {
      isFinishedTyping = true;
    }
  } else {
    event.preventDefault();
    currentSpan.classList.add("mistake");
  }
});

function resetTyping() {
  initText(text);
}

function isPrintableKey(event) {
  return event.key.length === 1;
}