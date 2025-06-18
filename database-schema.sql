-- RB-1 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'counselor', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 사용자 프로필 테이블
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(50),
    age INTEGER,
    gender VARCHAR(50),
    pronouns VARCHAR(50),
    bio TEXT,
    experience INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    points INTEGER DEFAULT 0,
    avatar_data JSONB DEFAULT '{}',
    garden_data JSONB DEFAULT '{}',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 게시판 카테고리 테이블
CREATE TABLE board_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 게시글 테이블
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INTEGER REFERENCES board_categories(id),
    author_id UUID REFERENCES users(id),
    views INTEGER DEFAULT 0,
    is_official BOOLEAN DEFAULT FALSE,
    is_counselor BOOLEAN DEFAULT FALSE,
    related_links JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 상담사 테이블
CREATE TABLE counselors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(255),
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    bio TEXT,
    certifications JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 상담 신청 테이블
CREATE TABLE counseling_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    counselor_id UUID REFERENCES counselors(id),
    name VARCHAR(100),
    age INTEGER,
    contact_method VARCHAR(50),
    preferred_date DATE,
    preferred_time TIME,
    concern TEXT NOT NULL,
    urgency VARCHAR(20) CHECK (urgency IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 용어사전 카테고리 테이블
CREATE TABLE dictionary_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7)
);

-- 용어사전 테이블
CREATE TABLE dictionary_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    title_en VARCHAR(100),
    description TEXT NOT NULL,
    example TEXT,
    category_id INTEGER REFERENCES dictionary_categories(id),
    is_featured BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500),
    related_terms UUID[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 게임 테이블
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    estimated_time INTEGER, -- in minutes
    category VARCHAR(50),
    is_new BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    has_video BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 게임 세션 테이블
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    game_id UUID REFERENCES games(id),
    score INTEGER DEFAULT 0,
    progress JSONB DEFAULT '{}',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- 정체성 카드 테이블 (월드컵 게임용)
CREATE TABLE identity_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(50)
);

-- 퀴즈 질문 테이블
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    options JSONB NOT NULL, -- [{text: "", score: {category: value}}]
    order_index INTEGER
);

-- 퀴즈 결과 테이블
CREATE TABLE quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    details JSONB,
    resources JSONB DEFAULT '[]'
);

-- 사용자 퀴즈 기록 테이블
CREATE TABLE user_quiz_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    answers JSONB NOT NULL,
    result_id UUID REFERENCES quiz_results(id),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 일일 퀘스트 테이블
CREATE TABLE daily_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    points INTEGER DEFAULT 0,
    quest_type VARCHAR(50),
    requirements JSONB DEFAULT '{}'
);

-- 사용자 퀘스트 진행 테이블
CREATE TABLE user_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    quest_id UUID REFERENCES daily_quests(id),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    date DATE DEFAULT CURRENT_DATE,
    UNIQUE(user_id, quest_id, date)
);

-- 상점 아이템 테이블
CREATE TABLE shop_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    item_type VARCHAR(50) CHECK (item_type IN ('avatar', 'accessory', 'background', 'theme')),
    price INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    data JSONB DEFAULT '{}',
    is_available BOOLEAN DEFAULT TRUE
);

-- 사용자 인벤토리 테이블
CREATE TABLE user_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    item_id UUID REFERENCES shop_items(id),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id)
);

-- 외부 자원 테이블
CREATE TABLE external_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    url VARCHAR(500),
    contact_info JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE
);

-- 활동 로그 테이블
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_counseling_requests_user ON counseling_requests(user_id);
CREATE INDEX idx_counseling_requests_counselor ON counseling_requests(counselor_id);
CREATE INDEX idx_counseling_requests_status ON counseling_requests(status);
CREATE INDEX idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX idx_game_sessions_game ON game_sessions(game_id);
CREATE INDEX idx_user_quests_date ON user_quests(date);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- 트리거: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_counseling_requests_updated_at BEFORE UPDATE ON counseling_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dictionary_terms_updated_at BEFORE UPDATE ON dictionary_terms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입
INSERT INTO board_categories (name, description) VALUES 
('정보', 'LGBTQ+ 관련 정보 공유'),
('경험', '개인 경험 및 이야기'),
('자료', '유용한 자료 및 링크'),
('공지', '공식 공지사항');

INSERT INTO dictionary_categories (name, color) VALUES
('성적 지향', '#FF6B6B'),
('성별 정체성', '#4ECDC4'),
('표현', '#45B7D1'),
('관계', '#96CEB4'),
('기타', '#DDA0DD');