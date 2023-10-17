const btnEl = document.querySelector(".btn");
const newUser = {
  name: "John",
  job: "Carpenter",
};

const clickHandler = async () => {
  try {
    const res = await fetch("https://reqres.in/api/users/33", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

btnEl.addEventListener("click", clickHandler);
