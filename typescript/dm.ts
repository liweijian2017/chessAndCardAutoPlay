import dm = require('dm.dll')
import { FindDir } from 'dm.dll/types/types';
import { clipboard } from './wx';

const five = './img/5.bmp'
const ten = './img/10.bmp'
const mlong = './img/mailong.bmp'
const mhu = './img/maihu.bmp'
const kaishi = './img/kaishi.bmp'
const huying = './img/huying.bmp'
const longying = './img/longying.bmp'
const wx = './img/wx.bmp'
const pro = ["0,1,0", "1,1,1", "1,0,0", "1,0,1", "0,0,1", "1,1,0", "0,0,0"]
const xiazhuPro = [5, 20, 40, 80, 165, 5, 5, 5, 5, 5, 5, 5, 5]

let proIndex = 0
let preSendMoney = 0
let gPreWin = 0
let isWin = 0
let playGames = 0
let recored = []
let myMoney = 650
let pipeicishu = 0
let tempPro = null
let preXiaZhu = 0
let xiazhujine = 5
let loseTimes = 0
let isNewRound = true
let chooseProIndex = 0

// 止损连输盘数
let zhisunNum = 5

// 买了龙还是虎
let maiLH = 0

// 找微信
let fWx = dm.findPic(0, 0, 2000, 2000, wx, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
let isNew = dm.findPic(0, 0, 2000, 2000, kaishi, '101010', 0.9, FindDir.LeftToRightAndBottomToTop)

let fPicPos = dm.findPic(0, 0, 2000, 2000, five, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
let tPicPos = dm.findPic(0, 0, 2000, 2000, ten, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)

let mLongPos = dm.findPic(0, 0, 2000, 2000, mlong, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
let mHuPos = dm.findPic(0, 0, 2000, 2000, mhu, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)

let gameBeginlistener = null
let zhengzaijiesuanlistener = null

let mLongPosX = 0
let mLongPosY = 0
let mHuPosX = 0
let mHuPosY = 0

export function init() {
    mLongPosX = Number((document.getElementById('longX') as any).value)
    mLongPosY = Number((document.getElementById('longY') as any).value)

    mHuPosX = Number((document.getElementById('huX') as any).value)
    mHuPosY = Number((document.getElementById('huY') as any).value)

    gPreWin = 1
    isNewRound = true
    playGames = 0
    //myMoney = Number((document.getElementById('capital') as any).value);
}

export function allStop(isZhisun: boolean) {
    console.log(isZhisun, '打报告')
    clearInterval(gameBeginlistener)
    clearInterval(zhengzaijiesuanlistener)
    let rCode = 2

    // 常规暂停
    if (!isZhisun) {
        rCode = 1

        setTimeout(() => {
            // 重新启动
            init()
            gameBegin()
        }, 60000 * 5);
    }

    // 上报
    report(rCode)
}

function report(code: number) {
    if (!fWx) {
        return
    }

    // 移动鼠标
    moveTo(fWx.x, fWx.y)

    // 点击对话
    lClick(1)

    // 输入代码
    if (code == 1) {
        dm.keyDown(97)
        dm.keyUp(97)
    } else {
        dm.keyDown(98)
        dm.keyUp(98)
    }

    setTimeout(() => {
        // 发送
        dm.keyDown(13)
        dm.keyUp(13)
    }, 800);

    resetPos()
}

export function gameBegin() {
    printEle.innerText = 'waiting........'
    zhisun(loseTimes)
    isFinishTarget()
    clearInterval(zhengzaijiesuanlistener)
    if (gameBeginlistener) {
        clearInterval(gameBeginlistener)
    }

    gameBeginlistener = setInterval(function name() {
        var a = './img/kaishixiazhu.bmp'
        let isNew = dm.findPic(0, 0, 2000, 2000, a, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
        if (isNew) {
            text = text + '\n' + ('开始下注')
            printEle.innerText = text
            kaishixiazhu()
            clearInterval(gameBeginlistener)
        }
    }, 400)
}

function lClick(times: number) {
    for (let i = 0; i < times; i++) {
        setTimeout(function () {
            dm.leftClick();
        }, i * 160);
    }
}

function moveTo(x: number, y: number) {
    dm.moveTo(x, y)
}

function resetPos() {
    dm.moveTo(0, 0)
}

function isNewGame(): boolean {
    let isNew = dm.findPic(0, 0, 2000, 2000, mhu, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
    if (!isNew) {
        return false
    }
    return true
}

function findZhengzaijiesuan() {
    if (zhengzaijiesuanlistener) {
        clearInterval(zhengzaijiesuanlistener)
    }

    zhengzaijiesuanlistener = setInterval(function name() {
        var a = './img/zhengzaijiesuan.bmp'
        let isNew = dm.findPic(0, 0, 2000, 2000, a, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
        if (isNew) {
            text = text + '\n' + ('正在结算')
            text = text + '\n' + ('***************************')
            printEle.innerText = text
            printEle.setAttribute('data-clipboard-text', text)

            //console.log(clipboard())
            text = '...'

            jiesuan()
            clearInterval(zhengzaijiesuanlistener)

        }
    }, 800)
}

function touzhu(target: number, money: number) {
    if (!mLongPosX || !mHuPosX) {
        return
    }

    let tarPos = target == 0 ? [mLongPosX, mLongPosY] : [mHuPosX, mHuPosY]

    // 移动鼠标
    moveTo(tarPos[0], tarPos[1])

    setTimeout(() => {
        // 点击下注
        lClick(money / 5)
    }, 0);

    text = text + '\n' + ('今期下注 ： ' + target + ' **下注金额：' + money)
    printEle.innerText = text
    xiazhujine = money
    preXiaZhu = target
}

function fenxitouzhu(pre: number) {
    text = text + '\n' + ('上期开：' + pre)
    text = text + '\n' + ('上期投注金额：' + xiazhujine)
    printEle.innerText = text
    // 不是打和
    if (pre != 2) {
        // win
        if (preXiaZhu == pre) {
            isFinishTarget()
            let loseMoney = 0;
            if (!loseTimes) {
                for (let l = 0; l < loseTimes; l++) {
                    loseMoney += xiazhuPro[l];
                }
            }

            myMoney += Number(xiazhujine) * 0.95 - (loseMoney);

            loseTimes = 0
            gPreWin = 1
            text = text + '\n' + ('上期赢了')
            printEle.innerText = text
        } else {
            // lose
            gPreWin = 0
            myMoney -= Number(xiazhuPro[loseTimes]);
            loseTimes++
            text = text + '\n' + ('上期输了,连续输的盘数: ' + loseTimes)
            printEle.innerText = text
            zhisun(loseTimes)
        }
    } else {
        gPreWin = 0
        text = text + '\n' + ('上期和,连续输的盘数: ' + loseTimes)
        printEle.innerText = text
        // 止损
        zhisun(loseTimes)
    }

    text = text + '\n' + ('手上的钱: ' + myMoney + ' 盈利：' + (myMoney - 650))
    printEle.innerText = text
    // 和,继续下注额
    xiazhujine = xiazhuPro[loseTimes]

    let takePro = 0
    if (tempPro && pipeicishu > 0) {
        takePro = tempPro[pipeicishu]
        if (pipeicishu == 2) {
            pipeicishu = 0
            // 下一个pro
            chooseProIndex++
            if (chooseProIndex > 2) {
                chooseProIndex = 0
            }
        }

        if (pipeicishu) {
            pipeicishu++
        }
    } else {
        // let index = Math.floor((Math.random() * 7))
        text = text + '\n' + ('取第' + (chooseProIndex + 1) + '个样本匹配')
        printEle.innerText = text
        tempPro = pro[chooseProIndex].split(',')
        takePro = tempPro[pipeicishu]
        pipeicishu++
    }

    // 新的循环从五开始
    if (isNewRound) {
        xiazhujine = 5
    }

    text = text + '\n' + ('tempPro : ' + tempPro + '  takePro:' + takePro)
    printEle.innerText = text
    // doit
    maiLH = Number(takePro)
    touzhu(Number(takePro), xiazhujine)

    // 局数+1
    playGames++

    isNewRound = false

    setTimeout(() => {
        findZhengzaijiesuan()
    }, 2000);
}

function jiesuan() {
    // 上报
    gameBegin()
}

function zhisun(num: number) {
    if (num == zhisunNum) {
        allStop(true)
        return
    }
}

function isFinishTarget() {
    text = text + '\n' + ('已经游戏了' + (playGames) + '局')
    printEle.innerText = text
    if (playGames >= 18 || gPreWin) {
        allStop(false)
        return
    }
}

function kaishixiazhu() {
    clearInterval(gameBeginlistener)

    setTimeout(() => {
        let a = './img/huying.bmp'
        let b = './img/longying.bmp'
        let preWin = 0
        let huWin = dm.findPic(0, 0, 2000, 2000, a, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)
        let longWin = dm.findPic(0, 0, 2000, 2000, b, '222222', 0.9, FindDir.LeftToRightAndBottomToTop)

        if (huWin) {
            preWin = 1
        } else if (longWin) {
            preWin = 0
        } else {
            preWin = 2
        }

        fenxitouzhu(preWin)
    }, 2000);
}

let printEle = document.getElementById('print');
let text = ''

