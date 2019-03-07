import { init, gameBegin, allStop } from "./dm"

document.onkeydown = function (event) {

    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e && e.keyCode == 120) { // 按 F9
        // 开始辅助
        gameBegin()
        init()
    }

    if (e && e.keyCode == 121) { // 按 F10
        // 停止辅助
        allStop(true)
    }
}
