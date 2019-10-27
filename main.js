  
window.onload = function() {
  const digits = 6
  const timeSteps = 10000
  const cvs = document.getElementById("canvas");
  cvs.width = window.innerWidth
  cvs.height = 200
  const ctx = cvs.getContext("2d");
  const countDiv = document.getElementById("count")
  let block1 = new Block(100, 20, 0, 1)
  const m2 = Math.pow(100, digits - 1)
  let block2 = new Block(300, 100, -5/timeSteps, m2)
  const clack = document.getElementById("clack")
  const blockImg = document.getElementById("block")
  let count = 0
  let myReq
  function draw() {
    if(block1.x <= window.innerWidth) {
      let clackSound = false
      ctx.clearRect(0, 0, window.innerWidth, 200)
      ctx.drawImage(blockImg, block1.x, cvs.height - block1.width, block1.width, block1.width);
      ctx.drawImage(blockImg, block2.x, cvs.height - block2.width, block2.width, block2.width);
      for(let i = 0; i < timeSteps; i++) {
        if(block1.collide(block2)) {
          const v1 = block1.bounce(block2)
          const v2 = block2.bounce(block1)
          block1.velocity = v1
          block2.velocity = v2
          count++
          clackSound = true
        }
        if(block1.hitWall()) {
          block1.reverse()
          count++
          clackSound = true
        }
        block1.update()
        block2.update()
      }
      if (countDiv.innerHTML != count) {
        countDiv.innerHTML = count
      }
      if(clackSound) {
        const promise = clack.play()
        promise.catch((err) => console.log(err) )
      }
      if(btnClicked) {
        myReq = requestAnimationFrame(draw);
      }
    }

  }

  document.getElementById("btn").onclick = () => { 
    cancelAnimationFrame(myReq)
    block1 = new Block(100, 20, 0, 1)
    block2 = new Block(300, 100, -5/timeSteps, m2)
    count = 0
    btnClicked = true
    draw(); 
  }
}