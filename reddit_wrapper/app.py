import requests
from json import dumps
from util import get_token


def get_hot_posts(url, header):
    response = requests.get(url + '/r/anime/hot', headers=header)
    values = response.json()
    if response.status_code == 200:
        for post in values['data']['children']:
            print('selftext: ', post['data']['selftext'])
            print('title: ', post['data']['title'])
            print('upvote_ratio: ', post['data']['upvote_ratio'])
            print('ups: ', post['data']['ups'])
            print('author: ', post['data']['author'])
            print('num_comments: ', post['data']['num_comments'])
            # print('url: ', post['data']['url'])
            print('permalink: ', post['data']['permalink'])


def get_weekly_top_posts(url, header):
    payload = {'t': 'week'}
    response = requests.get(url + '/r/anime/top', headers=header, params=payload)
    values = response.json()
    if response.status_code == 200:
        for post in values['data']['children']:
            print('selftext: ', post['data']['selftext'])
            print('title: ', post['data']['title'])
            print('upvote_ratio: ', post['data']['upvote_ratio'])
            print('ups: ', post['data']['ups'])
            print('author: ', post['data']['author'])
            print('num_comments: ', post['data']['num_comments'])
            # print('url: ', post['data']['url'])
            print('permalink: ', post['data']['permalink'])


token = get_token()
base_url = 'https://oauth.reddit.com'
headers = {'Authorization': token, 'User-Agent': 'APP-NAME by X'}

get_hot_posts(base_url, headers)


