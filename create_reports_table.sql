
CREATE TABLE IF NOT EXISTS ai_diagnosis (
  id SERIAL PRIMARY KEY,
  elevator_id VARCHAR(50),
  question TEXT,
  ai_response TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
