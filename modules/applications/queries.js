module.exports = {
  init: 'CREATE TABLE IF NOT EXISTS applications(id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, location TEXT, field TEXT NOT NULL, portfolio TEXT, comments TEXT NOT NULL, submitted_at TIMESTAMP DEFAULT NOW(), response BOOL, response_at TIMESTAMP, response_by TEXT)',
  insert: 'INSERT INTO applications(name, email, location, field, portfolio, comments) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
  update: 'UPDATE applications SET response = $2, response_at = NOW(), response_by = $3 WHERE id = $1 RETURNING email',
  uniqueEmail: 'SELECT * FROM applications WHERE email = $1',
};
