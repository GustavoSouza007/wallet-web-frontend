const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch("https://mp-walett-app-api.herokuapp.com", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onRegister = async () => {
  const name = document.getElementById("input-name").value;
  const email = document.getElementById("input-email").value;

  if (name.length < 3) {
    alert("Nome deve ter mais que 3 caracteres.");
    return;
  }
  if (email.length < 5 || !email.includes("@")) {
    alert("Email inválido");
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    alert("Falha ao validar e-mail.");
    return;
  }
  localStorage.setItem("@WalletWeb:userEmail", result.email);
  localStorage.setItem("@WalletWeb:userName", result.name);
  localStorage.setItem("@WalletWeb:userId", result.id);
  window.open("../home/index.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
