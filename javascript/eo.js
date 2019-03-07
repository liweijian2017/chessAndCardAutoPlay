function CLB() {
    var printEle = document.getElementById('print');
    return new ClipboardJS(printEle);
}
// function CLB() {  
//     var printEle = document.getElementById('print');
//     var txt = printEle.getAttribute('data-clipboard-target')
//     if(window.clipboardData){  
//         window.clipboardData.clearData();  
//         window.clipboardData.setData("Text", txt);
//         //alert('复制成功！')
//     }else{
//         //alert('请手动复制！') 
//     }  
// }
exports.CLB = CLB