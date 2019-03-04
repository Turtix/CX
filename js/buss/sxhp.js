
import transform from "../common/transform.js";
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
            eleStart.y = transform.css(content, "translateY");

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
                translateY = transform.css(content, "translateY") + disPoint * scale;
            } else if (translateY < minY) {
                content.touchMove = true;
                var over = minY - translateY;
                scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + over) * 2);//越来越小的比例
                translateY = transform.css(content, "translateY") + disPoint * scale;
            }

            transform.css(content, "translateY", translateY);

            // 头部head-bottom消失
            if (transform.css(content, "translateY") <= -wrap.clientHeight) {
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
            var index = transform.css(content, "translateY");

            if (!content.touchMove) {
                //快速滑屏  + 快速滑屏橡皮筋
                fast();
            } else {
                //手动滑屏橡皮筋  范围限制
                var index = transform.css(content, "translateY");
                if (index > 0) {
                    index = 0;
                } else if (index < minY) {
                    index = minY;
                }
                content.style.transition = "1s transform";
                transform.css(content, "translateY", index);
            }

            //滚动条逻辑
            if (callBack && (typeof callBack["end"]).toLowerCase() === "function") {
                callBack["end"]();
            }
        });

        //快速滑屏方法
        function fast() {
            speed = disPoint / disTime;  //滑屏速度
            var indexY = transform.css(content, "translateY");
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
            var b = transform.css(node, "translateY");
            var c = targetY - b; //targetY代表元素最终的位置
            var d = time * 1000 / (1000 / 60); //整个动画的的时间 /每次动画的时间
            clearTime = setInterval(function () {
                t++;
                if (t > d) {
                    clearInterval(clearTime)
                }
                transform.css(node, "translateY", Tween[type](t, b, c, d));

                // 头部head-bottom消失
                if (transform.css(content, "translateY") <= -wrap.clientHeight) {
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

    export default{
        move
    }
