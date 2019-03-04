    
    import transform from "../common/transform.js";
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
        transform.css(contentNode, "translateX", -wrap.clientWidth);

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
            eleStart.x = transform.css(contentNode, "translateX");
            eleStart.y = transform.css(contentNode, "translateY");
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
            transform.css(contentNode, "translateX", eleStart.x + dis.x);
            jump(dis,contentNode);
        });
        contentNode.addEventListener("touchend", function (ev) {
            ev = ev || event;
            //当滑动的距离没有超过1/2时  回到原始的位置
            if(Math.abs(dis.x) <=(wrap.clientWidth/2)){
                contentNode.style.transition="1s transform";
                transform.css(contentNode, "translateX", -wrap.clientWidth);
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
                    transform.css(contentNode, "translateX", 0);
                } else if (dis.x < 0) {
                    //向左划
                    contentNode.style.transition="1s transform";
                    transform.css(contentNode, "translateX", -2 * wrap.clientWidth);
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
                    transform.css(smallG, "translateX", aNodes[contentNode.indexG].offsetLeft);

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
                        transform.css(contentNode,"translateX",-wrap.clientWidth);

                        //让整个滑屏元素可以继续滑动
                        contentNode.isJump = false;
                    },2000);
                }
            }
        }
    }
