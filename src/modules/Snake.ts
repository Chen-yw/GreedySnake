class Snake {
  element: HTMLElement; //获取蛇的容器
  head: HTMLElement; // 表示蛇头的元素
  bodies: HTMLCollection; // 表示蛇的身体。 HTMLCollection 表示有新元素加入的时候会自动补充新元素
  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    // document.querySelectorAll("#snake > div")!;
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
  }

  // 定义获取蛇头x轴坐标的方法
  get X() {
    return this.head.offsetLeft;
  }

  // 定义获取蛇头y轴坐标的方法
  get Y() {
    return this.head.offsetTop;
  }

  //// 设置蛇头的坐标
  set X(value: number) {
    // 如果新值和旧值相同，则直接返回，不再修改
    if (this.X === value) {
      return;
    }

    // 判断X的值是否合法 0-290
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了！");
    }

    // 修改X时，蛇在向左移动的时候，不能向右移动，反之同理
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // 如果发生了掉头，让蛇向反方向继续走
      if (value > this.X) {
        // 如果新值value大于旧X，则说明蛇准备向右走，发生掉头，应该使蛇继续左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    // 移动身体
    this.moveBody();
    this.head.style.left = value + "px";
    // 检查有没有撞到自己
    this.chackHeadBody();
  }
  set Y(value: number) {
    // 如果新值和旧值相同，则直接返回，不再修改
    if (this.Y === value) {
      return;
    }

    // 判断X的值是否合法 0-290
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了,抛出异常。
      throw new Error("蛇撞墙了！");
    }

    // 修改Y时，蛇在向左移动的时候，不能向右移动，反之同理
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 如果发生了掉头，让蛇向反方向继续走
      if (value > this.Y) {
        // 如果新值value大于旧X，则说明蛇准备向右走，发生掉头，应该使蛇继续左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody();
    this.head.style.top = value + "px";
    // 检查有没有撞到自己
    this.chackHeadBody();
  }

  //// 设置蛇增长身体的方法
  addBody() {
    // 想element中添加一个div
    // 第一个参数;位置，结束标签之前的位置，
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  //// 设置一个蛇身体移动的方法
  moveBody() {
    // 将后面身体的位置设置为前面身体的位置
    // 遍历获取所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前的身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检查蛇头闯到自己的方法
  chackHeadBody() {
    // 获取所有的身体检查时候和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("咬到了尾巴！");
      }
    }
  }
}

export default Snake;
