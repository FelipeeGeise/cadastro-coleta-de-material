import express from "express";
import cors from "cors";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// Configurar o servidor
const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao banco SQLite
let db;
async function initDb() {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Criar a tabela se não existir
  await db.run(`
    CREATE TABLE IF NOT EXISTS cadastros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      emitente TEXT,
      razao TEXT,
      foto TEXT,
      data TEXT
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS cadastrosDestino (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empresa TEXT,
      foto TEXT,
      obs TEXT,
      data TEXT
    )
  `);
}
initDb();

// Rotas do CRUD

// CADASTRO COLETA
app.get("/cadastros", async (req, res) => {
  const cadastros = await db.all("SELECT * FROM cadastros");
  res.json(cadastros);
});

app.post("/cadastros", async (req, res) => {
  const { emitente, razao, foto, data } = req.body;
  const result = await db.run(
    "INSERT INTO cadastros (emitente, razao, foto, data) VALUES (?, ?, ?, ?)",
    [emitente, razao, foto, data]
  );
  res.json({ id: result.lastID });
});

// DELETE cadastro COLETA
app.delete("/cadastros/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.run("DELETE FROM cadastros WHERE id = ?", [id]);
    res.json({ message: "Cadastro excluído com sucesso!" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cadastro." });
  }
});

// CADASTRO DESTINO
app.get("/cadastrosDestino", async (req, res) => {
  const cadastrosDestino = await db.all("SELECT * FROM cadastrosDestino");
  res.json(cadastrosDestino);
});

app.post("/cadastrosDestino", async (req, res) => {
  const { empresa, foto, obs, data } = req.body;
  const result = await db.run(
    "INSERT INTO cadastrosDestino (empresa, foto, obs, data) VALUES (?, ?, ?, ?)",
    [empresa, foto, obs, data]
  );
  res.json({ id: result.lastID });
});

// DELETE cadastro DESTINO
app.delete("/cadastrosDestino/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.run("DELETE FROM cadastrosDestino WHERE id = ?", [id]);
    res.json({ message: "Cadastro destino excluído com sucesso!" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cadastro destino." });
  }
});

// Servidor escutando na porta 4000
app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
