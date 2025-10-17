# 💬 Forum Application in React using REST Exercise

This project is a simple **Forum Web Application** built using **React (Vite)** and **Material UI**, designed to interact with a set of provided RESTful APIs.  
It allows users to register, log in, view posts, create new posts, reply to existing posts, and delete posts — all through real API calls.

---

## 🧩 Features

- **User Registration & Login** (with API authentication)  
- **View Forum Posts** (paginated)  
- **Create New Posts**  
- **Reply to Posts**  
- **Delete Posts**  
- **Responsive UI using Material UI**  
- **Built with React + Vite for fast development**

---

## 🛠 Tech Stack

- **Frontend:** React + Vite  
- **UI Framework:** Material UI  
- **Language:** JavaScript (ES6+)  
- **Backend:** RESTful API (PHP-based endpoints provided by hyeumine.com)

---

## 🌐 API Endpoints Used

| Function | URL | Method | Parameters |
|-----------|------|---------|-------------|
| Get all posts | `http://hyeumine.com/forumGetPosts.php` | GET | `page` |
| Create new user | `http://hyeumine.com/forumCreateUser.php` | POST | `username`, `password` |
| User login | `http://hyeumine.com/forumLogin.php` | POST | `username`, `password` |
| Create new post | `http://hyeumine.com/forumNewPost.php` | POST | `id`, `post` |
| Delete post | `http://hyeumine.com/forumDeletePost.php` | GET | `id` |
| Reply to post | `http://hyeumine.com/forumReplyPost.php` | POST | `user_id`, `post_id`, `reply` |

---

## 🚀 Setup & Run Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/forum-app-react.git
```

### 2. Navigate to the Project Folder
```bash
cd my-react-forumapp
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Install Material UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### 5. Run the Development Server
```bash
npm run dev
```

### 6. Open in Browser
Go to 👉 [http://localhost:5173](http://localhost:5173)

---

## 🧠 Notes
- The app uses public REST APIs from [hyeumine.com](http://hyeumine.com).  
- No authentication tokens are stored — credentials are checked per session.  
- You may need to refresh after creating or deleting posts to see updates.

---

## 📦 Folder Structure (Simplified)
```
my-react-forumapp/
│
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForumList.jsx
│   │   ├── PostForm.jsx
│   │   ├── Replies.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🙏 Acknowledgments

- **Material UI** for the component library  
- **React team** for the amazing framework  
- **hyeumine.com** for providing the RESTful API endpoints  

---

## Happy Coding! 💻
