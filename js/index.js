// 参考文档
// https://zhuanlan.zhihu.com/p/438896257
// https://www.w3cschool.cn/kesyi/kesyi-m5uo24rx.html
// https://www.bookstack.cn/read/chrome/content_scripts.md#match-patterns-globs
// https://github.com/ecmadao/Coding-Guide/blob/master/Notes/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B/Chrome%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91.md#%E4%B8%8D%E5%90%8C%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83js%E4%B9%8B%E9%97%B4%E7%9A%84%E4%BA%A4%E4%BA%92

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