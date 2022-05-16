const questionListCls = '.zh-general-list';
const questionItemCls = '.zm-profile-section-item';
const unfollowBtnCls = '.follow-link.zg-unfollow'
const questionTitleCls = '.question_link';

const questionIdExpr = /\/([0-9]+)/i;
const waitInterval = 2000;
const namespace = '_chrome_plugin_zhihuclean';
const autoCleanKey = 'auto_clean';

const unfollowQuestion = () => {
    let questionId = '';
    const questionList = document.querySelector(questionListCls) || {};
    const questionItems = questionList.querySelectorAll(questionItemCls);
    
    // 获取的问题数量为0，退出清空
    if (questionItems.length === 0) {
        localStorage.setItem(namespace, autoCleanKey, false);
        return false;
    }

    questionItems.forEach((question) => {
        const questionLink = question.querySelector(questionTitleCls);
        const title = questionLink.innerHTML;
        const id = (questionLink.getAttribute('href') || '').match(questionIdExpr)?.[1] || 0;
        const btnNode = question.querySelector(unfollowBtnCls);
        
        if (btnNode) {
            btnNode.click();
        }

        if (id) {
            questionId += `${id}/`;
        }
    });

    // 每2s刷新页面，继续取消
    setTimeout(() => {
        localStorage.setItem(namespace, autoCleanKey, true);
        location.reload();
    }, waitInterval);
};

const shallContinueClean = localStorage.getItem(namespace, autoCleanKey);
if (shallContinueClean) {
    unfollowQuestion();   
}

// 手动开启取消关注
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        const questionIds = unfollowQuestion();
        if (request.action == "clean") {
            sendResponse({ message: questionIds });
        }
    }
);