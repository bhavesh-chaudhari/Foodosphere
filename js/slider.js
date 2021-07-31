// Foodish Api Implementation

// function getFoodPics(){

//     main.innerHTML = ""
//     fetch("https://foodish-api.herokuapp.com/api/")
//     .then((res)=>res.json())
//     .then((data)=>{
//         const sliderImg = document.createElement('img');
//         sliderImg.src = data.image;
//         main.appendChild(sliderImg);
//         console.log("yes");
//     })
// }

// getFoodPics();
// setInterval(getFoodPics,3000)

const main = document.getElementById('main');
const sliderImg = document.getElementById("innerDiv2Img");

    var i = 0;
    var images = []
    var time = 6000;

    
    // Image List
    imgPath = "assets/images/slider-images/slider"

    for(i = 0;i < 10;i++){
        images[i] = imgPath + (i+1).toString() + ".jpg"
    }


   

   animationArray = [
     "slideVertically 5.6s ease-in-out infinite",
     "slideVerticallyInverse 5.6s ease-in-out infinite",
     "slideHorizontally 5.6s ease-in-out infinite",
     "slideHorizontallyInverse 5.6s ease-in-out infinite"
   ];



    function changeImg(){

      sliderImg.style.animation = `${
        animationArray[Math.floor(Math.random() * animationArray.length)]
      }`;  


      if (i < images.length - 1) {
        i++;
      } else {
        i = 0;
      }

      sliderImg.src = `${images[i]}`;

      setTimeout("changeImg()", time);
    }



changeImg()