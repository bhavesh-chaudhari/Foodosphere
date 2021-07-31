// menuBtn = document.querySelectorAll('.show-overlay');
menu = document.getElementById("menu");
scale = document.querySelector(".menu > div");
closeOverlay = document.getElementById("close-overlay");

document.querySelectorAll(".show-overlay").forEach((item) => {
  item.addEventListener("click", () => {
    console.log("done");
    menu.style.visibility = "visible";
    scale.style.transform = "scale(1)";
    scale.style.transitionDuration = "1s";
    document.querySelector(".menu > div > div").style.opacity = "1";
    document.querySelector(".menu > div > div").style.transition =
      "opacity 0.4s ease";
    closeOverlay.style.opacity = "1";
  });
});

closeOverlay.addEventListener("click", () => {
  menu.style.visibility = "hidden";
  scale.style.transform = "scale(0)";
  scale.style.transitionDuration = "1s";
  document.querySelector(".menu > div > div").style.opacity = "0";
  document.querySelector(".menu > div > div").style.transition =
    "opacity 0.4s ease";
  closeOverlay.style.opacity = "0";
});
