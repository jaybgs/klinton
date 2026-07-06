"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./admin/admin.module.css";
import { footerImages, images, testimonials } from "./site-data";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

type PublishedImage = {
  aspectRatio?: number;
  height?: number;
  name?: string;
  size?: number;
  src: string;
  type?: string;
  width?: number;
};

type PublishedContent = {
  nibgateWallet?: string;
  footerImages?: (PublishedImage | null)[];
  homeCarouselImages?: PublishedImage[];
  homeGalleryImages?: PublishedImage[];
  publishedAt?: string;
  studioGalleries?: {
    coverImage?: PublishedImage | null;
    galleryImages?: PublishedImage[];
    name?: string;
    isGated?: boolean;
    price?: string;
    isRated?: boolean;
  }[];
  testimonials?: {
    context?: string;
    image?: PublishedImage | null;
    name?: string;
    quote?: string;
  }[];
  weddingGalleries?: {
    coverImage?: PublishedImage | null;
    galleryImages?: PublishedImage[];
    location?: string;
    name?: string;
    story?: string;
    isGated?: boolean;
    price?: string;
    isRated?: boolean;
  }[];
};

const weddingStoryOne =
  "A luminous celebration told through quiet gestures, open laughter, and the kind of in-between moments that make a wedding feel completely personal.";
const studioGalleries = [
  {
    name: "Family",
    src: images.studioProfile
  },
  {
    name: "Couples",
    src: images.couple
  },
  {
    name: "Birthdays",
    src: images.studioBackdrop
  },
  {
    name: "Portraits",
    src: images.portrait
  }
];
const weddingGalleries = [
  {
    name: "Sara & Mark",
    location: "Lake Hawea, New Zealand",
    src: "https://static.showit.co/800/yLtHnG13Di-hOtHA971m3A/334981/cassandra-ladru-wedding-photographer-58.jpg"
  },
  {
    name: "Anna & Jay",
    location: "Deux Belettes\nByron Bay Hinterland",
    src: "https://static.showit.co/800/JVw7q1DTFD4gjMfjpW6H5g/334981/anna-jay-wedding-gallery-cassandra-ladru-00003.jpg"
  },
  {
    name: "Carmel & Oliver",
    location: "Carthona House\nSydney",
    src: "https://static.showit.co/800/Vj9Rb8Y-kZXUi036-eJMww/334981/carmel-oliver-wedding-gallery-cassandra-ladru-00031.jpg"
  },
  {
    name: "Cassandra & James",
    location: "Gardens House\nMelbourne",
    src: "https://static.showit.co/800/zEf-BIuAO3K2VBcDEWgRvg/shared/cassandra-james-wedding-gallery-cassandra-ladru-00072.jpg"
  },
  {
    name: "Alexia & Michael",
    location: "Wallalong House\nWallalong, NSW",
    src: "https://static.showit.co/800/ZlZpaMjNFD0yDRi5X1T1XA/shared/alexia-michael-wedding-gallery-cassandra-ladru-00062.jpg"
  },
  {
    name: "Lauren & Nate",
    location: "MCA, Sydney",
    src: "https://static.showit.co/1200/fX8oxhBg-wntOR0ydk2fPA/334981/cassandra-ladru-wedding-photographer-102.jpg"
  },
  {
    name: "Hannah & Max",
    location: "The Brooklet\nByron Bay Hinterland",
    src: "https://static.showit.co/800/pFDsNQ_xn-ah54TQN9JBOg/shared/hannah-max-wedding-gallery-cassandra-ladru-00032.jpg"
  },
  {
    name: "Natalie & David",
    location: "Chateau de Tourreau\nProvence, France",
    src: "https://static.showit.co/1200/Tca2pqEOOE6kUOfmGYfNpg/shared/natalie-david-wedding-gallery-cassandra-ladru-00090.jpg"
  },
  {
    name: "Jordana & Sam",
    location: "Icebergs, Sydney",
    src: "https://static.showit.co/1200/JLa5SReLBLUQYporXzPyTQ/334981/cassandra-ladru-wedding-photographer-25.jpg"
  }
];

function UploadSlot({
  alt,
  index,
  label,
  name,
  src
}: {
  alt?: string;
  index: number;
  label: string;
  name: string;
  src?: string;
}) {
  const [previewSrc, setPreviewSrc] = useState(src);
  const [objectUrl, setObjectUrl] = useState("");

  useEffect(() => {
    setPreviewSrc(src);
  }, [src]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  function handlePreviewChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewSrc(src);
      return;
    }

    const nextObjectUrl = URL.createObjectURL(file);
    setObjectUrl((currentObjectUrl) => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }

      return nextObjectUrl;
    });
    setPreviewSrc(nextObjectUrl);
  }

  return (
    <label className={styles.uploadSlot}>
      <span className={styles.slotNumber}>{String(index + 1).padStart(2, "0")}</span>
      {previewSrc ? <img src={previewSrc} alt={alt ?? ""} /> : <span className={styles.emptyPreview}>Image</span>}
      <span className={styles.slotLabel}>{label}</span>
      <input name={name} type="file" accept="image/*" onChange={handlePreviewChange} />
    </label>
  );
}

export function AdminSite() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [publishedContent, setPublishedContent] = useState<PublishedContent | null>(null);
  const [contentVersion, setContentVersion] = useState(0);
  const [homeUploadCount, setHomeUploadCount] = useState(0);
  const [homeUploadError, setHomeUploadError] = useState("");
  const [carouselUploadCount, setCarouselUploadCount] = useState(0);
  const [carouselUploadError, setCarouselUploadError] = useState("");
  const [publishStatus, setPublishStatus] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const controller = new AbortController();

    async function loadPublishedContent() {
      try {
        const response = await fetch(`${backendUrl}/api/content`, {
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { content?: PublishedContent | null };
        setPublishedContent(data.content ?? null);
        setContentVersion((currentVersion) => currentVersion + 1);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    loadPublishedContent();

    return () => controller.abort();
  }, [isAuthenticated]);

  function markChanged() {
    setHasChanges(true);

    if (!isPublishing) {
      setPublishStatus("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.trim().toLowerCase() === "nadon" && password === "clinton") {
      setIsAuthenticated(true);
      setError("");
      return;
    }

    setError("Wrong username or password.");
  }

  function handleHomeUploadChange(event: ChangeEvent<HTMLInputElement>) {
    markChanged();
    const fileCount = event.target.files?.length ?? 0;

    if (fileCount > 20) {
      event.target.value = "";
      setHomeUploadCount(0);
      setHomeUploadError("Choose 20 images or fewer for the homepage gallery.");
      return;
    }

    setHomeUploadCount(fileCount);
    setHomeUploadError("");
  }

  function handleCarouselUploadChange(event: ChangeEvent<HTMLInputElement>) {
    markChanged();
    const fileCount = event.target.files?.length ?? 0;

    if (fileCount > 10) {
      event.target.value = "";
      setCarouselUploadCount(0);
      setCarouselUploadError("Choose 10 images or fewer for the homepage carousel.");
      return;
    }

    setCarouselUploadCount(fileCount);
    setCarouselUploadError("");
  }

  function getImageDimensions(src: string): Promise<Pick<PublishedImage, "aspectRatio" | "height" | "width">> {
    return new Promise((resolve) => {
      const image = new Image();

      image.addEventListener("load", () => {
        const { naturalHeight, naturalWidth } = image;
        const aspectRatio = naturalWidth > 0 && naturalHeight > 0 ? naturalWidth / naturalHeight : undefined;

        resolve({
          aspectRatio,
          height: naturalHeight || undefined,
          width: naturalWidth || undefined
        });
      });
      image.addEventListener("error", () => resolve({}));
      image.src = src;
    });
  }

  async function filesFromForm(formData: FormData, name: string): Promise<PublishedImage[]> {
    const files = formData.getAll(name).filter((value): value is File => value instanceof File && value.size > 0);

    return Promise.all(
      files.map(
        (file) =>
          new Promise<PublishedImage>((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
              const src = String(reader.result);
              const dimensions = await getImageDimensions(src);

              resolve({
                ...dimensions,
                name: file.name,
                size: file.size,
                src,
                type: file.type
              });
            });
            reader.addEventListener("error", () => reject(reader.error));
            reader.readAsDataURL(file);
          })
      )
    );
  }

  async function fileFromForm(formData: FormData, name: string) {
    return (await filesFromForm(formData, name))[0] ?? null;
  }

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPublishing(true);
    setPublishStatus("Publishing...");

    try {
      const formData = new FormData(event.currentTarget);
      const nextHomeGalleryImages = await filesFromForm(formData, "home-gallery-images");
      const nextHomeCarouselImages = await filesFromForm(formData, "home-carousel-images");
      const payload: PublishedContent = {
        homeGalleryImages:
          nextHomeGalleryImages.length > 0 ? nextHomeGalleryImages : publishedContent?.homeGalleryImages ?? [],
        homeCarouselImages:
          nextHomeCarouselImages.length > 0 ? nextHomeCarouselImages : publishedContent?.homeCarouselImages ?? [],
        weddingGalleries: await Promise.all(
          weddingGalleries.map(async (gallery, index) => {
            const savedGallery = publishedContent?.weddingGalleries?.[index];
            const nextCoverImage = await fileFromForm(formData, `wedding-cover-${index + 1}`);
            const nextGalleryImages = await filesFromForm(formData, `wedding-gallery-images-${index + 1}`);

            return {
              name: String(formData.get(`wedding-name-${index + 1}`) || gallery.name),
              location: String(formData.get(`wedding-location-${index + 1}`) || gallery.location),
              story: String(formData.get(`wedding-story-one-${index + 1}`) || weddingStoryOne),
              isGated: formData.get(`wedding-gated-${index + 1}`) === "on",
              price: String(formData.get(`wedding-price-${index + 1}`) || "0.005"),
              isRated: formData.get(`wedding-rated-${index + 1}`) === "on",
              coverImage: nextCoverImage ?? savedGallery?.coverImage ?? null,
              galleryImages: nextGalleryImages.length > 0 ? nextGalleryImages : savedGallery?.galleryImages ?? []
            };
          })
        ),
        studioGalleries: await Promise.all(
          studioGalleries.map(async (gallery, index) => {
            const savedGallery = publishedContent?.studioGalleries?.[index];
            const nextCoverImage = await fileFromForm(formData, `studio-cover-${index + 1}`);
            const nextGalleryImages = await filesFromForm(formData, `studio-gallery-images-${index + 1}`);

            return {
              name: gallery.name,
              isGated: formData.get(`studio-gated-${index + 1}`) === "on",
              price: String(formData.get(`studio-price-${index + 1}`) || "0.005"),
              isRated: formData.get(`studio-rated-${index + 1}`) === "on",
              coverImage: nextCoverImage ?? savedGallery?.coverImage ?? null,
              galleryImages: nextGalleryImages.length > 0 ? nextGalleryImages : savedGallery?.galleryImages ?? []
            };
          })
        ),
        testimonials: await Promise.all(
          testimonials.map(async (testimonial, index) => {
            const savedTestimonial = publishedContent?.testimonials?.[index];
            const nextImage = await fileFromForm(formData, `testimonial-image-${index + 1}`);

            return {
              name: String(formData.get(`testimonial-name-${index + 1}`) || testimonial.name),
              context: String(formData.get(`testimonial-context-${index + 1}`) || testimonial.context),
              quote: String(formData.get(`testimonial-quote-${index + 1}`) || testimonial.quote),
              image: nextImage ?? savedTestimonial?.image ?? null
            };
          })
        ),
        footerImages: await Promise.all(
          footerImages.map(async (_, index) => {
            const nextFooterImage = await fileFromForm(formData, `footer-image-${index + 1}`);

            return nextFooterImage ?? publishedContent?.footerImages?.[index] ?? null;
          })
        )
      };

      const nextNibgateWallet = String(formData.get("nibgate-wallet") || "");
      const isAnyGated = payload.weddingGalleries?.some(g => g.isGated) || payload.studioGalleries?.some(g => g.isGated);
      if (isAnyGated && !nextNibgateWallet) {
        throw new Error("A Nibgate wallet address is required when gating galleries. Please fill it out at the bottom of the page.");
      }
      payload.nibgateWallet = nextNibgateWallet;

      const response = await fetch(`${backendUrl}/api/content`, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error(`Publish failed with ${response.status}`);
      }

      setHasChanges(false);
      setPublishedContent(payload);
      setContentVersion((currentVersion) => currentVersion + 1);
      setPublishStatus("Published. Refresh the public site to see saved changes.");
    } catch (error) {
      setPublishStatus(error instanceof Error ? error.message : "Publish failed.");
    } finally {
      setIsPublishing(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.adminPage}>
        <div className={styles.loginShell}>
          <section className={styles.loginPanel} aria-labelledby="admin-login-title">
            <p className={styles.loginEyebrow}>Nadon Klinton</p>
            <h1 id="admin-login-title">Admin Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <label>
                <span>Username</span>
                <input
                  autoComplete="username"
                  name="username"
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  value={username}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  autoComplete="current-password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  value={password}
                />
              </label>
              {error ? <p className={styles.loginError}>{error}</p> : null}
              <button type="submit">Enter Admin</button>
            </form>
            <Link className={styles.publicLink} href="http://localhost:3000/">
              View Public Site
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <span>Nadon Klinton</span>
            <strong>Admin</strong>
          </div>
          <span className={styles.status}>Private</span>
        </header>

        <section className={styles.hero}>
          <h1>Image updates without touching code.</h1>
        </section>

        <form
          key={contentVersion}
          className={styles.manager}
          aria-label="Image manager placeholders"
          onSubmit={handlePublish}
          onChange={markChanged}
        >
          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Homepage</p>
              <h2>Home gallery</h2>
              <span>Up to 20 images</span>
            </div>
            <label className={styles.bulkUpload}>
              <span>Homepage gallery pictures</span>
              <span className={styles.uploadButton}>Choose photos</span>
              <input
                name="home-gallery-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleHomeUploadChange}
              />
              {homeUploadCount ? (
                <strong className={styles.uploadCount}>{homeUploadCount} selected</strong>
              ) : null}
              {homeUploadError ? <strong className={styles.uploadError}>{homeUploadError}</strong> : null}
            </label>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Homepage</p>
              <h2>Hero carousel</h2>
              <span>Up to 10 images</span>
            </div>
            <label className={styles.bulkUpload}>
              <span>Carousel pictures</span>
              <span className={styles.uploadButton}>Choose photos</span>
              <input
                name="home-carousel-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleCarouselUploadChange}
              />
              {carouselUploadCount ? (
                <strong className={styles.uploadCount}>{carouselUploadCount} selected</strong>
              ) : null}
              {carouselUploadError ? <strong className={styles.uploadError}>{carouselUploadError}</strong> : null}
            </label>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Weddings</p>
              <h2>Wedding listings</h2>
              <span>{weddingGalleries.length} gallery cards</span>
            </div>
            <div className={styles.weddingStack}>
              {weddingGalleries.map((gallery, index) => {
                const savedGallery = publishedContent?.weddingGalleries?.[index];

                return (
                  <article className={styles.weddingEditor} key={gallery.name}>
                    <UploadSlot
                      index={index}
                      label="Cover image"
                      name={`wedding-cover-${index + 1}`}
                      src={savedGallery?.coverImage?.src || gallery.src}
                    />
                    <div className={styles.editorFields}>
                      <label>
                        <span>Gallery name</span>
                        <input defaultValue={savedGallery?.name || gallery.name} name={`wedding-name-${index + 1}`} type="text" />
                      </label>
                      <label>
                        <span>Location</span>
                        <textarea defaultValue={savedGallery?.location || gallery.location} name={`wedding-location-${index + 1}`} rows={2} />
                      </label>
                      <label>
                        <span>Story paragraph one</span>
                        <textarea defaultValue={savedGallery?.story || weddingStoryOne} name={`wedding-story-one-${index + 1}`} rows={4} />
                      </label>
                      <label style={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "center", 
                        gap: "12px", 
                        background: "#fafafa", 
                        padding: "8px 12px", 
                        borderRadius: "6px", 
                        border: "1px solid #e5e5e5",
                        cursor: "pointer",
                        marginTop: "8px",
                        width: "max-content"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <input 
                            defaultChecked={savedGallery?.isGated || false} 
                            name={`wedding-gated-${index + 1}`} 
                            type="checkbox" 
                            style={{ width: "14px", height: "14px", accentColor: "#000", cursor: "pointer", margin: 0 }} 
                            onChange={(e) => {
                              const priceInput = e.target.parentElement?.parentElement?.querySelector('input[type=number]') as HTMLInputElement;
                              if (priceInput) priceInput.disabled = !e.target.checked;
                              markChanged();
                            }}
                          />
                          <span style={{ fontWeight: 600, color: "#111", fontSize: "13px" }}>Monetize with Nibgate</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e5e5e5", paddingLeft: "12px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 500, color: "#666" }}>Price</span>
                          <input 
                            className={styles.priceInput}
                            name={`wedding-price-${index + 1}`} 
                            type="number" 
                            step="0.001"
                            defaultValue={savedGallery?.price || "0.005"}
                            disabled={!(savedGallery?.isGated || false)}
                            style={{ width: "50px", padding: "4px", borderRadius: "4px", border: "1px solid #000", background: "#000", color: "#fff", fontSize: "13px", textAlign: "center" }}
                          />
                          <span style={{ fontSize: "12px", color: "#666" }}>USDC</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e5e5e5", paddingLeft: "12px" }}>
                          <input 
                            defaultChecked={savedGallery?.isRated || false} 
                            name={`wedding-rated-${index + 1}`} 
                            type="checkbox" 
                            style={{ width: "14px", height: "14px", accentColor: "#000", cursor: "pointer", margin: 0 }} 
                            onChange={markChanged}
                          />
                          <span style={{ fontWeight: 600, color: "#111", fontSize: "13px" }}>Enable Ratings</span>
                        </div>
                      </label>
                      <label className={styles.bulkUpload}>
                        <span>Wedding gallery pictures</span>
                        <span className={styles.uploadButton}>Choose photos</span>
                        <input
                          name={`wedding-gallery-images-${index + 1}`}
                          type="file"
                          accept="image/*"
                          multiple
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Studios</p>
              <h2>Studio listings</h2>
              <span>{studioGalleries.length} gallery cards</span>
            </div>
            <div className={styles.weddingStack}>
              {studioGalleries.map((gallery, index) => {
                const savedGallery = publishedContent?.studioGalleries?.[index];

                return (
                  <article className={styles.weddingEditor} key={gallery.name}>
                    <UploadSlot
                      index={index}
                      label={`${gallery.name} cover image`}
                      name={`studio-cover-${index + 1}`}
                      src={savedGallery?.coverImage?.src || gallery.src}
                    />
                    <div className={styles.editorFields}>
                      <p className={styles.galleryTitle}>{gallery.name}</p>
                      <label style={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        alignItems: "center", 
                        gap: "12px", 
                        background: "#fafafa", 
                        padding: "8px 12px", 
                        borderRadius: "6px", 
                        border: "1px solid #e5e5e5",
                        cursor: "pointer",
                        marginTop: "8px",
                        width: "max-content"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <input 
                            defaultChecked={savedGallery?.isGated || false} 
                            name={`studio-gated-${index + 1}`} 
                            type="checkbox" 
                            style={{ width: "14px", height: "14px", accentColor: "#000", cursor: "pointer", margin: 0 }} 
                            onChange={(e) => {
                              const priceInput = e.target.parentElement?.parentElement?.querySelector('input[type=number]') as HTMLInputElement;
                              if (priceInput) priceInput.disabled = !e.target.checked;
                              markChanged();
                            }}
                          />
                          <span style={{ fontWeight: 600, color: "#111", fontSize: "13px" }}>Monetize with Nibgate</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e5e5e5", paddingLeft: "12px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 500, color: "#666" }}>Price</span>
                          <input 
                            className={styles.priceInput}
                            name={`studio-price-${index + 1}`} 
                            type="number" 
                            step="0.001"
                            defaultValue={savedGallery?.price || "0.005"}
                            disabled={!(savedGallery?.isGated || false)}
                            style={{ width: "50px", padding: "4px", borderRadius: "4px", border: "1px solid #000", background: "#000", color: "#fff", fontSize: "13px", textAlign: "center" }}
                          />
                          <span style={{ fontSize: "12px", color: "#666" }}>USDC</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e5e5e5", paddingLeft: "12px" }}>
                          <input 
                            defaultChecked={savedGallery?.isRated || false} 
                            name={`studio-rated-${index + 1}`} 
                            type="checkbox" 
                            style={{ width: "14px", height: "14px", accentColor: "#000", cursor: "pointer", margin: 0 }} 
                            onChange={markChanged}
                          />
                          <span style={{ fontWeight: 600, color: "#111", fontSize: "13px" }}>Enable Ratings</span>
                        </div>
                      </label>
                      <label className={styles.bulkUpload}>
                        <span>{gallery.name} gallery pictures</span>
                        <span className={styles.uploadButton}>Choose photos</span>
                        <input
                          name={`studio-gallery-images-${index + 1}`}
                          type="file"
                          accept="image/*"
                          multiple
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Testimonials</p>
              <h2>Client notes</h2>
              <span>{testimonials.length} testimonials</span>
            </div>
            <div className={styles.weddingStack}>
              {testimonials.map((testimonial, index) => {
                const savedTestimonial = publishedContent?.testimonials?.[index];

                return (
                  <article className={styles.weddingEditor} key={`${testimonial.name}-${index}`}>
                    <UploadSlot
                      alt={testimonial.alt}
                      index={index}
                      label="Client image"
                      name={`testimonial-image-${index + 1}`}
                      src={savedTestimonial?.image?.src || testimonial.image}
                    />
                    <div className={styles.editorFields}>
                      <label>
                        <span>Client name</span>
                        <input defaultValue={savedTestimonial?.name || testimonial.name} name={`testimonial-name-${index + 1}`} type="text" />
                      </label>
                      <label>
                        <span>Context</span>
                        <input defaultValue={savedTestimonial?.context || testimonial.context} name={`testimonial-context-${index + 1}`} type="text" />
                      </label>
                      <label>
                        <span>Quote</span>
                        <textarea defaultValue={savedTestimonial?.quote || testimonial.quote} name={`testimonial-quote-${index + 1}`} rows={5} />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Footer</p>
              <h2>Social carousel</h2>
              <span>{footerImages.length} image slots</span>
            </div>
            <div className={styles.uploadGrid}>
              {footerImages.map((src, index) => (
                <UploadSlot
                  key={`${src}-${index}`}
                  index={index}
                  label="Carousel image"
                  name={`footer-image-${index + 1}`}
                  src={publishedContent?.footerImages?.[index]?.src || src}
                />
              ))}
            </div>
          </section>

          <section className={styles.managerSection}>
            <div className={styles.sectionHeader}>
              <p>Monetization</p>
              <h2>Nibgate Settings</h2>
              <span>Global payout details</span>
            </div>
            <div style={{ background: "#fafafa", padding: "24px", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 600, color: "#111", fontSize: "14px" }}>Payout Wallet Address</span>
                <span style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>Enter the Web3 wallet address that will receive the USDC payments.</span>
                <input 
                  type="text" 
                  name="nibgate-wallet" 
                  defaultValue={publishedContent?.nibgateWallet || ""} 
                  placeholder="0x..." 
                  onChange={markChanged}
                  style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "400px" }}
                />
              </label>
            </div>
          </section>

          <section className={styles.publishBar} aria-label="Publish changes">
            <p>{publishStatus || "Save the selected admin changes to the backend and publish them to the public site."}</p>
            <button type="submit" disabled={isPublishing || !hasChanges}>
              {isPublishing ? "Publishing" : "Publish"}
            </button>
          </section>
        </form>

        <nav className={styles.actions} aria-label="Admin links">
          <Link href="http://localhost:3000/">View Public Site</Link>
          <Link href="mailto:nadonclinton888@gmail.com">Email Studio</Link>
        </nav>
      </div>
    </main>
  );
}
