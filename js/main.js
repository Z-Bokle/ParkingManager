// JavaScript source code




var BroHeight = document.documentElement.clientHeight;
var BroWidth = document.documentElement.clientWidth;

function abs(j)
{
    if (j < 0) return -j;
    else return j;
}
//引入Math对象使用Math.abs()能达到一样的效果


function reset_direction(iter)//更新第iter个元素的方向  仅能更改为上下左右
{
    direction[iter] = Math.floor(Math.random() * 4) * 90;
}

function update_direction(iter) {
    if(iter==0)
        people0.angle = direction[0];
    if (iter == 1)
        people1.angle = direction[1];
    if (iter == 2)
        people2.angle = direction[2];
    if (iter == 3)
        people3.angle = direction[3];
    if (iter == 4)
        car1.angle = direction[4];
    if (iter == 5)
        car2.angle = direction[5];
    if (iter == 6)
        car3.angle = direction[6];
    if (iter == 7)
        car4.angle = direction[7];
}

var config = {
    width: 960,
    height: 640,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config);
var people0,people1,people2,people3,car1,car2,car3,car4;

function preload() {

    this.load.image('bg', './images/bg1.png');
    this.load.image('p0', './images/p1.png');
    this.load.image('p1', './images/p2.png');
    this.load.image('p2', './images/p3.png');
    this.load.image('p3', './images/p4.png');
    this.load.image('c1', './images/c1.png');
    this.load.image('c2', './images/c2.png');
    this.load.image('c3', './images/c3.png');
    this.load.image('c4', './images/c4.png');
    this.load.image('c5', './images/c5.png');
    this.load.image('c6', './images/c6.png');
    this.load.image('c7', './images/c7.png');
    this.load.image('c8', './images/c8.png');

    this.load.image('butp', './images/buttonp.png');
    this.load.image('butc', './images/buttonc.png');
}

var posx0, posy0, posx1, posy1, posx2, posy2, posx3, posy3,
    carx1, cary1, carx2, cary2, carx3, cary3, carx4, cary4;

let direction = [ 0, 0, 0, 0, 0, 0, 0, 0];
//分别为p0,p1,p2,p3,c1,c2,c3,c4的方向 默认为0 朝上

//let buttons = new Array(8);
//使用预定义的Array对象中的构造函数创建名为buttons的长度为8的数组用于存放

let movable = [false, false, false, false, false, false, false, false];

function create() {
    this.add.image(480, 320, 'bg');//x:155-805   y:150-650
    //用random函数生成随机坐标，用于放置单位
    //用random函数生成四个随机方向，用于确定精灵对象的方向
    for (let i = 0; i < 8; i++) {
        reset_direction(i);
        //console.log(direction[i]);
    }
    /*
    this.input.onDown.add(function (pointer) {
       
    });
    */


    posx0 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy0 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    people0=this.add.sprite(posx0, posy0, 'p0'); 
    update_direction(0);
    //buttons[0] = this.add.button(posx0, posy0, 'butp', function () { movable[0] = true; }, this, 0, 0, 0, 0);
    //设置透明按钮和人重合
    //车同理
    posx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(posx1 - posx0) <= 75 && abs(posy1 - posy0) <= 75)
    {
        posx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        posy1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    people1 = this.add.sprite(posx1, posy1, 'p1');
    update_direction(1);
    //buttons[1] = this.add.button(posx1, posy1, 'butp', function () { movable[1] = true; }, this, 0, 0, 0, 0);


    posx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(posx2 - posx0) <= 75 && abs(posy2 - posy0) <= 75
        || abs(posx2 - posx1) <= 75 && abs(posy2 - posy1) <= 75)
    {
        posx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        posy2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }

    people2 = this.add.sprite(posx2, posy2, 'p2');
    update_direction(2);
    //buttons[2] = this.add.button(posx2, posy2, 'butp', function () { movable[2] = true; }, this, 0, 0, 0, 0);


    posx3 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy3 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(posx3 - posx0) <= 75 && abs(posy3 - posy0) <= 75
        || abs(posx3 - posx1) <= 75 && abs(posy3 - posy1) <= 75
        || abs(posx3 - posx2) <= 75 && abs(posy3 - posy2) <= 75)
    {
        posx3 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        posy3 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    people3=this.add.sprite(posx3, posy3, 'p3');
    update_direction(3);
    //buttons[3] = this.add.button(posx3, posy3, 'butp', function () { movable[3] = true; }, this, 0, 0, 0, 0);


    
    carx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    cary1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(carx1 - posx0) <= 100 && abs(cary1 - posy0) <= 100
        || abs(carx1 - posx1) <= 100 && abs(cary1 - posy1) <= 100
        || abs(carx1 - posx2) <= 100 && abs(cary1 - posy2) <= 100
        || abs(carx1 - posx3) <= 100 && abs(cary1 - posy3) <= 100    ) {
        carx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        cary1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    car1 = this.add.sprite(carx1, cary1, 'c1');
    update_direction(4);
    //buttons[4] = this.add.button(carx1, cary1, 'butc', function () { movable[4] = true; }, this, 0, 0, 0, 0);
    //buttons[4].angle = direction[4];

    carx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    cary2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(carx2 - posx0) <= 100 && abs(cary2 - posy0) <= 100
        || abs(carx2 - posx1) <= 100 && abs(cary2 - posy1) <= 100
        || abs(carx2 - posx2) <= 100 && abs(cary2 - posy2) <= 100
        || abs(carx2 - posx3) <= 100 && abs(cary2 - posy3) <= 100
        || abs(carx2 - carx1) <= 100 && abs(cary2 - cary1) <= 100    ) {
        carx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        cary2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    car2 = this.add.sprite(carx2, cary2, 'c2');
    update_direction(5);
    //buttons[5] = this.add.button(carx2, cary2, 'butc', function () { movable[5] = true; }, this, 0, 0, 0, 0);
    //buttons[5].angle = direction[5];

    carx3 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    cary3 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(carx3 - posx0) <= 100 && abs(cary3 - posy0) <= 100
        || abs(carx3 - posx1) <= 100 && abs(cary3 - posy1) <= 100
        || abs(carx3 - posx2) <= 100 && abs(cary3 - posy2) <= 100
        || abs(carx3 - posx3) <= 100 && abs(cary3 - posy3) <= 100
        || abs(carx3 - carx1) <= 100 && abs(cary3 - cary1) <= 100
        || abs(carx3 - carx2) <= 100 && abs(cary3 - cary2) <= 100    ) {
        carx3 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        cary3 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    car3 = this.add.sprite(carx3, cary3, 'c3');
    update_direction(6);
    //buttons[6] = this.add.button(carx3, cary3, 'butc', function () { movable[6] = true; }, this, 0, 0, 0, 0);
    //buttons[6].angle = direction[6];


    carx4 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    cary4 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(carx4 - posx0) <= 100 && abs(cary4 - posy0) <= 100
        || abs(carx4 - posx1) <= 100 && abs(cary4 - posy1) <= 100
        || abs(carx4 - posx2) <= 100 && abs(cary4 - posy2) <= 100
        || abs(carx4 - posx3) <= 100 && abs(cary4 - posy3) <= 100
        || abs(carx4 - carx1) <= 100 && abs(cary4 - cary1) <= 100
        || abs(carx4 - carx2) <= 100 && abs(cary4 - cary2) <= 100
        || abs(carx4 - carx3) <= 100 && abs(cary4 - cary3) <= 100    ) {
        carx4 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        cary4 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    car4 = this.add.sprite(carx4, cary4, 'c4');
    update_direction(7);
    //buttons[7] = this.add.button(carx4, cary4, 'butc', function () { movable[7] = true; }, this, 0, 0, 0, 0);
    //buttons[7].angle = direction[7];

}

 

function update(time, delta) {
    var pointer = this.input.activePointer;
    var x = pointer.worldX,y = pointer.worldY;
    if (pointer.isDown) {//监听鼠标的点击，同时判断出鼠标点击的对象
        if (abs(x - people0.x) < people0.width / 2 && abs(y - people0.y) < people0.height / 2)
            movable[0] = true;
        if (abs(x - people1.x) < people1.width / 2 && abs(y - people1.y) < people1.height / 2)
            movable[1] = true;
        if (abs(x - people2.x) < people2.width / 2 && abs(y - people2.y) < people2.height / 2)
            movable[2] = true;
        if (abs(x - people3.x) < people3.width / 2 && abs(y - people3.y) < people3.height / 2)
            movable[3] = true;
        if (abs(x - car1.x) < car1.width / 2 && abs(y - car1.y) < car1.height / 2)
            movable[4] = true;
        if (abs(x - car2.x) < car2.width / 2 && abs(y - car2.y) < car2.height / 2)
            movable[5] = true;
        if (abs(x - car3.x) < car3.width / 2 && abs(y - car3.y) < car3.height / 2)
            movable[6] = true;
        if (abs(x - car4.x) < car4.width / 2 && abs(y - car4.y) < car4.height / 2)
            movable[7] = true;
    }

    //people1.x += 0;//这里写每个精灵对象的位置操作 在很小的时间间隔内执行一次这个函数

    const MoveSpeed = 2;//默认移动速度为2

    if (movable[0]) {//若处于运动状态，则根据方向进行运动
        if (direction[0] == 0) people0.y -= MoveSpeed;
        if (direction[0] == 90) people0.x += MoveSpeed;
        if (direction[0] == 180) people0.y += MoveSpeed;
        if (direction[0] == 270) people0.x -= MoveSpeed;
    }

    if (people0.x <= 85) {
        direction[0] += 90;
        direction[0] %= 360;
        update_direction(0);
        people0.x += 3;
        
    }//补全碰到其他边界和其他对象的情况
    //补全其他对象的运动检测判断
}
