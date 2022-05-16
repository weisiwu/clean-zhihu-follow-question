// 参考文档
// https://zhuanlan.zhihu.com/p/438896257
// https://www.w3cschool.cn/kesyi/kesyi-m5uo24rx.html
// https://www.bookstack.cn/read/chrome/content_scripts.md#match-patterns-globs

// 3、 重复操作，直到页面最后无关注问题

const btnNode = document.getElementById('cleanBtn');
const progressNode = document.getElementById('progress');
const numNode = document.getElementById('totalNum');

chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装");
});

// 先到旧版关注问题列表下，插件才能生效
const initPlugin = () => {
    if (btnNode) {
        btnNode.addEventListener('click', () => {
            chrome.tabs.getSelected(null, function (tab) {//获取当前tab
                //向tab发送请求
                chrome.tabs.sendRequest(tab.id, { action: "clean" }, function (response) {
                });
            });
        });
    }
}

initPlugin();