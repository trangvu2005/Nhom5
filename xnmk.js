// confirm-password.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".l-f-o__form");
  const password = document.getElementById("reg-password");
  const confirmPassword = document.getElementById("reg-confirm-password");
  const errorText = document.getElementById("password-error");

  // Hàm kiểm tra mật khẩu trùng khớp
  function checkPasswordMatch() {
    if (confirmPassword.value === "") {
      errorText.style.display = "none";
      confirmPassword.classList.remove("is-invalid");
      return false;
    }

    if (password.value !== confirmPassword.value) {
      errorText.style.display = "block";
      confirmPassword.classList.add("is-invalid");
      return false;
    } else {
      errorText.style.display = "none";
      confirmPassword.classList.remove("is-invalid");
      return true;
    }
  }

  // Kiểm tra khi người dùng nhập
  password.addEventListener("input", checkPasswordMatch);
  confirmPassword.addEventListener("input", checkPasswordMatch);

  // Chặn submit nếu mật khẩu không khớp
  form.addEventListener("submit", function (e) {
    if (!checkPasswordMatch()) {
      e.preventDefault();
      confirmPassword.focus();
    }
  });
});
