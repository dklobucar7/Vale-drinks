document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signup-form");

  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputForm = new FormData(signUpForm);
  });

  const username = document.getElementById("username-input");
  console.log(username);
});
