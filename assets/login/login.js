const signuptab = document.getElementById("signuptab");
const logintab = document.getElementById("logintab");

const signupform = document.getElementById("signupform");
const loginform = document.getElementById("loginform");

signuptab.addEventListener("click", () => {
  signupform.classList.remove("hidden");
  loginform.classList.add("hidden");

  signuptab.classList.add("active");
  logintab.classList.remove("active");
});

logintab.addEventListener("click", () => {
  loginform.classList.remove("hidden");
  signupform.classList.add("hidden");

  logintab.classList.add("active");
  signuptab.classList.remove("active");
});
