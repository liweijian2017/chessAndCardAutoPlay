"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dm_1 = require("./dm");
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 120) { // 按 F9
        // 开始辅助
        dm_1.gameBegin();
        dm_1.init();
    }
    if (e && e.keyCode == 121) { // 按 F10
        // 停止辅助
        dm_1.allStop(true);
    }
};
//# sourceMappingURL=key.js.map