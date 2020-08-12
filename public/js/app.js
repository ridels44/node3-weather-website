console.log("client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector(".input-location");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

message1.textContent = "";
message2.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = `${data.location}`;
        message2.textContent = `temperature : ${data.temperature}, humidity : ${data.humidity}, summary : ${data.summary}`;
      }
    });
  });
});
