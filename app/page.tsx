import { getPublishedContent } from "./published-content";
import { SiteHomePage } from "./site-template";

export default async function Home() {
  const publishedContent = await getPublishedContent();

  return <SiteHomePage publishedContent={publishedContent} />;
}
