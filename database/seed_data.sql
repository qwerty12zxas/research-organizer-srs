INSERT INTO Users (username, email) VALUES
('vlad', 'vlad@example.com');

INSERT INTO Authors (full_name, orcid) VALUES
('Ivan Petrov', '0000-0002-1825-0097'),
('Maria Sokolova', '0000-0001-2345-6789');

INSERT INTO Articles (title, year, doi, url) VALUES
('Graph-based Keyword Extraction', 2024, '10.1000/jds.2024.001', 'https://example.org/graph'),
('Annotation Workflows', 2025, NULL, 'https://example.org/annot');

INSERT INTO ArticleAuthors (article_id, author_id, author_order) VALUES
(1, 1, 1), (1, 2, 2),
(2, 2, 1);

INSERT INTO Keywords (keyword) VALUES
('keyword extraction'), ('graph'), ('annotation');

INSERT INTO ArticleKeywords (article_id, keyword_id) VALUES
(1, 1), (1, 2),
(2, 3);
