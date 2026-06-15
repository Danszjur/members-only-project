const pool = require("./pool");

//-------------------| authentication |----------------------

async function createUser(firstname, lastname, username, password_hash) {
  const query = `
  INSERT INTO users (first_name, last_name, username, password_hash)
  VALUES ($1, $2, $3, $4)
  RETURNING id, first_name, last_name, username, password_hash, is_member, is_admin
  `;

  const values = [firstname, lastname, username, password_hash];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

async function getUserByusername(username) {
  const query = `
  SELECT *
  FROM users
  WHERE username = $1
  `;

  const { rows } = await pool.query(query, [username]);

  return rows[0];
}

//-------------------| memmbers |----------------------

async function getUserById(id) {
  const query = `
  SELECT id, first_name, last_name, username, is_member, is_admin
  FROM users
  WHERE id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

async function updateUserMembership(userId) {
  const query = `
  UPDATE users
  SET is_member = true
  WHERE id = $1
  RETURNING id, first_name, last_name, username, is_member, is_admin
  `;
  const { rows } = await pool.query(query, [userId]);

  return rows[0];
}

//-------------------| messages |----------------------

async function createMessage(title, text, userId) {
  const query = `
  INSERT INTO messages(title, text, user_id)
  VALUES ($1, $2, $3)
  RETURNING id, title, text, created_at, user_id
  `;

  const { rows } = await pool.query(query, [title, text, userId]);

  return rows[0];
}

async function getAllMessages() {
  const query = `
  SELECT
  messages.id,
  messages.title,
  messages.text,
  messages.created_at,
  users.first_name,
  users.last_name
  FROM messages
  JOIN users ON messages.user_id = users.id
  ORDER BY messages.created_at DESC
  `;
  const { rows } = await pool.query(query);

  return rows;
}

//-------------------| admin |----------------------

async function updateUserAdmin(userId) {
  const query = `
  UPDATE users
  SET is_admin = true
  WHERE id = $1
  RETURNING id, first_name, last_name, username, is_member, is_admin`;

  const { rows } = await pool.query(query, [userId]);

  return rows[0];
}

async function deleteMessage(messageId) {
  const query = `
  DELETE FROM messages
  WHERE id = $1`;

  await pool.query(query, [messageId]);
}

module.exports = {
  createUser,
  getUserByusername,
  getUserById,
  updateUserMembership,
  createMessage,
  getAllMessages,
  updateUserAdmin,
  deleteMessage,
};
