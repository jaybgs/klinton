import { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { getPublishedContent } from "../published-content";
import {
  SiteAboutPage,
  SiteContactPage,
  SiteInteriorPage,
  SiteLegalPage,
  SiteStudiosPage,
  SiteWeddingGalleryPage,
  SiteWeddingsPage
} from "../site-template";
import { legalPages, pages, site } from "../site-data";
import {
  findStudioPortfolioCategory,
  findWeddingGallery,
  studioPortfolioSlugs,
  weddingGallerySlugs
} from "../site-template";

const allPageSlugs = pages.flatMap((page) => [page.slug, ...(page.aliases ?? [])]);
const legalPageSlugs = Object.keys(legalPages);

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...allPageSlugs, ...legalPageSlugs, ...weddingGallerySlugs, ...studioPortfolioSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug || item.aliases?.includes(slug));
  const legalPage = legalPages[slug as keyof typeof legalPages];
  const weddingGallery = findWeddingGallery(slug);
  const studioCategory = findStudioPortfolioCategory(slug);

  if (studioCategory) {
    return {
      title: `${studioCategory.title} Studio Gallery | ${site.name}`
    };
  }

  if (weddingGallery) {
    return {
      title: `${weddingGallery.name} Wedding Gallery | ${site.name}`
    };
  }

  if (page) {
    return {
      title: `${page.title} | ${site.name}`
    };
  }

  return legalPage ? { title: `${legalPage.title} | ${site.name}` } : {};
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const publishedContent = await getPublishedContent();
  const page = pages.find((item) => item.slug === slug || item.aliases?.includes(slug));
  const legalPage = legalPages[slug as keyof typeof legalPages];
  const weddingGallery = findWeddingGallery(slug);
  const studioCategory = findStudioPortfolioCategory(slug);

  if (studioCategory) {
    redirect(studioCategory.href);
  }

  if (weddingGallery) {
    return <SiteWeddingGalleryPage gallery={weddingGallery} publishedContent={publishedContent} />;
  }

  if (page) {
    if (page.slug === "about") {
      return <SiteAboutPage />;
    }

    if (page.slug === "portfolio") {
      return <SiteWeddingsPage publishedContent={publishedContent} />;
    }

    if (page.slug === "booking") {
      return <SiteContactPage />;
    }

    if (page.slug === "studios") {
      return <SiteStudiosPage publishedContent={publishedContent} />;
    }

    return <SiteInteriorPage page={page} />;
  }

  if (legalPage) {
    return <SiteLegalPage page={legalPage} />;
  }

  notFound();
}
