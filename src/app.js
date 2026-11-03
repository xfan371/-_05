"use strict";

const choose = (items) => items[Math.floor(Math.random() * items.length)];
const fortuneGood = ["给自己放五分钟空", "给朋友发一句问候", "提交前检查一遍", "喝水并起身走走", "勇敢问一个问题"];
const fortuneBad = ["把报错当成玄学", "忘记保存文件", "熬夜赶最后一分钟", "复制代码不看来源", "空腹喝第三杯咖啡"];
const zodiacFortunes = {
  aries: { name: "白羊座", tip: "想到新玩法就大胆试试。" },
  taurus: { name: "金牛座", tip: "今天的快乐藏在一顿好吃的里面。" },
  gemini: { name: "双子座", tip: "找朋友聊聊，灵感可能马上出现。" },
  cancer: { name: "巨蟹座", tip: "给自己留一点安静的充电时间。" },
  leo: { name: "狮子座", tip: "你的小小进步值得认真庆祝。" },
  virgo: { name: "处女座", tip: "整理一下桌面，思路也许会更清楚。" },
  libra: { name: "天秤座", tip: "选择困难时，先选让你开心的那个。" },
  scorpio: { name: "天蝎座", tip: "认真检查一次，能发现意外的细节。" },
  sagittarius: { name: "射手座", tip: "走出教室透透气，好运在路上。" },
  capricorn: { name: "摩羯座", tip: "先完成一件小事，再安心摸鱼。" },
  aquarius: { name: "水瓶座", tip: "奇妙点子记下来，改天可能用得上。" },
  pisces: { name: "双鱼座", tip: "今天适合做一场甜甜的白日梦。" },
};
const petLines = ["今天也辛苦啦。", "喵，站起来活动一下。", "Bug 不会消失，但小鱼干会。", "让我替你盯一会儿屏幕。"];
const praiseLines = ["{name}，你今天的状态像刚刚跑通的程序，漂亮得让人想截图。", "经过本宝箱鉴定，{name} 的快乐指数正在稳定上升。", "{name}，你认真起来的样子值得一颗小星星。"];
const teaseLines = ["{name}，你的待办清单可能比今天的天气更复杂。", "{name}，你的摸鱼技术已经可以写进简历了。", "{name}，你的代码在等你，你却在等灵感。"];
let feedCount = 0;

const buttons = document.querySelectorAll("[data-game]");
const panels = document.querySelectorAll(".game-panel");
buttons.forEach((button) => button.addEventListener("click", () => {
  const game = button.dataset.game;
  buttons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  panels.forEach((panel) => { panel.hidden = panel.id !== game; });
  document.getElementById(game).querySelector("button, input, select")?.focus();
}));

document.getElementById("fortune-button").addEventListener("click", () => {
  const selected = document.getElementById("zodiac-sign").value;
  const zodiac = selected ? zodiacFortunes[selected] : choose(Object.values(zodiacFortunes));
  const bug = Math.floor(Math.random() * 100) + 1;
  const output = document.getElementById("fortune-output");
  output.replaceChildren();
  const block = document.createElement("div");
  const title = document.createElement("strong");
  const lines = document.createElement("div");
  const tip = document.createElement("div");
  const extra = document.createElement("div");
  tip.className = "zodiac-tip";
  extra.className = "subline";
  title.textContent = `${zodiac.name}今日运势：${choose(["小吉", "大吉", "好运加载中", "适合放松"])}`;
  lines.textContent = `宜：${choose(fortuneGood)}；忌：${choose(fortuneBad)}`;
  tip.textContent = `星座小纸条：${zodiac.tip}`;
  extra.textContent = `今日 Bug 概率（娱乐版）：${bug}%`;
  block.append(title, lines, tip, extra);
  output.append(block);
});

document.getElementById("attendance-button").addEventListener("click", () => {
  const mood = Number(document.getElementById("teacher-mood").value);
  const weather = Number(document.getElementById("weather").value);
  const friday = document.getElementById("friday").checked ? 12 : 0;
  const seats = document.getElementById("empty-seats").checked ? 15 : 0;
  const percent = Math.max(5, Math.min(95, 35 + mood + weather + friday + seats));
  document.getElementById("attendance-output").textContent = `娱乐估算：点名概率 ${percent}%，安心指数 ${100 - percent}%。真实情况无法预测，按时上课最稳。`;
});

document.getElementById("pet-button").addEventListener("click", () => {
  document.getElementById("pet-output").textContent = "小猫：" + choose(petLines);
});
document.getElementById("feed-button").addEventListener("click", () => {
  feedCount += 1;
  document.getElementById("pet-count").textContent = `已投喂 ${feedCount} 次`;
  document.getElementById("pet-output").textContent = "小猫：谢谢小鱼干！喵～";
});

document.getElementById("compliment-button").addEventListener("click", () => {
  const name = document.getElementById("player-name").value.trim() || "摸鱼同学";
  const mode = document.getElementById("words-mode").value;
  document.getElementById("compliment-output").textContent = choose(mode === "praise" ? praiseLines : teaseLines).replace("{name}", name);
});

document.getElementById("bug-button").addEventListener("click", () => {
  const code = document.getElementById("code-input").value;
  const output = document.getElementById("bug-output");
  if (!code.trim()) {
    output.textContent = "请先输入一小段代码。";
    return;
  }
  // This is a text-only parody; it does not parse, run, or upload input code.
  const changes = [
    (text) => text.replace(/;/g, ""),
    (text) => text.replace(/\btrue\b/g, "false"),
    (text) => text.replace(/\bfalse\b/g, "true"),
    (text) => text.replace(/\bconst\b/g, "var"),
  ];
  const updated = choose(changes)(code);
  output.textContent = updated === code ? `${code}\n// 没找到可捣乱的目标，今天放你一马。` : `${updated}\n// 你的代码已准备好提交（开玩笑的，请勿直接使用）。`;
});
