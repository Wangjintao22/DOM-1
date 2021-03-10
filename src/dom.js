//新建全局对象dom，这样我们就可以往这个对象里面增加东西，哪儿都可以用来
window.dom = {
  
};

//往dom里面加各种函数

//一、增加

//（一）creat函数用于新建HTML内容（文本、元素、父子元素、在元素里的文本内容等）
//1.函数create1，用来创建一个节点。调用这个函数其实就是调用DOM里面对应的那个复杂的函数
window.dom.create1 = function(tagName) {
  return document.createElement(tagName);
};

//2.函数create1，用来创建一串Html
window.dom.create2 = function(string) {
  //参数是我们想加入的HTML
  const container = document.createElement("div"); //新建一个元素div当容器
  container.innerHTML = string; //把HTML内容加入容器中，成为容器的第一个小孩
  return container.children[0]; //返回第一个小孩也就是我们要加的HTML
};
//有漏洞，因为td标签不可以放在div里//用template!
//3.最终函数create
window.dom.create = function(string) {
  //参数是我们想加入的HTML
  const container = document.createElement("template"); //新建一个元素template当容器
  container.innerHTML = string.trim(); //把HTML内容加入容器中，成为容器的第一个小孩//(字符串两边的空格已被去掉，不然前面有空格就不是第一个小孩了)
  return container.content.firstChild; //返回第一个小孩也就是我们要加的HTML
};

//(二)after函数用于给node1新建个弟弟node2
window.dom.after = function(node1, node2) {
  node1.parentNode.insertBefore(node2, node1.nextSibling); //在node1的爸爸使用在我里面 的 node1后面的那个节点的前面插入node2
};
//就算没有下个节点也可以成功

//(三)before函数用于给node1新建个哥哥node2
window.dom.before = function(node1, node2) {
  node1.parentNode.insertBefore(node2, node1); //在node1的爸爸使用在我里面 的 node1前面插入node2
};

//(四)append函数用于新建个儿子
window.dom.append = function(parent, node) {
  parent.appendChild(node);
};

//(五)wrap函数用于新建个爸爸
window.dom.wrap = function(node, parent) {
  dom.before(node, parent); //先让parent当node的哥哥
  dom.append(parent, node); //让parent的儿子是node//appendChild函数对最新的爸爸叫爸爸，以前的爸爸里面会被删掉
};

//二、删除
//(一)remove函数用于删除节点
window.dom.remove = function(node) {
  node.parentNode.removeChild(node);
  return node; //还可以保留这个节点的引用
};

//（二）empty函数用于删除后代
//1.第一版代码
window.dom.empty1 = function(node) {
  const { childNodes } = node; //const childNodes = node.childNodes
  const array = [];
  for (let i = 0; i < childNodes.length; i++) {
    //node.childNodes会实时改变啊，长度也会变啊
    dom.remove(childNodes[i]);
    array.push(childNodes[i]);
  }
  return array; //保留这些被删节点的引用
};
//2.第二版代码
window.dom.empty = function(node) {
  const array = [];
  let x = node.firstChild; //让x为第一个孩子 //第一个孩子可能为空格文本节点 //不需要再新得到的删除数组里删去空格，本来就是要删除，你删去文本节点也没啥意义
  while (x) {
    //如果第一个孩子存在
    array.push(dom.remove(node.firstChild)); //删掉第一个孩子，并且推到数组里
    x = node.firstChild; //再让x为新的第一个孩子
  }
  return array;
};

//三、改

//(一)attr函数用于读写一个节点的属性 //重载：根据参数的长度实现不同的效果
window.dom.attr = function(node, name, value) {
  if (arguments.length === 3) {
    node.setAttribute(name, value);
  } //如果输入三个参数，代表是想增加属性
  else if (arguments.length === 2) {
    return node.getAttribute(name);
  } //如果输入两个参数，代表是想查看属性
};

//(二)text函数读写一个节点里的文本内容，会覆盖 //适配
window.dom.text = function(node, string) {
  if (arguments.length === 2) {
    if ("innerText" in node) {
      //很老的IE
      node.innerText = string;
    } else {
      node.textContent = string;
    }
  } else if (arguments.length === 1) {
    if ("innerText" in node) {
      //很老的IE
      return node.innerText;
    } else return node.textContent;
  }
};

//（三）html函数读写一个节点里的html内容，会覆盖
window.dom.html = function(node, string) {
  if (arguments.length === 2) {
    node.innerHTML = string;
  } else if (arguments.length === 1) {
    return node.innerHTML;
  }
};

//(四)style函数读写一个节点的style属性
window.dom.style = function(node, name, value) {
  if (arguments.length === 3) {
    //dom.style(test,'color','red')增加或改color
    node.style[name] = value;
  } else if (arguments.length === 2) {
    if (typeof name === "string") {
      //dom.style(test,'color') 读
      return node.style[name];
    } else if (name instanceof Object) {
      // dom.style(test, {color: "blue" }) 增加或改所有style属性
      for (let key in name) {
        node.style[key] = name[key];
      }
    }
  }
};

//（五）class函数用于增加、删除、检查元素的class属性值
window.dom.class = {
  add(node, className) {
    node.classList.add(className);
  }, //在一个对象里，可以这样声明一个函数 //相当于'add':function (){}
  remove(node, className) {
    node.classList.remove(className);
  },
  has(node, className) {
    return node.classList.contains(className);
  }
};
//(六)on函数用于添加事件监听
window.dom.on = function(node, eventName, fn) {
  node.addEventListener(eventName, fn);
};
//(七)off函数用于删除事件监听
window.dom.off = function(node, eventName, fn) {
  node.removeEventListener(eventName, fn);
};

//四、查
//(一)find函数查看满足选择器的所有元素
window.dom.find = function(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}; //如果有scope就在scop里调用query，没有就在document里调用query

//(二)parent函数找一个节点的爸爸
window.dom.parent = function(node) {
  return node.parentNode;
};

//(三)children函数找一个节点的儿子  //会实时变化
window.dom.children = function(node) {
  return node.children;
};
//(四)siblings函数找一个节点的所有兄弟姐妹
window.dom.siblings = function(node) {
  return Array.from(node.parentNode.children).filter(n => n !== node); //把伪数组变成数组，在用filter过滤，选择不是node本身的节点
};
//(五)next函数找一个节点的弟弟
window.dom.next1 = function(node) {
  return node.nextElementSibling;
};

window.dom.next = function(node) {
  let x = node.nextSibling; //把节点的弟弟叫做x
  while (x && x.nodeType === 3) {
    //如果x存在，而且他是文本节点
    x = x.nextSibling; //就让他的弟弟成为新x
  } //直到x不存在或者x不是文本节点就可以停下了
  return x;
};
//(六)previous函数找一个节点的哥哥
window.dom.previous = function(node) {
  let x = node.previousSibling; //把节点的哥哥叫做x
  while (x && x.nodeType === 3) {
    //如果x存在，而且他是文本节点
    x = x.previousSibling; //就让他的哥哥成为新x
  } //直到x不存在或者x不是文本节点就可以停下了
  return x;
};
//(七)each函数遍历范围内所有节点，执行自写函数
window.dom.each = function(nodeList, fn) {
  for (i = 0; i < nodeList.length; i++) {
    fn.call(null, nodeList[i]);
  }
};

//(八)index函数用于获取一个节点排行老几
window.dom.index = function(node) {
  const list = dom.children(node.parentNode); //因为会实时变化，所以就先把他固定起来
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === node) {
      break;
    }
  }
  return i;
};
