//dom挂在了window上，是全局属性了，所以可以在这里直接用了

//creat函数测试
const div1 = dom.create1("div");
console.log(div1);

const div2 = dom.create2("<span>想见你</span>");
console.log(div2);

const div3 = dom.create("<td>想见你</td>");
console.log(div3);

//after函数测试
const div4 = dom.create("<div>我是test的弟弟</div>");
console.log(div4);
dom.after(test, div4);

//before函数测试
const div5 = dom.create("<div>我是test的哥哥</div>");
console.log(div5);
dom.before(test, div5);

//append函数测试
const div6 = dom.create("<div>我是test的儿子</div>");
console.log(div6);
dom.append(test, div6);

//wrap函数测试
const div7 = dom.create("<div>我是test爸爸</div>");
dom.wrap(test, div7);
console.log(div7);

//empty函数测试
const a = dom.empty(window.empty);
console.log(a);

//attr函数测试
dom.attr(test, "title", "Hi");
title = dom.attr(test, "title");
console.log(title);

//text函数测试
dom.text(test, "test 我是test新增加的文本内容");
const b = dom.text(test);
console.log(b);
//html函数测试
dom.html(test, "<p>我是新增加的html内容</p>");
const c = dom.html(test);
console.log(c);

//style函数测试
dom.style(test, { border: "1px solid red", color: "blue" });
dom.style(test, "color", "red");
const d = dom.style(test, "color");
console.log(d);

//class函数测试
dom.class.add(test, "yy");
dom.class.add(test, "bb");
dom.class.remove(test, "bb");
console.log(dom.class.has(test, "yy"));

//on函数测试
fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

//find函数测试
const e = dom.find("#test")[0];
console.log(e);

//siblings函数测试
console.log(dom.siblings(new2));

//next函数测试
console.log(dom.next(new2));
console.log(dom.next(new3));
//previous函数测试
console.log(dom.previous(new2));
console.log(dom.previous(new1));
//each函数测试
const t = dom.find("#travel")[0];
console.log(t);
dom.each(dom.children(t), n => dom.style(n, "color", "red"));
//对#travel的所有孩子，执行自写函数：加上style

//next函数测试
console.log(dom.index(t1));