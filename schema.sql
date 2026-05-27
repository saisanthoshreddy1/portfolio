-- schema.sql
-- Run this in psql after creating the portfolio_db database:
--   psql -U your_pg_user -d portfolio_db -f schema.sql

-- ─── Projects Table ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(100)  NOT NULL,
  description TEXT,
  tech_stack  VARCHAR(255),
  github_url  VARCHAR(255),
  live_url    VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── Skills Table ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  level    VARCHAR(50)     -- e.g. Beginner, Intermediate, Advanced
);

-- ─── Contact Messages Table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(100),
  email   VARCHAR(100),
  message TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
