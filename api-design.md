# RB-1 백엔드 API 설계

## 1. 기술 스택
- **Framework**: Node.js + Express.js 또는 NestJS
- **Database**: PostgreSQL (관계형 데이터) + Redis (캐싱)
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi 또는 class-validator

## 2. API 구조

### Base URL
```
https://api.rb1.kr/v1
```

### 인증 (Authentication)
```
POST   /auth/register        # 회원가입
POST   /auth/login          # 로그인
POST   /auth/logout         # 로그아웃
POST   /auth/refresh        # 토큰 갱신
GET    /auth/profile        # 프로필 조회
PUT    /auth/profile        # 프로필 수정
DELETE /auth/account        # 계정 삭제
```

### 게시판 (Board)
```
GET    /posts               # 게시글 목록 (페이징, 필터링)
GET    /posts/:id           # 게시글 상세
POST   /posts               # 게시글 작성
PUT    /posts/:id           # 게시글 수정
DELETE /posts/:id           # 게시글 삭제
POST   /posts/:id/view      # 조회수 증가
GET    /posts/categories    # 카테고리 목록
```

### 상담 (Counseling)
```
GET    /counselors          # 상담사 목록
GET    /counselors/:id      # 상담사 상세
POST   /counseling/requests # 상담 신청
GET    /counseling/requests/:id    # 상담 신청 상태
PUT    /counseling/requests/:id    # 상담 신청 수정
DELETE /counseling/requests/:id    # 상담 신청 취소
GET    /counseling/my-requests     # 내 상담 신청 목록
```

### 용어사전 (Dictionary)
```
GET    /dictionary/terms           # 용어 목록
GET    /dictionary/terms/:id       # 용어 상세
GET    /dictionary/categories      # 카테고리 목록
GET    /dictionary/featured        # 주요 용어
GET    /dictionary/search?q=       # 용어 검색
```

### 게임 (Games)
```
GET    /games                      # 게임 목록
GET    /games/:id                  # 게임 상세
POST   /games/:id/sessions         # 게임 세션 시작
PUT    /games/:id/sessions/:sessionId  # 게임 진행 상태 업데이트
GET    /games/:id/leaderboard      # 게임 순위표
GET    /games/identity-worldcup/cards  # 정체성 월드컵 카드
POST   /games/identity-worldcup/results # 월드컵 결과 저장
```

### 정원/아바타 (Garden)
```
GET    /users/:id/profile          # 유저 프로필 (레벨, 경험치)
GET    /users/:id/avatar           # 아바타 정보
PUT    /users/:id/avatar           # 아바타 수정
GET    /users/:id/garden           # 정원 정보
PUT    /users/:id/garden           # 정원 수정
GET    /users/:id/quests           # 일일 퀘스트
PUT    /users/:id/quests/:questId  # 퀘스트 완료
GET    /shop/items                 # 상점 아이템 목록
POST   /shop/purchase              # 아이템 구매
```

### 정체성 퀴즈 (Identity Quiz)
```
GET    /quiz/questions             # 퀴즈 질문
POST   /quiz/submit                # 퀴즈 제출
GET    /quiz/results/:id           # 퀴즈 결과
GET    /users/:id/quiz-history     # 퀴즈 기록
```

### 외부 자원 (External Resources)
```
GET    /resources                  # 외부 자원 목록
GET    /resources/:type            # 특정 유형 자원
POST   /resources/track-click      # 클릭 추적
```

## 3. 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": { },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": { }
  }
}
```

### 페이징 응답
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## 4. 인증 및 권한

### 사용자 역할
- `guest`: 비로그인 사용자
- `user`: 일반 사용자
- `counselor`: 상담사
- `admin`: 관리자

### JWT 토큰 구조
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "user",
  "exp": 1234567890
}
```

## 5. API 보안

### Rate Limiting
- 일반 API: 분당 60회
- 인증 API: 분당 10회
- 게임 API: 분당 100회

### CORS 설정
```javascript
{
  origin: ['https://rb1.kr', 'http://localhost:3000'],
  credentials: true
}
```

### 보안 헤더
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

## 6. 에러 코드

### 인증 관련
- `AUTH_INVALID_CREDENTIALS`: 잘못된 인증 정보
- `AUTH_TOKEN_EXPIRED`: 토큰 만료
- `AUTH_UNAUTHORIZED`: 권한 없음

### 요청 관련
- `VALIDATION_ERROR`: 유효성 검사 실패
- `NOT_FOUND`: 리소스를 찾을 수 없음
- `DUPLICATE_ENTRY`: 중복된 항목

### 서버 관련
- `INTERNAL_SERVER_ERROR`: 서버 내부 오류
- `SERVICE_UNAVAILABLE`: 서비스 일시 중단

## 7. 개발 환경

### 환경 변수
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:1234@localhost:5432/rb1
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### 디렉토리 구조
```
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── config/
├── tests/
├── docs/
└── scripts/
```
