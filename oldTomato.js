var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return

        for (let i = 0; i < mutation.addedNodes.length; i++) {
            let node = mutation.addedNodes[i]
            if ((node.classList) && (node.classList.contains('player-timedtext-text-container'))) {
                subtitleSpans = node.querySelectorAll('span > span');
                for (let j = 0; j < subtitleSpans.length; j++) {
                    subtitleSpans[j].innerText = subtitleSpans[j].innerText.replace('ultimatum', 'old tomato').replace('Ultimatum', 'Old tomato');
                }
            }
        }
    })
});

chrome.runtime.onMessage.addListener(function(response, sendResponse) {

    if (response.message === 'state') {
        if (response.value === 'ON') {
            console.log('turning on');
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false
            })
        } else if (response.value === 'OFF') {
            console.log('turning off');
            observer.disconnect();
        }
    }
});
