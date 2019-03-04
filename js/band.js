/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

    function css(node,type,val){
        if(arguments.length >= 3){
            //设置操作
            var text ="";
            if(!node.transform){
                node.transform ={}
            }
            node.transform[type] = val;

            for(var item in node.transform){
                switch (item)  {
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        text+= item+"("+node.transform[item]+"px)";
                        break;

                    case "rotateX":
                    case "rotateY":
                    case "rotateZ":
                    case "rotate":
                        text+= item+"("+node.transform[item]+"deg)";
                        break;

                    case "scale":
                        text+= item+"("+node.transform[item]+")";
                        break;
                }
            }

            node.style.transform = text;
        }else if(arguments.length === 2){
           
            //读取操作  存在transform 就把对象属性值给val 
            val =  node.transform ? node.transform[type] : undefined;
            //对象属性没有值  就给它赋默认值  0  scale为1
            if(val === undefined){
                val = 0;
                if(type === "scale"){
                    val = 1;
                }
            }
            return val;
        }else{
            throw new Error("该函数至少需要2个参数")
        }
    }

    /* harmony default export */ __webpack_exports__["a"] = ({
        css
    });
  



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buss_base_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buss_base_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__buss_base_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buss_head_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buss_head_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__buss_head_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buss_tap_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buss_nav_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_transform_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buss_slide_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buss_sxhp_js__ = __webpack_require__(7);









window.onload = function () {
    // 无缝滑屏
    var arr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
    
    __WEBPACK_IMPORTED_MODULE_5__buss_slide_js__["a" /* default */].course(arr);

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
            var scale1 = __WEBPACK_IMPORTED_MODULE_4__common_transform_js__["a" /* default */].css(this, "translateY") / (this.offsetHeight - wrap.clientHeight);
            var scrollY = scale1 * (document.documentElement.clientHeight - scrollBar.offsetHeight);
            __WEBPACK_IMPORTED_MODULE_4__common_transform_js__["a" /* default */].css(scrollBar, "translateY", -scrollY);
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
    __WEBPACK_IMPORTED_MODULE_6__buss_sxhp_js__["a" /* default */].move(callBack);
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {


    /*----------------------rem适配------------------*/
    var styleNode = document.createElement("style");
    var w = document.documentElement.clientWidth/16;
    styleNode.innerHTML = "html{font-size:"+w+"px;!important;}"
    document.head.appendChild(styleNode);
    /*--------------------------适配end------------------------------*/

    /*---------------禁止默认行为--------------------*/
    var wrap = document.querySelector("#wrap");
    wrap.addEventListener("touchstart", function (ev) {
        ev = ev || event;
        ev.preventDefault();
    });

    var flag = false;//默认没有划过
    var aNode = document.querySelectorAll("a");
    for (var i = 0; i < aNode.length; i++) {
        aNode[i].addEventListener("toouchmove", function () {
            flag = true;

        });
        aNode[i].addEventListener("touchend", function (ev) {
            ev = ev || event;
            if (!flag) {
                //当没有划过的时候  让页面跳转.
                location.href = this.href;
            }
            flag = false;
        });
    }
    /*---------------禁止默认行为end--------------------*/



/***/ }),
/* 3 */
/***/ (function(module, exports) {


    var btn = document.querySelector("#wrap > .head .head-top .btn");
    var mask = document.querySelector("#wrap > .head .mask");
    var wrap = document.querySelector("#wrap");
    var input = document.querySelector("#wrap > .head .head-bottom form > input[type='text']");
    var aNodes = document.querySelectorAll("#wrap > .head .head-top .btns > a");
    var headBottom = document.querySelector("#wrap > .head .head-bottom");
    //控制遮罩层逻辑
    var  flag = false;//控制遮罩层有无  false代表无
    btn.addEventListener("touchstart",function(ev){
        ev = ev || event;
        if(!flag){
            this.classList.add("active");
            mask.classList.add("active");

        }else{
            this.classList.remove("active");
            mask.classList.remove("active");
        }
        flag = !flag;
        // console.log(flag+"1");
        ev.stopPropagation();//阻止冒泡
    });
   
    wrap.addEventListener("touchstart",function(ev){
        //当有遮罩层时  点击屏幕其他位置时  遮罩层消失
        if(flag){
            btn.classList.remove("active");
            mask.classList.remove("active");
            flag = !flag;
        }
        // console.log(flag);
    });

    //因为给wrap绑定了 touchstart事件清除遮罩层  
    //所以在出现遮罩层时  如果点击遮罩层  也会让遮罩层消失
    //这时需要给遮罩层绑定事件  阻止冒泡
    mask.addEventListener("touchstart",function(ev){
        ev = ev || event;
        ev.stopPropagation();//阻止冒泡
    });

    //因为在base.js  中禁止了事件的默认行为  
    //所以当点击input输入框时   没法获取焦点  
    //需要手动获取焦点   和手动让它失去焦点
    input.addEventListener("touchstart",function(ev){
        ev = ev || event;
        this.focus();//input获取焦点
        ev.stopPropagation();//阻止冒泡
    });

    wrap.addEventListener("touchstart",function(){
        input.blur();
    });

    //搜索按钮点击弹出搜索框
    aNodes[0].addEventListener("touchstart",function(){
        console.log("sou");
        headBottom.style.display = "block";
    });


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_transform_js__ = __webpack_require__(0);
    
    
    //拿到一个tap的包裹元素  为了获取一个包裹区域的宽度
    var wrap = document.querySelector(".tap-wrap ");
    //所有的滑屏元素   也是滑屏区域
    var contentNodes = document.querySelectorAll(".tap-wrap > .tap-content");
    var loadings = document.querySelectorAll(".tap-wrap > .tap-content >.loading");//拿到页面上的所有loading
    

    for (var i = 0; i < contentNodes.length; i++) {
        contentNodes[i].indexG = 0;
        move(contentNodes[i]);
    }
    //让所有loading的高度等于它对应的一个 contentNode的高度 
    //注意:存在页面渲染问题  可能loading的高度小于contentNode的高度  需要加一个定时器
    setTimeout(function(){
        for(var i = 0; i < loadings.length; i++){
            loadings[i].style.height = loadings[i].parentNode.querySelector(".list").offsetHeight+"px";
        }
    },200);
   

    function move(contentNode) {
        //clientWidth 和offsetWidth 区别 显示主体内容
        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX", -wrap.clientWidth);

        var eleStart = { x: 0, y: 0 };//元素一开始的位置
        var startPoint = { x: 0, y: 0 };//手指一开始的位置
        var dis = { x: 0, y: 0 }; //手指移动的距离

        //防抖动
        var isX = true;
        var isFirst = true;
        contentNode.addEventListener("touchstart", function (ev) {
            //loading加载完成之前  禁止滑屏操作
            if( contentNode.isJump){
                return;
            }
            ev = ev || event;
            contentNode.style.transition="";
            var touchC = ev.changedTouches[0];
            eleStart.x = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX");
            eleStart.y = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateY");
            startPoint.x = touchC.clientX;
            startPoint.y = touchC.clientY;

            //每次touchstart 重置isX isFirst
            isX = true;
            isFirst = true;
        });
        contentNode.addEventListener("touchmove", function (ev) {
            //二分之一滑屏之后  禁止滑屏操作
            if( contentNode.isJump){
                return;
            }
            //二次以后防抖动
            if (!isX) {
                return;
            }

            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var nowPoint = { x: 0, y: 0 };//元素当前位置
            nowPoint.x = touchC.clientX;
            nowPoint.y = touchC.clientY;
            dis.x = nowPoint.x - startPoint.x;
            dis.y = nowPoint.y - startPoint.y;

            //首次防抖动
            if (isFirst) {
                isFirst = false;
                if(Math.abs(dis.y) >Math.abs(dis.x) ){
                    isX = false;
                    return ;
                }
            }
            __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX", eleStart.x + dis.x);
            jump(dis,contentNode);
        });
        contentNode.addEventListener("touchend", function (ev) {
            ev = ev || event;
            //当滑动的距离没有超过1/2时  回到原始的位置
            if(Math.abs(dis.x) <=(wrap.clientWidth/2)){
                contentNode.style.transition="1s transform";
                __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX", -wrap.clientWidth);
            }
        });

        //二分之一跳转函数
        function jump(dis,contentNode){
            // 二分之一滑屏范围
            if(Math.abs(dis.x) >(wrap.clientWidth/2)){
                contentNode.isJump = true;
                if (dis.x > 0) {
                    //向右划
                    contentNode.style.transition="1s transform";
                    __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX", 0);
                } else if (dis.x < 0) {
                    //向左划
                    contentNode.style.transition="1s transform";
                    __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode, "translateX", -2 * wrap.clientWidth);
                }
                var loadingTwo = contentNode.querySelectorAll(".loading");
                var aNodes = contentNode.parentNode.querySelectorAll(".tap-nav a");
                var smallG = contentNode.parentNode.querySelector(".tap-nav .smallG")
                
                //dom2事件  解绑
                contentNode.addEventListener("transitionend",end);
                function end(){
                    //解绑
                    contentNode.removeEventListener("transitionend",end);

                    //每次二分之一滑屏 位置切换之后把loading的opacity设置为1
                    for(var i=0;i<loadingTwo.length;i++){
                        loadings[i].style.opacity=1;
                    }

                    //小绿条  每次transition完成之后  
                    dis.x >0 ? contentNode.indexG --:contentNode.indexG ++;
                    //控制小绿条移动的范围
                    if(contentNode.indexG <0){
                        contentNode.indexG = aNodes.length-1;
                    }else if(contentNode.indexG > aNodes.length-1){
                        contentNode.indexG = 0;
                    }
                    // console.log(contentNode.indexG);
                    smallG.style.width = aNodes[contentNode.indexG].offsetWidth+"px";
                    __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(smallG, "translateX", aNodes[contentNode.indexG].offsetLeft);

                    //每次loading加载完成的之后 重置contentNode.isIump=false
                    //setTimeout  模拟数据加载  arr数组模拟数据传递
                    setTimeout(function(){
                        var arr = [
                                   ["./img/a.jpg","./img/b.jpg","./img/c.jpg","./img/d.jpg","./img/e.jpg","./img/f.jpg"],
                                   ["./img/2/a2.jpg","./img/2/b2.png","./img/2/c2.png","./img/2/d2.png","./img/2/e2.jpg","./img/2/f2.jpg"],
                                   ["./img/a.jpg","./img/b.jpg","./img/c.jpg","./img/d.jpg","./img/e.jpg","./img/f.jpg"],
                                   ["./img/2/a2.jpg","./img/2/b2.png","./img/2/c2.png","./img/2/d2.png","./img/2/e2.jpg","./img/2/f2.jpg"],
                                   ["./img/a.jpg","./img/b.jpg","./img/c.jpg","./img/d.jpg","./img/e.jpg","./img/f.jpg"],
                                   ["./img/2/a2.jpg","./img/2/b2.png","./img/2/c2.png","./img/2/d2.png","./img/2/e2.jpg","./img/2/f2.jpg"]
                                 ];
                       

                        var imgs = contentNode.querySelectorAll("img");
                        for(var i=0;i<imgs.length;i++){
                            imgs[i].src = arr[contentNode.indexG][i];
                        }
                        //图片加载完成后立马将元素拉回来
                        contentNode.style.transition = "";
                        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(contentNode,"translateX",-wrap.clientWidth);

                        //让整个滑屏元素可以继续滑动
                        contentNode.isJump = false;
                    },2000);
                }
            }
        }
    }


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_transform_js__ = __webpack_require__(0);
    
    
    var nav = document.querySelector("#wrap > .content  .nav");
    var list = document.querySelector("#wrap > .content .nav >.list");

    var eleStartX = 0;//元素一开始的位置
    var startX = 0;//手指一开始的位置

    //精确快速滑屏
    var lastPoint = 0;//精确手指一开始的位置
    var lastTime = 0;
    var speed = 0;
    var disPoint = 0;
    var disTime = 0;

    var minX = nav.clientWidth - list.offsetWidth;//包裹容器的宽度-移动元素的宽度 元素的最小位置
    nav.addEventListener("touchstart", function (ev) {
        ev = ev || event;
        list.style.transition = "none"; //橡皮筋效果清除transtion
        eleStartX = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX");
        startX = ev.changedTouches[0].clientX;

        lastPoint = ev.changedTouches[0].clientX;//精确手指一开始的位置
        lastTime = new Date().getTime();//一开始触屏时时间
        list.touchMove = false;
         //速度越要重置    只点击不移动  元素也会动   BUG1
         disPoint =0;
         disTime = 1; 
         //不能设为disTime = 0; 0/0 结果为NaN  会导致fast方法里面的targetX为NaN 鼠标点击之后再划就划不动 BUG2
        // lastTime = 0;
    });
    nav.addEventListener("touchmove", function (ev) {
        ev = ev || event;
        var nowX = ev.changedTouches[0].clientX;//手指当前位置
        var disX = nowX - startX;
        var translateX = eleStartX + disX;//元素最终的位置


        //橡皮筋效果
        var nowPoint = ev.changedTouches[0].clientX;//精确手指当前位置
        disPoint = nowPoint - lastPoint;//精确手指一次touchmove移动的距离
        var nowTime = new Date().getTime();//获取当前时间
        disTime = nowTime - lastTime;
        // console.log(disPoint);
        lastPoint = nowPoint;//更新精确的手指一开始的位置
        lastTime = nowTime;


        //手动橡皮筋效果 让每次手指移动的距离越来越小
        var scale = 0;
        if (translateX > 0) {
            list.touchMove = true;
            scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + translateX) * 2);//越来越小的比例
            translateX = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX") + disPoint * scale;
        } else if (translateX < minX) {
            list.touchMove = true;
            var over = minX - translateX;
            scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + over) * 2);//越来越小的比例
            translateX = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX") + disPoint * scale;
        }

        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX", translateX);
    });
    nav.addEventListener("touchend", function (ev) {
        ev = ev || event;
        
        //实现橡皮筋效果
        var index = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX");

        if (!list.touchMove) {
            //快速滑屏  + 快速滑屏橡皮筋
            fast();
        } else {
            //手动滑屏橡皮筋  范围限制
            var index = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX");
            if (index > 0) {
                index = 0;
            } else if (index < minX) {
                index = minX;
            }
            list.style.transition = "1s transform";
            __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX", index);
        }




    });

    //快速滑屏方法
    function fast() {
        speed = disPoint / disTime;  //滑屏速度
        var index = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX");
        var time = 0;//快速滑屏时间
        speed = (Math.abs(speed)<0.3)?0:speed;//轻轻滑动时 速度设置为0
        var targetX = index + speed * 200;
        time = Math.abs(speed) * 0.2;//控制滑动的越远  所需要的时间就越久
        time = time>2?2:time;
        time = time<0.4?0.5:time;//控制时间在0.5~2之间
        // console.log(speed);
       
        //快速滑屏橡皮筋  + 贝塞尔(出去一点再回来)
        var bsr = "";
        if (targetX > 0) {
            targetX = 0;
            bsr = "cubic-bezier(.09,1.51,.65,1.73)";
        } else if (targetX < minX) {
            targetX = minX;
            bsr = "cubic-bezier(.09,1.51,.65,1.73)";
        }
        list.style.transition = time+"s " + bsr + " transform"; //拉动后归位时 缓慢归位 从而形成橡皮筋效果
        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(list, "translateX", targetX);
    }

    //点击变色   用事件委托来写
    changeColor();
    function changeColor() {
        var liNodes = document.querySelectorAll("#wrap > .content .nav >.list li");
        var list = document.querySelector("#wrap > .content .nav >.list");
        var nav = document.querySelector("#wrap > .content .nav ");
        nav.addEventListener("touchstart", function () {
            nav.isMoved = false;
        });
        nav.addEventListener("touchmove", function () {
            nav.isMoved = true;
        });

        //用事件委托来事件  来实现动态给li添加active
        list.addEventListener("touchend", function (ev) {
            ev = ev || event;
            if (!nav.isMoved) {
                for (var i = 0; i < liNodes.length; i++) {
                    liNodes[i].classList.remove("active");
                }
                // console.log(ev.target);//target 可能是li下面的a标签
                if (ev.target.nodeName.toUpperCase() === "LI") {
                    ev.target.classList.add("active");
                } else if (ev.target.nodeName.toUpperCase() === "A") {
                    ev.target.parentNode.classList.add("active");
                }

            }
        });
    }


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_transform_js__ = __webpack_require__(0);



function course(arr) {
    //页面基本布局
    var wrapC = document.querySelector("#course-wrap");
    if (!wrapC) {
        return;
    }

    //生成html结构
    var wrapC = document.querySelector("#course-wrap");
    var ulNode = document.createElement("ul");
    __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateZ", 0);//3d硬件加速 避免重绘重排
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
            var whichPic = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX") / document.documentElement.clientWidth;
            if (whichPic === 0) {
                whichPic = -wrapP.pointsLength;//第6张
            } else if (whichPic === 1 - arr.length) {
                whichPic = 1 - wrapP.pointsLength;//第5张  图片滑动顺序6 7 8 5
            }
            __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX", whichPic * document.documentElement.clientWidth);//设置点击时图片的初始位置
        }
        eleStartX = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX");//元素初始的位置
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
        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX", eleStartX + disX);
    });
    wrapC.addEventListener("touchend", function (ev) {
        ev = ev || event;

        //动画  不能在css样式里面写死  这样move时也会有延迟
        // ulNode.style.transition = "0.5s left";
        ulNode.style.transition = "0.5s transform linear";

        //index为负值
        index = Math.round(__WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX") / document.documentElement.clientWidth);

        //index 限制滑屏的范围
        if (index > 0) {
            index = 0;
        } else if (index < 1 - arr.length) {
            index = 1 - arr.length;
        }
        //小圆点移动
        pointsMove(index);

        // console.log(index);
        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX", index * document.documentElement.clientWidth);

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
            __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX", index * document.documentElement.clientWidth);
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

        __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(ulNode, "translateX", index * document.documentElement.clientWidth);
    });

}

/* harmony default export */ __webpack_exports__["a"] = ({
    course
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_transform_js__ = __webpack_require__(0);


    function move(callBack) {
        var wrap = document.querySelector("#wrap > .content");
        var content = wrap.children[0];
        var headBottom = document.querySelector("#wrap > .head .head-bottom");

        var eleStart = { x: 0, y: 0 };//元素一开始的位置
        var start = { x: 0, y: 0 };//手指一开始的位置

        //精确快速滑屏
        var lastPoint = 0;
        var lastTime = 0;
        var speed = 0;
        var disPoint = 0;
        var disTime = 0;
        var isY = true;
        var isFirst = true;
        var clearTime = 0;

        //minY 拿到的是静态值(可能在获取时页面还没有渲染完) 需要在使用前动态获取一下 
        var minY = 0;
        setTimeout(function () {
            minY = wrap.clientHeight - content.offsetHeight;//包裹容器的宽度-移动元素的宽度 元素的最小位置
        }, 200);

        wrap.addEventListener("touchstart", function (ev) {
            clearInterval(clearTime);
            ev = ev || event;
            content.style.transition = "none"; //橡皮筋效果清除transtion
            eleStart.y = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY");

            start.y = ev.changedTouches[0].clientY;
            start.x = ev.changedTouches[0].clientX;

            lastPoint = ev.changedTouches[0].clientY;//精确手指一开始的位置
            lastTime = new Date().getTime();//一开始触屏时时间
            content.touchMove = false;

            disPoint = 0;
            disTime = 1;
            isY = true;
            isFirst = true;

            //滚动条逻辑
            //start  是变量 不能用
            if (callBack && (typeof callBack["start"]).toLowerCase() === "function") {
                // this指向    调用者
                callBack["start"].call(content);
            }

        });
        wrap.addEventListener("touchmove", function (ev) {

            //二次防抖動
            if (!isY) {
                return;
            }

            ev = ev || event;
            var now = { x: 0, y: 0 };
            var dis = { x: 0, y: 0 };
            now.y = ev.changedTouches[0].clientY;//手指当前位置
            now.x = ev.changedTouches[0].clientX;//手指当前位置
            dis.y = now.y - start.y;
            dis.x = now.x - start.x;

            var translateY = eleStart.y + dis.y;//元素最终的位置
            //橡皮筋效果
            var nowPoint = ev.changedTouches[0].clientY;//精确手指当前位置
            disPoint = nowPoint - lastPoint;//精确手指一次touchmove移动的距离
            var nowTime = new Date().getTime();//获取当前时间
            disTime = nowTime - lastTime;

            lastPoint = nowPoint;//更新精确的手指一开始的位置
            lastTime = nowTime;

            //首次防抖動
            if (isFirst) {
                isFirst = false;
                if (Math.abs(dis.x) > Math.abs(dis.y)) {
                    isY = false;
                    return;
                }
            }

            //手动橡皮筋效果 让每次手指移动的距离越来越小
            var scale = 0;
            if (translateY > 0) {
                content.touchMove = true;
                scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + translateY) * 2);//越来越小的比例
                translateY = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY") + disPoint * scale;
            } else if (translateY < minY) {
                content.touchMove = true;
                var over = minY - translateY;
                scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + over) * 2);//越来越小的比例
                translateY = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY") + disPoint * scale;
            }

            __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY", translateY);

            // 头部head-bottom消失
            if (__WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY") <= -wrap.clientHeight) {
                headBottom.style.display = "none";
            } else {
                headBottom.style.display = "block";
            }

            //滚动条逻辑
            if (callBack && (typeof callBack["move"]).toLowerCase() === "function") {
                callBack["move"].call(content);
            }
        });
        wrap.addEventListener("touchend", function (ev) {
            ev = ev || event;

            //实现橡皮筋效果
            var index = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY");

            if (!content.touchMove) {
                //快速滑屏  + 快速滑屏橡皮筋
                fast();
            } else {
                //手动滑屏橡皮筋  范围限制
                var index = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY");
                if (index > 0) {
                    index = 0;
                } else if (index < minY) {
                    index = minY;
                }
                content.style.transition = "1s transform";
                __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY", index);
            }

            //滚动条逻辑
            if (callBack && (typeof callBack["end"]).toLowerCase() === "function") {
                callBack["end"]();
            }
        });

        //快速滑屏方法
        function fast() {
            speed = disPoint / disTime;  //滑屏速度
            var indexY = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY");
            var time = 0;//快速滑屏时间
            speed = (Math.abs(speed) < 0.3) ? 0 : speed;//轻轻滑动时 速度设置为0
            speed = speed < -15 ? -15 : speed;
            speed = speed > 15 ? 15 : speed;
            var targetY = indexY + speed * 100;
            time = Math.abs(speed) * 0.2;//控制滑动的越远  所需要的时间就越久
            time = time > 2 ? 2 : time;
            time = time < 0.4 ? 0.5 : time;//控制时间在0.5~2之间
            // console.log(speed);

            //快速滑屏橡皮筋  + 贝塞尔(出去一点再回来)
            // var bsr = "";
            var type = "Linear";
            if (targetY > 0) {
                targetY = 0;
                type = "Back";
            } else if (targetY < minY) {
                targetY = minY;
                type = "Back";
            }
            move(content, targetY, time, type);
        }

        //Tween算法  移动方法
        var Tween = {
            Linear: function (t, b, c, d) { return c * t / d + b; },
            Back: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            }
        };
        function move(node, targetY, time, type) {
            clearInterval(clearTime);
            /*
                t: current time（当前是哪一次）；
                b: beginning value（初始值）；
                c: change in value（变化量）；
                d: duration（总共多少次）。
            */
            var t = 0;
            var b = __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(node, "translateY");
            var c = targetY - b; //targetY代表元素最终的位置
            var d = time * 1000 / (1000 / 60); //整个动画的的时间 /每次动画的时间
            clearTime = setInterval(function () {
                t++;
                if (t > d) {
                    clearInterval(clearTime)
                }
                __WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(node, "translateY", Tween[type](t, b, c, d));

                // 头部head-bottom消失
                if (__WEBPACK_IMPORTED_MODULE_0__common_transform_js__["a" /* default */].css(content, "translateY") <= -wrap.clientHeight) {
                    headBottom.style.display = "none";
                } else {
                    headBottom.style.display = "block";
                }

                //滚动条逻辑
                if (callBack && (typeof callBack["move"]).toLowerCase() === "function") {
                    callBack["move"].call(content);
                }
            }, 1000 / 60);
        }

    }

    /* harmony default export */ __webpack_exports__["a"] = ({
        move
    });


/***/ })
/******/ ]);