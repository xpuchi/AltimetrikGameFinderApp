// show/hide password
function toggleIcon() {
  const passwordIcon = document.getElementById("passwordIcon");
  const password = document.getElementById("password");

  let type;
  let icon;

  if (password.getAttribute("type") === "password") {
    type = "text";
    icon = "../img/icons/eye.svg";
  } else {
    type = "password";
    icon = "../img/icons/eye2.svg";
  }

  password.setAttribute("type", type);
  passwordIcon.setAttribute("src", icon);
}

// login functionality
async function login() {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.accessToken) {
      localStorage.setItem("accessToken", json.accessToken);
      window.location.href = "../index.html";
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
}
