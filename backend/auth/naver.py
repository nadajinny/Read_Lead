# auth/naver.py

import os
import httpx
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from utils import create_jwt_token

load_dotenv()
router = APIRouter()

CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
REDIRECT_URI = os.getenv("NAVER_REDIRECT_URI")
FRONTEND_SCHEME = "readlead://callback"

@router.get("/auth/naver")
async def naver_login():
    auth_url = (
        "https://nid.naver.com/oauth2.0/authorize"
        f"?response_type=code&client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&state=someRandomState"
    )
    return RedirectResponse(auth_url)

@router.get("/auth/naver/callback")
async def naver_callback(request: Request):
    code = request.query_params.get("code")
    state = request.query_params.get("state")

    async with httpx.AsyncClient() as client:
        # 1. 토큰 요청
        token_res = await client.post("https://nid.naver.com/oauth2.0/token", params={
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "state": state,
        })
        token_data = token_res.json()
        access_token = token_data.get("access_token")

        # 2. 사용자 정보 요청
        user_res = await client.get(
            "https://openapi.naver.com/v1/nid/me",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        user_info = user_res.json()
        user_id = user_info['response'].get('id')

    # 3. JWT 생성
    token = create_jwt_token(user_id)

    # 4. 앱으로 리디렉션
    return RedirectResponse(f"{FRONTEND_SCHEME}?token={token}")
