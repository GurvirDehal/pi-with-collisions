  
window.onload = function() {
  const digits = 8
  const timeSteps = 450000
  const cvs = document.getElementById("canvas");
  cvs.width = window.innerWidth
  cvs.height = 200
  const ctx = cvs.getContext("2d");
  const countDiv = document.getElementById("count")
  const mass2 = Math.pow(100, digits - 1)
  const clack = document.getElementById("clack")
  let count = 0
  let myReq
  let block1
  let block2
  function draw() {
    if(block1.x <= window.innerWidth) {
      let clackSound = false
      ctx.clearRect(0, 0, window.innerWidth, 200)
      ctx.drawImage(block1.img, block1.x, cvs.height - block1.width, block1.width, block1.width);
      ctx.drawImage(block2.img, block2.x, cvs.height - block2.width, block2.width, block2.width);
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
      if(clackSound) {
        const promise = clack.play()
        promise.catch((err) => console.log(err))
        countDiv.innerHTML = "Collisions: " + count
      }
      myReq = requestAnimationFrame(draw);
    }

  }

  document.getElementById("btn").onclick = () => { 
    cancelAnimationFrame(myReq)
    block1 = new Block(100, 20, 0, 1, "block1")
    block2 = new Block(300, 100, -5/timeSteps, mass2, "block2")
    count = 0
    document.getElementById("m1").innerHTML = "Mass 1: " + block1.mass
    document.getElementById("m2").innerHTML = "Mass 2: " + block2.mass
    draw(); 
  }
}