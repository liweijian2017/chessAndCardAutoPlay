var runBtn = document.getElementById('run');
var ta = document.getElementById('sample');
var turnBtn = document.getElementById('turn');
var gameCostTime = 18;

ta.addEventListener('input', function (e) {
    if (e.data) {
        this.value += ',';
    }
})

turnBtn.addEventListener("click", function () {
    var eProject = document.getElementById('project');
    var eCapital = document.getElementById('capital').value;
    var m = document.getElementById('m').value;

    eProject.value = trun(Number(eCapital), Number(m));
})

runBtn.addEventListener("click", function () {
    var capital = 0;
    var choice = 0;
    var project = [];
    var sample = [];
    var eProject = document.getElementById('project').value;
    var eCapital = document.getElementById('capital');
    var eSample = document.getElementById('sample').value;
    var eChoice = document.getElementById('choice');

    choice = eChoice.value;
    project = eProject.split(",");
    sample = eSample.split(",");

    for (let p = 0; p < project.length; p++) {
        capital += Number(project[p]);
    }
    eCapital.value = capital;

    if (!capital || project.length == 0 || sample.length == 0) {
        alert('请输入正确数据');
        return;
    }


    var data = profit(sample, project, capital, choice);
    var ct = costTime(data[0]);

    var text = '本金：' + capital + '，玩了：' + data[0] + '盘，' +
        '利润：【' + data[1] + '】，花费时间：' + ct + '秒，' + (ct / 60) + ' 分钟,' +
        '最高承受高连：' + (project.length - 1);

    var resArea = document.getElementById('result');
    resArea.value = text;

    var textSampleData = document.getElementById('sampleData');
    var sData = sampleData(sample);
    textSampleData.value = '龙：' + sData[0] + ' ,虎：' + sData[1];
});

// 利润
function profit(sample, project, capital, choice) {
    var tempProfit = 0;
    var tempMissLian = 0;
    for (let i = 0; i < sample.length; i++) {
        if (choice != sample[i]) {
            tempMissLian++;
            if (tempMissLian == project.length) {
                return [i + 1, -capital]; // 爆灯局数
            }
        } else {
            var lianMiss = tempMissLian;
            var missProfit = 0;
            tempMissLian = 0;
            // 连续不中的金额
            for (let k = 0; k < lianMiss; k++) {
                missProfit += Number(project[k]);
            }
            // 中奖利润叠加
            tempProfit = (tempProfit + Number(project[lianMiss]) * 0.95) - missProfit;
        }
    }

    return [sample.length, tempProfit];
}

// 花费时间
function costTime(gamesNum) {
    return gamesNum * 18;
}

// 指定时间可玩多少盘
function calHowManyGamesCanPlay(time) {
    return time * 60 / gameCostTime;
}

// 检测最高连
function findMaxLian(sample) {
    return time * 60 / gameCostTime;
}

// 样本数据分析
function sampleData(sample) {
    var long = 0;
    var hu = 0;

    for (var i = 0; i < sample.length; i++) {
        if (Number(sample[i]) == 0) {
            long++;
        } else {
            hu++;
        }
    }

    return [long, hu]
}

// 本金转方案
function trun(capital, m) {
    var project = [5];

    while (sum(project) < capital) {
        var profit = m;
        var lost = sum(project);
        var newMoney = Math.floor((lost + profit) / 0.95);
        project.push(newMoney + (5 - (newMoney % 5)));
    }

    return project.slice(0, project.length - 1);
}

function sum(arr) {
    var s = 0;
    for (var i = arr.length - 1; i >= 0; i--) {
        s += arr[i];
    }
    return s;
}

var beginBtn = document.getElementById('begin');
beginBtn.addEventListener('click', function () {
    var eProject = document.getElementById('project').value.split(',');
    var eCapital = document.getElementById('capital').value;
    var eSample = document.getElementById('sample').value.split(',');
    runProject(eCapital, eProject, eSample);
})


function runProject(capital, project, sample) {
    var o = Number(capital);
    capital = Number(capital);

    var s1 = document.getElementById('strategy1').value.split(",");
    var s2 = document.getElementById('strategy2').value.split(",");
    var s3 = document.getElementById('strategy3').value.split(",");
    var strategy = s1;

    var result = [];
    var data = sample;
    var chunk = 3; //每3个分一组

    var selectProMoneyIndex = 0;
    var text = '';
    var sss = document.getElementById('success');
    sss.value = ''
    for (var i = 0, j = data.length; i < j; i += chunk) {
        result.push(data.slice(i, i + chunk));
    }

    var stra = 0;

    for (let r = 0; r < result.length; r++) {
        sss.value += '\n*********************';
        sss.value += '\n' + result[r]
        if (stra == 2) {
            stra = 0;
        }

        for (let k = 0; k < strategy.length; k++) {
            // var rd = Math.floor((Math.random() * 3));
            switch (stra) {
                case 0:
                    strategy = s1;
                    break;
                case 1:
                    strategy = s2;
                    break;
                case 2:
                    strategy = s3;
                    break;
                default:
                    strategy = ['1,1,0'];
                    break;
            }

            // 内随机
            // strategy.sort(function () {
            //     return (0.5 - Math.random());
            // })

            sss.value += '\n' + strategy[k]
            if (!result[r][k]) {
                break;
            }

            if (strategy[k] == result[r][k]) {
                // win
                var loseMoney = 0;
                if (!selectProMoneyIndex) {
                    for (let l = 0; l < selectProMoneyIndex; l++) {

                        loseMoney += project(project[selectProMoneyIndex]);
                    }
                }

                capital += Number(project[selectProMoneyIndex]) * 0.95 - (loseMoney);
                selectProMoneyIndex = 0;
                sss.value += '\nwin :' + capital;
            } else {
                // lose
                capital -= Number(project[selectProMoneyIndex]);
                sss.value += '\nlose :' + capital;
                selectProMoneyIndex++;
            }

            if (capital < 200) {
                text = '通关失败';
                break;
            }
        }

        stra++;
    }
}

