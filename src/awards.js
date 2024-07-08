function claimAwards() {
    console.log("Claiming all rewards");
    let awards = document.querySelectorAll(".game-square");
    console.log(awards);
    let unclaimed = [];
    awards.forEach(function (award) {
      if (award.classList.contains("won")) {
        unclaimed.push(award);
      }
    });
  
    setInterval(function () {
      if (unclaimed.length > 0) {
        unclaimed[0].click();
        unclaimed.shift();
      }
    }, 100);
  }
  
  document.addEventListener("keydown", (e) => {
    if (e.key == "b" && e.ctrlKey) {
      claimAwards();
    }
  });
  