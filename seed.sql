-- seed.sql
-- Run AFTER schema.sql to populate the database with sample data:
--   psql -U your_pg_user -d portfolio_db -f seed.sql

-- ─── Sample Skills ─────────────────────────────────────────────────────────────
INSERT INTO skills (name, category, level) VALUES
  ('HTML',          'Frontend',  'Advanced'),
  ('CSS',           'Frontend',  'Advanced'),
  ('JavaScript',    'Frontend',  'Advanced'),
  ('Node.js',       'Backend',   'Intermediate'),
  ('Express.js',    'Backend',   'Intermediate'),
  ('PostgreSQL',    'Database',  'Intermediate'),
  ('Git & GitHub',  'Tools',     'Advanced'),
  ('REST APIs',     'Backend',   'Intermediate');

-- ─── Sample Projects ───────────────────────────────────────────────────────────
INSERT INTO projects (title, description, tech_stack, github_url, live_url) VALUES
  (
    'Portfolio Website',
    'A full-stack personal portfolio to showcase projects and skills, built with Node.js, Express, and PostgreSQL using raw SQL queries.',
    'HTML, CSS, JavaScript, Node.js, Express.js, PostgreSQL',
    'https://github.com/yourusername/portfolio',
    'https://yourportfolio.com'
  ),
  (
    'Task Manager App',
    'A productivity web app that lets users create, update, and delete tasks with priority levels and due dates. Features user authentication and persistent storage.',
    'Node.js, Express.js, PostgreSQL, HTML, CSS',
    'https://github.com/yourusername/task-manager',
    'https://mytaskapp.netlify.app'
  ),
  (
    'Weather Dashboard',
    'A real-time weather dashboard that fetches data from the OpenWeatherMap API and displays temperature, humidity, wind speed, and a 5-day forecast for any city.',
    'HTML, CSS, JavaScript, OpenWeatherMap API',
    'https://github.com/yourusername/weather-dashboard',
    'https://myweatherapp.netlify.app'
  );
