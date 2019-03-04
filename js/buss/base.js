
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

