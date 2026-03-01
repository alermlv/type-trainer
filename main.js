const keys = document.querySelectorAll(".key");
let isCapsLock = false;
let isShiftPressed = false;

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
  keys.forEach((key) => {
    const code = key.dataset.code;

    if (!code.startsWith("Key")) return;

    const letter = code.replace("Key", "");
    const isUpper = isCapsLock ^ isShiftPressed;

    key.textContent = isUpper ? letter.toUpperCase() : letter.toLowerCase();
  });
}
