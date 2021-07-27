// ===================定义食物类 Food======================//
class Food {
  // 定义一个属性来表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素，并将其赋值给 element。
    // document.getElementById('food') 有可能为空，拿不到food元素。
    // 可以先做判断再赋值,也可以直接加个 ! 表示不可能为空
    this.element = document.getElementById("food")!;
  }

  // 定义一个获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成随机的位置，
    // 食物的位置最小是0，最大是290，每一次移动10px
    const left = Math.round(Math.random() * 29) * 10;
    const top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
// food类测试代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();

export default Food;
