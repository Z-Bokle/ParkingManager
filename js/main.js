// JavaScript source code




var BroHeight = document.documentElement.clientHeight;
var BroWidth = document.documentElement.clientWidth;

function abs(j)
{
    if (j < 0) return -j;
    else return j;
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
var people0,people1,people2,people3;

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
    
}

var posx0, posy0, posx1, posy1, posx2, posy2, posx3, posy3;
function create() {
    this.add.image(480, 320, 'bg');//x:155-805   y:150-650
    //用random函数生成随机坐标，用于放置单位

    posx0 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy0 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    people0=this.add.sprite(posx0, posy0, 'p0'); 

    //透明按钮和人重合

    posx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(posx1 - posx0) <= 75 && abs(posy1 - posy0) <= 75)
    {
        posx1 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        posy1 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }
    people1=this.add.sprite(posx1, posy1, 'p1');
    posx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    while (abs(posx2 - posx0) <= 75 && abs(posy2 - posy0) <= 75
        || abs(posx2 - posx1) <= 75 && abs(posy2 - posy1) <= 75)
    {
        posx2 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
        posy2 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    }

    //alert("posx2=" + posx2+",posy2="+posy2);

    people2=this.add.sprite(posx2, posy2, 'p2');
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
 
    //var pos0 = { x: posx0, y: posy0 }, pos1 = { x: posx1, y: posy1 }, pos2 = { x: posx2, y: posy2 }, pos3 = { x: posx3, y: posy3 };
    
}
function update(time,delta) {
    people0.x += 1;//这里写每个精灵对象的位置操作 在很小的时间间隔内执行一次这个函数
}
