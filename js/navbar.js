const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const animateLogo = document.querySelector('.logo img')


    burger.addEventListener('click',()=>{
      nav.classList.toggle("nav-active");

      animateLogo.classList.toggle("hideLogo")
      animateLogo.style.transition = "opacity 0.5s";

        document.getElementById("img-container").innerHTML = "";

      //Adding logo image
        const image = document.createElement('img')
        image.id = "nav-image"
        image.src = "assets/images/fs.jpg";
        document.getElementById('img-container').appendChild(image)

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinksFade 0.2s ease forwards ${
            index / 5 + 0.4
          }s`;
        }
      });
      //Burger Animation
      burger.classList.toggle('toggle');
    });
}

navSlide();