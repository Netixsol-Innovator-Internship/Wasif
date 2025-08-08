document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signupForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword"
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("quiz_user", JSON.stringify(user));
      alert("Signup successful!");
      console.log(user);

      window.location.href = "signin.html";
      console.log(user);
    });
  }

  const signInForm = document.getElementById("signinForm");
  if (signInForm) {
    signInForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("signinEmail").value.trim();
      const password = document.getElementById("signinPassword").value;

      const storedUser = JSON.parse(localStorage.getItem("quiz_user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        alert("Login successful!");
        window.location.href = "quizSelection.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
      console.log(storedUser);
    });
  }
});
