from config import settings
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import requests


def get_token() -> str:
    data = {'grant_type': 'password', 'username': settings.reddit_username, 'password': settings.reddit_password}
    auth = requests.auth.HTTPBasicAuth(settings.app_id, settings.app_secret)
    r = requests.post(settings.base_url + 'api/v1/access_token',
                      data=data,
                      headers={'user-agent': 'APP-NAME by X'}, auth=auth)
    d = r.json()
    return 'bearer ' + d['access_token']


def hot_posts(url: str = 'https://oauth.reddit.com', header: dict = None) -> list[dict]:
    if header is None:
        header = {'Authorization': get_token(), 'User-Agent': 'APP-NAME by X'}
    response = requests.get(url + '/r/anime/hot', headers=header)
    values = response.json()
    top_posts = []
    if response.status_code == 200:
        for post in values['data']['children']:
            top_posts.append({'selftext': post['data']['selftext'],
                              'title': post['data']['title'],
                              'upvote_ratio': post['data']['upvote_ratio'],
                              'ups': post['data']['ups'],
                              'author': post['data']['author'],
                              'num_comments': post['data']['num_comments'],
                              'permalink': post['data']['permalink']})
            return top_posts


def weekly_top_posts(url: str = 'https://oauth.reddit.com', header: dict = None) -> list[dict]:
    if header is None:
        header = {'Authorization': get_token(), 'User-Agent': 'APP-NAME by X'}
    payload = {'t': 'week'}
    response = requests.get(url + '/r/anime/top', headers=header, params=payload)
    values = response.json()
    top_posts = []
    if response.status_code == 200:
        for post in values['data']['children']:
            top_posts.append({'selftext': post['data']['selftext'],
                              'title': post['data']['title'],
                              'upvote_ratio': post['data']['upvote_ratio'],
                              'ups': post['data']['ups'],
                              'author': post['data']['author'],
                              'num_comments': post['data']['num_comments'],
                              'permalink': post['data']['permalink']})
    return top_posts


def opinion(anime: str, url: str = 'https://oauth.reddit.com', header: dict = None) -> float:
    if header is None:
        header = {'Authorization': get_token(), 'User-Agent': 'APP-NAME by X'}
    rating_analyser = SentimentIntensityAnalyzer()
    payload = {'q': anime, 'restrict_sr': 1, 'type': 'comment', 'sort': 'new'}
    response = requests.get(url + '/r/anime/search', headers=header, params=payload)
    values = response.json()
    count_positive_ratings = 0
    if response.status_code == 200:
        for comment in values['data']['children']:
            if rating_analyser.polarity_scores(comment['data']['selftext'].replace("\n", " "))['compound'] > 0:
                count_positive_ratings = count_positive_ratings + 1
    return count_positive_ratings / len(values['data']['children'])
