    
    import transform from "../common/transform.js";
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
        eleStartX = transform.css(list, "translateX");
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
            translateX = transform.css(list, "translateX") + disPoint * scale;
        } else if (translateX < minX) {
            list.touchMove = true;
            var over = minX - translateX;
            scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + over) * 2);//越来越小的比例
            translateX = transform.css(list, "translateX") + disPoint * scale;
        }

        transform.css(list, "translateX", translateX);
    });
    nav.addEventListener("touchend", function (ev) {
        ev = ev || event;
        
        //实现橡皮筋效果
        var index = transform.css(list, "translateX");

        if (!list.touchMove) {
            //快速滑屏  + 快速滑屏橡皮筋
            fast();
        } else {
            //手动滑屏橡皮筋  范围限制
            var index = transform.css(list, "translateX");
            if (index > 0) {
                index = 0;
            } else if (index < minX) {
                index = minX;
            }
            list.style.transition = "1s transform";
            transform.css(list, "translateX", index);
        }




    });

    //快速滑屏方法
    function fast() {
        speed = disPoint / disTime;  //滑屏速度
        var index = transform.css(list, "translateX");
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
        transform.css(list, "translateX", targetX);
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
