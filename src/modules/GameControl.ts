// ============ 游戏的控制器 控制其他所有的类==============//
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
  // 定义三个属性
  snake: Snake; // 蛇
  food: Food; // 食物
  scorePanel: ScorePanel; // 计分盘
  direction: string = ""; //存储蛇的移动方向（也就是按键的方向）
  isLive = true; //存储蛇的死活状态

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.init();
  }

  // 游戏初始化方法，调用此函数即游戏开始
  init() {
    // 绑定键盘按下的事件
    // bind(this) 创建一个新函数，将this.direction中的this绑定为GameControl
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    // 调用run方法使蛇移动
    // setInterval(() => {
    this.run();
    // }, 1000);
  }

  /* 
    ArrowUp  UP
    ArrowDown Down
    ArrowLeft Left
    ArrowRight Right
  */
  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // 判断event.key的值是否合法（用户是否按了正确的案件）
    // 修改direction属性，更改蛇的移动方向
    this.direction = event.key;
    //此处this指document keydownHandler()事件绑定给document，根据js特性，绑定给谁，this就指向谁。
    // console.log(this);
  }

  // 创建控制蛇移动的方法
  run() {
    // 根据方向 this.direction 来使蛇的位置发生改变
    // 向上：top 减少；向下：top 增加；向左：left 减少；向右：left 增加
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    // 检查蛇是否迟到了食物
    this.checkEat(X, Y);

    // 修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入catch，说明出现了异常，游戏结束，弹出已一个提示信息
      alert(e.message + "GAME OVER!");
      // 将isLive设置为false
      this.isLive = false;
    }

    // 开启一个定时调用
    // this.run作为参数传入到另一个函数内，此时this指向setTimeout,需要绑定 .bind(this)
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物的位置需要进行重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;
