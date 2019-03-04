
import transform from "../common/transform.js";

function course(arr) {
    //页面基本布局
    var wrapC = document.querySelector("#course-wrap");
    if (!wrapC) {
        return;
    }

    //生成html结构
    var wrapC = document.querySelector("#course-wrap");
    var ulNode = document.createElement("ul");
    transform.css(ulNode, "translateZ", 0);//3d硬件加速 避免重绘重排
    var liNodes = document.querySelectorAll("#course-wrap .list li");
    var wrapP = document.querySelector("#course-wrap .course-point");

    var needWF = wrapC.getAttribute("needWF");
    var needAuto = wrapC.getAttribute("needAuto");
    needWF = (needWF != null) ? true : false;
    needAuto = (needAuto != null) ? true : false;
    //无缝滑屏  判断是否需要 需要就拼接数组  不需要就不拼接
    wrapP.pointsLength = arr.length; //给wrapP绑定一个属性  避免每次调用方法时都需要穿参数 
    if (needWF) {
        //拼接一组图片
        arr = arr.concat(arr);
    }

    //生成图片列表
    ulNode.classList.add("list");

    for (var i = 0; i < arr.length; i++) {
        ulNode.innerHTML += "<li><img src=" + arr[i] + "></li>";
    }
    wrapC.appendChild(ulNode);

    //动态修改css样式   这样写不会发生样式覆盖.
    var styleNode = document.createElement("style");
    styleNode.innerHTML = "#course-wrap .list {width:" + arr.length + "00%;list-style: none;overflow: hidden;}";  //list容器宽度
    styleNode.innerHTML += "#course-wrap .list li{width:" + (100 / arr.length) + "%;list-style: none;overflow: hidden;}";    //每个li元素宽度
    document.head.appendChild(styleNode);



    /* --------------滑屏-------------------------*/
    var eleStartX = 0;//元素一开始的位置
    var startX = 0;//手指一开始的位置
    var startY = 0;//手指一开始的y位置
    var index = 0;//手指抬起时ul的位置
    //防抖动
    var isFirst = true; //判断是否是首次滑屏
    var isX = true;  //是否是x  x轴true   y轴false
    wrapC.addEventListener("touchstart", function (ev) {
        clearInterval(ulNode.timmer);
        ulNode.style.transition = ""; //清除transtion
        ev = ev || event;

        /*无缝逻辑
           点击第一组第一张时 跳到第二组的第一张
           点击第二组最后一张时 跳到第一组的最后一张*/
        if (needWF) {
            var whichPic = transform.css(ulNode, "translateX") / document.documentElement.clientWidth;
            if (whichPic === 0) {
                whichPic = -wrapP.pointsLength;//第6张
            } else if (whichPic === 1 - arr.length) {
                whichPic = 1 - wrapP.pointsLength;//第5张  图片滑动顺序6 7 8 5
            }
            transform.css(ulNode, "translateX", whichPic * document.documentElement.clientWidth);//设置点击时图片的初始位置
        }
        eleStartX = transform.css(ulNode, "translateX");//元素初始的位置
        startX = ev.changedTouches[0].clientX;//手指初始X位置
        startY = ev.changedTouches[0].clientY;//手指初始Y位置
        isFirst = true;
        isX = true;

    });
    wrapC.addEventListener("touchmove", function (ev) {
        //看门狗   防的都是第二次之后的抖动
        if (!isX) {
            return;
        }
        ev = ev || event;
        var nowX = ev.changedTouches[0].clientX;//手指当前位置
        var nowY = ev.changedTouches[0].clientY;//手指当前位置
        var disX = nowX - startX;
        var disY = nowY - startY;
        /*防抖动:
           在轮播图上 如果用户首次滑动的方向是x轴  那轮播图产生抖动是正常的现象
           在轮播图上 如果用户首次滑动的方向是y轴  那竖向页面产生抖动是正常的现象*/

        //判断是否是首次滑屏 

        if (isFirst) {
            isFirst = false;
            if (Math.abs(disX) < Math.abs(disY)) {
                //设置元素move后元素位置
                isX = false;
                return;  //首次在y轴上滑动   首次防抖动
            }
        }
        transform.css(ulNode, "translateX", eleStartX + disX);
    });
    wrapC.addEventListener("touchend", function (ev) {
        ev = ev || event;

        //动画  不能在css样式里面写死  这样move时也会有延迟
        // ulNode.style.transition = "0.5s left";
        ulNode.style.transition = "0.5s transform linear";

        //index为负值
        index = Math.round(transform.css(ulNode, "translateX") / document.documentElement.clientWidth);

        //index 限制滑屏的范围
        if (index > 0) {
            index = 0;
        } else if (index < 1 - arr.length) {
            index = 1 - arr.length;
        }
        //小圆点移动
        pointsMove(index);

        // console.log(index);
        transform.css(ulNode, "translateX", index * document.documentElement.clientWidth);

        //手动滑屏之后继续自动轮播
        if (needAuto && needWF) {
            autoMove(ulNode, index);
        }

    });

    //添加小圆点
    addPoints();

    //当有needWF 和needAuto 时  进行首次自动轮播
    if (needWF && needAuto) {
        autoMove(ulNode, index);
    }

}

//小圆点移动方法
function pointsMove(index) {
    var wrapP = document.querySelector("#course-wrap .course-point");
    if (wrap) {
        var points = wrapP.querySelectorAll("span");
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove("active");
        }
        points[-index % wrapP.pointsLength].classList.add("active");//无缝的时候index需要做处理
    }
}

//添加小圆点方法
function addPoints() {
    var wrapP = document.querySelector("#course-wrap .course-point");
    if (wrapP) {
        for (var i = 0; i < wrapP.pointsLength; i++) {
            if (i == 0) {
                wrapP.innerHTML += '<span class="active"></span>';
            } else {
                wrapP.innerHTML += "<span></span>";
            }

        }
    }
}

//自动轮播方法
function autoMove(ulNode, index) {
    var wrapP = document.querySelector("#course-wrap .course-point");
    move();
    function move() {
        //setInterval   需要一用一个函数包裹起来  方便再次开启
        clearInterval(ulNode.timmer);
        ulNode.timmer = setInterval(function () {
            index--;
            ulNode.style.transition = "0.7s transform linear";
            transform.css(ulNode, "translateX", index * document.documentElement.clientWidth);
            //  console.log(transform.css(ulNode, "translateX"));
            //小圆点移动
            pointsMove(index);

        }, 1000);
    }
    //当滑动到最后一张时需要跳到第五张  这时是瞬间完成  不能有过渡
    ulNode.addEventListener("transitionend", function () {
        //index从-1到-9   然后是从-5到-9
        // console.log(index);
        if (index <= 1 - wrapP.pointsLength * 2) {
            index = 1 - wrapP.pointsLength;
            ulNode.style.transition = "";
        }

        transform.css(ulNode, "translateX", index * document.documentElement.clientWidth);
    });

}

export default {
    course
}
