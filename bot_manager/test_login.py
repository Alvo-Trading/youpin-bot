# from utils import uu_helper
# uu_helper.get_token_automatically('31', '649540298')
import uuid

import requests

# does not need to be uuid4, can also be other things apparently lol
sessionId = str(uuid.uuid4())

# can't send too often, then sms doesnt arrive anymore
print(requests.post(
    "https://api.youpin898.com/api/user/Auth/SendSignInSmsCode",
    json={"Area": '31', "Mobile": '649540298', "Sessionid": sessionId},
    headers={
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        "apptype": "1",  # this matters, 4=android, 1=website. (other tokens with android, websession might be okay for every endpoint?)
        "content-type": "application/json",
        "d": "p=p&b=u&v=1",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",

        # how is this generated? some changes are allowed?
        "uk": "5AIQdVazi2kemD4SLfipQIK2uuzU0mkyWFF9iO6lWJllEWKGrapDx0gYaaDD4Ll1Q",
    },
).json())
