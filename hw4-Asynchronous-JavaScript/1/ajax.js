function addClass(node, name) {
    node.className += ' ' + name;
}

function removeClass(node, name) {
    node.className = node.className.replace(name, "");
}

function hasClass(node, name) {
    return node.className.indexOf(name) != -1;
}

window.onload = function() {
    var title = document.getElementById("control-ring").getElementsByTagName("li");

    init();

    //封装ajax
    function ajax(callback) {
        var oAjax = null;
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        oAjax.open('GET', '/', true);
        //OnReadyStateChange事件
        oAjax.onreadystatechange = function() {
            //成功则回调
            if (oAjax.readyState == 4)
            callback(oAjax.responseText);
        };
        oAjax.send();
    }

    //为每个按钮绑定click
    for (var i = title.length - 1; i >= 0; i--) {
        title[i].onclick = function() {
            var that = this;
            var f = function() {
                //若灭活,无效
                if (hasClass(that, "disable")) {
                    return 1;
                }

                for (var i = title.length - 1; i >= 0; i--) {
                    addClass(title[i], "disable");
                }
                //回调函数
                function callback(responseText) {
                    s.innerHTML = responseText;

                    //得到数字后激活其他未按的按钮
                    var check = false;
                    for (var i = title.length - 1; i >= 0; i--) {
                        if (title[i] != that && title[i].getElementsByTagName("span")[0].hidden === true) {
                            removeClass(title[i], "disable");
                            check = true;
                        }
                    }
                    //检查是否已经全部获得数字
                    if (check === false) {
                        removeClass(document.getElementById("info-bar"), /disable/g);
                        addClass(document.getElementById("info-bar"), "enable");
                    }
                }

                //显示小红点
                var s = that.getElementsByTagName("span")[0];
                s.hidden = false;
                ajax(callback);

            };
            return f();
        };

    }

    //初始化
    function init() {
        var bigcircle = document.getElementById("info-bar");
        removeClass(bigcircle, /enable/g);
        removeClass(bigcircle, /disable/g);
        addClass(bigcircle, "disable");
        bigcircle.getElementsByTagName("span")[0].innerHTML = "";
        bigcircle.onclick = function() {
            if (this.className.indexOf("enable") == -1)
            return;
            var number = 0;
            for (var i = reddot.length - 1; i >= 0; i--) {
                number += parseInt(reddot[i].innerHTML);
            }
            this.getElementsByTagName("span")[0].innerHTML = number;
            removeClass(bigcircle, /enable/g);
            addClass(bigcircle, "disable");

        };

        var reddot = document.getElementById("control-ring").getElementsByTagName("span");
        for (var i = reddot.length - 1; i >= 0; i--) {
            reddot[i].hidden = true;
            reddot[i].innerHTML = "...";

        }
        var title = document.getElementById("control-ring").getElementsByTagName("li");
        for (var i = title.length - 1; i >= 0; i--) {
            removeClass(title[i], /disable/g);
            removeClass(title[i], /enable/g);
            addClass(title[i], "enable");
        }

    }

    //离开清除状态
    document.getElementById("at-plus-container").onmouseenter = function(e) {
        init();
    };


};