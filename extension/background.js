
let rules = [
    {
        "id": 1,
        "priority": 3,
        "action": {
            "type": "redirect",
            "redirect": {
                "regexSubstitution": `http://127.0.0.1:8080/SendSignInSmsCode`
            }
        },
        "condition": {
            "regexFilter": "^https://api.youpin898.com/api/user/Auth/SendSignInSmsCode(.*)",
            "resourceTypes": [
                "xmlhttprequest"
            ]
        }
    },
    {
        "id": 2,
        "priority": 3,
        "action": {
            "type": "redirect",
            "redirect": {
                "regexSubstitution": `http://127.0.0.1:8080/SmsSignIn`
            }
        },
        "condition": {
            "regexFilter": "^https://api.youpin898.com/api/user/Auth/SmsSignIn(.*)",
            "resourceTypes": [
                "xmlhttprequest"
            ]
        }
    },
]

async function enableRules() {
    return chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules,
        removeRuleIds: [...Array(1000).keys()] // really should do this properly lol
    })
}

enableRules()
