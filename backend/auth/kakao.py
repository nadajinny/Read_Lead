from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import httpx, os
from utils.jwt import issue_token

router = APIRouter()

@router.get("/auth/kakao")
async def kakao_login():
    kakao_auth_url = "https://kauth.kakao.com/oauth/authorize"
    client_id = os.getenv("KAKAO_CLIENT_ID")
    redirect_uri = os.getenv("KAKAO_REDIRECT_URI")

    return RedirectResponse(
        f"{kakao_auth_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    )

@router.get("/auth/kakao/callback")
async def kakao_callback(code: str):
    # 1. 토큰 교환
    token_url = "https://kauth.kakao.com/oauth/token"
    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data={
            "grant_type": "authorization_code",
            "client_id": os.getenv("KAKAO_CLIENT_ID"),
            "client_secret": os.getenv("KAKAO_CLIENT_SECRET"),
            "redirect_uri": os.getenv("KAKAO_REDIRECT_URI"),
            "code": code
        })

    access_token = response.json().get("access_token")

    # 2. 사용자 정보 요청
    async with httpx.AsyncClient() as client:
        user_info = await client.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"}
        )

    kakao_id = str(user_info.json()["id"])

    # 3. JWT 발급
    jwt_token = issue_token(kakao_id)

    # 4. 앱으로 리디렉션
    return RedirectResponse(f"readlead://callback?token={jwt_token}")
