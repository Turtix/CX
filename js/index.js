
import base from "./buss/base.js";
import head from "./buss/head.js";
import tap from "./buss/tap.js";
import nav from "./buss/nav.js";

import transform from "./common/transform.js";
import slide from "./buss/slide.js";
import sxhp from "./buss/sxhp.js";
window.onload = function () {
    // 无缝滑屏
    var arr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
    
    slide.course(arr);

    //滚动条
    /* 滚动条的高度 / 视口的高度 = 视口的高度 / 整个内容区的高度
    滚动条的高度 = (视口的高度 / 整个内容区的高度)   *视口的高度*/
    var scrollBar = document.querySelector("#wrap .bar");
    var wrap = document.querySelector("#wrap >.content");//包裹容器
    var content = wrap.children[0];//滑屏元素

    var scale = 0;
    setTimeout(function () {
        scale = wrap.clientHeight / content.offsetHeight;
        scrollBar.style.height = scale * document.documentElement.clientHeight + "px";
    }, 200);


    //滚动条逻辑
    var callBack = {
        start: function () {
            scrollBar.style.opacity = 1;
        },
        move: function () {
            scrollBar.style.opacity = 1;
            // 滚动条位移的实时距离 / 滚动条位移的最大距离 = 内容区位移的实时距离 / 内容区位移的最大距离
            // 滚动条位移的实时距离 = (内容区位移的实时距离 / 内容区位移的最大距离) * 滚动条位移的最大距离
            var scale1 = transform.css(this, "translateY") / (this.offsetHeight - wrap.clientHeight);
            var scrollY = scale1 * (document.documentElement.clientHeight - scrollBar.offsetHeight);
            transform.css(scrollBar, "translateY", -scrollY);
        },
        end: function () {
            //手动滑屏
            scrollBar.style.opacity = 0;
        },
        over: function () {
            //自动滑屏
            scrollBar.style.opacity = 0;
        }
    };
    sxhp.move(callBack);
}