console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const MessageOne = document.querySelector("#Message-1");
const MessageTwo = document.querySelector("#Message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  MessageOne.textContent = "Loading...";
  MessageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        MessageOne.textContent = data.error;
      } else {
        MessageOne.textContent = data.location;
        MessageTwo.textContent = data.forecast;
      }
    });
  });
});
