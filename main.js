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
