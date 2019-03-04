
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
