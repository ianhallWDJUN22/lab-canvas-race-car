window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };


function startGame() {
  
  const myCanvas = document.getElementById('canvas');
  const ctx = myCanvas.getContext('2d');

  const roadImg = new Image();
  roadImg.src = './images/road.png';
  
  const carImg = new Image();
  carImg.src = 'images/car.png';
  
  let carPosition = {
    x: myCanvas.width / 2,
    y: myCanvas.height - 180
  };
    function updateGame(){
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      ctx.drawImage(roadImg, 0, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(carImg, carPosition.x, carPosition.y, 50, 100, );
    }
    roadImg.onload = () => {
    carImg.onload = () => {
    ctx.drawImage(roadImg, 0, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(carImg, carPosition.x, carPosition.y, 50, 100, );
      
    setInterval(updateGame, 16.67)
  }
};

  document.addEventListener('keydown', (event) => {
    switch(event.code){
      case 'ArrowLeft':
        carPosition.vx -= 0.5;
        break;
      case 'ArrowRight':
        carPosition.vX += 0.5;
        break;
    }
  })

}
};

window.onload = () => {

  let totalFrameCount = 0;

  let obstacleArray = [];

  let intervalId = null;
  
  document.getElementById('start-button').onclick = () => {
    
    startGame();
  };

  function startGame() {
    
    const myCanvas = document.querySelector('canvas');
    const ctx = myCanvas.getContext('2d');
    
    const roadImg = new Image();
    roadImg.src = './images/road.png';
    
    
    const carImg = new Image();
    carImg.src = './images/car.png';

    class RectangleObject {
      constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.vX = 0;
        this.vY = 0;
        this.width = width;
        this.height = height;
      }

      updatePosition(){
        this.x += this.vX;
        this.y += this.vY;
      }

      draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
     
      crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }

    }

    class ImageObject extends RectangleObject {
      constructor(x, y, width, height, imageElement) {
        super(x, y, width, height);
        this.image = imageElement;
      }

      draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    const myRoad = new ImageObject(0, 0, myCanvas.width, myCanvas.height, roadImg);
    const myCar = new ImageObject(myCanvas.width / 2, myCanvas.height - 150, 50, 100, carImg);

    
    function updateGame(){
      //update frame totalFrameCount
      totalFrameCount++;

      if(totalFrameCount % 240 === 0){
        console.log('4 seconds have passed')
        
        //width between 20% and 60%
        let rectWidth = Math.floor((Math.random() * (myCanvas.width * 0.4)) + myCanvas.width * 0.2);

        //X position between 0 and myCanvas.width - rectWidth
        let rectX = Math.floor(Math.random() * (myCanvas.width - rectWidth))

        obstacleArray.push(new RectangleObject(rectX, 0, rectWidth, 20));

        console.log(obstacleArray);

      }

      //position updates
      myCar.updatePosition();
      for(let i = 0; i < obstacleArray.length; i++){
        obstacleArray[i].y += 1;
        if(myCar.crashWith(obstacleArray[i])){
          clearInterval(intervalId);
          alert('you crashed!')
        };
      }

      //drawings
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      myRoad.draw();
      for(let i = 0; i < obstacleArray.length; i++){
        obstacleArray[i].draw();
      }
      myCar.draw();
    }

    

    roadImg.onload =  () => {
      intervalId = setInterval(updateGame, 16.67)
    };



    document.addEventListener('keydown', (event) => {
      switch(event.code){
        case 'ArrowLeft':
          myCar.vX -= 1;
          break;
        case 'ArrowRight':
          myCar.vX += 1;
          break;
      }
    })

    document.addEventListener('keyup', (event) => {
      switch(event.code){
        case 'ArrowLeft':
          myCar.vX = 0;
          break;
        case 'ArrowRight':
          myCar.vX = 0;
          break;
      }
    })

  }
};
















// const backgroundImg = new Image();

// const car = new Image();
// car.src = 'images/car.png'
// car.onload = ()=> {
//   let carX = 0;
//   let carY = 0;
//   ctx.drawImage(car, carX, carY, 50,100);
// }
//     backgroundImg.src = 'images/road.png';
//     backgroundImg.onload = ()=> {
//       let bkgrndX = 0;
//       let bkgrndY = 0;
//       ctx.drawImage(backgroundImg, bkgrndX, bkgrndY, canvas.width, canvas.height),
//       speed: 2,
//       img: backgroundImg,
//       draw: function() {
//         ctx.drawImage(this.img, 0, this.y);
//         if (this.speed < 0) {
//           ctx.drawImage(this.img, 0, this.y + this.img.height);
//         } else {
//           ctx.drawImage(this.img, 0, this.y - backgroundCanvas.height);
//         }
//       },
//       move: function(){
//         this.bkgrndY += this.speed;
//         this.y %= canvas.height;
//       },

//     };
  


// function updateCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   backgroundImg.move();
//   backgroundImg.draw();
//   requestAnimationFrame(updateCanvas);
// };





  
  
  
  