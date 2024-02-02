const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt smaller";

    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toDateString("pt-BR", { timezone: "UTC" })
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    const valueTd = document.createElement("td");
    valueTd.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    const deleteTd = document.createElement("td");
    deleteTd.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    table.appendChild(tableRow);
  });
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => (acc = Number(item.value)), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => (acc = Number(item.value)), 0);
  const totalValue = revenues + expenses;

  const financeCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createTextNode("h1");
  totalElement.classname = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createTextNode("h1");
  revenueTextElement.classname = "mt smaller";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  const financeCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesTextElement = document.createTextNode("h1");
  expensesTextElement.classname = "mt smaller";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  const financeCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceTextElement = document.createTextNode("h1");
  balanceTextElement.classname = "mt smaller";
  balanceTextElement.style.color = "#5936cd";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "02-02-2024";
    const email = localStorage.getItem("@WalletWeb:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletWeb:userEmail");
  const name = localStorage.getItem("@WalletWeb:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};
