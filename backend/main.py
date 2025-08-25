from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import kakao, google, naver

app = FastAPI()

# 앱과 통신 허용 (CORS 설정)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프로덕션에서는 실제 앱 주소로 제한하세요
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(kakao.router)
app.include_router(google.router)
app.include_router(naver.router)

@app.get("/")
async def root():
    return {"message": "OAuth API is running"}
