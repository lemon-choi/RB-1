# 🚀 Rainbow Buddy 배포 가이드

## GitHub Actions를 통한 자동 배포

이 프로젝트는 GitHub Actions를 사용하여 자동 배포가 가능하도록 설정되어 있습니다.

## 📋 배포 워크플로우

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)
- **트리거**: main, master, develop 브랜치 push 시
- **기능**: 
  - 코드 품질 검사 (lint)
  - 타입 검사 (TypeScript)
  - 보안 검사 (npm audit)
  - 빌드 테스트

### 2. Vercel 배포 (`.github/workflows/deploy-vercel.yml`)
- **트리거**: main/master 브랜치 push 및 PR
- **기능**:
  - PR 시: Preview 배포
  - main/master 병합 시: Production 배포

### 3. Cloudflare Pages 배포 (`.github/workflows/deploy-cloudflare.yml`)
- **트리거**: main/master 브랜치 push 및 PR
- **기능**: OpenNext를 사용한 Cloudflare Pages 배포

## 🔧 배포 설정 방법

### Vercel 배포 설정

1. **Vercel 계정 연결**
   - [vercel.com](https://vercel.com)에서 GitHub 연결
   - 프로젝트 임포트

2. **GitHub Secrets 설정**
   ```
   Repository Settings > Secrets and variables > Actions
   ```
   
   필요한 Secrets:
   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_org_id
   VERCEL_PROJECT_ID=your_project_id
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   ```

3. **Vercel 토큰 발급**
   - Vercel Dashboard > Settings > Tokens
   - 새 토큰 생성 후 `VERCEL_TOKEN`에 설정

4. **프로젝트 ID 확인**
   ```bash
   # 로컬에서 vercel 명령어 실행 후
   cat .vercel/project.json
   ```

### Cloudflare Pages 배포 설정

1. **Cloudflare 계정 설정**
   - [dash.cloudflare.com](https://dash.cloudflare.com) 접속
   - Pages 섹션에서 프로젝트 생성

2. **GitHub Secrets 설정**
   ```
   CLOUDFLARE_API_TOKEN=your_api_token
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   ```

3. **API 토큰 생성**
   - Cloudflare Dashboard > My Profile > API Tokens
   - "Custom token" 생성
   - 권한: Zone:Zone:Read, Page:Edit

## 🗄️ 데이터베이스 설정

### 개발 환경
```bash
# PostgreSQL 설치 및 실행
# 데이터베이스 생성
createdb rainbow_buddy

# Prisma 마이그레이션
npx prisma migrate dev
npx prisma generate
```

### 프로덕션 환경
- **Supabase** (권장): 무료 PostgreSQL 호스팅
- **PlanetScale**: MySQL 호스팅
- **Railway**: PostgreSQL 호스팅

#### Supabase 설정 예시
1. [supabase.com](https://supabase.com)에서 프로젝트 생성
2. Database URL 복사
3. GitHub Secrets에 `DATABASE_URL` 추가
4. Prisma 스키마 배포:
   ```bash
   npx prisma db push
   ```

## 🔒 환경 변수 설정

### 필수 환경 변수
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters"
JWT_EXPIRES_IN="7d"
```

### 선택적 환경 변수
```env
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

## 🚀 배포 실행

### 자동 배포
1. 코드를 main/master 브랜치에 push
2. GitHub Actions가 자동으로 실행
3. 배포 완료 시 알림 확인

### 수동 배포 (로컬)
```bash
# Vercel 배포
npm run build
npx vercel --prod

# Cloudflare 배포
npm run deploy
```

## 📊 배포 상태 확인

### GitHub Actions
- Repository > Actions 탭에서 워크플로우 상태 확인
- 실패 시 로그에서 오류 내용 확인

### 배포 URL
- **Vercel**: `https://your-project.vercel.app`
- **Cloudflare**: `https://your-project.pages.dev`

## 🔧 트러블슈팅

### 빌드 실패
```bash
# Node.js 버전 확인 (20+ 필요)
node --version

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 데이터베이스 연결 오류
```bash
# 연결 테스트
npx prisma db pull

# 스키마 동기화
npx prisma db push
```

### 환경 변수 문제
- GitHub Secrets 설정 확인
- 환경 변수명 오타 확인
- JWT_SECRET은 최소 32자 이상

## 📋 체크리스트

배포 전 확인사항:
- [ ] GitHub Secrets 모든 변수 설정 완료
- [ ] 데이터베이스 연결 테스트 완료  
- [ ] 로컬에서 빌드 성공 확인
- [ ] 환경 변수 설정 확인
- [ ] Prisma 스키마 배포 완료

배포 완료 후:
- [ ] 웹사이트 접속 확인
- [ ] 주요 기능 동작 테스트
- [ ] 데이터베이스 연결 확인
- [ ] 인증 시스템 테스트