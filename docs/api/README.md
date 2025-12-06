# 📚 Research Organizer API Documentation  
Документация для тестирования API научных статей, выполненная в рамках лабораторной работы №6 (Postman + Mock Server).

---

## 🔗 Mock Server URL
Все запросы отправляются на mock-сервер Postman:

```
https://551df202-b9c0-4143-9bdb-99fdc80c6ab8.mock.pstmn.io
```

Используется через переменную окружения:

```
{{base_url}}
```

---

# 📂 API ENDPOINTS

Ниже указаны все эндпоинты, которые ты создал в Postman.

---

# 🔐 Authentication

## ▶️ POST `/auth/login`
Авторизация пользователя по username/password.

### **Успешный Example: Success – Login**
```
POST {{base_url}}/auth/login?username=vlad
```

Response **200 OK**:
```json
{
  "token": "mocked_jwt_token_123",
  "user_id": 1,
  "username": "vlad",
  "message": "Login successful"
}
```

### **Ошибка Example: Error – Invalid credentials**
```
POST {{base_url}}/auth/login?username=vlad1
```

Response **401 Unauthorized**:
```json
{
  "error": "Invalid credentials",
  "code": "AUTH_ERROR"
}
```

---

# 📄 Articles

Коллекция статей научной библиотеки.

---

## ▶️ GET `/articles`
Получить список статей.

### Example: Success — With articles
Response **200 OK**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Deep Learning for Logistics",
      "abstract": "Overview of using neural networks for transport optimization.",
      "year": 2023,
      "doi": "10.1234/dl-logistics-2023",
      "collection_id": 1,
      "is_favorite": true,
      "created_at": "2025-12-01T10:00:00Z"
    },
    {
      "id": 2,
      "title": "Supply Chain Resilience in Russia",
      "abstract": "Case study of regional logistics hubs and multimodal flows.",
      "year": 2022,
      "doi": "10.5678/scr-ru-2022",
      "collection_id": 2,
      "is_favorite": false,
      "created_at": "2025-11-20T14:30:00Z"
    }
  ]
}
```

### Example: Success – Empty list
```json
{
  "articles": []
}
```

---

## ▶️ POST `/articles`
Создать новую статью.

### Request Body
```json
{
  "title": "Новая статья по логистике",
  "abstract": "Краткое описание статьи для ResearchOrganizer.",
  "status": "draft",
  "collection_id": 1,
  "keywords": ["logistics", "ports", "research"]
}
```

### Example: Success – Created (201)
```json
{
  "article_id": 3,
  "message": "Article created successfully",
  "created_at": "2025-12-01T09:00:00Z"
}
```

### Example: Error – Validation failed (400)
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "title": "Title is required"
  }
}
```

---

## ▶️ PATCH `/articles/?id=1`
Обновление данных статьи.

### Request Body
```json
{
  "status": "published",
  "collection_id": 2,
  "title": "Новая версия статьи по логистике"
}
```

### Example: Success – Article updated
```json
{
  "message": "Article updated"
}
```

### Example: Error – Article not found (404)
```json
{
  "error": "Article not found"
}
```

---

## ▶️ DELETE `/articles/?id=1`
Удаление статьи.

### Example: Success – Article deleted
```json
{
  "message": "Article deleted"
}
```

### Example: Error – Article not found
```json
{
  "error": "Article not found"
}
```

---

# 📦 Collections

---

## ▶️ GET `/collections`
Получить список коллекций научных статей.

### Example: Success — Collections list
```json
{
  "collections": [
    {
      "id": 1,
      "name": "Основные статьи по логистике",
      "description": "Подборка ключевых статей для диплома.",
      "articles_count": 12
    },
    {
      "id": 2,
      "name": "API и тестирование",
      "description": "Статьи про REST, Postman и mock-сервера.",
      "articles_count": 7
    }
  ]
}
```

### Example: Empty collections
```json
{
  "collections": []
}
```

---

# 🧪 AUTOMATED TESTS (описание того, что сделано)

---

## 🔐 Login tests
Проверяют:
- статус 200
- наличие токена
- сохранение user_id в окружение

---

## 📄 Get Articles tests
Проверяют:
- статус 200  
- наличие массива `articles`
- сохранение `article_id` при наличии

---

## ➕ Create Article tests
Проверяют:
- статус 201  
- наличие `article_id`  
- сообщение `"created"`

---

## ✏️ Update Article tests
Проверяют:
- статус 200  
- наличие сообщения `"updated"`

---

## ❌ Delete Article tests
Проверяют:
- статус 200  
- наличие `"deleted"`

---

# 📁 Файлы, которые должны быть в репозитории

```
docs/api/README.md                ← этот файл
postman/ResearchOrganizer_API_Collection.json
postman/ResearchOrganizer_Local_Environment.json
```

---

# ✔️ Лабораторная работа №6 выполнена
Документация составлена полностью под твой проект **Research Organizer**, включает:

- mock-server  
- структура эндпоинтов  
- примеры success/ошибок  
- тесты  
- реальные данные твоих сценариев  

Готово для отправки преподавателю.  
