// ==UserScript==
// @name         CC98查询粉丝的变动
// @namespace    http://tampermonkey.net/
// @version      2024-09-13
// @description  to find out how my fans change
// @author       Lay
// @match        https://www.cc98.org/usercenter/myfans
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @license      AGPL -3.0 
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let previousFans = new Set();

    function fetchFans() {
        // 假设粉丝列表在一个特定的元素中
        const fansElements = document.querySelectorAll('.fan-list .fan-name'); // 根据实际情况修改选择器
        const currentFans = new Set();

        fansElements.forEach(element => {
            currentFans.add(element.textContent.trim());
        });

        checkForChanges(currentFans);
        previousFans = currentFans;
    }

    function checkForChanges(currentFans) {
        const addedFans = [...currentFans].filter(fan => !previousFans.has(fan));
        const removedFans = [...previousFans].filter(fan => !currentFans.has(fan));

        if (addedFans.length > 0) {
            alert('新增加的粉丝: ' + addedFans.join(', '));
        }

        if (removedFans.length > 0) {
            alert('减少的粉丝: ' + removedFans.join(', '));
        }
    }

    // 每隔5分钟检查一次（300000毫秒）
    setInterval(fetchFans, 300000);
})();