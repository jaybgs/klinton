import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT ?? 4000);
const dataFile = join(dirname(fileURLToPath(import.meta.url)), "data", "published-content.json");

const readBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
};

const readPublishedContent = async () => {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"));
  } catch {
    return null;
  }
};

const writePublishedContent = async (content) => {
  await mkdir(dirname(dataFile), { recursive: true });
  await writeFile(
    dataFile,
    JSON.stringify(
      {
        ...content,
        publishedAt: new Date().toISOString()
      },
      null,
      2
    )
  );
};

const json = (response, status, body) => {
  response.writeHead(status, {
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(body));
};

const server = createServer(async (request, response) => {
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
      status: "placeholder"
    });
    return;
  }

  if (url.pathname === "/api/content" && request.method === "GET") {
    json(response, 200, {
      content: await readPublishedContent()
    });
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

server.listen(port, () => {
  console.log(`Nadon backend listening on http://localhost:${port}`);
});
