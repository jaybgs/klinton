import { manifestResponse } from "@nibgate/sdk/server";
import { generateResources } from "../nibgate-utils";

export async function GET() {
  const { resources } = await generateResources();
  return manifestResponse({
    origin: process.env.NIBGATE_SITE_ORIGIN || "http://localhost:5000",
    resources
  });
}
