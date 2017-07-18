var xVelLimit = 7;
var yVelLimit = 10;
var userX = 300;
var userY = 400;
var keys = [];


keyPressed = function(){
    keys[keyCode] = true;
};
keyReleased = function(){
    keys[keyCode] = false;
};

var Block = function(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
};

Block.prototype.draw = function() {
    stroke(127);
    fill(0);
    fill(133, 80, 2);
    stroke(194, 127, 11);
    rect(this.x, this.y, this.size, this.size);
};

Block.prototype.collide = function(player){
    return player.x + player.size/2 > this.x && player.x - player.size/2 < this.x + this.size && player.y + player.size/2 > this.y && player.y - player.size/2 < this.y + this.size/2;
};

Block.prototype.collideWithPlayer = function(player){

    if(this.collide(player) && player.yVel >= 0){
        player.gravity = false;
        player.hasJumped = false;
        player.hasFallen = false;
        player.y = this.y-player.size/2;
    }


};

var Player = function(x, y, size, playerColor){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = playerColor;
    this.xVel = 0;
    this.yVel = 0;
    this.hasJumped = false;
    this.hasFallen = false;
    this.gravity = true;
    this.jump = false;
};
var drawKutie = function(x, y, size, bodyColor, isGame, emotion, isMouthOpen){
    //The choices for Kutie's emotions are happy, sad, mad, and evil.

    //Draw the body
    var eyeX = x;
    var eyeY = y;
    if(isGame === true){
        if(keys[RIGHT] === true){
            eyeX = x+size/16;
            isMouthOpen = true;
        }
        if(keys[LEFT] === true){
            eyeX = x-size/16;
            isMouthOpen = true;
        }
        if(keys[UP] === true){
            eyeY = y-size/16;
            isMouthOpen = true;
        }
    }
    var eyeSize;
    if(emotion === "suprised"){
        eyeSize = size/4;
    }else{
        eyeSize = size/5;
    }
    //Draw the body
    stroke(red(bodyColor)-50, green(bodyColor)-50, blue(bodyColor)-50);
    strokeWeight(size/30);
    fill(bodyColor);
    ellipse(x, y, size, size);
    //Draw the face

    //Draw the eyes
    noStroke();
    stroke(0);
    strokeCap(SQUARE);
    fill(0);
    ellipse(eyeX-eyeSize, eyeY-eyeSize/2, eyeSize, eyeSize);
    ellipse(eyeX+eyeSize, eyeY-eyeSize/2, eyeSize, eyeSize);
    fill(255);
    noStroke();
    ellipse(eyeX-eyeSize-eyeSize/7, eyeY-eyeSize*5/6, eyeSize*5/7, eyeSize/3);
    ellipse(eyeX+eyeSize-eyeSize/7, eyeY-eyeSize*5/6, eyeSize*5/7, eyeSize/3);
    ellipse(eyeX-eyeSize+eyeSize/7, eyeY-eyeSize/9, eyeSize/2, eyeSize/4);
    ellipse(eyeX+eyeSize+eyeSize/7, eyeY-eyeSize/9, eyeSize/2, eyeSize/4);
    //Draw the eyebrows (If kutie is mad, afraid, or evil)
    stroke(0);
    if(emotion === "mad" || emotion === "evil" || emotion === "thinking" || emotion === "determined"){
        line(eyeX-size/5, eyeY-size/3, eyeX-size/30, eyeY-size/5);
        line(eyeX+size/5, eyeY-size/3, eyeX+size/30, eyeY-size/5);
    }

    //Draw the mouth
    if(isMouthOpen === true){
        fill(0);
    }else{
        noFill();
    }

    if(emotion === "sad" || emotion === "mad"){
        arc(x, y+size/5, size/5, size/5, 180, 360);
    }else if(emotion === "thinking" || emotion === "determined"){
        line(x-size/10, y+size/5, x+size/10, y+size/5);
    }else if(emotion === "suprised"){
        fill(0);
        ellipse(x, y+size/5, size/8, size/8);
    }else{
        arc(x, y+size/10, size/5, size/5, 0, 180);
    }
};
var drawSky = function(){
    background(0, 200, 255);
};
var drawSun = function(x, y, size){
    noStroke();
    fill(255, 255, 0);
    ellipse(x, y, size, size);

    for(var i = 0; i<360; i+=24){
        pushMatrix();
        translate(x, y);
        rotate(i);
        strokeWeight(size/50);
        stroke(255, 127, 0);
        line(size*(7/10), 0, size*(29/50), 0);
        stroke(255, 255, 0);
        line(size*(7/10), size/50, size*(29/50), size/50);
        popMatrix();


    }
};
var drawTree = function(x, y, size){
    rectMode(CORNER);
    var wid = size*(2/3);
    var hgt = size;
    noStroke();
    //Draw the trunk
    fill(127, 63, 0);
    rect(x-wid/6, y-hgt/4, wid/3, hgt*(3/4), size/10);
    //Draw the leaves
    fill(0, 200, 75);
    ellipse(x, y-hgt/4, wid*(2/3), hgt/2);//Center leaf
    fill(75, 200, 0);
    ellipse(x+wid/3, y-hgt/4, wid/3, hgt/3);//Right leaf
    ellipse(x-wid/3, y-size/4, wid/3, hgt/3);//Left leaf
};
Player.prototype.draw = function() {
    drawKutie(userX, userY, this.size-4, this.color, true, 'happy', false);
};

Player.prototype.move = function(){
    this.x += this.xVel;
    this.y += this.yVel;
};

Player.prototype.moveMore = function(){


    if(keys[LEFT] === true){
        if(this.xVel > -xVelLimit){
            this.xVel-=0.5;
        }
    }else{
        if(this.xVel < 0){
            this.xVel++;
        }
    }
    if(keys[RIGHT] === true){
        if(this.xVel < xVelLimit){
            this.xVel+=0.5;
        }
    }else{
        if(this.xVel > 0){
            this.xVel--;
        }
    }
    if(keys[UP] === true && this.hasJumped === false){
        this.jump = true;
    }else{
        this.jump = false;
    }
    if(this.yVel < -yVelLimit){
        this.hasJumped = true;
    }else if(this.yVel > yVelLimit){
        this.hasFallen = true;
    }
    if(this.jump === false){
        if(this.gravity === true){
            if(this.hasFallen === false){
                this.yVel++;
            }
        }else{
            this.yVel = 0;
        }
    }else{
        this.yVel--;
    }
};
Player.prototype.resetGravity = function(){
    this.gravity = true;
};


var player = new Player(0, 0, 50, color(250, 70, 250));
var blocks = [];
var trees = [];
for(var y = 550; y<750; y+=50){
    for(var x = -300; x<width+300; x+=50){
        blocks.push(new Block(x, y, 50));
    }
}
for(var x = 500; x>0; x-=100){
    blocks.push(new Block(x, x-100, 50));
}


draw = function() {
    drawSky();




    pushMatrix();
    translate(-player.x+userX, -player.y+userY);


    drawSun(600, 0, 200);
    for(var x = -100; x<width+300; x+=450){
        drawTree(x, 450, 200);
    }
    player.move();
    player.moveMore();
    player.resetGravity();
    for(var i = 0; i<blocks.length; i++){
        blocks[i].draw();
        blocks[i].collideWithPlayer(player);
        //println(blocks[i].collide(player));
    }

    popMatrix();
    player.draw();

    if(player.y > 2000){
        player.x = 0;
        player.y = 0;
    }
};
