function preLoader() {
  setTimeout(hiddenOverflow, 0);

  setTimeout(function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
    document.getElementById("body").style.overflow = "auto";
  }, 4000);
}

function hiddenOverflow() {
  document.getElementById("body").style.overflow = "hidden";
}

preLoader();
