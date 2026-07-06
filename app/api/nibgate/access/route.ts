import { createCircleGatewayServer } from "@nibgate/sdk/server";
import { generateResources } from "../../../nibgate-utils";

const nibgate = createCircleGatewayServer({
  origin: process.env.NIBGATE_SITE_ORIGIN || "http://localhost:3000",
  secret: process.env.NIBGATE_SECRET || "dev_secret_key_123",
  network: process.env.NIBGATE_PAYMENT_NETWORK || "eip155:5042002"
});

export async function GET(request: Request) {
  try {
    const { resources, publishedContent } = await generateResources();
    const url = new URL(request.url);
    const resourcePath = url.searchParams.get("path");
    
    const resource = resources.find(r => r.path === resourcePath);
    if (!resource) {
      return new Response("Not found or not gated", { status: 404 });
    }

    const response = await nibgate.accessResponse(request, resource, () => {
      let galleryImages: any[] = [];
      if (resource.id.startsWith("wedding_")) {
        const index = parseInt(resource.id.replace("wedding_", ""));
        galleryImages = publishedContent?.weddingGalleries?.[index]?.galleryImages || [];
      } else if (resource.id.startsWith("studio_")) {
        const index = parseInt(resource.id.replace("studio_", ""));
        galleryImages = publishedContent?.studioGalleries?.[index]?.galleryImages || [];
      }

      return new Response(JSON.stringify({ galleryImages }), {
        headers: { "content-type": "application/json; charset=utf-8" }
      });
    });
    return response;
  } catch (error) {
    console.error("ACCESS ROUTE ERROR:", error);
    return new Response(String(error), { status: 500 });
  }
}
