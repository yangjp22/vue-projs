var sw = 20,  // 方块的宽
    sh = 20,  // 方块的高
    tr = 30,  // 行数
    td = 30;  // 列数

var snake = null,  // 蛇的实例
    food = null,  // 食物的实例
    game = null; // 游戏的实例


// 方块构建函数
function Square(x, y, className){
    // x: 方块的x坐标（1, 0）
    // y: 方块的y坐标 (0, 1)
    this.x = x * sw;
    this.y = y * sh;
    this.class = className;
    this.viewContent = document.createElement('div');   // 一个DOM元素
    this.viewContent.setAttribute("class", this.class);
    this.parent = document.getElementById("snakeWrap");
}
// 创建节点元素
Square.prototype.create = function (){   // 创建方法DOM
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw + 'px';
    this.viewContent.style.height = sh + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    this.parent.appendChild(this.viewContent);
}
// 删除某节点元素
Square.prototype.remove = function (){
    this.parent.removeChild(this.viewContent);
}

// 蛇
function Snake(){
    this.head = null;  // 存储蛇头信息
    this.tail = null;  // 存储蛇尾信息
    this.pos = [];     // 存储每一块的方位信息, 二维数组
    this.directionNum = { // 存储蛇的移动方向
        left:{
            x: -1,
            y: 0,
            rotate: 180  // 图片中蛇的本来是指向右的
        },
        right:{
            x: 1,
            y: 0,
            rotate: 0
        },
        up:{
            x: 0,
            y: -1,
            rotate: -90
        },
        down:{
            x: 0,
            y: 1,
            rotate: 90
        }
    }
}

Snake.prototype.init = function (){   // 初始化蛇
    // 创建蛇头实例
    var snakeHead = new Square(2, 0, 'snakeHead');
    snakeHead.create();

    this.head = snakeHead;   // 更新存储蛇头信息
    this.pos.push([2, 0]);   // 将蛇头的信息存储起来

    // 创建蛇身体实例1
    var snakeBody1 = new Square(1, 0, 'snakeBody');
    snakeBody1.create();
    this.pos.push([1, 0]);

    // 创建第二个身体实例
    var snakeBody2 = new Square(0, 0, 'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2;   // 将蛇尾的信息存储起来
    this.pos.push([0, 0]);

    // 形成链表关系，便于蛇身体移动；
    snakeHead.last = null;   // 上一个元素
    snakeHead.next = snakeBody1;  // 下一个元素

    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    // 给蛇添加一个属性，表示蛇走的方向；
    this.direction = this.directionNum['right'];
}

// 此方法用来获取蛇头下一个位置对应的元素。
Snake.prototype.getNextPos = function(){
    var nextPos = [ // 蛇头要走的下一个位置
        this.head.x / sw + this.direction.x,
        this.head.y / sh + this.direction.y];

    // 情况一、 下一个坐标是自己，游戏结束
    var selfCollied = false;  // 默认不是自己
    this.pos.forEach(function (value, index){
        if(value[0] == nextPos[0] && value[1] == nextPos[1]){
            selfCollied = true;
        }
    })
    if(selfCollied){
        console.log('撞到自己')
        this.strategies.die();
        return ;
    }

    // 情况二、 下一个点是墙， 游戏结束
    if(nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1){
        console.log('撞墙了');
        this.strategies.die.call(this);
        return;
    }
    // 情况三、 下一个点是食物， 吃
    if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
        // 下一个为食物点
        this.strategies.eat.call(this);
        return;
    }

    // 其余情况，继续移动
    this.strategies.move.call(this);

}

// 处理碰撞后要做的事
Snake.prototype.strategies = {
    move: function (format){   // 用来决定要不要删除最后的位置，有吃不吃决定
        // 创建一个新身体，放到旧的蛇头位置处
        var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody');

        // 更新链表
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        this.head.remove();    // 将旧的蛇头位置删除
        newBody.create();

        // 创建新蛇头，在nextPos处
        var newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snakeHead');

        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        newHead.viewContent.style.transform = 'rotate(' + this.direction.rotate + 'deg)';

        newHead.create();

        // 更新每一个蛇身上的坐标
        this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y])
        // 更新head
        this.head = newHead;

        if (!format) {      // format为false, 表示不是吃，需要删除; 传了这个函数后是吃。
            this.tail.remove();
            this.tail = this.tail.last;
            this.pos.pop()
        }

    },

    eat: function(){
        this.strategies.move.call(this, true);
        createFood();   // 吃完后随机再出现一个点
        game.score ++ ;
    },

    die: function (){
        game.over();
    }
}

// 创建食物
function createFood(){
    // 食物小方块的随机坐标
    var x = null;
    var y = null;

    var include = true;     // 循环跳出的条件，表示生成的食物在蛇身上，不再循环
    while(include){
        x = Math.round(Math.random() * (td - 1));   // 生成随机数
        y = Math.round(Math.random() * (tr - 1));

        snake.pos.forEach(function(value){
            if (x != value[0] && y != value[1]){   // 不再蛇身上，满足条件，不用再次生成
                include = false;
            }
        });
    }

    food = new Square(x, y, 'food');
    food.pos = [x, y]; // 存储食物坐标，和蛇头做对比

    var foodDom = document.querySelector('.food');
    if (foodDom){
        foodDom.style.left = x * sw + 'px';
        foodDom.style.top = y * sh + 'px';
    }else{
        food.create();
    }
}

// 游戏对象创建
function Game(){
    this.timer = null;
    this.score = 0;
}

// 游戏初始化
Game.prototype.init = function (){
    snake.init();
    createFood();
    document.onkeydown = function (ev){
        if (ev.which == 37 && snake.direction != snake.directionNum['right']){    // 37号，为左方向键, 此时蛇不能往右走
            snake.direction = snake.directionNum['left'];
        }else if(ev.which == 38 && snake.direction != snake.directionNum['down']){  // 38号，为上方向键, 此时蛇不能往下走
            snake.direction = snake.directionNum['up'];
        }else if(ev.which == 39 && snake.direction != snake.directionNum['left']){  // 39号，为右方向键, 此时蛇不能往左走
            snake.direction = snake.directionNum['right'];
        }else if(ev.which == 40 && snake.direction != snake.directionNum['up']){   // 40号，为下方向键, 此时蛇不能往上走
            snake.direction = snake.directionNum['down'];
        }
    }
    this.start();    // 开启游戏
}

// 游戏启动的方法
Game.prototype.start = function (){
    this.timer = setInterval(function(){
        snake.getNextPos();
    }, 200);
}

// 游戏暂停的方法
Game.prototype.pause = function (){
    clearInterval(this.timer);
}

// 游戏结束的方法
Game.prototype.over = function (){
    clearInterval(this.timer);
    alert('Score: ' + this.score);
    // 游戏回到初始状态
    var snakeWrap = document.getElementById('snakeWrap');   // 内容清空
    snakeWrap.innerHTML = '';

    snake = new Snake();    // snake 和 game中的内容清空
    game = new Game();

    var startBtnWrap = document.querySelector('.startBtn');
    startBtnWrap.style.display = 'block';
}


 // 启动游戏
snake = new Snake();
game = new Game();
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function (){
    startBtn.parentNode.style.display = 'none';
    game.init();
}

// 暂停游戏
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
// 暂停按钮，清空计时器
snakeWrap.onclick = function (){
    game.pause();
    pauseBtn.parentNode.style.display = 'block';
}
// 再次点击，重新开始
pauseBtn.onclick = function(){
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}