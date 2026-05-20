import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedContent } from "../../published-content";
import { site } from "../../site-data";
import {
  findStudioPortfolioCategory,
  SiteStudioPortfolioGalleryPage,
  studioPortfolioSlugs
} from "../../site-template";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return studioPortfolioSlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const studioCategory = findStudioPortfolioCategory(category);

  return studioCategory ? { title: `${studioCategory.title} Studio Gallery | ${site.name}` } : {};
}

export default async function StudioCategoryPage({ params }: Props) {
  const { category } = await params;
  const publishedContent = await getPublishedContent();
  const studioCategory = findStudioPortfolioCategory(category);

  if (!studioCategory) {
    notFound();
  }

  return <SiteStudioPortfolioGalleryPage category={studioCategory} publishedContent={publishedContent} />;
}
