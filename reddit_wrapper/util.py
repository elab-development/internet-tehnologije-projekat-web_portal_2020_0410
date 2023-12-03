from config import settings
import requests


def get_token() -> str:
    data = {'grant_type': 'password', 'username': settings.reddit_username, 'password': settings.reddit_password}
    auth = requests.auth.HTTPBasicAuth(settings.app_id, settings.app_secret)
    r = requests.post(settings.base_url + 'api/v1/access_token',
                      data=data,
                      headers={'user-agent': 'APP-NAME by X'}, auth=auth)
    d = r.json()
    return 'bearer ' + d['access_token']
