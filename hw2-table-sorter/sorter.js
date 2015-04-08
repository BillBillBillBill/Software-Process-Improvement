"use strict";

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortalbe(tables);
};

//嵌入的话用下面两行..
// var tables = getAllTables();
// makeAllTablesSortalbe(tables);
function getAllTables() {
    return document.getElementsByTagName("table");
}


function makeAllTablesSortalbe(tables) {
    for (var i = 0; i < tables.length; i++)
        makeSort(tables[i]);
}

//让列表变得可排序
function makeSort(table) {
    var th = table.getElementsByTagName("th");
    for (var i = 0; i < th.length; i++) {
        //绑定按钮事件
        th[i].onclick = function () {
            var index = 0;
            changeStyle(th, this);
            //找出索引值
            for (var j = 0; j < th.length; j++) {
                if (this == th[j])
                    index = j;
            }
            sortByTh(table, index, this.className);
        };
    }
}

//改变样式
function changeStyle(th, t) {
    for (var i = 0; i < th.length; i++) {

        if (th[i] == t) {

            if (th[i].className.indexOf("descend") != -1 )
                th[i].className = th[i].className.replace("descend", "ascend");
            else if (th[i].className.indexOf("ascend") != -1 )
                th[i].className = th[i].className.replace("ascend", "descend");
            else
                th[i].className += " descend";

        } else {
            th[i].className = th[i].className.replace("descend", "");
            th[i].className = th[i].className.replace("ascend", "");
        }
    }
}

//排序
function sortByTh(table, index, className) {
    var action = className.indexOf("descend") != -1 ? "descend" : "ascend";
    var array = [];
    for (var i = 1; i < table.getElementsByTagName("tr").length; i++) {
        array[i-1] = table.getElementsByTagName("tr")[i];
    }
    array.sort(function (a, b) {
        //升序
        if (action == 'descend') {
            return a.cells[index].innerHTML <= b.cells[index].innerHTML;
        } else {
        //降序
            return a.cells[index].innerHTML >= b.cells[index].innerHTML;
        }
    });

    for (var i = 0; i < array.length; i++)
        table.getElementsByTagName("tbody")[0].appendChild(array[i]);
}

