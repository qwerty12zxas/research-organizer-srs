PRAGMA foreign_keys = ON;

CREATE TABLE Users (
  user_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  username   TEXT NOT NULL UNIQUE,
  email      TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE Articles (
  article_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT NOT NULL,
  year       INTEGER,
  doi        TEXT UNIQUE,
  url        TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE Authors (
  author_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name  TEXT NOT NULL,
  orcid      TEXT
);

CREATE TABLE ArticleAuthors (
  article_id   INTEGER NOT NULL,
  author_id    INTEGER NOT NULL,
  author_order INTEGER,
  PRIMARY KEY (article_id, author_id),
  FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id)  REFERENCES Authors(author_id)  ON DELETE CASCADE
);

CREATE TABLE Keywords (
  keyword_id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword    TEXT NOT NULL UNIQUE
);

CREATE TABLE ArticleKeywords (
  article_id INTEGER NOT NULL,
  keyword_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, keyword_id),
  FOREIGN KEY (article_id) REFERENCES Articles(article_id) ON DELETE CASCADE,
  FOREIGN KEY (keyword_id) REFERENCES Keywords(keyword_id) ON DELETE CASCADE
);

-- Индексы
CREATE INDEX idx_articles_year           ON Articles(year);
CREATE INDEX idx_articleauthors_author   ON ArticleAuthors(author_id);
CREATE INDEX idx_articlekeywords_keyword ON ArticleKeywords(keyword_id);
