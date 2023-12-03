import requests
from util import get_token
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


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


def get_opinion(anime, url, header):
    sid_obj = SentimentIntensityAnalyzer()
    payload = {'q': anime, 'restrict_sr': 1, 'type': 'comment', 'sort': 'new'}
    response = requests.get(url + '/r/anime/search', headers=header, params=payload)
    values = response.json()
    count_pos = 0
    if response.status_code == 200:
        for comment in values['data']['children']:
            if sid_obj.polarity_scores(comment['data']['selftext'].replace("\n", " "))['compound'] > 0:
                count_pos = count_pos + 1
            else:
                count_pos = count_pos
    print(count_pos/len(values['data']['children']))


token = get_token()
base_url = 'https://oauth.reddit.com'
headers = {'Authorization': token, 'User-Agent': 'APP-NAME by X'}

get_opinion('one piece', base_url, headers)


