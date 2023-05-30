const canvas=document.querySelector('canvas')
const c=canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', function() {

    const finish1=document.getElementById("finish")
    const finish2=document.getElementById("finish1")
    const finish3=document.getElementById("finish2")
    const finish4=document.getElementById("finish3")
    const question1 = document.getElementById('question12');
    const question2=document.getElementById('question22')
    const question3=document.getElementById('question32')
    const question4=document.getElementById('question42')
    const a1=document.getElementById('a1');
    const b1=document.getElementById('b1');


    canvas.width=innerWidth
    canvas.height=650

    const bottom=canvas.height-68


    const gravity=1
    class Player{
        constructor() {
            this.position={
                x: 100,
                y: 100
            }
            this.velocity={
                x:0,
                y:0
            }
            this.width=66;
            this.height=150;
            this.speed=5
            this.isJumping=false

            this.image=createImages({imageScr:"spriteStandRight.png"})
            this.frames=0
            this.sprites={
                stand:{
                    right: createImages({imageScr:"spriteStandRight.png"}),
                    cropWidth:177,
                    width:66,
                    left:createImages({imageScr:"spriteStandLeft.png"}),
                },
                run:{
                    right: createImages({imageScr:"spriteRunRight.png"}),
                    cropWidth:340,
                    width:127.875,
                    left:createImages({imageScr:"spriteRunLeft.png"}),

                }
            }
            this.currentSprite=this.sprites.stand.right
            this.currentCropWidth=this.sprites.stand.cropWidth
        }


        draw(){
            c.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400, this.position.x, this.position.y, this.width, this.height)
        }
        update(){
            this.frames++
            if(this.frames > 28) this.frames=0
            this.draw()
            this.position.y+=this.velocity.y
            this.position.x=this.velocity.x
            if(this.position.y+this.height+this.velocity.y<=canvas.height)
                this.velocity.y+=gravity


            if (this.position.x < 0) {
                this.position.x = 0;
                this.velocity.x = 0;
            } else if (this.position.x + this.width > canvas.width) {
                this.position.x = canvas.width - this.width;
                this.velocity.x = 0;
            }
        }

    }

    class Platform{
        constructor(x,y, image) {
            this.position={
                x,
                y,
            }
            this.image=image
            this.width=image.width
            this.height=image.height
        }

        draw(){
            c.drawImage(this.image, this.position.x,this.position.y)
        }
    }
    class Logo {
        constructor(x, y, image, moveDistance) {
            this.position = {
                x,
                y,
            };

            this.image = image;
            this.width = image.width;
            this.height = image.height;
            this.moveDistance=moveDistance; // Adjust the vertical distance to move as needed// Flag to determine the current movement directions
            this.start=this.position.y
        }

        hide(){
            this.position.y=-8000
        }

        update(){
            this.draw()
            if (this.moveUp) {
                this.position.y -= this.moveDistance;
                if (this.position.y <=this.start) {
                    this.moveUp = false;
                }
            } else {
                this.position.y += this.moveDistance;
                if (this.position.y >= this.start+50) {
                    this.moveUp = true;
                }
            }
        }

        draw() {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
    }


    class Layer {
        constructor(x, image, leaving) {
            this.position={
                x:x,
                y:-100
            }
            this.image=image
            this.width=2400
            this.height=1200
            this.leaving=leaving
            this.x2=1200

        }

        draw() {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        }
        draw1(){
            c.drawImage(this.image, this.x2, this.position.y, this.width, this.height);
        }
    }



    function createImages({imageScr}){
        const image =new Image()
        image.src=imageScr
        return image
    }

    const player=new Player()

    const platforms=[new Platform(300, 410, createImages({imageScr: 'platform1.png'})), new Platform(690, 228, createImages({imageScr: 'platform1.png'})), new Platform(1300, 228,createImages({imageScr: 'platform1.png'})),new Platform(3300, 220, createImages({imageScr: 'platform1.png'}))
        , new Platform(-1, bottom, createImages({imageScr:"floor.png"})), new Platform(2380, bottom, createImages({imageScr:"platform1.png"})),
        new Platform(3400, bottom, createImages({imageScr:"floor.png"})), new Platform(2800, 400, createImages({imageScr:"platform1.png"})),
        new Platform(5550, 400, createImages({imageScr:"platform1.png"})), new Platform(4500, 400, createImages({imageScr:"platform1.png"})),
        new Platform(6000, bottom, createImages({imageScr:"floor.png"})), new Platform(6800, 300, createImages({imageScr:"platform1.png"}))]


    const background=[new Layer(-20,createImages({imageScr:'2.png'}), 1),new Layer(2000,createImages({imageScr:'2.png'}), 1), new Layer(4050,createImages({imageScr:'2.png'}), 1)]

    const logos=[new Logo(10,10, createImages({imageScr:"instagram.png"}),0.8),new Logo(2000,30, createImages({imageScr:"instagram.png"}),1.34),
        new Logo(2500,60, createImages({imageScr:"instagram.png"}),0.5),new Logo(3410,80, createImages({imageScr:"instagram.png"}),0.78),
        new Logo(5900,60, createImages({imageScr:"instagram.png"}),0.5), new Logo(7700,400, createImages({imageScr:"instagram.png"}))]


    const logo1=new Logo(1200,250, createImages({imageScr:"insta_question.png"}),1.22)
    const logo2=new Logo(3000,150, createImages({imageScr:"insta_question.png"}),1.28)
    const logo3=new Logo(5000,130, createImages({imageScr:"insta_question.png"}),1.33)
    const logo4=new Logo(6600,250, createImages({imageScr:"insta_question.png"}),1.15)
    const logo5=new Logo(8000,250, createImages({imageScr:"instagram.png"}),1.37 )
    const keys={
        right: {
            pressed:false
        },
        left:{
            pressed:false
        },
        up:{
            pressed:false
        }
    }



    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)

        background.forEach(background => {
            background.draw()
            if (player.position.x === 2400) {
                background.draw1()
            }

        })
        platforms.forEach(platform => {
            platform.draw()
        })
        player.update()


        logos.forEach(logo => {
            logo.update()
            logo.draw()

        })
        logo1.update()
        logo2.update()
        logo3.update()
        logo4.update()
        logo5.update()
        if (keys.right.pressed && player.position.x < 500) {
            player.velocity.x += player.speed
        } else if (keys.left.pressed && player.position.x > 500) {
            player.velocity.x -= player.speed
        } else {
            if (keys.right.pressed) {
                platforms.forEach((platform) => {
                    platform.position.x -= 8
                })
                background.forEach((background) => {
                    background.position.x -= background.leaving + 3

                })
                logos.forEach((logos) => {
                    logos.position.x -= 8
                })
                logo1.position.x -= 8
                logo2.position.x -= 8
                logo3.position.x -= 8
                logo4.position.x -= 8
                logo5.position.x -= 8

            } else if (keys.left.pressed) {
                platforms.forEach((platform) => {
                    platform.position.x += 5
                })
                background.forEach((background) => {
                    background.position.x += 1
                })
                logos.forEach((logos) => {
                    logos.position.x += 5
                })
                logo1.position.x += 5
                logo2.position.x += 5
                logo3.position.x += 5
                logo4.position.x += 5
                logog.position.x += 5

            }
        }
        if(player.position.y>800){
            console.log("gameover")
            location.reload()
        }

        //platform collision
        platforms.forEach((platform) => {
            if (player.position.y + player.height <= platform.position.y &&
                player.position.y + player.height + player.velocity.y >= platform.position.y &&
                player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
                player.velocity.y = 0
        })

        function checkIfClicks(logo) {
            if (player.position.x <= logo.position.x + logo.width &&
                player.position.x + player.width >= logo.position.x &&
                player.position.y <= logo.position.y + logo.height &&
                player.position.y + player.height >= logo.position.y
            )
                return true;
            else return false;
        }


        if (checkIfClicks(logo1)) {
            console.log("questiob ")
            question1.style.display = "inline"
            finish1.addEventListener("click", function () {
                question1.style.display = "none";
                logo1.hide();
            })
        }if (checkIfClicks(logo2)) {
            console.log("questiob ")
            question2.style.display = "inline"
            finish2.addEventListener("click", function () {
                console.log('correct')
                question2.style.display = 'none'
                logo2.hide();
            })
        }if (checkIfClicks(logo3)) {
            console.log("questiob ")
            question3.style.display = "inline"
            finish3.addEventListener("click", function () {
                console.log('correct')
                question3.style.display = 'none'
                logo3.hide();

            })
        }if (checkIfClicks(logo4)) {
            console.log("questiob ")
            question4.style.display = "inline"
            finish4.addEventListener("click", function () {
                console.log('correct')
                question4.style.display = 'none'
                logo4.hide();
            })
        }if (checkIfClicks(logo5)) {
           console.log("gfdb")
            window.location.href='kraj.html'
        }
    }

    ///lose Condition

    animate()

    addEventListener('keydown',({keyCode})=>{
        console.log(keyCode)
        switch (keyCode){
            case 37:
                console.log('left')
                keys.left.pressed=true
                player.currentSprite=player.sprites.run.left
                player.currentCropWidth=player.sprites.run.cropWidth
                player.width=player.sprites.run.width
                break
            case 39:
                console.log('right')
                keys.right.pressed=true
                player.currentSprite=player.sprites.run.right
                player.currentCropWidth=player.sprites.run.cropWidth
                player.width=player.sprites.run.width
                break
            case 40:
                console.log('down')
                break
            case 38:
                console.log('up')
                if(!keys.up.pressed)  player.velocity.y-=15
                keys.up.pressed=true
                break
        }


    })
    addEventListener('keyup',({keyCode})=>{
        console.log(keyCode)
        switch (keyCode){
            case 37:
                console.log('leftup')
                keys.left.pressed=false
                player.currentSprite=player.sprites.stand.left
                player.currentCropWidth=player.sprites.stand.cropWidth
                player.width=player.sprites.stand.width
                break
            case 39:
                console.log('rightup')
                player.currentSprite=player.sprites.stand.right
                player.currentCropWidth=player.sprites.stand.cropWidth
                player.width=player.sprites.stand.width
                keys.right.pressed=false
                break
            case 40:
                console.log('down')
                break
            case 38:
                console.log('up')
                keys.up.pressed=false
                break
        }

    })

});
