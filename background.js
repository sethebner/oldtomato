chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ "state": "OFF" }, function(){});
});

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = (await chrome.storage.local.get('state')).state;
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    var path;
    if (nextState === 'ON')
    {
	path = 'icons/icon128.png';
    }
    else if (nextState === 'OFF')
    {
	path = 'icons/icon128gs.png';
    }
    chrome.action.setIcon({path});

    await chrome.storage.local.set({'state': nextState});

    await chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tab.id, {
            "message": "state",
            "value": nextState
        });
    });
});
