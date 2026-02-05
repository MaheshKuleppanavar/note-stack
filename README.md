# 📝 NoteStack

## 📌 Overview

This project implements a **minimal yet intelligent Notes Backend API** as per the assignment requirements provided by *The Skill Guru Foundation*.  

It is built using **Node.js, Express, and MongoDB (Mongoose)** and includes:

- Proper validation  
- Smart search functionality  
- Rate limiting  
- Sorted retrieval  
- Partial updates  
- Meaningful responses  
- Minimal responsive UI (Bootstrap) **only for testing the API locally**

> ⚠️ **Note:** The project is not hosted online, as the assignment did not require deployment. All instructions below explain how to run and test it **locally**.

---

## ✅ Core Features Implemented (As per Assignment)

### **1️⃣ Create a Note — `POST /notes`**

**Request Body:**
```json
{
  "title": "Meeting Notes",
  "content": "Discussed hiring plan and deadlines"
},
{
  "title": "Project Update",
  "content": "Completed frontend design and fixed bugs"
}

````

**Rules implemented:**

* ✔ `title` is required
* ✔ `content` is required
* ✔ Trims extra spaces
* ✔ Rejects empty strings like `"   "`

---

### **2️⃣ Get All Notes — `GET /notes`**

Returns:

* ✔ List of all notes
* ✔ Sorted by **most recently updated first** (`updatedAt: -1`)

---

### **3️⃣ Update a Note — `PUT /notes/:id`**

**Rules implemented:**

* ✔ Partial updates allowed
* ✔ If update does NOT change anything → returns a meaningful response
* ✔ `updated_at` field updates automatically (via Mongoose timestamps)

---

### **4️⃣ Search Notes — `GET /notes/search?q=meeting`**

Example:

```
GET /notes/search?q=meeting
```

**Rules implemented:**

* ✔ Searches in both **title and content**
* ✔ Case-insensitive
* ✔ Ignores extra spaces
* ✔ `"Meet"` matches `"meeting"` (Regex-based partial match)
* ✔ Returns error if query is empty

---

### **5️⃣ Rate Limiting**

* ✔ Maximum **5 note creations per minute**
* Applied only to:

```
POST /notes
```

Returns `429 Too Many Requests` if exceeded.

---

## 🖥️ Minimal UI (For Testing Only)

A simple **Bootstrap-based responsive UI** is provided to:

* View all notes
* Create new notes
* Edit notes
* Delete notes
* Search notes

Works across:

* Mobile
* Tablet
* Laptop / Desktop

> This UI is only for **local testing of API endpoints**, not part of core evaluation.

---

## 🛠️ Tech Stack

| Technology         | Version      |
| ------------------ | ------------ |
| Node.js            | **v20.20.0** |
| MongoDB            | **v7.0.26**  |
| Express            | 5.2.1        |
| Mongoose           | 9.1.5        |
| EJS                | 4.0.1        |
| EJS-Mate           | 4.0.0        |
| Joi                | 18.0.2       |
| express-rate-limit | 8.2.1        |
| method-override    | 3.0.0        |
| Bootstrap          | CDN          |

---

## 📂 API Endpoints Summary

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/notes`           | Create a new note                       |
| GET    | `/notes`           | Get all notes (sorted by latest update) |
| PUT    | `/notes/:id`       | Update a note (partial allowed)         |
| DELETE | `/notes/:id`       | Delete a note                           |
| GET    | `/notes/search?q=` | Search notes                            |

---

# ▶️ How to Run & Test the Project Locally

Since the project is **not hosted**, follow these steps to run and test it on your machine.

### **1️⃣ Prerequisites**

Ensure you have installed:

* **Node.js v20.20.0**
* **MongoDB v7.0.26**
* **Git**

---

### **2️⃣ Clone the Repository**

```bash
git clone https://github.com/MaheshKuleppanavar/note-stack.git

cd skill-guru
```

---

### **3️⃣ Install Dependencies**

```bash
npm install
```

This will install:

* express
* mongoose
* ejs
* ejs-mate
* joi
* express-rate-limit
* method-override

---

### **4️⃣ Start MongoDB (Local)**

Make sure MongoDB is running:

```bash
mongod
```

OR open **MongoDB Compass** and connect to:

```
mongodb://127.0.0.1:27017
```

---

### **5️⃣ Run the Server**

```bash
node app.js
```

Server will start at:

```
http://localhost:3000
```

---

## 🧪 Testing the API

### **Option A — Using Postman / Hoppscotch (Recommended)**

#### ✅ Create Note

```
POST http://localhost:3000/notes
Content-Type: application/json

{
  "title": "Meeting Notes",
  "content": "Discussed hiring plan and deadlines"
}
```

#### ✅ Get All Notes

```
GET http://localhost:3000/notes
```

#### ✅ Update Note (Partial Update)

```
PUT http://localhost:3000/notes/{id}
Content-Type: application/json

{
  "content": "Updated content only"
}
```

#### ✅ Search Notes

```
GET http://localhost:3000/notes/search?q=meeting
```

---

### **Option B — Using the Browser (Minimal UI)**

Open in your browser:

```
http://localhost:3000/notes
```

From here you can:

* View all notes
* Create a note
* Edit a note
* Delete a note
* Search notes using the search bar

(Responsive across all devices)

---

## 🚦 Rate Limit Behavior

If more than **5 notes are created in one minute**, the API will return:

```
429 Too Many Requests
```

You must wait 1 minute before creating more notes.

---

## ✅ Final Conclusion

This project successfully meets all the requirements provided by **The Skill Guru Foundation**, including:

* Smart validation
* Intelligent search
* Proper rate limiting
* Sorted retrieval
* Partial updates
* Minimal responsive UI for testing

---

### 👤 Submitted by:

**Chetan**

```


