console.log("Assesment page loaded");
setInterval(function () {
  if(document.getElementById("dont-know")){
  document.getElementById("dont-know").querySelector("span").textContent =
    "I don't know this yet";
  }
}, 1000);
