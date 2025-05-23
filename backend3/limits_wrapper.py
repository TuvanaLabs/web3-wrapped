import os

from dotenv import load_dotenv
from limits import RateLimitItem, RateLimitItemPerMinute, storage, strategies

load_dotenv()

REDIS_URL: str = os.getenv("REDIS_URL")
storage = storage.RedisStorage(REDIS_URL)
throttler = strategies.MovingWindowRateLimiter(storage)

"""
    This component is used as a wrapper for `limits` so we won't use its api directly in the throttler class.
"""


def hit(key: str, rate_per_minute: int, cost: int = 1) -> bool:
    """
        Hits the throttler and returns `true` if a request can be passed and `false` if it needs to be blocked
        :param key: the key that identifies the client that needs to be throttled
        :param rate_per_minute: the number of request per minute to allow
        :param cost: the cost of the request in the time window.
        :return: returns `true` if a request can be passed and `false` if it needs to be blocked
    """
    item = rate_limit_item_for(rate_per_minute=rate_per_minute)
    is_hit = throttler.hit(item, key, cost=cost)
    return is_hit


def rate_limit_item_for(rate_per_minute: int) -> RateLimitItem:
    """
    Returns the rate of requests for a specific model

    :param rate_per_minute: the number of request per minute to allow
    :return: `RateLimitItem` object initiated with a rate limit that matched the model
    """
    return RateLimitItemPerMinute(rate_per_minute)
