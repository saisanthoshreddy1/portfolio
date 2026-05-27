# 🚀 Personal Portfolio — Node.js + PostgreSQL

A clean, full-stack personal portfolio website built with:

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL (raw SQL via `pg` — no ORM)

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html      ← Single-page frontend
│   ├── style.css       ← Dark theme styling
│   └── script.js       ← API fetch + DOM rendering
├── server.js           ← Express server + API routes
├── db.js               ← PostgreSQL connection pool
├── schema.sql          ← CREATE TABLE statements
├── seed.sql            ← Sample data
├── .env.example        ← Environment variable template
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Create the PostgreSQL database and tables

Make sure PostgreSQL is running, then:

```bash
# Create the database
psql -U your_pg_user -c "CREATE DATABASE portfolio_db;"

# Run schema (creates tables)
psql -U your_pg_user -d portfolio_db -f schema.sql
```

### 3. Insert seed data

```bash
psql -U your_pg_user -d portfolio_db -f seed.sql
```

### 4. Install dependencies

```bash
npm install
```

### 5. Create your `.env` file

```bash
cp .env.example .env
```

Then open `.env` and fill in your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_NAME=portfolio_db
PORT=3000
```

### 6. Start the server

```bash
node server.js
```

Then open **http://localhost:3000** in your browser.

> **Tip:** For auto-restart during development, use:
> ```bash
> npm run dev
> ```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description                         |
|--------|-----------------|-------------------------------------|
| GET    | `/api/projects` | Fetch all projects (newest first)   |
| GET    | `/api/skills`   | Fetch all skills (grouped by cat.)  |
| POST   | `/api/contact`  | Submit a contact message            |

### POST `/api/contact` — Request body

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Let's work together!"
}
```

---

## 🎨 Customisation

1. **Change your name/bio** — Edit `public/index.html` in the `#hero` section
2. **Add real projects** — Insert rows into the `projects` table via `psql`
3. **Add more skills** — Insert rows into the `skills` table
4. **Change accent color** — Edit `--accent` in `public/style.css`
5. **Update contact links** — Edit the `contact-info` block in `index.html`

---

## 🚢 Deployment

### Vercel / Netlify (Frontend only)
If you want to deploy just the static frontend, put your `public/` folder contents in the root.

### Railway / Render / Heroku (Full-stack)
1. Push your repo to GitHub
2. Create a new project on [Railway](https://railway.app) or [Render](https://render.com)
3. Add a PostgreSQL plugin/addon
4. Set the environment variables from your `.env`
5. Set the start command to `node server.js`

---

## 📦 Dependencies

| Package  | Purpose                          |
|----------|----------------------------------|
| express  | HTTP server and routing          |
| pg       | PostgreSQL client (raw SQL)      |
| dotenv   | Load `.env` environment variables|
| cors     | Cross-origin request support     |
| nodemon  | Auto-restart in development      |

---

## 📄 License

MIT — free to use and modify for your own portfolio.
