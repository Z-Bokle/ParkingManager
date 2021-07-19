// JavaScript source code



var GameStop = false;
var BroHeight = document.documentElement.clientHeight;
var BroWidth = document.documentElement.clientWidth;

function gstop() {
    GameStop = true;
}

function abs(j)
{
    if (j < 0) return -j;
    else return j;
}
//引入Math对象使用Math.abs()能达到一样的效果

function change_en(index) {
    if (index == 0) {
        enabled = false;
        button2.visible = true;
        button1.visible = false;
    }
    else {
        enabled = true;
        button1.visible = true;
        button2.visible = false;
    }
}

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

    //this.load.image('butp', './images/buttonp.png');
    //this.load.image('butc', './images/buttonc.png');
    this.load.image('end', './images/end.png');
    this.load.image('but1', './images/button1.png');
    this.load.image('but2', './images/button2.png');
    this.load.image('ptr', './images/pointer.png');

    this.load.audio('crash', './sounds/crash.mp3');
    this.load.audio('bgm', ['./sounds/bgm.mp3', './sounds/bgm.ogg']);
    this.load.audio('yell', './sounds/yell.mp3');
}

var posx0, posy0, posx1, posy1, posx2, posy2, posx3, posy3,
    carx1, cary1, carx2, cary2, carx3, cary3, carx4, cary4;
var bgm, button1, button2, ptr;
var enabled = true;
let direction = [ 0, 0, 0, 0, 0, 0, 0, 0];
//分别为p0,p1,p2,p3,c1,c2,c3,c4的方向 默认为0 朝上

//let buttons = new Array(8);
//使用预定义的Array对象中的构造函数创建名为buttons的长度为8的数组用于存放

let movable = [false, false, false, false, false, false, false, false];
var crash, yell;
var text,endtext;
let point = 0;

function create() {
    this.add.image(480, 320, 'bg');//x:155-805   y:150-650
    //用random函数生成随机坐标，用于放置单位
    //用random函数生成四个随机方向，用于确定精灵对象的方向
    for (let i = 0; i < 8; i++) {
        reset_direction(i);
    }//初始化对象方向


    button1 = this.add.sprite(25, 25, 'but1');
    button2 = this.add.sprite(25, 25, 'but2');
    button2.visible = false;

    crash = this.sound.add('crash');
    yell = this.sound.add('yell');

    music = this.sound.add('bgm');
    music.play();
    posx0 = 480 + 320 * (Math.round(Math.random() * 1000) / 500 - 1);
    posy0 = 320 + 170 * (Math.round(Math.random() * 1000) / 500 - 1);
    people0=this.add.sprite(posx0, posy0, 'p0'); 
    update_direction(0);
    //buttons[0] = this.add.button(posx0, posy0, 'butp', function () { movable[0] = true; }, this, 0, 0, 0, 0);

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

    //ptr = this.add.sprite(480, 320, 'ptr');

    text = this.add.text(50, 10, '', { fill: '#000000' });

}



function update(time, delta) {
    var pointer = this.input.activePointer;
    var x = pointer.worldX, y = pointer.worldY;

    if (GameStop)
        this.scene.stop();
    console.log(car1.x);
    console.log(car1.y);
    if (point == 8 && ((people0.x < 155 || people0.x > 805) || (people0.y < 85 || people0.y > 555))
        && ((people1.x < 155 || people1.x > 805) || (people1.y < 85 || people1.y > 555))
        && ((people2.x < 155 || people2.x > 805) || (people2.y < 85 || people2.y > 555))
        && ((people3.x < 155 || people3.x > 805) || (people3.y < 85 || people3.y > 555))
        && ((car1.x < 155 || car1.x > 805) || (car1.y < 85 || car1.y > 555))
        && ((car2.x < 155 || car2.x > 805) || (car2.y < 85 || car2.y > 555))
        && ((car3.x < 155 || car3.x > 805) || (car3.y < 85 || car3.y > 555))
        && ((car4.x < 155 || car4.x > 805) || (car4.y < 85 || car4.y > 555))) {//游戏胜利
        this.add.image(480, 320, 'end');
        endtext = this.add.text(300, 320, '', { fill: '#000000' });
        endtext.setText('You win! Please reload game to restart.');
        yell.play();
        music.pause();
        for (let i = 0; i < 8; i++)
            movable[i] = false;
        setTimeout('gstop()', 5000);
    }

    text.setText('Point:' + point);
    if (abs(people0.x - people1.x) <= 20 && abs(people0.y - people1.y) <= 20
        || abs(people0.x - people2.x) <= 20 && abs(people0.y - people2.y) <= 20
        || abs(people0.x - people3.x) <= 20 && abs(people0.y - people3.y) <= 20
        || abs(people1.x - people2.x) <= 20 && abs(people1.y - people2.y) <= 20
        || abs(people1.x - people3.x) <= 20 && abs(people1.y - people3.y) <= 20
        || abs(people2.x - people3.x) <= 20 && abs(people2.y - people3.y) <= 20) {
        music.pause();
        crash.play();
        console.log('Crashed!');
        this.add.image(480, 320, 'end');
        endtext = this.add.text(300, 320, '', { fill: '#000000' });
        endtext.setText('You lose.Get ' + point + ' point(s).');
        for (let i = 0; i < 8; i++)
            movable[i] = false;
        setTimeout('gstop()', 5000);

        //alert("游戏结束");
    }
        
    if (abs(car1.x - car2.x) <= 50 && abs(car1.y - car2.y) <= 50
        || abs(car1.x - car3.x) <= 50 && abs(car1.y - car3.y) <= 50
        || abs(car1.x - car4.x) <= 50 && abs(car1.y - car4.y) <= 50
        || abs(car2.x - car3.x) <= 50 && abs(car2.y - car3.y) <= 50
        || abs(car2.x - car4.x) <= 50 && abs(car2.y - car4.y) <= 50
        || abs(car3.x - car4.x) <= 50 && abs(car3.y - car4.y) <= 50) {
        music.pause();
        crash.play();
        console.log('Crashed!');
        this.add.image(480, 320, 'end');
        endtext = this.add.text(300, 320, '', { fill: '#000000' });
        endtext.setText('You lose.Get ' + point + ' point(s).');
        for (let i = 0; i < 8; i++)
            movable[i] = false;
        setTimeout('gstop()', 5000);
        //alert("游戏结束");
    }
    if (abs(people0.x - car1.x) <= 20 && abs(people0.y - car1.y) <= 20
        || abs(people0.x - car2.x) <= 20 && abs(people0.y - car2.y) <= 20
        || abs(people0.x - car3.x) <= 20 && abs(people0.y - car3.y) <= 20
        || abs(people0.x - car4.x) <= 20 && abs(people0.y - car4.y) <= 20
        || abs(people1.x - car1.x) <= 20 && abs(people1.y - car1.y) <= 20
        || abs(people1.x - car2.x) <= 20 && abs(people1.y - car2.y) <= 20
        || abs(people1.x - car3.x) <= 20 && abs(people1.y - car3.y) <= 20
        || abs(people1.x - car4.x) <= 20 && abs(people1.y - car4.y) <= 20
        || abs(people2.x - car1.x) <= 20 && abs(people2.y - car1.y) <= 20
        || abs(people2.x - car2.x) <= 20 && abs(people2.y - car2.y) <= 20
        || abs(people2.x - car3.x) <= 20 && abs(people2.y - car3.y) <= 20
        || abs(people2.x - car4.x) <= 20 && abs(people2.y - car4.y) <= 20
        || abs(people3.x - car1.x) <= 20 && abs(people3.y - car1.y) <= 20
        || abs(people3.x - car2.x) <= 20 && abs(people3.y - car2.y) <= 20
        || abs(people3.x - car3.x) <= 20 && abs(people3.y - car3.y) <= 20
        || abs(people3.x - car4.x) <= 20 && abs(people3.y - car4.y) <= 20) {
        music.pause();
        crash.play();
        console.log('Crashed!');
        this.add.image(480, 320, 'end');
        endtext = this.add.text(300, 320, '', { fill: '#000000' });
        endtext.setText('You lose.Get ' + point + ' point(s).');
        for (let i = 0; i < 8; i++)
            movable[i] = false;
        setTimeout('gstop()', 5000);
        
        //alert("游戏结束");
    }
    /*
    this.input.on('pointerdown', function (pointer) {
        this.input.mouse.requestPointerLock();
        button1.visible = true;
        button2.visible = false;
        music.play();
        console.log('2222');
        enabled = true;
    }, this);//点击解锁游戏

    this.input.keyboard.on('keydown-Q', function (event) {
        if (this.input.mouse.locked) {
            this.input.mouse.releasePointerLock();
            music.pause();
            button2.visible = true;
            button1.visible = false;
            console.log('1111');
            enabled = false;
        }
    }, this);//Q暂停游戏(还有问题)


        if (this.input.mouse.locked) {
            ptr.x += pointer.movementX;
            ptr.y += pointer.movementY;

            ptr.x = Phaser.Math.Wrap(ptr.x, 0, game.renderer.width);
            ptr.y = Phaser.Math.Wrap(ptr.y, 0, game.renderer.height);

            if (pointer.movementX > 0) { ptr.setRotation(0.1); }
            else if (pointer.movementX < 0) { ptr.setRotation(-0.1); }
            else { ptr.setRotation(0); }
        }//光标跟随和边界循环处理
    */
    if (abs(x - button1.x) < button1.width / 2 && abs(y - button1.y) < button1.height / 2 && pointer.isDown) {
        if (enabled == true) {
            
            setTimeout("change_en(0)", 250);
            music.pause();
            console.log('1111');
            /*
            var dt = new Date();
            var sc0 = dt.getSeconds(),sc;
            for (sc = dt.getSeconds(); sc == (sc0 + 2) % 60; sc = dt.getSeconds())
                console.log('1111sc='+sc);
            change_en(0);
            */
            //alert("游戏结束");
        }
        if (enabled == false) {

            setTimeout("change_en(1)", 250);
            music.play();
            console.log('2222');
            /*
            var dt = new Date();
            var sc0 = dt.getSeconds(), sc;
            for (sc = dt.getSeconds(); sc == (sc0 + 2) % 60; sc = dt.getSeconds())
                console.log('2222sc=' + sc);
            change_en(1);
            */

        }
    }

    if (enabled == true) {//未处于暂停状态

        if (pointer.isDown) {//监听鼠标的点击，同时判断出鼠标点击的对象
            if (abs(x - people0.x) < people0.width / 2 && abs(y - people0.y) < people0.height / 2) {
                movable[0] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }
                
            if (abs(x - people1.x) < people1.width / 2 && abs(y - people1.y) < people1.height / 2) {
                movable[1] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            if (abs(x - people2.x) < people2.width / 2 && abs(y - people2.y) < people2.height / 2) {
                movable[2] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            if (abs(x - people3.x) < people3.width / 2 && abs(y - people3.y) < people3.height / 2) {
                movable[3] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            if (abs(x - car1.x) < car1.width / 2 && abs(y - car1.y) < car1.height / 2) {
                movable[4] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            if (abs(x - car2.x) < car2.width / 2 && abs(y - car2.y) < car2.height / 2) {
                movable[5] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }
                
            if (abs(x - car3.x) < car3.width / 2 && abs(y - car3.y) < car3.height / 2) {
                movable[6] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            if (abs(x - car4.x) < car4.width / 2 && abs(y - car4.y) < car4.height / 2) {
                movable[7] = true;
                point = 0;
                for (let i = 0; i < 8; i++)
                    point += movable[i];
            }

            
        }

        //people1.x += 0;//这里写每个精灵对象的位置操作 在很小的时间间隔内执行一次这个函数

        const MoveSpeed = 3;//默认移动速度为3
        //people0
        if (movable[0]) {//若处于运动状态，则根据方向进行运动
            if (direction[0] == 0) people0.y -= MoveSpeed;
            if (direction[0] == 90) people0.x += MoveSpeed;
            if (direction[0] == 180) people0.y += MoveSpeed;
            if (direction[0] == 270) people0.x -= MoveSpeed;
        }

        if (people0.x <= 85) {
            direction[0] += 90;
            direction[0] %= 360;
            update_direction(0);//更新当前对象（第0个）朝向
            people0.x += 4;
        }

        if (people0.x >= 875) {
            direction[0] += 90;
            direction[0] %= 360;
            update_direction(0);
            people0.x -= 4;
        }

        if (people0.y <= 80) {
            direction[0] += 90;
            direction[0] %= 360;
            update_direction(0);
            people0.y += 4;
        }

        if (people0.y >= 560) {
            direction[0] += 90;
            direction[0] %= 360;
            update_direction(0);
            people0.y -= 4;
        }
        //people1
        if (movable[1]) {//若处于运动状态，则根据方向进行运动
            if (direction[1] == 0) people1.y -= MoveSpeed;
            if (direction[1] == 90) people1.x += MoveSpeed;
            if (direction[1] == 180) people1.y += MoveSpeed;
            if (direction[1] == 270) people1.x -= MoveSpeed;
        }

        if (people1.x <= 85) {
            direction[1] += 90;
            direction[1] %= 360;
            update_direction(1);//更新当前对象（第1个）朝向
            people1.x += 4;
        }

        if (people1.x >= 875) {
            direction[1] += 90;
            direction[1] %= 360;
            update_direction(1);
            people1.x -= 4;
        }

        if (people1.y <= 80) {
            direction[1] += 90;
            direction[1] %= 360;
            update_direction(1);
            people1.y += 4;
        }

        if (people1.y >= 560) {
            direction[1] += 90;
            direction[1] %= 360;
            update_direction(1);
            people1.y -= 4;
        }
        //people2
        if (movable[2]) {//若处于运动状态，则根据方向进行运动
            if (direction[2] == 0) people2.y -= MoveSpeed;
            if (direction[2] == 90) people2.x += MoveSpeed;
            if (direction[2] == 180) people2.y += MoveSpeed;
            if (direction[2] == 270) people2.x -= MoveSpeed;
        }

        if (people2.x <= 85) {
            direction[2] += 90;
            direction[2] %= 360;
            update_direction(2);//更新当前对象（第2个）朝向
            people2.x += 4;
        }

        if (people2.x >= 875) {
            direction[2] += 90;
            direction[2] %= 360;
            update_direction(2);
            people2.x -= 4;
        }

        if (people2.y <= 80) {
            direction[2] += 90;
            direction[2] %= 360;
            update_direction(2);
            people2.y += 4;
        }

        if (people2.y >= 560) {
            direction[2] += 90;
            direction[2] %= 360;
            update_direction(2);
            people2.y -= 4;
        }
        //people3
        if (movable[3]) {//若处于运动状态，则根据方向进行运动
            if (direction[3] == 0) people3.y -= MoveSpeed;
            if (direction[3] == 90) people3.x += MoveSpeed;
            if (direction[3] == 180) people3.y += MoveSpeed;
            if (direction[3] == 270) people3.x -= MoveSpeed;
        }

        if (people3.x <= 85) {
            direction[3] += 90;
            direction[3] %= 360;
            update_direction(3);//更新当前对象（第4个）朝向
            people3.x += 4;
        }

        if (people3.x >= 875) {
            direction[3] += 90;
            direction[3] %= 360;
            update_direction(3);
            people3.x -= 4;
        }

        if (people3.y <= 80) {
            direction[3] += 90;
            direction[3] %= 360;
            update_direction(3);
            people3.y += 4;
        }

        if (people3.y >= 560) {
            direction[3] += 90;
            direction[3] %= 360;
            update_direction(3);
            people3.y -= 4;
        }
        //car1
        if (movable[4]) {//若处于运动状态，则根据方向进行运动
            if (direction[4] == 0) car1.y -= MoveSpeed;
            if (direction[4] == 90) car1.x += MoveSpeed;
            if (direction[4] == 180) car1.y += MoveSpeed;
            if (direction[4] == 270) car1.x -= MoveSpeed;
        }

        if (car1.x <= 85) {
            direction[4] += 90;
            direction[4] %= 360;
            update_direction(4);//更新当前对象（第5个）朝向
            car1.x += 4;
        }

        if (car1.x >= 875) {
            direction[4] += 90;
            direction[4] %= 360;
            update_direction(4);
            car1.x -= 4;
        }

        if (car1.y <= 80) {
            direction[4] += 90;
            direction[4] %= 360;
            update_direction(4);
            car1.y += 4;
        }

        if (car1.y >= 560) {
            direction[4] += 90;
            direction[4] %= 360;
            update_direction(4);
            car1.y -= 4;
        }
        //car2
        if (movable[5]) {//若处于运动状态，则根据方向进行运动
            if (direction[5] == 0) car2.y -= MoveSpeed;
            if (direction[5] == 90) car2.x += MoveSpeed;
            if (direction[5] == 180) car2.y += MoveSpeed;
            if (direction[5] == 270) car2.x -= MoveSpeed;
        }

        if (car2.x <= 85) {
            direction[5] += 90;
            direction[5] %= 360;
            update_direction(5);//更新当前对象（第6个）朝向
            car2.x += 4;
        }

        if (car2.x >= 875) {
            direction[5] += 90;
            direction[5] %= 360;
            update_direction(5);
            car2.x -= 4;
        }

        if (car2.y <= 80) {
            direction[5] += 90;
            direction[5] %= 360;
            update_direction(5);
            car2.y += 4;
        }

        if (car2.y >= 560) {
            direction[5] += 90;
            direction[5] %= 360;
            update_direction(5);
            car2.y -= 4;
        }
        //car3
        if (movable[6]) {//若处于运动状态，则根据方向进行运动
            if (direction[6] == 0) car3.y -= MoveSpeed;
            if (direction[6] == 90) car3.x += MoveSpeed;
            if (direction[6] == 180) car3.y += MoveSpeed;
            if (direction[6] == 270) car3.x -= MoveSpeed;
        }

        if (car3.x <= 85) {
            direction[6] += 90;
            direction[6] %= 360;
            update_direction(6);//更新当前对象（第7个）朝向
            car3.x += 4;
        }

        if (car3.x >= 875) {
            direction[6] += 90;
            direction[6] %= 360;
            update_direction(6);
            car3.x -= 4;
        }

        if (car3.y <= 80) {
            direction[6] += 90;
            direction[6] %= 360;
            update_direction(6);
            car3.y += 4;
        }

        if (car3.y >= 560) {
            direction[6] += 90;
            direction[6] %= 360;
            update_direction(6);
            car3.y -= 4;
        }
        //car4
        if (movable[7]) {//若处于运动状态，则根据方向进行运动
            if (direction[7] == 0) car4.y -= MoveSpeed;
            if (direction[7] == 90) car4.x += MoveSpeed;
            if (direction[7] == 180) car4.y += MoveSpeed;
            if (direction[7] == 270) car4.x -= MoveSpeed;
        }

        if (car4.x <= 85) {
            direction[7] += 90;
            direction[7] %= 360;
            update_direction(7);//更新当前对象（第8个）朝向
            car4.x += 4;
        }

        if (car4.x >= 875) {
            direction[7] += 90;
            direction[7] %= 360;
            update_direction(7);
            car4.x -= 4;
        }

        if (car4.y <= 80) {
            direction[7] += 90;
            direction[7] %= 360;
            update_direction(7);
            car4.y += 4;
        }

        if (car4.y >= 560) {
            direction[7] += 90;
            direction[7] %= 360;
            update_direction(7);
            car4.y -= 4;
        }
        //补全碰到其他对象的情况(game over)
        //补全进度条加载动画
    }

}