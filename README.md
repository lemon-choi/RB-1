# 🌈 Rainbow Buddy

**청소년 성소수자를 위한 안전하고 친근한 디지털 공간**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/yg020918-3333s-projects/v0-rainbow-buddy-app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 📖 프로젝트 소개

Rainbow Buddy는 청소년 성소수자들이 자신의 정체성을 안전하게 탐색하고, 다양한 콘텐츠와 커뮤니티를 통해 성장할 수 있는 디지털 플랫폼입니다. "나를 더 알아가는 공간"이라는 슬로건 아래, 부드럽고 강요 없는 방식으로 자기 발견의 여정을 지원합니다.

## ✨ 주요 기능

### 🎯 정체성 탐색
- **정체성 퀴즈**: MBTI 스타일의 퀴즈로 성 정체성과 성적 지향 탐색
- **정체성 월드컵**: 재미있는 게임 형식으로 자신의 선호도 발견
- **레버당기기**: 간단한 상호작용을 통한 자기 이해

### 📚 학습 및 정보
- **용어사전**: LGBTQ+ 관련 용어를 쉽고 친절하게 학습
- **정보 게시판**: 다양한 정체성과 관련된 유용한 정보 및 경험 공유

### 🌱 개인화 및 커뮤니티
- **나만의 정원**: 아바타 커스터마이징과 개인 공간 꾸미기
- **일일 퀘스트**: 재미있는 일일 활동을 통한 꾸준한 참여
- **상담 연결**: 전문 상담사와의 연결 서비스

### 🎮 게임 및 엔터테인먼트
- **다양한 미니게임**: 정체성 탐색을 재미있게 만드는 게임들
- **인터랙티브 콘텐츠**: 시각적이고 참여형 콘텐츠

## 🛠 기술 스택

- **Frontend**: Next.js 15.2.4, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form, Zod
- **Deployment**: Vercel

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- npm, pnpm, 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/lemon-choi/RB-1.git
   cd RB-1
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   pnpm install
   # 또는
   yarn install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   pnpm dev
   # 또는
   yarn dev
   ```

4. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
RB-1/
├── app/                    # Next.js 13+ App Router
│   ├── about/             # 소개 페이지
│   ├── board/             # 게시판
│   ├── counseling/        # 상담 서비스
│   ├── dictionary/        # LGBTQ+ 용어사전
│   ├── games/            # 게임 섹션
│   │   └── identity-worldcup/  # 정체성 월드컵
│   ├── garden/           # 개인 정원 (아바타)
│   ├── identity-quiz/    # 정체성 퀴즈
│   └── lever/            # 레버당기기 게임
├── components/           # 재사용 가능한 컴포넌트
│   ├── ui/              # 기본 UI 컴포넌트
│   └── garden/          # 정원 관련 컴포넌트
├── hooks/               # 커스텀 React 훅
├── lib/                 # 유틸리티 함수
└── public/             # 정적 자원
    ├── characters/     # 캐릭터 이미지
    └── backgrounds/    # 배경 이미지
```

## 🎨 디자인 철학

Rainbow Buddy는 다음과 같은 디자인 원칙을 따릅니다:

- **접근성**: 모든 사용자가 쉽게 이용할 수 있는 인터페이스
- **안전성**: 판단하지 않는, 안전한 환경 제공
- **재미**: 학습과 탐색을 즐겁게 만드는 게임화 요소
- **포용성**: 다양한 정체성을 존중하고 포용하는 콘텐츠
- **부드러움**: 강요하지 않는, 자연스러운 자기 발견 과정

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork 후 브랜치 생성
2. 변경사항 커밋
3. Pull Request 생성

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 📞 문의

- **프로젝트 관리자**: lemon-choi
- **GitHub**: [https://github.com/lemon-choi/RB-1](https://github.com/lemon-choi/RB-1)

---

**Rainbow Buddy와 함께 안전하게 자신을 탐색하고 성장해보세요! 🌈**
