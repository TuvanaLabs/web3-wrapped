from typing import Awaitable, Callable, Any

from fastapi.requests import Request
from fastapi.exceptions import HTTPException
from fastapi import status

from limits_wrapper import hit


async def _default_identifier(request: Request) -> str:
  ip = request.client.host
  return ip


async def _default_callback(request: Request):
    raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="request limit reached")


async def _default_rate_provider(request: Request) -> int:
    return 10


class RateLimitMiddleware:
    def __init__(
        self,
        identifier: Callable[[Request], Awaitable[str]] = _default_identifier,
        callback: Callable[[Request], Awaitable[Any]] = _default_callback,
        rate_provider: Callable[[Request], Awaitable[int]] = _default_rate_provider,
    ):
        self.identifier = identifier
        self.callback = callback
        self.rate_provider = rate_provider

    async def __call__(self, request: Request):
        callback = self.callback
        identifier = self.identifier
        rate_provider = self.rate_provider

        key = await identifier(request)
        rate = await rate_provider(request)

        if not hit(key=key, rate_per_minute=rate):
            return await callback(request)
