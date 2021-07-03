function preLoader() {
  setTimeout(hiddenOverflow, 0);

  setTimeout(function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
    document.getElementById("body").style.overflow = "auto";
    document.getElementById("body").style.overflowX = "hidden";
  }, 4000);
}

function hiddenOverflow() {
  document.getElementById("body").style.overflow = "hidden";
}

preLoader();
