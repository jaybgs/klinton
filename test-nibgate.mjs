import { createCircleGatewayServer } from "@nibgate/sdk/server";

const nibgate = createCircleGatewayServer({
  origin: "http://localhost:5000",
  secret: "dev_secret_key_123",
  network: "eip155:5042002"
});

const resource = {
  id: "wedding_0",
  title: "Test",
  type: "gallery",
  price: "5.00",
  currency: "USDC",
  recipient: "0x0000000000000000000000000000000000000000",
  path: "/hannah-and-max-wedding-gallery",
  url: "http://localhost:5000/hannah-and-max-wedding-gallery",
  access: { humans: "paid", agents: "paid" },
  unlock: { mode: "one_time" }
};

const request = new Request("http://localhost:5000/api/nibgate/access?path=/hannah-and-max-wedding-gallery");

async function test() {
  try {
    const res = await nibgate.accessResponse(request, resource, () => {
      return new Response(JSON.stringify({ galleryImages: [] }));
    });
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
  } catch (err) {
    console.error("Caught error:", err);
  }
}

test();
