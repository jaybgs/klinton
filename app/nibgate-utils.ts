import { getPublishedContent } from "./published-content";
import { weddingGalleries, studioPortfolioCategories } from "./site-template";

export async function generateResources() {
  const publishedContent = await getPublishedContent();
  const resources: any[] = [];

  weddingGalleries.forEach((gallery, index) => {
    const pub = publishedContent?.weddingGalleries?.[index];
    if (pub?.isGated) {
      let imageUrl = pub.coverImage?.src;
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
        imageUrl = `${process.env.NIBGATE_SITE_ORIGIN || "http://localhost:5000"}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }
      resources.push({
        id: `wedding_${index}`,
        title: pub.name || gallery.name,
        type: "image",
        imageUrl,
        price: pub.price || "5.00",
        currency: "USDC",
        recipient: publishedContent?.nibgateWallet || "0x0000000000000000000000000000000000000000",
        path: gallery.href,
        url: `${process.env.NIBGATE_SITE_ORIGIN || "http://localhost:5000"}${gallery.href}`,
        access: { humans: "paid" as const, agents: "paid" as const },
        unlock: { mode: "one_time" }
      });
    }
  });

  studioPortfolioCategories.forEach((category, index) => {
    const pub = publishedContent?.studioGalleries?.[index];
    if (pub?.isGated) {
      let imageUrl = pub.coverImage?.src;
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
        imageUrl = `${process.env.NIBGATE_SITE_ORIGIN || "http://localhost:5000"}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }
      resources.push({
        id: `studio_${index}`,
        title: `${category.title} Studio Gallery`,
        type: "image",
        imageUrl,
        price: pub.price || "3.00",
        currency: "USDC",
        recipient: publishedContent?.nibgateWallet || "0x0000000000000000000000000000000000000000",
        path: category.href,
        url: `${process.env.NIBGATE_SITE_ORIGIN || "http://localhost:5000"}${category.href}`,
        access: { humans: "paid" as const, agents: "paid" as const },
        unlock: { mode: "one_time" }
      });
    }
  });

  return { resources, publishedContent };
}
