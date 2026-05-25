-- ============================================================
-- COINVISION AI - SCHEMA POSTGRESQL COMPLETO
-- Plataforma SaaS de Análise Numismática com IA
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'premium', 'basic', 'guest');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending', 'banned');
CREATE TYPE subscription_plan AS ENUM ('free', 'starter', 'professional', 'enterprise');
CREATE TYPE coin_grade AS ENUM ('P1','F2','F12','VF20','VF25','VF30','EF40','EF45','AU50','AU55','AU58','MS60','MS61','MS62','MS63','MS64','MS65','MS66','MS67','MS68','MS69','MS70','PF60','PF65','PF70');
CREATE TYPE analysis_status AS ENUM ('queued','processing','completed','failed','review');
CREATE TYPE image_type AS ENUM ('obverse','reverse','edge','detail','raw');
CREATE TYPE rarity_level AS ENUM ('common','uncommon','scarce','rare','very_rare','ultra_rare','unique');
CREATE TYPE auction_status AS ENUM ('upcoming','active','ended','cancelled');
CREATE TYPE material_type AS ENUM ('gold','silver','copper','bronze','nickel','zinc','aluminum','platinum','bimetallic','other');
CREATE TYPE mint_mark_type AS ENUM ('none','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','W','CC','O','S','P','D','MM','SP','proof');

-- ============================================================
-- USERS & AUTH
-- ============================================================

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    username        VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(255),
    avatar_url      TEXT,
    role            user_role DEFAULT 'basic',
    status          user_status DEFAULT 'pending',
    plan            subscription_plan DEFAULT 'free',
    email_verified  BOOLEAN DEFAULT FALSE,
    phone           VARCHAR(30),
    country         CHAR(2),
    language        VARCHAR(10) DEFAULT 'pt-BR',
    timezone        VARCHAR(50) DEFAULT 'America/Sao_Paulo',
    api_key         UUID DEFAULT uuid_generate_v4(),
    uploads_used    INTEGER DEFAULT 0,
    uploads_limit   INTEGER DEFAULT 10,
    coins_analyzed  INTEGER DEFAULT 0,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) NOT NULL,
    refresh_token   VARCHAR(255),
    ip_address      INET,
    user_agent      TEXT,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan            subscription_plan NOT NULL,
    status          VARCHAR(30) DEFAULT 'active',
    price_monthly   DECIMAL(10,2),
    currency        CHAR(3) DEFAULT 'BRL',
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ,
    cancelled_at    TIMESTAMPTZ,
    gateway_id      VARCHAR(255),
    metadata        JSONB DEFAULT '{}'
);

-- ============================================================
-- COUNTRIES & MINTS
-- ============================================================

CREATE TABLE countries (
    id              SERIAL PRIMARY KEY,
    code            CHAR(2) UNIQUE NOT NULL,
    code3           CHAR(3) UNIQUE,
    name            VARCHAR(100) NOT NULL,
    name_pt         VARCHAR(100),
    currency_name   VARCHAR(100),
    currency_code   VARCHAR(10),
    flag_url        TEXT,
    active          BOOLEAN DEFAULT TRUE
);

CREATE TABLE mints (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    country_id      INTEGER REFERENCES countries(id),
    city            VARCHAR(100),
    mint_mark       VARCHAR(20),
    founded_year    INTEGER,
    closed_year     INTEGER,
    active          BOOLEAN DEFAULT TRUE,
    description     TEXT,
    website         TEXT
);

-- ============================================================
-- COINS CATALOG
-- ============================================================

CREATE TABLE coin_series (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    name_pt         VARCHAR(255),
    country_id      INTEGER REFERENCES countries(id),
    start_year      INTEGER,
    end_year        INTEGER,
    description     TEXT,
    material        material_type,
    diameter_mm     DECIMAL(6,2),
    weight_g        DECIMAL(8,4),
    thickness_mm    DECIMAL(5,2),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE coins (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id       UUID REFERENCES coin_series(id),
    country_id      INTEGER REFERENCES countries(id),
    mint_id         INTEGER REFERENCES mints(id),
    catalog_number  VARCHAR(100),
    km_number       VARCHAR(50),
    pcgs_number     VARCHAR(50),
    ngc_number      VARCHAR(50),
    name            VARCHAR(255) NOT NULL,
    name_pt         VARCHAR(255),
    year_start      INTEGER,
    year_end        INTEGER,
    face_value      DECIMAL(15,4),
    currency_unit   VARCHAR(50),
    material        material_type,
    composition     TEXT,
    diameter_mm     DECIMAL(6,2),
    weight_g        DECIMAL(8,4),
    thickness_mm    DECIMAL(5,2),
    edge_type       VARCHAR(100),
    mint_mark       mint_mark_type DEFAULT 'none',
    rarity          rarity_level DEFAULT 'common',
    rarity_score    DECIMAL(5,2),
    mintage         BIGINT,
    obverse_desc    TEXT,
    reverse_desc    TEXT,
    designer        VARCHAR(255),
    engraver        VARCHAR(255),
    notes           TEXT,
    is_error_coin   BOOLEAN DEFAULT FALSE,
    is_proof        BOOLEAN DEFAULT FALSE,
    is_commemorative BOOLEAN DEFAULT FALSE,
    embedding       vector(1536),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE coin_variants (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
    variant_code    VARCHAR(50),
    description     TEXT,
    mintage         BIGINT,
    distinguishing_features TEXT,
    rarity          rarity_level,
    notes           TEXT
);

CREATE TABLE coin_errors (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
    error_type      VARCHAR(100) NOT NULL,
    description     TEXT,
    rarity          rarity_level,
    premium_factor  DECIMAL(5,2) DEFAULT 1.0,
    documented      BOOLEAN DEFAULT FALSE,
    notes           TEXT
);

-- ============================================================
-- COIN IMAGES (REFERENCE CATALOG)
-- ============================================================

CREATE TABLE coin_reference_images (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
    image_type      image_type NOT NULL,
    url             TEXT NOT NULL,
    grade           coin_grade,
    source          VARCHAR(255),
    embedding       vector(1536),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER UPLOADS & ANALYSES
-- ============================================================

CREATE TABLE uploads (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id      VARCHAR(100),
    original_name   VARCHAR(500),
    stored_path     TEXT NOT NULL,
    cdn_url         TEXT,
    mime_type       VARCHAR(100),
    size_bytes      BIGINT,
    width_px        INTEGER,
    height_px       INTEGER,
    image_type      image_type DEFAULT 'obverse',
    checksum        VARCHAR(64),
    is_processed    BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analyses (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id),
    upload_ids      UUID[] DEFAULT '{}',
    coin_id         UUID REFERENCES coins(id),
    status          analysis_status DEFAULT 'queued',
    confidence      DECIMAL(5,4),
    grade           coin_grade,
    grade_confidence DECIMAL(5,4),
    rarity          rarity_level,
    rarity_score    DECIMAL(5,2),
    estimated_value_min DECIMAL(15,2),
    estimated_value_max DECIMAL(15,2),
    estimated_value_avg DECIMAL(15,2),
    currency        CHAR(3) DEFAULT 'BRL',
    demand_index    DECIMAL(5,2),
    authenticity_score DECIMAL(5,4),
    is_authentic    BOOLEAN,
    is_error_coin   BOOLEAN DEFAULT FALSE,
    detected_error  UUID REFERENCES coin_errors(id),
    ocr_text        TEXT,
    ocr_data        JSONB DEFAULT '{}',
    ai_raw_response JSONB DEFAULT '{}',
    processing_time_ms INTEGER,
    pipeline_steps  JSONB DEFAULT '[]',
    user_notes      TEXT,
    is_public       BOOLEAN DEFAULT FALSE,
    feedback_given  BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analysis_images (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id     UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    upload_id       UUID NOT NULL REFERENCES uploads(id),
    image_type      image_type NOT NULL,
    processed_url   TEXT,
    enhanced_url    TEXT,
    thumbnail_url   TEXT,
    bg_removed_url  TEXT,
    embedding       vector(1536),
    detections      JSONB DEFAULT '[]',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analysis_ocr_results (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id     UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    image_type      image_type,
    raw_text        TEXT,
    structured_data JSONB DEFAULT '{}',
    year_detected   INTEGER,
    country_detected VARCHAR(100),
    denomination    VARCHAR(50),
    inscriptions    TEXT[],
    confidence      DECIMAL(5,4),
    engine          VARCHAR(50) DEFAULT 'tesseract',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analysis_visual_matches (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id     UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    coin_id         UUID REFERENCES coins(id),
    similarity_score DECIMAL(5,4),
    match_method    VARCHAR(50),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRICE HISTORY & MARKET DATA
-- ============================================================

CREATE TABLE price_history (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
    grade           coin_grade,
    price           DECIMAL(15,2) NOT NULL,
    currency        CHAR(3) DEFAULT 'BRL',
    price_usd       DECIMAL(15,2),
    source          VARCHAR(100),
    source_url      TEXT,
    sale_date       DATE,
    is_auction      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE market_prices (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
    grade           coin_grade,
    price_avg       DECIMAL(15,2),
    price_min       DECIMAL(15,2),
    price_max       DECIMAL(15,2),
    price_trend     DECIMAL(8,4),
    volume_30d      INTEGER,
    currency        CHAR(3) DEFAULT 'BRL',
    source_count    INTEGER,
    last_updated    TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(coin_id, grade)
);

CREATE TABLE auctions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_id         UUID REFERENCES coins(id),
    analysis_id     UUID REFERENCES analyses(id),
    title           VARCHAR(500),
    description     TEXT,
    house           VARCHAR(200),
    source_url      TEXT,
    estimate_low    DECIMAL(15,2),
    estimate_high   DECIMAL(15,2),
    realized_price  DECIMAL(15,2),
    currency        CHAR(3) DEFAULT 'BRL',
    grade           coin_grade,
    lot_number      VARCHAR(100),
    status          auction_status DEFAULT 'active',
    starts_at       TIMESTAMPTZ,
    ends_at         TIMESTAMPTZ,
    scraped_at      TIMESTAMPTZ DEFAULT NOW(),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USER COLLECTION
-- ============================================================

CREATE TABLE collections (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    is_public       BOOLEAN DEFAULT FALSE,
    total_value     DECIMAL(15,2) DEFAULT 0,
    currency        CHAR(3) DEFAULT 'BRL',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collection_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id   UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    coin_id         UUID REFERENCES coins(id),
    analysis_id     UUID REFERENCES analyses(id),
    grade           coin_grade,
    purchase_price  DECIMAL(15,2),
    purchase_date   DATE,
    current_value   DECIMAL(15,2),
    notes           TEXT,
    is_for_sale     BOOLEAN DEFAULT FALSE,
    asking_price    DECIMAL(15,2),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE favorites (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    coin_id         UUID REFERENCES coins(id),
    analysis_id     UUID REFERENCES analyses(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, coin_id),
    UNIQUE(user_id, analysis_id)
);

CREATE TABLE price_alerts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    coin_id         UUID NOT NULL REFERENCES coins(id),
    grade           coin_grade,
    target_price    DECIMAL(15,2) NOT NULL,
    direction       VARCHAR(10) DEFAULT 'below',
    triggered       BOOLEAN DEFAULT FALSE,
    triggered_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AI LEARNING SYSTEM
-- ============================================================

CREATE TABLE ai_feedback (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id     UUID NOT NULL REFERENCES analyses(id),
    user_id         UUID NOT NULL REFERENCES users(id),
    is_correct      BOOLEAN,
    correct_coin_id UUID REFERENCES coins(id),
    correct_grade   coin_grade,
    correct_value   DECIMAL(15,2),
    comment         TEXT,
    reviewed        BOOLEAN DEFAULT FALSE,
    reviewed_by     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_models (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    version         VARCHAR(50),
    type            VARCHAR(100),
    accuracy        DECIMAL(5,4),
    f1_score        DECIMAL(5,4),
    trained_at      TIMESTAMPTZ,
    dataset_size    INTEGER,
    is_active       BOOLEAN DEFAULT FALSE,
    config          JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_training_jobs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id        UUID REFERENCES ai_models(id),
    status          VARCHAR(30) DEFAULT 'queued',
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    samples_count   INTEGER,
    accuracy        DECIMAL(5,4),
    logs            TEXT,
    config          JSONB DEFAULT '{}'
);

-- ============================================================
-- CATALOGS & EXTERNAL SOURCES
-- ============================================================

CREATE TABLE catalogs (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    abbreviation    VARCHAR(20),
    country         CHAR(2),
    description     TEXT,
    website         TEXT,
    api_endpoint    TEXT,
    api_key_env     VARCHAR(100),
    is_active       BOOLEAN DEFAULT TRUE,
    last_sync       TIMESTAMPTZ
);

CREATE TABLE catalog_entries (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    catalog_id      INTEGER NOT NULL REFERENCES catalogs(id),
    coin_id         UUID REFERENCES coins(id),
    catalog_ref     VARCHAR(100) NOT NULL,
    catalog_data    JSONB DEFAULT '{}',
    synced_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE scraping_jobs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source          VARCHAR(100) NOT NULL,
    url             TEXT,
    status          VARCHAR(30) DEFAULT 'queued',
    job_type        VARCHAR(50),
    records_found   INTEGER DEFAULT 0,
    records_saved   INTEGER DEFAULT 0,
    error_msg       TEXT,
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    next_run        TIMESTAMPTZ,
    config          JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADMIN & SYSTEM
-- ============================================================

CREATE TABLE system_logs (
    id              BIGSERIAL PRIMARY KEY,
    level           VARCHAR(10) NOT NULL,
    category        VARCHAR(50),
    message         TEXT NOT NULL,
    context         JSONB DEFAULT '{}',
    user_id         UUID REFERENCES users(id),
    ip_address      INET,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE api_usage (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id),
    endpoint        VARCHAR(255),
    method          VARCHAR(10),
    status_code     INTEGER,
    response_ms     INTEGER,
    ip_address      INET,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(50),
    title           VARCHAR(255),
    message         TEXT,
    data            JSONB DEFAULT '{}',
    read            BOOLEAN DEFAULT FALSE,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE queue_jobs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    queue           VARCHAR(50) NOT NULL,
    job_type        VARCHAR(100) NOT NULL,
    payload         JSONB DEFAULT '{}',
    priority        INTEGER DEFAULT 5,
    attempts        INTEGER DEFAULT 0,
    max_attempts    INTEGER DEFAULT 3,
    status          VARCHAR(30) DEFAULT 'pending',
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    failed_at       TIMESTAMPTZ,
    error_msg       TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cache_store (
    key             VARCHAR(500) PRIMARY KEY,
    value           JSONB NOT NULL,
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_api_key ON users(api_key);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_coins_country ON coins(country_id);
CREATE INDEX idx_coins_year ON coins(year_start, year_end);
CREATE INDEX idx_coins_km ON coins(km_number);
CREATE INDEX idx_coins_catalog ON coins(catalog_number);
CREATE INDEX idx_coins_rarity ON coins(rarity);
CREATE INDEX idx_analyses_user ON analyses(user_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_coin ON analyses(coin_id);
CREATE INDEX idx_price_history_coin ON price_history(coin_id);
CREATE INDEX idx_price_history_date ON price_history(sale_date DESC);
CREATE INDEX idx_market_prices_coin ON market_prices(coin_id);
CREATE INDEX idx_auctions_coin ON auctions(coin_id);
CREATE INDEX idx_auctions_ends ON auctions(ends_at);
CREATE INDEX idx_collection_items_user ON collection_items(user_id);
CREATE INDEX idx_collection_items_coin ON collection_items(coin_id);
CREATE INDEX idx_ai_feedback_analysis ON ai_feedback(analysis_id);
CREATE INDEX idx_system_logs_created ON system_logs(created_at DESC);
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_queue_jobs_status ON queue_jobs(status, priority DESC);
CREATE INDEX idx_queue_jobs_queue ON queue_jobs(queue, status);
CREATE INDEX idx_notifications_user ON notifications(user_id, read);
CREATE INDEX idx_coins_name_trgm ON coins USING GIN(name gin_trgm_ops);

-- Vector similarity indexes (requires pgvector)
-- CREATE INDEX idx_coins_embedding ON coins USING ivfflat(embedding vector_cosine_ops) WITH (lists = 100);
-- CREATE INDEX idx_ref_images_embedding ON coin_reference_images USING ivfflat(embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================================
-- TRIGGERS: updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_coins_updated BEFORE UPDATE ON coins FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_analyses_updated BEFORE UPDATE ON analyses FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_collections_updated BEFORE UPDATE ON collections FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO catalogs (name, abbreviation, description, website) VALUES
('Krause Standard Catalog','KM','Catálogo mundial padrão de moedas','https://numismaster.com'),
('PCGS CoinFacts','PCGS','Professional Coin Grading Service','https://pcgs.com'),
('NGC Coin Explorer','NGC','Numismatic Guaranty Company','https://ngccoin.com'),
('Catálogo Amato','AMATO','Catálogo brasileiro de moedas','https://catalogo-amato.com.br'),
('Catálogo Vieira','VIEIRA','Catálogo numismático brasileiro',''),
('MercadoLivre Numismática','ML','Marketplace de moedas do Brasil','https://mercadolivre.com.br'),
('eBay Coins','EBAY','Marketplace global de moedas','https://ebay.com'),
('Heritage Auctions','HA','Casa de leilões numismáticos','https://ha.com'),
('Stack''s Bowers','SB','Casa de leilões numismáticos','https://stacksbowers.com');

INSERT INTO countries (code, code3, name, name_pt, currency_name, currency_code) VALUES
('BR','BRL','Brazil','Brasil','Real','BRL'),
('US','USA','United States','Estados Unidos','Dollar','USD'),
('DE','DEU','Germany','Alemanha','Euro','EUR'),
('FR','FRA','France','França','Euro','EUR'),
('GB','GBR','United Kingdom','Reino Unido','Pound Sterling','GBP'),
('PT','PRT','Portugal','Portugal','Euro','EUR'),
('AR','ARG','Argentina','Argentina','Peso','ARS'),
('MX','MEX','Mexico','México','Peso','MXN'),
('JP','JPN','Japan','Japão','Yen','JPY'),
('CN','CHN','China','China','Yuan','CNY'),
('RU','RUS','Russia','Rússia','Ruble','RUB'),
('AU','AUS','Australia','Austrália','Dollar','AUD'),
('CA','CAN','Canada','Canadá','Dollar','CAD'),
('CH','CHE','Switzerland','Suíça','Franc','CHF'),
('IT','ITA','Italy','Itália','Euro','EUR');

INSERT INTO mints (name, country_id, city, mint_mark) VALUES
('Casa da Moeda do Brasil',1,'Rio de Janeiro',''),
('Casa da Moeda de Lisboa',6,'Lisboa','INCM'),
('United States Mint - Philadelphia',2,'Philadelphia','P'),
('United States Mint - Denver',2,'Denver','D'),
('United States Mint - San Francisco',2,'San Francisco','S'),
('Royal Mint',4,'Llantrisant',''),
('Monnaie de Paris',4,'Paris','A'),
('Staatliche Münzen Baden-Württemberg',3,'Stuttgart','F'),
('Royal Australian Mint',12,'Canberra',''),
('Royal Canadian Mint',13,'Ottawa','');
