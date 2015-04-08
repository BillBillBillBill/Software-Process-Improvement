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
    var at = document.getElementById("at-plus-container");

    at.onclick = function() {

        var array = ['A', 'B', 'C', 'D', 'E'];
        var number = 0;
        //封装ajax
        function ajax(number) {

            if (document.getElementById("showorder") === null) {
                var p = document.createElement("p");
                p.innerHTML = "按键顺序:";
                p.id = "showorder";
                document.getElementById("info-bar").appendChild(p);
            }
            //防止再次点击
            if (hasClass(title[number], "disable"))
                return;
            document.getElementById("showorder").innerHTML += array[number];
            title[number].getElementsByTagName("span")[0].hidden = false;
            for (var i = title.length - 1; i >= 0; i--) {
                addClass(title[i], "disable");
            }

            var oAjax = null;
            var n = number;
            if (window.XMLHttpRequest) {
                oAjax = new XMLHttpRequest();
            } else {
                oAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }
            oAjax.open('GET', '/', true);
            //OnReadyStateChange事件
            oAjax.onreadystatechange = function() {
                that = title[n];
                //成功则回调
                if (oAjax.readyState == 4) {
                    var s = that.getElementsByTagName("span")[0];
                    s.innerHTML = oAjax.responseText;
                    //检查是否全都点过了
                    //得到数字后激活其他未按的按钮
                    var check = false;
                    for (var i = title.length - 1; i >= 0; i--) {
                        if (title[i] != that && title[i].getElementsByTagName("span")[0].hidden === true) {
                            removeClass(title[i], "disable");
                            check = true;
                        }
                    }
                    if (check === false) {
                        removeClass(document.getElementById("info-bar"), /disable/g);
                        addClass(document.getElementById("info-bar"), "enable");
                        //添加顺序说明
                        document.getElementById("info-bar").click();
                        return;
                    }
                    var next;
                    //选一个还未点过的按钮
                    while (true) {
                        var rand = Math.floor(Math.random() * title.length);
                        if (title[rand].getElementsByTagName("span")[0].hidden === true) {
                            next = rand;
                            break;
                        }
                    }
                    ajax(next);
                }
            };
            // onready end
            oAjax.send();

        }
        ajax(Math.floor(Math.random() * title.length));

    };
    //at.onclick end

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

                //灭活其他按钮
                for (var i = title.length - 1; i >= 0; i--) {
                    addClass(title[i], "disable");
                }
                //回调函数
                function callback(responseText) {
                    s.innerHTML = responseText;
                    //检查是否全都点过了
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
        if (document.getElementById("showorder") !== null)
        document.getElementById("info-bar").removeChild(document.getElementById("showorder"));
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

    //鼠标移除清除状态
    document.getElementById("at-plus-container").onmouseenter = function(e) {
        init();
    };

};