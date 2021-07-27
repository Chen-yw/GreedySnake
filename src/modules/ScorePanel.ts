// ===================定义积分盘类 ScorePanel======================//
class ScorePanel {
  // score和level用来记录分数和等级
  score = 0;
  level = 1;
  maxLevel: number; // 定义一个变量限制等级
  upScore: number; //定义一个变量设置多少分升一级
  // 分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  // 定义一个加分的方法
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + "";

    // 判断分数是多少，控制升级
    if (this.score % 10 === 0) {
      this.levelUp();
    }
  }

  // 定义一个等级提升的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}
// 测试ScorePanel类
// const scorePanel = new ScorePanel(10, 20);
// scorePanel.addScore();
// scorePanel.levelUp();

export default ScorePanel;
