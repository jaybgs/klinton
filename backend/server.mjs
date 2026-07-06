import { createServer } from "node:http";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

// Load .env for local development (on Render, env vars are injected directly)
try { config(); } catch {}


const port = Number(process.env.PORT ?? 4000);
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "klinton";
const collectionName = "published_content";

// --- MongoDB connection ---
let client;
let db;

async function getDb() {
  if (!db) {
    if (!mongoUri) throw new Error("MONGODB_URI environment variable is not set");
    const newClient = new MongoClient(mongoUri);
    await newClient.connect();
    client = newClient;
    db = client.db(dbName);
    console.log(`Connected to MongoDB: ${dbName}`);
  }
  return db;
}

// --- Content helpers ---
async function readPublishedContent() {
  try {
    const database = await getDb();
    const doc = await database.collection(collectionName).findOne({ _id: "main" });
    if (!doc) return null;
    const { _id, ...content } = doc;
    return content;
  } catch (err) {
    console.error("readPublishedContent error:", err);
    return null;
  }
}

async function writePublishedContent(content) {
  const database = await getDb();
  await database.collection(collectionName).replaceOne(
    { _id: "main" },
    { _id: "main", ...content, publishedAt: new Date().toISOString() },
    { upsert: true }
  );
}

// --- HTTP helpers ---
const readBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
};

const json = (response, status, body) => {
  const origin = response.req?.headers?.origin || "*";
  response.writeHead(status, {
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? origin,
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(body));
};

// --- Server ---
const server = createServer(async (request, response) => {
  response.req = request;

  if (request.method === "OPTIONS") {
    json(response, 204, {});
    return;
  }

  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (url.pathname === "/health") {
    json(response, 200, { ok: true, service: "nadon-backend" });
    return;
  }

  if (url.pathname === "/api/admin/config") {
    json(response, 200, {
      limits: {
        homeGalleryImages: 20,
        homeCarouselImages: 10,
        studioGalleryImages: 50
      },
      status: "ok"
    });
    return;
  }

  if (url.pathname === "/api/content" && request.method === "GET") {
    json(response, 200, { content: await readPublishedContent() });
    return;
  }

  if (url.pathname === "/api/content" && request.method === "PUT") {
    try {
      const body = await readBody(request);
      const payload = JSON.parse(body || "{}");
      await writePublishedContent(payload);
      json(response, 200, { ok: true, publishedAt: new Date().toISOString() });
    } catch (error) {
      json(response, 400, {
        error: "Invalid publish payload",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
    return;
  }

  json(response, 404, { error: "Not found" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Nadon backend listening on http://0.0.0.0:${port}`);
});
