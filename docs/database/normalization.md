# ЛР-4. Проектирование и нормализация БД (вариант: «Органайзер научных статей»)

## Шаг 1. Анализ предметной области
Минимальный вариант: пользователи добавляют статьи; у статьи много авторов (M:N); у статьи много ключевых слов (M:N).

## Шаг 2. Концептуальная ER-модель
См. `docs/database/ERD_concept.png`.

## Шаг 3. Логическая модель и нормализация до 3НФ
- 1NF: все атрибуты атомарны; авторы/ключевые слова вынесены в отдельные таблицы, связи M:N — через `ArticleAuthors` и `ArticleKeywords`.
- 2NF: неключевые атрибуты зависят от полного первичного ключа (в связках PK составной).
- 3NF: транзитивных зависимостей нет — каждая таблица хранит только свои атрибуты.
- DDL: `database/schema.sql` (SQLite, с PK/FK и индексами).
- Итоговая ER 3НФ: `docs/database/ERD_3NF.png`.

## Проверочные запросы
```sql
-- Авторы по статьям
SELECT a.article_id, a.title, au.full_name, aa.author_order
FROM Articles a
JOIN ArticleAuthors aa ON aa.article_id = a.article_id
JOIN Authors au ON au.author_id = aa.author_id
ORDER BY a.article_id, aa.author_order;

-- Ключевые слова по статьям
SELECT a.title, GROUP_CONCAT(k.keyword) AS keywords
FROM Articles a
JOIN ArticleKeywords ak ON ak.article_id = a.article_id
JOIN Keywords k ON k.keyword_id = ak.keyword_id
GROUP BY a.article_id;
