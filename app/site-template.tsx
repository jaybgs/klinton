/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BackToTop } from "./back-to-top";
import { ContactActions, ContactIconLinks } from "./contact-actions";
import { HeaderHeroState } from "./header-hero-state";
import { HomeHeroCarousel } from "./home-hero-carousel";
import { LoadingImage } from "./loading-image";
import { MasonryGallery } from "./masonry-gallery";
import { PublishedContent, PublishedImage } from "./published-content";
import { MobileSiteMenu, SiteNavLinks } from "./site-nav";
import { WeddingListingGrid } from "./wedding-listing-grid";
import {
  aboutImages,
  footerImages,
  homeImages,
  images,
  PageContent,
  pages,
  pressLogos,
  site,
  testimonials
} from "./site-data";

const instagramUrl = "https://www.instagram.com/nadon.klinton/";
const whatsappUrl =
  "https://wa.me/2348141579856?text=Hi%20Nadon%2C%20I%20would%20love%20to%20make%20an%20enquiry%20about%20photography%20coverage.";
const aboutFaqs = [
  {
    question: "Where are you based and do you travel?",
    answer:
      "Nadon is based locally and available for weddings, portraits, and editorial commissions across Nigeria and internationally."
  },
  {
    question: "How far in advance should we book?",
    answer:
      "For weddings, reaching out once your date and location are confirmed is best. Popular dates can move quickly, especially during peak seasons."
  },
  {
    question: "How do we book you?",
    answer:
      "Once availability is confirmed, a signed agreement and booking retainer secure your date. From there, the process stays calm, organized, and clear."
  },
  {
    question: "Do you help with direction on the day?",
    answer:
      "Yes. The approach is calm and natural: enough direction to make portraits feel considered, with space for the honest moments to unfold."
  },
  {
    question: "Do you offer albums?",
    answer:
      "Fine art albums can be added to a wedding collection. They are designed simply, using the strongest images to preserve the feeling of the day."
  },
  {
    question: "How do we receive our images?",
    answer:
      "Final images are delivered through an online gallery designed for viewing, sharing, downloading, and preserving the full story."
  }
];

export const studioPortfolioCategories = [
  {
    title: "Family",
    slug: "family",
    href: "/studios/family",
    image: { src: images.studioProfile, alt: "Family studio portrait session" }
  },
  {
    title: "Couples",
    slug: "couples",
    href: "/studios/couples",
    image: { src: images.couple, alt: "Couple portrait session" }
  },
  {
    title: "Birthdays",
    slug: "birthdays",
    href: "/studios/birthdays",
    image: { src: images.studioBackdrop, alt: "Birthday studio photography session" }
  },
  {
    title: "Portraits",
    slug: "portraits",
    href: "/studios/portraits",
    image: { src: images.portrait, alt: "Portrait studio session" }
  }
];

export const studioPortfolioSlugs = studioPortfolioCategories.map((category) => category.slug);

export function findStudioPortfolioCategory(slug: string) {
  return studioPortfolioCategories.find((category) => category.slug === slug);
}

export const weddingGalleries = [
  {
    href: "/sara-and-mark-wedding-gallery-1",
    name: "Sara & Mark",
    location: "Lake Hawea, New Zealand",
    src: "https://static.showit.co/800/yLtHnG13Di-hOtHA971m3A/334981/cassandra-ladru-wedding-photographer-58.jpg",
    image: { left: 612, top: 2132, width: 490, height: 715, objectPosition: "50% 50%" },
    nameBox: { left: 615, top: 2871, width: 485, height: 39 },
    locationBox: { left: 694, top: 2901, width: 327, height: 50 }
  },
  {
    href: "/anna-and-jay-wedding-gallery",
    name: "Anna & Jay",
    location: "Deux Belettes\nByron Bay Hinterland",
    src: "https://static.showit.co/800/JVw7q1DTFD4gjMfjpW6H5g/334981/anna-jay-wedding-gallery-cassandra-ladru-00003.jpg",
    image: { left: 617, top: 3062, width: 490, height: 709, objectPosition: "50% 50%" },
    nameBox: { left: 615, top: 3817, width: 485, height: 40 },
    locationBox: { left: 692, top: 3850, width: 328, height: 50 }
  },
  {
    href: "/carmel-and-oliver-wedding-gallery",
    name: "Carmel & Oliver",
    location: "Carthona House\nSydney",
    src: "https://static.showit.co/800/Vj9Rb8Y-kZXUi036-eJMww/334981/carmel-oliver-wedding-gallery-cassandra-ladru-00031.jpg",
    image: { left: 99, top: 3647, width: 466, height: 678, objectPosition: "50% 50%" },
    nameBox: { left: 151, top: 4353, width: 364, height: 29 },
    locationBox: { left: 187, top: 4389, width: 291, height: 42 }
  },
  {
    href: "/cassandra-and-james-wedding-gallery",
    name: "Cassandra & James",
    location: "Gardens House\nMelbourne",
    src: "https://static.showit.co/800/zEf-BIuAO3K2VBcDEWgRvg/shared/cassandra-james-wedding-gallery-cassandra-ladru-00072.jpg",
    image: { left: 99, top: 1852, width: 464, height: 706, objectPosition: "80% 80%" },
    nameBox: { left: 98, top: 2584, width: 466, height: 41 },
    locationBox: { left: 163, top: 2617, width: 336, height: 61 }
  },
  {
    href: "/alexia-and-michael-wedding-gallery",
    name: "Alexia & Michael",
    location: "Wallalong House\nWallalong, NSW",
    src: "https://static.showit.co/800/ZlZpaMjNFD0yDRi5X1T1XA/shared/alexia-michael-wedding-gallery-cassandra-ladru-00062.jpg",
    image: { left: 97, top: 2758, width: 466, height: 674, objectPosition: "50% 50%" },
    nameBox: { left: 97, top: 3454, width: 466, height: 40 },
    locationBox: { left: 174, top: 3490, width: 312, height: 44 }
  },
  {
    href: "/lauren-and-nate-wedding-gallery-2",
    name: "Lauren & Nate",
    location: "MCA, Sydney",
    src: "https://static.showit.co/1200/fX8oxhBg-wntOR0ydk2fPA/334981/cassandra-ladru-wedding-photographer-102.jpg",
    image: { left: 99, top: 74, width: 466, height: 752, objectPosition: "50% 50%" },
    nameBox: { left: 99, top: 851, width: 466, height: 40 },
    locationBox: { left: 182, top: 886, width: 301, height: 40 }
  },
  {
    href: "/hannah-and-max-wedding-gallery",
    name: "Hannah & Max",
    location: "The Brooklet\nByron Bay Hinterland",
    src: "https://static.showit.co/800/pFDsNQ_xn-ah54TQN9JBOg/shared/hannah-max-wedding-gallery-cassandra-ladru-00032.jpg",
    image: { left: 100, top: 980, width: 466, height: 698, objectPosition: "40% 40%" },
    nameBox: { left: 127, top: 1699, width: 412, height: 39 },
    locationBox: { left: 127, top: 1732, width: 412, height: 43 }
  },
  {
    href: "/natalie-and-david-wedding-gallery",
    name: "Natalie & David",
    location: "Chateau de Tourreau\nProvence, France",
    src: "https://static.showit.co/1200/Tca2pqEOOE6kUOfmGYfNpg/shared/natalie-david-wedding-gallery-cassandra-ladru-00090.jpg",
    image: { left: 612, top: 1109, width: 489, height: 794, objectPosition: "50% 50%" },
    nameBox: { left: 612, top: 1946, width: 489, height: 42 },
    locationBox: { left: 699, top: 1988, width: 316, height: 42 }
  },
  {
    href: "/jordana-and-sam-wedding-gallery",
    name: "Jordana & Sam",
    location: "Icebergs, Sydney",
    src: "https://static.showit.co/1200/JLa5SReLBLUQYporXzPyTQ/334981/cassandra-ladru-wedding-photographer-25.jpg",
    image: { left: 615, top: 166, width: 490, height: 756, objectPosition: "40% 40%" },
    nameBox: { left: 615, top: 948, width: 488, height: 40 },
    locationBox: { left: 647, top: 980, width: 426, height: 44 }
  }
];

const weddingGalleryImages = [
  "https://static.showit.co/1200/uAEWYg_HpMkI5Yxken5rLw/334981/cassandra-ladru-wedding-photographer-0.jpg",
  "https://static.showit.co/1200/4S7GSZs7YMwdOUrGeme45w/334981/cassandra-ladru-wedding-photographer-2.jpg",
  "https://static.showit.co/1200/I4gYw8cOilf8WYxaStyfyw/334981/cassandra-ladru-wedding-photographer-3.jpg",
  "https://static.showit.co/1200/Oop7kI98ueXweo8TmsRNdA/334981/cassandra-ladru-wedding-photographer-22.jpg",
  "https://static.showit.co/1200/F21SZzfKmtJ0uVlrNkWvlQ/334981/cassandra-ladru-wedding-photographer-4.jpg",
  "https://static.showit.co/1200/E8d2uZKbOSmyE6knHK5jbg/334981/cassandra-ladru-wedding-photographer-5.jpg",
  "https://static.showit.co/1200/qZDgUZfD2JvJvQtRieeY8w/334981/cassandra-ladru-wedding-photographer-6.jpg",
  "https://static.showit.co/1200/lWZ0tX5nPGAqy9hAszqv8g/334981/cassandra-ladru-wedding-photographer-7.jpg",
  "https://static.showit.co/1200/uz7i90xJzZGj9rvqWR01ow/334981/cassandra-ladru-wedding-photographer-8.jpg",
  "https://static.showit.co/1200/QbTOEXhRjELSI2QI0CjhSQ/334981/cassandra-ladru-wedding-photographer-9.jpg",
  "https://static.showit.co/1200/-n7mvU0eNcbjHMGj8CfeSQ/334981/cassandra-ladru-wedding-photographer-10.jpg",
  "https://static.showit.co/1200/60OwDrNwnH5mWDCwgxHEhg/334981/cassandra-ladru-wedding-photographer-11.jpg",
  "https://static.showit.co/1200/jySb212QdF4MpdeN45Kbtg/334981/cassandra-ladru-wedding-photographer-12.jpg",
  "https://static.showit.co/1200/AmtohQWYwloqRfNJb-t7mA/334981/cassandra-ladru-wedding-photographer-13.jpg",
  "https://static.showit.co/1200/msIQQoLWdeGZXZsM0XWU0A/334981/cassandra-ladru-wedding-photographer-14.jpg",
  "https://static.showit.co/1200/Jw60kvKeu4ajdki9Lu_WMQ/334981/cassandra-ladru-wedding-photographer-15.jpg",
  "https://static.showit.co/1200/YV4rtU2OBiCHSbGFRnJPEg/334981/cassandra-ladru-wedding-photographer-16.jpg",
  "https://static.showit.co/1200/I1lLjh0pQrHY0x6QGrMYcQ/334981/cassandra-ladru-wedding-photographer-17.jpg",
  "https://static.showit.co/1200/5PpwdU23nVUKxjSk9AP3XA/334981/cassandra-ladru-wedding-photographer-18.jpg",
  "https://static.showit.co/1200/s7nzwKSbJ3zZq-P7Vc9L-w/334981/cassandra-ladru-wedding-photographer-19.jpg",
  "https://static.showit.co/1200/9NTex7KsgnnSvgPmwUfQ9A/334981/cassandra-ladru-wedding-photographer-20.jpg",
  "https://static.showit.co/1200/EjnFz9ik-hrEzX5YoI0kYA/334981/cassandra-ladru-wedding-photographer-21.jpg",
  "https://static.showit.co/1200/xDSf7PWyWp1bc1LQvzqfMg/334981/cassandra-ladru-wedding-photographer-23.jpg",
  "https://static.showit.co/1200/D8Lubc7BgufPNHrO_HAw8w/334981/cassandra-ladru-wedding-photographer-24.jpg",
  "https://static.showit.co/1200/idPpQ-MolqCW8QgSfvqGZg/334981/cassandra-ladru-wedding-photographer-25.jpg",
  "https://static.showit.co/1200/suVp3D8Styt7U2VZo5BO6A/334981/cassandra-ladru-wedding-photographer-27.jpg",
  "https://static.showit.co/1200/wMjUFLrZ_QLE57c2rStd1g/334981/cassandra-ladru-wedding-photographer-26.jpg",
  "https://static.showit.co/1200/2hq2b2cL4k_2YFTpG1IVXA/334981/cassandra-ladru-wedding-photographer-31.jpg",
  "https://static.showit.co/1200/vuoajlm5xlO3Lfv-e045VQ/334981/cassandra-ladru-wedding-photographer-28.jpg",
  "https://static.showit.co/1200/oM4Hb4b4Hcrkl_yu99WiVw/334981/cassandra-ladru-wedding-photographer-33.jpg",
  "https://static.showit.co/1200/oqPV71p8rAaZ7sMUcjrTaw/334981/cassandra-ladru-wedding-photographer-32.jpg",
  "https://static.showit.co/1200/mnn9dBr5QODuFYKRKuedgA/334981/cassandra-ladru-wedding-photographer-35.jpg",
  "https://static.showit.co/1200/cCwPQk1I9EzkFNt2ML_fWg/334981/cassandra-ladru-wedding-photographer-34.jpg",
  "https://static.showit.co/1200/PgsA1DImVpc2tbXovBQOxw/334981/cassandra-ladru-wedding-photographer-37.jpg",
  "https://static.showit.co/1200/HzyWL9kTceTvmf-6YnBDiw/334981/cassandra-ladru-wedding-photographer-38.jpg",
  "https://static.showit.co/1200/TbZwgdYFCmVedX2Nfsaslg/334981/cassandra-ladru-wedding-photographer-39.jpg",
  "https://static.showit.co/1200/wgW5HZmIYBZL7of909YbVA/334981/cassandra-ladru-wedding-photographer-40.jpg",
  "https://static.showit.co/1200/5ZF3on0XxIi2c-1xAO8how/334981/cassandra-ladru-wedding-photographer-41.jpg",
  "https://static.showit.co/1200/ukn1vBVK3FQeDc_6-UgghQ/334981/cassandra-ladru-wedding-photographer-43.jpg",
  "https://static.showit.co/1200/_MNJ8JzfZzYgpDC5irrsqw/334981/cassandra-ladru-wedding-photographer-46.jpg",
  "https://static.showit.co/1200/nswHXQSuh-SOAduu4y8vfw/334981/cassandra-ladru-wedding-photographer-49.jpg",
  "https://static.showit.co/1200/4k9u7JBf-kA-Pj_-JaA2dw/334981/cassandra-ladru-wedding-photographer-50.jpg",
  "https://static.showit.co/1200/BsaujYCLlSM0yZSxL0HG2Q/334981/cassandra-ladru-wedding-photographer-51.jpg",
  "https://static.showit.co/1200/JlYXZNA70Ah5C9h8DiVPZw/334981/cassandra-ladru-wedding-photographer-52.jpg",
  "https://static.showit.co/1200/08s8U9oxcIWtmm054ylQXg/334981/cassandra-ladru-wedding-photographer-29.jpg",
  "https://static.showit.co/1200/StrEsOCmD6qHZU8FDV4b-A/334981/cassandra-ladru-wedding-photographer-30.jpg",
  "https://static.showit.co/1200/6VeVUB15RmqQl-p3MnxkEg/334981/cassandra-ladru-wedding-photographer-47.jpg",
  "https://static.showit.co/1200/_kX2S6Fy4eWR6s08fM5PhA/334981/cassandra-ladru-wedding-photographer-44.jpg",
  "https://static.showit.co/1200/bLdTsYCFLuW1JaxohIldpA/334981/cassandra-ladru-wedding-photographer-53.jpg",
  "https://static.showit.co/1200/eNbVtdDscVSUpe7ViMN5Bg/334981/cassandra-ladru-wedding-photographer-54.jpg",
  "https://static.showit.co/1200/cDvzM2ms1DBXLYzj7IH0Mg/334981/cassandra-ladru-wedding-photographer-63.jpg",
  "https://static.showit.co/1200/frlOBPiENmGfK2jXliMrig/334981/cassandra-ladru-wedding-photographer-65.jpg",
  "https://static.showit.co/1200/jZLDelfBl_Icez_TiYlV3Q/334981/cassandra-ladru-wedding-photographer-66.jpg",
  "https://static.showit.co/1200/MzhtD0b0sJ8aQCiEIR_Trg/334981/cassandra-ladru-wedding-photographer-67.jpg",
  "https://static.showit.co/1200/WRfN37Stl7xcCAkfPrxXnQ/334981/cassandra-ladru-wedding-photographer-68.jpg",
  "https://static.showit.co/1200/vXt37Y6GDsdYZEGgxwLElg/334981/cassandra-ladru-wedding-photographer-69.jpg",
  "https://static.showit.co/1200/jK1JNAIE0ElwquxXgI94EA/334981/cassandra-ladru-wedding-photographer-70.jpg",
  "https://static.showit.co/1200/aUYQFMYY8Uexn1bWS74sDQ/334981/cassandra-ladru-wedding-photographer-71.jpg",
  "https://static.showit.co/1200/IQqISiOGEmf8aWmWOBlznQ/334981/cassandra-ladru-wedding-photographer-72.jpg",
  "https://static.showit.co/1200/VWJGr-HvBMJhfAxF-_Rx1w/334981/cassandra-ladru-wedding-photographer-73.jpg",
  "https://static.showit.co/1200/xZ3bn3iCfDAvC9kYEuNqZQ/334981/cassandra-ladru-wedding-photographer-74.jpg",
  "https://static.showit.co/1200/wNtm_2EofW_44JOcqELjfA/334981/cassandra-ladru-wedding-photographer-75.jpg",
  "https://static.showit.co/1200/utfrOgbg5SQCh6zbSP1FUQ/334981/cassandra-ladru-wedding-photographer-76.jpg",
  "https://static.showit.co/1200/_FG2OF0H6JjuSOc363yWUg/334981/cassandra-ladru-wedding-photographer-77.jpg",
  "https://static.showit.co/1200/Ok-oSUw1KxzWFNtpe2iErg/334981/cassandra-ladru-wedding-photographer-78.jpg",
  "https://static.showit.co/1200/_wjEbLmd1aVhzibsEHhFug/334981/cassandra-ladru-wedding-photographer-79.jpg",
  "https://static.showit.co/1200/EHsnWjz7psw-I7r-6vkoWA/334981/cassandra-ladru-wedding-photographer-80.jpg",
  "https://static.showit.co/1200/vEqwk4_3Ao0GDIMx-vgCDA/334981/cassandra-ladru-wedding-photographer-81.jpg",
  "https://static.showit.co/1200/2eFDeB89sMgKECh44fdqPg/334981/cassandra-ladru-wedding-photographer-82.jpg",
  "https://static.showit.co/1200/k7TJi3ASyuM-5DLIm_1d7w/334981/cassandra-ladru-wedding-photographer-83.jpg",
  "https://static.showit.co/1200/UYPnHZ8Z0uAjRDcTe64Dtg/334981/cassandra-ladru-wedding-photographer-85.jpg",
  "https://static.showit.co/1200/TNpM1zyf1xvtN9R3L6LtuA/334981/cassandra-ladru-wedding-photographer-86.jpg",
  "https://static.showit.co/1200/Q89sZ-s1T8gM5aUPycEflg/334981/cassandra-ladru-wedding-photographer-87.jpg",
  "https://static.showit.co/1200/WfA2EQ8vKDxh6scPYi02Tg/334981/cassandra-ladru-wedding-photographer-89.jpg",
  "https://static.showit.co/1200/HIkifphibUl7JxBeze1eDA/334981/cassandra-ladru-wedding-photographer-90.jpg",
  "https://static.showit.co/1200/bSjJZY6r4vkW_rcvXqGEZg/334981/cassandra-ladru-wedding-photographer-56.jpg",
  "https://static.showit.co/1200/3Mcecr_jCxT7ON4RVvdV8g/334981/cassandra-ladru-wedding-photographer-61.jpg",
  "https://static.showit.co/1200/iTPCdVBtRSxWq41MhunyBA/334981/cassandra-ladru-wedding-photographer-88.jpg",
  "https://static.showit.co/1200/rraeKxGsYoqbxsMvcC-qPg/334981/cassandra-ladru-wedding-photographer-94.jpg",
  "https://static.showit.co/1200/l61_BXRyZJbbvHmavFQwdw/334981/cassandra-ladru-wedding-photographer-57.jpg",
  "https://static.showit.co/1200/bcbgqO-A2trUJbB-Vsu0Gg/334981/cassandra-ladru-wedding-photographer-58.jpg",
  "https://static.showit.co/1200/XPO8-7moTliwg6Tq14NuOQ/334981/cassandra-ladru-wedding-photographer-100.jpg",
  "https://static.showit.co/1200/WW0zalV441jYAB6g2-njdg/334981/cassandra-ladru-wedding-photographer-55.jpg",
  "https://static.showit.co/1200/WO1-9pGaSHqdTkVkNW077w/334981/cassandra-ladru-wedding-photographer-123.jpg",
  "https://static.showit.co/1200/rltpceMlLUdzh4j9gCkuHA/334981/cassandra-ladru-wedding-photographer-132.jpg",
  "https://static.showit.co/1200/9JMBaOfKYqwitcjmWY2eLw/334981/laurennate_spedits-198.jpg",
  "https://static.showit.co/1200/R2cAfrdYjDXkWoFI6Iz9mw/334981/cassandra-ladru-wedding-photographer-60.jpg",
  "https://static.showit.co/1200/rzcKz26Zs6A5UenWI2tdig/334981/cassandra-ladru-wedding-photographer-131.jpg",
  "https://static.showit.co/1200/vuAle9mAHthqObt8z1z-wQ/334981/laurennate_spedits-56.jpg",
  "https://static.showit.co/1200/ys0mNbGN-fkP2r-yXEWeIQ/334981/cassandra-ladru-wedding-photographer-91.jpg",
  "https://static.showit.co/1200/U92ebB_nQZwT3_EQ1MfyaA/334981/cassandra-ladru-wedding-photographer-93.jpg",
  "https://static.showit.co/1200/AvYB45G2LTM1Kn1sfsyH-w/334981/cassandra-ladru-wedding-photographer-92.jpg",
  "https://static.showit.co/1200/7mLSTEitEiobcWJW_FEYTA/334981/cassandra-ladru-wedding-photographer-95.jpg",
  "https://static.showit.co/1200/xG5d13qQGcxM2XTqhmyjOg/334981/cassandra-ladru-wedding-photographer-96.jpg",
  "https://static.showit.co/1200/mAQgX1cJ3g6s8s1BrfXegg/334981/cassandra-ladru-wedding-photographer-97.jpg",
  "https://static.showit.co/1200/OCuZCHXlBK1VYphfG9zNlg/334981/cassandra-ladru-wedding-photographer-98.jpg",
  "https://static.showit.co/1200/kOg2Y5xXf_1xbmQ7v9pekQ/334981/cassandra-ladru-wedding-photographer-99.jpg",
  "https://static.showit.co/1200/KB18EVjmjWrnexoYg7EVFQ/334981/cassandra-ladru-wedding-photographer-101.jpg",
  "https://static.showit.co/1200/fX8oxhBg-wntOR0ydk2fPA/334981/cassandra-ladru-wedding-photographer-102.jpg",
  "https://static.showit.co/1200/u4WjZOvnIPQKDF7X1UaC3w/334981/cassandra-ladru-wedding-photographer-103.jpg",
  "https://static.showit.co/1200/VmjaYjtnzdbG-gnci61X3Q/334981/cassandra-ladru-wedding-photographer-104.jpg",
  "https://static.showit.co/1200/vH4XSJC669Wu4xmMuzoxfA/334981/cassandra-ladru-wedding-photographer-105.jpg",
  "https://static.showit.co/1200/XayMszS2VLbRPB9_RCbPDA/334981/cassandra-ladru-wedding-photographer-106.jpg",
  "https://static.showit.co/1200/DCMlJRk1nbf4dXt8lMjF9Q/334981/cassandra-ladru-wedding-photographer-108.jpg",
  "https://static.showit.co/1200/h63eRtXhbVbzhKA3nYcUZg/334981/cassandra-ladru-wedding-photographer-110.jpg",
  "https://static.showit.co/1200/vq6t7FFdkZcGeQ1DJibgnQ/334981/cassandra-ladru-wedding-photographer-111.jpg",
  "https://static.showit.co/1200/oq_oaEOOpIYDjDjr-WjIOg/334981/cassandra-ladru-wedding-photographer-112.jpg",
  "https://static.showit.co/1200/uKL_Mbit8MNLKh-Kz6BKnw/334981/cassandra-ladru-wedding-photographer-113.jpg",
  "https://static.showit.co/1200/37e3ul9481xo2A47saWpRg/334981/cassandra-ladru-wedding-photographer-114.jpg",
  "https://static.showit.co/1200/pAUdr1zoClRLe-KpiKiafA/334981/cassandra-ladru-wedding-photographer-115.jpg",
  "https://static.showit.co/1200/rD_hCrBrIcte5WSHiLzybw/334981/cassandra-ladru-wedding-photographer-116.jpg",
  "https://static.showit.co/1200/3qP-bK1TLT987zcOnNyMAQ/334981/cassandra-ladru-wedding-photographer-117.jpg",
  "https://static.showit.co/1200/NEvbrgfAcIpFfFjNehvycQ/334981/cassandra-ladru-wedding-photographer-118.jpg",
  "https://static.showit.co/1200/sdfHGunTXKTtX2Bh3ddgTg/334981/cassandra-ladru-wedding-photographer-119.jpg",
  "https://static.showit.co/1200/1i_IKwSBnaJrzAxqNkU8dA/334981/cassandra-ladru-wedding-photographer-121.jpg",
  "https://static.showit.co/1200/NLmwn_vWDiLX0xgna7jayQ/334981/cassandra-ladru-wedding-photographer-122.jpg",
  "https://static.showit.co/1200/UFzEVmfmOUXsy5g8K2360A/334981/cassandra-ladru-wedding-photographer-125.jpg",
  "https://static.showit.co/1200/XS8PCD2W_HqFPbIwD7LBlA/334981/cassandra-ladru-wedding-photographer-126.jpg",
  "https://static.showit.co/1200/Kdv6OG7t_DgR721TG8XxMA/334981/cassandra-ladru-wedding-photographer-127.jpg",
  "https://static.showit.co/1200/oIOq0xfWbtQpHXGcp2Hi2w/334981/cassandra-ladru-wedding-photographer-128.jpg",
  "https://static.showit.co/1200/gW3FMw-yRuKZkJxIhCC7jw/334981/cassandra-ladru-wedding-photographer-130.jpg",
  "https://static.showit.co/1200/7pdocF9-B7GSCCV3F3vCGw/334981/cassandra-ladru-wedding-photographer-149.jpg",
  "https://static.showit.co/1200/JVcBX5vmMNXs1DecxcBdLg/334981/cassandra-ladru-wedding-photographer-135.jpg",
  "https://static.showit.co/1200/Fb-mOVL_r9aED9ieKXmqgw/334981/laurennate_spedits-103.jpg",
  "https://static.showit.co/1200/oK8G7NNX-QOeDpruX85xqQ/334981/cassandra-ladru-wedding-photographer-148.jpg",
  "https://static.showit.co/1200/B_M854ajp_NNVcn-ZgyAYQ/334981/cassandra-ladru-wedding-photographer-151.jpg",
  "https://static.showit.co/1200/pwepUS0LtipO2t7-DYcLMA/334981/cassandra-ladru-wedding-photographer-152.jpg",
  "https://static.showit.co/1200/FeK8zeDBT9lLiPlOVwJdvA/334981/cassandra-ladru-wedding-photographer-153.jpg",
  "https://static.showit.co/1200/hG7995KTYbYjvUZpcCe07w/334981/cassandra-ladru-wedding-photographer-109.jpg",
  "https://static.showit.co/1200/hv_IPLVgnVr3OjFZgXgCRA/334981/cassandra-ladru-wedding-photographer-124.jpg",
  "https://static.showit.co/1200/d90ihQ0lIbxXhRhYWuuW1A/334981/cassandra-ladru-wedding-photographer-129.jpg",
  "https://static.showit.co/1200/X-hxTWl1N4zlGkbPPk2AiA/334981/cassandra-ladru-wedding-photographer-136.jpg",
  "https://static.showit.co/1200/G_TSrv2jICZ-m9eLj8C8eA/334981/cassandra-ladru-wedding-photographer-143.jpg",
  "https://static.showit.co/1200/lb8iYwpHq4MWQbvlCFKLJg/334981/cassandra-ladru-wedding-photographer-137.jpg",
  "https://static.showit.co/1200/d2X0JcYrN-X9bZUK-0MnjA/334981/cassandra-ladru-wedding-photographer-140.jpg",
  "https://static.showit.co/1200/3ff1M__pOQRYYnzXMlqmFA/334981/cassandra-ladru-wedding-photographer-138.jpg",
  "https://static.showit.co/1200/ri10De4hlH7PyLYmTs_sOA/334981/cassandra-ladru-wedding-photographer-134.jpg",
  "https://static.showit.co/1200/dratcXPapy5jpOqxe8OqkQ/334981/cassandra-ladru-wedding-photographer-141.jpg",
  "https://static.showit.co/1200/CRB4SOQuhLIqnrOGNZQfbw/334981/cassandra-ladru-wedding-photographer-142.jpg",
  "https://static.showit.co/1200/Lqg3rS1iHUTHiXWFJmYBdA/334981/cassandra-ladru-wedding-photographer-145.jpg",
  "https://static.showit.co/1200/9wxIq8UU-d3y2GUy-LT0zQ/334981/cassandra-ladru-wedding-photographer-144.jpg",
  "https://static.showit.co/1200/cn4rb4Z2jyH8UJw9bnl0Jg/334981/cassandra-ladru-wedding-photographer-146.jpg",
  "https://static.showit.co/1200/r_711xq67UL8_BvM9Lic1g/334981/cassandra-ladru-wedding-photographer-147.jpg",
  "https://static.showit.co/1200/p0bq4iE-mg6A7hcpjU64Xw/334981/cassandra-ladru-wedding-photographer-154.jpg",
  "https://static.showit.co/1200/Ku_yyHPWTM3bkhvuEz8Q8g/334981/cassandra-ladru-wedding-photographer-155.jpg",
  "https://static.showit.co/1200/BXVKcqVQzPnEUdW2eGL2Eg/334981/cassandra-ladru-wedding-photographer-156.jpg",
  "https://static.showit.co/1200/lq8tkK2QaVxJ8K9ImbsXJw/334981/cassandra-ladru-wedding-photographer-157.jpg",
  "https://static.showit.co/1200/xFbMHJqo2itiUaI5LlByLg/334981/cassandra-ladru-wedding-photographer-158.jpg",
  "https://static.showit.co/1200/H21mluLc-E5x0gommvLP2w/334981/cassandra-ladru-wedding-photographer-159.jpg",
  "https://static.showit.co/1200/0uZbpQ2MAypEGZVAlkNfAQ/334981/cassandra-ladru-wedding-photographer-160.jpg",
  "https://static.showit.co/1200/nQdE1fOCVJifS0HzyLs1xQ/334981/cassandra-ladru-wedding-photographer-161.jpg",
  "https://static.showit.co/1200/e4K3HK6i4J9GN_e8XUtryg/334981/cassandra-ladru-wedding-photographer-162.jpg",
  "https://static.showit.co/1200/cnIkRXCe5iFHQnmPOQLUyg/334981/cassandra-ladru-wedding-photographer-163.jpg",
  "https://static.showit.co/1200/rPiFOs-Kq4l0vvpX3wzI0w/334981/cassandra-ladru-wedding-photographer-164.jpg",
  "https://static.showit.co/1200/Wl2xE8v90YPyugo6qp1qJA/334981/cassandra-ladru-wedding-photographer-165.jpg",
  "https://static.showit.co/1200/f4pVDevyF-W9xkCw9RqKpg/334981/cassandra-ladru-wedding-photographer-166.jpg",
  "https://static.showit.co/1200/cjaPxDRfIc2N6Qtq4SSc_w/334981/cassandra-ladru-wedding-photographer-167.jpg",
  "https://static.showit.co/1200/L36W0iLuK4nYmCR4VoT3cQ/334981/cassandra-ladru-wedding-photographer-168.jpg",
  "https://static.showit.co/1200/jRBpc9SnLPcHknV7iXK9Iw/334981/cassandra-ladru-wedding-photographer-169.jpg",
  "https://static.showit.co/1200/HAbRKu-dOPSyg-OTfII_kA/334981/cassandra-ladru-wedding-photographer-170.jpg",
  "https://static.showit.co/1200/mOd_IDo-gPNtNxbUBuAfeQ/334981/cassandra-ladru-wedding-photographer-171.jpg",
  "https://static.showit.co/1200/uSR2cQN-yVIPZcH13TKGLA/334981/cassandra-ladru-wedding-photographer-173.jpg",
  "https://static.showit.co/1200/gB7ciGWwTTEE9C6R_5-8pA/334981/cassandra-ladru-wedding-photographer-174.jpg",
  "https://static.showit.co/1200/Axty3FQ4zkvzd9JwZc0Xvg/334981/cassandra-ladru-wedding-photographer-175.jpg",
  "https://static.showit.co/1200/M2ngD-gXlWnqpt_GQMqaQQ/334981/cassandra-ladru-wedding-photographer-176.jpg",
  "https://static.showit.co/1200/0p9cOTBNM-MWi13ma5FzwQ/334981/cassandra-ladru-wedding-photographer-177.jpg",
  "https://static.showit.co/1200/Z_sXz_uj3JIhxnk1JcDiiA/334981/cassandra-ladru-wedding-photographer-178.jpg",
  "https://static.showit.co/1200/ua7UgSW2SZuOwM2p_FD4nQ/334981/cassandra-ladru-wedding-photographer-179.jpg",
  "https://static.showit.co/1200/lN4Utvl8VSN10YLelmm6Rw/334981/cassandra-ladru-wedding-photographer-180.jpg",
  "https://static.showit.co/1200/X8sRF00Bvx30EZJXMOzA1Q/334981/cassandra-ladru-wedding-photographer-181.jpg",
  "https://static.showit.co/1200/EFhdE0OZ3fUgUwVrWqUH6w/334981/cassandra-ladru-wedding-photographer-182.jpg",
  "https://static.showit.co/1200/2gvHYkBqd0OmPi3ZhffbAg/334981/cassandra-ladru-wedding-photographer-183.jpg",
  "https://static.showit.co/1200/ISQ15qd3Re1h6xeMu-J_BQ/334981/cassandra-ladru-wedding-photographer-184.jpg",
  "https://static.showit.co/1200/Xrj0CPrlPQnjFDJ3PDyWow/334981/cassandra-ladru-wedding-photographer-185.jpg",
  "https://static.showit.co/1200/g2Am0XWD8TXAVqUv1OZcLQ/334981/cassandra-ladru-wedding-photographer-186.jpg",
  "https://static.showit.co/1200/0faC2tWKpdaDMdMmnVC_Uw/334981/cassandra-ladru-wedding-photographer-187.jpg",
  "https://static.showit.co/1200/H_a7YpZuhn1Y_4SyxKspUQ/334981/cassandra-ladru-wedding-photographer-189.jpg",
  "https://static.showit.co/1200/KutKRW8Q6SA7D4PX60ZoSw/334981/cassandra-ladru-wedding-photographer-190.jpg",
  "https://static.showit.co/1200/Nivs_1nFiZayfWTiWzv9_Q/334981/cassandra-ladru-wedding-photographer-191.jpg",
  "https://static.showit.co/1200/PV2DlMkhkFUeQCIy42xcfA/334981/cassandra-ladru-wedding-photographer-192.jpg",
  "https://static.showit.co/1200/GN8JxASLbJ9y5X87GKllDA/334981/cassandra-ladru-wedding-photographer-193.jpg",
  "https://static.showit.co/1200/gp7ul3zSDN083q5LEJlWKg/334981/cassandra-ladru-wedding-photographer-194.jpg",
  "https://static.showit.co/1200/vI1qOSs-Dj-VICTTKrq7kA/334981/cassandra-ladru-wedding-photographer-195.jpg",
  "https://static.showit.co/1200/rLQarTQk7H4KADp6pWS_zg/334981/cassandra-ladru-wedding-photographer-196.jpg",
  "https://static.showit.co/1200/vUO6npPeTkwgzcRHKWSdQA/334981/cassandra-ladru-wedding-photographer-197.jpg",
  "https://static.showit.co/1200/m02ShaEmXNG2dq-EX2KpFA/334981/cassandra-ladru-wedding-photographer-198.jpg",
  "https://static.showit.co/1200/APAz-pD_7a8160TkwQ3wGQ/334981/cassandra-ladru-wedding-photographer-199.jpg",
  "https://static.showit.co/1200/8KKg5UUS9ElgJwXKJnNbyQ/334981/cassandra-ladru-wedding-photographer-200.jpg",
  "https://static.showit.co/1200/6fie8_Exb4r_NH_j6-JawA/334981/cassandra-ladru-wedding-photographer-201.jpg",
  "https://static.showit.co/1200/SvuxRdeLxM_fIBDLtfoxJA/334981/cassandra-ladru-wedding-photographer-202.jpg",
  "https://static.showit.co/1200/kluIi8xnGP8aICFABBq5uA/334981/cassandra-ladru-wedding-photographer-203.jpg",
  "https://static.showit.co/1200/YyZ-7V4TonpxYk993DJV1g/334981/cassandra-ladru-wedding-photographer-204.jpg",
  "https://static.showit.co/1200/Ctaf38d_UrisuVXnT1aVcg/334981/cassandra-ladru-wedding-photographer-205.jpg",
  "https://static.showit.co/1200/domH2amcXhKzSeeMnb2vPw/334981/cassandra-ladru-wedding-photographer-206.jpg",
  "https://static.showit.co/1200/EJGJXfDYdjK3pqbwMh0xnA/334981/cassandra-ladru-wedding-photographer-207.jpg",
  "https://static.showit.co/1200/6dlX2atlE7edXiQH1ZGBEA/334981/cassandra-ladru-wedding-photographer-208.jpg",
  "https://static.showit.co/1200/IL66qdVyLQxOc12DInPCFw/334981/cassandra-ladru-wedding-photographer-209.jpg",
  "https://static.showit.co/1200/lcc55EzkW1pCkd7cb3BSkw/334981/cassandra-ladru-wedding-photographer-210.jpg",
  "https://static.showit.co/1200/iyDSgOP6Puz30ileB6ZCgA/334981/cassandra-ladru-wedding-photographer-211.jpg",
  "https://static.showit.co/1200/RJ6wRTEB_qrL49Ttvm7vSQ/334981/cassandra-ladru-wedding-photographer-212.jpg",
  "https://static.showit.co/1200/54lafARCSiIIJvBkrmjWGA/334981/cassandra-ladru-wedding-photographer-213.jpg",
  "https://static.showit.co/1200/Aaw-cy85qdeHLWCBHs9wzQ/334981/cassandra-ladru-wedding-photographer-214.jpg",
  "https://static.showit.co/1200/Tjy1lqOwo7r7qGFfFuCm9Q/334981/cassandra-ladru-wedding-photographer-215.jpg",
  "https://static.showit.co/1200/hAA_RKrGvgjaRrqRNRRBjg/334981/cassandra-ladru-wedding-photographer-216.jpg",
  "https://static.showit.co/1200/9ZGTrn0osT-lftAI_4-rKg/334981/cassandra-ladru-wedding-photographer-188.jpg"
];

function gallerySlugFromHref(href: string) {
  return href.replace(/^\//, "");
}

export function findWeddingGallery(slug: string) {
  return weddingGalleries.find((gallery) => gallerySlugFromHref(gallery.href) === slug);
}

export const weddingGallerySlugs = weddingGalleries.map((gallery) => gallerySlugFromHref(gallery.href));

function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link className={`nadon-logo ${className}`} href="/" aria-label={`${site.name} home`}>
      <span>{site.name.toUpperCase()}</span>
    </Link>
  );
}

function QuoteIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 170" aria-hidden="true">
      <path d="M92.5 13.5C52.9 24.7 24 59.9 24 103.3c0 32.8 19.6 53.2 46.1 53.2 22.6 0 39.1-15.5 39.1-37.2 0-20-14.8-34.4-34.9-34.4-5.3 0-10.5.8-15.5 2.6 4.6-22.6 19.9-39.8 44.9-51.1L92.5 13.5Zm112 0c-39.6 11.2-68.5 46.4-68.5 89.8 0 32.8 19.6 53.2 46.1 53.2 22.6 0 39.1-15.5 39.1-37.2 0-20-14.8-34.4-34.9-34.4-5.3 0-10.5.8-15.5 2.6 4.6-22.6 19.9-39.8 44.9-51.1L204.5 13.5Z" />
    </svg>
  );
}

export function SiteHeader({ transparentOnHero = false }: { transparentOnHero?: boolean } = {}) {
  return (
    <>
      {transparentOnHero ? <HeaderHeroState heroId="nadon-home-hero" /> : null}
      <header className={`nadon-header${transparentOnHero ? " nadon-header--hero" : ""}`} id="si-sp">
        <div className="nadon-canvas nadon-header-canvas">
          <BrandLogo />
          {transparentOnHero ? (
            <>
              <nav className="nadon-nav" aria-label="Primary navigation">
                <div className="nadon-nav-canvas">
                  <SiteNavLinks />
                </div>
              </nav>
              <MobileSiteMenu />
            </>
          ) : (
            <>
              <nav className="nadon-nav nadon-nav--desktop" aria-label="Primary navigation">
                <div className="nadon-nav-canvas">
                  <SiteNavLinks />
                </div>
              </nav>
              <MobileSiteMenu />
            </>
          )}
        </div>
      </header>
      {transparentOnHero ? null : <div className="nadon-header-spacer" />}
    </>
  );
}

export function SiteSocialGrid() {
  return (
    <div className="nadon-social-grid" aria-label="Social image grid">
      <div className="nadon-social-track">
        {footerImages.map((src, index) => (
          <LoadingImage
            key={`${src}-${index}`}
            src={src}
            alt={`Nadon Klinton social image ${index + 1}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

function SiteAboutBand() {
  return (
    <section className="nadon-about-band">
      <div className="nadon-about-images" aria-hidden="true">
        {aboutImages.map((image) => (
          <LoadingImage className={image.className} key={image.className} src={image.src} alt={image.alt} />
        ))}
      </div>
      <div className="nadon-about-title">
        <h2>
          about
          <br />
          Nadon
        </h2>
      </div>
      <div className="nadon-about-kicker">
        <h3>
          With a talent for capturing the unseen and the unfiltered, Nadon strips back the layers to
          reveal love in its truest form: effortless, sophisticated, and unforgettable.
        </h3>
      </div>
      <div className="nadon-about-copy">
        <p>
          Recognised by his iconic style, Nadon Klinton is a photographic artist fluent in the
          language of storytelling. Creating beautiful imagery for couples and creatives across the
          globe.
          <br />
          <br />
          Nadon is best known for honest and timeless photography. With a unique talent for
          encompassing raw emotion in a frame, he captures moments unseen, effortlessly.
          <br />
          <br />
          With each moment in time mesmerising to relive, Nadon’s expertise is in the details:
          fleeting seconds with a bride, a mother’s hand squeezed in excitement, a celebration
          strolling back down the aisle.
          <br />
          <br />
          Truth lives in each frame, your story told in its most crushingly beautiful form.
        </p>
      </div>
      <Link className="nadon-about-cta" href="/booking">Book Nadon</Link>
    </section>
  );
}

function SiteAboutFaqs() {
  return (
    <section className="nadon-about-faqs" aria-labelledby="about-faqs-title">
      <div className="nadon-about-faqs-heading">
        <p>
          Below are a few frequently asked questions about weddings, bookings, and the way Nadon
          works. Have another question?{" "}
          <Link href="/booking">Send a note</Link> and we will reply with availability and next
          steps.
        </p>
        <h2 id="about-faqs-title">
          Frequently
          <br />
          Asked Questions
        </h2>
      </div>
      <div className="nadon-about-faq-list">
        {aboutFaqs.map((faq, index) => (
          <details className="nadon-about-faq" key={faq.question} open={index === 0}>
            <summary>
              <h3>{faq.question}</h3>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="nadon-about-faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="nadon-footer">
        <div className="nadon-canvas">
          <SiteSocialGrid />
          <p className="nadon-footer-copy">
            {site.name}’s photography is defined by raw emotion and refined simplicity. With a
            talent for capturing the unseen and the unfiltered, Nadon strips back the layers to
            reveal love in its truest form: effortless, sophisticated, and unforgettable.
          </p>
          <div className="nadon-footer-legal">
            <div className="nadon-footer-legal-left">
              <span>© 2026 {site.name}. All rights reserved.</span>
            </div>
            <span className="nadon-footer-credit">Design by Pantheon</span>
            <nav className="nadon-footer-legal-right" aria-label="Footer links">
              <a className="nadon-footer-social-link" href="https://web.facebook.com/nadon.clinton" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 512 512" aria-hidden="true">
                  <path d="M288 192v-38.1c0-17.2 3.8-25.9 30.5-25.9H352V64h-55.9c-68.5 0-91.1 31.4-91.1 85.3V192h-45v64h45v192h83V256h56.4l7.6-64h-64z" />
                </svg>
              </a>
              <a className="nadon-footer-social-link" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 512 512" aria-hidden="true">
                  <circle cx="256" cy="255.833" r="80" />
                  <path d="M177.805 176.887c21.154-21.154 49.28-32.93 79.195-32.93s58.04 11.838 79.195 32.992c13.422 13.42 23.01 29.55 28.232 47.55H448.5v-113c0-26.51-20.49-47-47-47h-288c-26.51 0-49 20.49-49 47v113h85.072c5.222-18 14.81-34.19 28.233-47.614zM416.5 147.7c0 7.07-5.73 12.8-12.8 12.8h-38.4c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8h38.4c7.07 0 12.8 5.73 12.8 12.8v38.4zm-80.305 187.58c-21.154 21.153-49.28 32.678-79.195 32.678s-58.04-11.462-79.195-32.616c-21.115-21.115-32.76-49.842-32.803-78.842H64.5v143c0 26.51 22.49 49 49 49h288c26.51 0 47-22.49 47-49v-143h-79.502c-.043 29-11.687 57.664-32.803 78.78z" />
                </svg>
              </a>
              <a className="nadon-footer-social-link" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16.02 3.2A12.75 12.75 0 0 0 5.1 22.52L3.55 28.8l6.43-1.5A12.77 12.77 0 1 0 16.02 3.2Zm0 22.9a10.04 10.04 0 0 1-5.12-1.4l-.37-.22-3.82.9.92-3.72-.24-.38a10.06 10.06 0 1 1 8.63 4.82Zm5.51-7.52c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.68-1.64-.93-2.24-.25-.59-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
                </svg>
              </a>
              <Link href="/terms-and-conditions">Terms</Link>
              <Link href="/privacy-policy">Privacy</Link>
            </nav>
          </div>
        </div>
      </footer>
      <div id="back-to-top" className="nadon-back-to-top-block" aria-label="Back to top control">
        <BackToTop />
      </div>
    </>
  );
}

function SitePress() {
  return (
    <section className="nadon-press">
      <h3>Featured in</h3>
      <div>
        {pressLogos.map((logo) => (
          <img key={logo.src} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </section>
  );
}

function SiteTestimonial() {
  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section className="nadon-testimonial" id="testimonials">
      <div className="nadon-testimonial-header">
        <p className="nadon-label">Client notes</p>
        <h2>Kind words from honest celebrations</h2>
      </div>
      <div className="nadon-testimonial-window" aria-label="Client testimonials">
        <ul className="nadon-testimonial-track">
          {carouselItems.map((testimonial, index) => (
            <li
              aria-hidden={index >= testimonials.length}
              className="nadon-testimonial-card"
              key={`${testimonial.name}-${index}`}
            >
              <div className="nadon-testimonial-card-top">
                <LoadingImage src={testimonial.image} alt={testimonial.alt} />
                <div>
                  <p className="nadon-testimonial-rating" aria-label="Five star review">
                    ★★★★★
                  </p>
                  <p className="nadon-testimonial-cite">{testimonial.name}</p>
                  <p className="nadon-testimonial-context">{testimonial.context}</p>
                </div>
              </div>
              <p className="nadon-testimonial-body">{testimonial.quote}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowCircleIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <path d="M256,41C137.26,41,41,137.26,41,256s96.26,215,215,215,215-96.26,215-215S374.74,41,256,41ZM396.71,396.71A199,199,0,1,1,115.29,115.29,199,199,0,1,1,396.71,396.71Z" />
      <path d="M361,261.71l.26-.36c.09-.12.18-.23.26-.35l.26-.42.19-.33a4.39,4.39,0,0,0,.21-.44c.06-.12.12-.24.17-.36s.11-.29.16-.43.1-.27.14-.4.08-.29.11-.44.08-.28.11-.42.05-.34.07-.51l.06-.36a10.58,10.58,0,0,0,0-1.78l-.06-.37c0-.17,0-.33-.07-.5s-.07-.29-.11-.43-.07-.28-.11-.42-.1-.28-.14-.42-.1-.28-.16-.41-.11-.26-.17-.39-.13-.28-.2-.41l-.21-.36c-.08-.13-.16-.27-.25-.4a4.61,4.61,0,0,0-.28-.38,3.81,3.81,0,0,0-.24-.32c-.19-.23-.38-.45-.59-.66h0l-53-53a9,9,0,0,0-12.72,12.72L332.27,247H158a9,9,0,0,0,0,18H332.27l-37.63,37.64a9,9,0,1,0,12.72,12.72l53-53,.09-.09C360.62,262.09,360.8,261.9,361,261.71Z" />
    </svg>
  );
}

export function SiteWeddingGalleryPage({
  gallery,
  publishedContent
}: {
  gallery: (typeof weddingGalleries)[number];
  publishedContent?: PublishedContent | null;
}) {
  const galleryIndex = weddingGalleries.findIndex((item) => item.href === gallery.href);
  const publishedGallery = publishedContent?.weddingGalleries?.[galleryIndex];
  const galleryImages =
    publishedGallery?.galleryImages?.filter((image) => image.src) ??
    weddingGalleryImages.map<PublishedImage>((src) => ({ src }));
  const galleryItems = galleryImages.map((image, index) => ({
    alt: `${gallery.name} wedding photograph ${index + 1}`,
    aspectRatio: image.aspectRatio,
    height: image.height,
    href: image.src,
    src: image.src,
    width: image.width
  }));
  const galleryName = publishedGallery?.name || gallery.name;
  const galleryLocation = (publishedGallery?.location || gallery.location).replace(/\n/g, " / ");
  const galleryStory = publishedGallery?.story || "A luminous celebration told through quiet gestures, open laughter, and the kind of in-between moments that make a wedding feel completely personal.";

  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-gallery-page">
        <div className="nadon-gallery-shell">
          <div className="nadon-gallery-content">
            <section className="nadon-gallery-story" aria-labelledby="gallery-story-title">
              <p className="nadon-gallery-story-kicker">Real wedding story</p>
              <h2 id="gallery-story-title">
                Wedding of {galleryName}
                <span>{galleryLocation}</span>
              </h2>
              <div className="nadon-gallery-story-copy">
                <p>
                  {galleryStory}
                </p>
                <p>
                  The gallery moves like a memory of the day: atmosphere first, portraits when they
                  matter, and details held with a soft editorial restraint.
                </p>
              </div>
            </section>

            <MasonryGallery
              ariaLabel={`${galleryName} wedding photographs`}
              className="nadon-gallery-masonry"
              items={galleryItems}
            />
          </div>
        </div>

        <section className="nadon-view-gallery">
          <Link href="/portfolio">
            <ArrowCircleIcon />
            <span>back to gallery</span>
          </Link>
        </section>

        <SitePress />
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteHomePage({ publishedContent }: { publishedContent?: PublishedContent | null }) {
  const publishedHomeImages = publishedContent?.homeGalleryImages?.filter((image) => image.src) ?? [];
  const homeGallerySource = publishedHomeImages.length > 0 ? publishedHomeImages : homeImages;
  const homeGalleryItems = homeGallerySource.map((image, index) => ({
    alt: "alt" in image ? image.alt : `Published homepage photograph ${index + 1}`,
    aspectRatio: "aspectRatio" in image ? image.aspectRatio : undefined,
    height: "height" in image ? image.height : undefined,
    src: image.src,
    width: "width" in image ? image.width : undefined
  }));
  const publishedHeroImages = publishedContent?.homeCarouselImages?.filter((image) => image.src) ?? [];
  const heroImages = publishedHeroImages.length > 0 ? publishedHeroImages : undefined;

  return (
    <>
      <SiteHeader transparentOnHero />
      <main className="nadon-page">
        <HomeHeroCarousel images={heroImages} />
        <section className="nadon-home-quote" aria-label="Wedding quote">
          <QuoteIcon className="nadon-home-quote-icon" />
          <h2>MY PHILOSOPHY</h2>
          <p>
            A wedding outfit is more than just a garment, it depicts the personality of the couple.
            This civil wedding styled shoot is a statement of style, personality and above all,
            romance.
          </p>
          <span>—NADON CLINTON</span>
        </section>
        <section className="nadon-home-collage" aria-label="Featured photographs">
          <MasonryGallery
            ariaLabel="Featured photographs"
            className="nadon-home-masonry"
            items={homeGalleryItems}
          />
        </section>

        <SitePress />
        <SiteTestimonial />
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteAboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-about-page">
        <SiteAboutBand />
        <SiteAboutFaqs />
        <SitePress />
        <SiteTestimonial />
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteWeddingsPage({ publishedContent }: { publishedContent?: PublishedContent | null }) {
  const listingGalleries = weddingGalleries.map((gallery, index) => {
    const publishedGallery = publishedContent?.weddingGalleries?.[index];
    const coverImage = publishedGallery?.coverImage;
    const hasPublishedCover = Boolean(coverImage?.src);

    return {
      aspectRatio: coverImage?.aspectRatio || (!hasPublishedCover ? gallery.image.width / gallery.image.height : undefined),
      href: gallery.href,
      height: coverImage?.height || (!hasPublishedCover ? gallery.image.height : undefined),
      imagePosition: gallery.image.objectPosition,
      location: publishedGallery?.location || gallery.location,
      name: publishedGallery?.name || gallery.name,
      src: coverImage?.src || gallery.src,
      width: coverImage?.width || (!hasPublishedCover ? gallery.image.width : undefined)
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-weddings-page">
        <section className="nadon-weddings-title">
          <h1>Wedding Galleries</h1>
          <h3>Explore a few of my favourite weddings</h3>
        </section>

        <WeddingListingGrid galleries={listingGalleries} />

        <SiteTestimonial />
        <SitePress />
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-contact-page">
        <section className="nadon-contact-layout">
          <LoadingImage
            className="nadon-contact-image"
            src={images.contactBackdrop}
            alt="Editorial wedding moment"
          />
          <h1 className="nadon-contact-heading">Bookings</h1>
          <p className="nadon-contact-intro">
            If you have a question or would like to chat about working together, please send the
            details through the booking form below.
          </p>
          <div className="nadon-contact-panel">
            <ContactActions email={site.email} />
          </div>
        </section>
        <section className="nadon-contact-links-section" aria-label="Contact links">
          <ContactIconLinks email={site.email} instagramHandle={site.instagram} phone="+234 814 157 9856" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteStudiosPage({ publishedContent }: { publishedContent?: PublishedContent | null }) {
  const studioPage = pages.find((page) => page.slug === "studios");

  if (!studioPage) {
    return null;
  }

  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-studios-page">
        <section className="nadon-weddings-title nadon-studios-portfolio-title">
          <h1>studio galleries</h1>
          <h3>Explore family, couples, and birthday sessions</h3>
        </section>

        <section className="nadon-studios-portfolio-grid" aria-label="Studio portfolio categories">
          {studioPortfolioCategories.map((category, index) => {
            const publishedStudio = publishedContent?.studioGalleries?.[index];
            const imageSrc = publishedStudio?.coverImage?.src || category.image.src;

            return (
            <Link className="nadon-studios-portfolio-card" href={category.href} key={category.title}>
              <LoadingImage src={imageSrc} alt={category.image.alt} />
              <span>{category.title}</span>
              <em>View Gallery</em>
            </Link>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteStudioPortfolioGalleryPage({
  category,
  publishedContent
}: {
  category: (typeof studioPortfolioCategories)[number];
  publishedContent?: PublishedContent | null;
}) {
  const studioPage = pages.find((page) => page.slug === "studios");
  const categoryIndex = studioPortfolioCategories.findIndex((item) => item.slug === category.slug);
  const publishedGalleryImages = publishedContent?.studioGalleries?.[categoryIndex]?.galleryImages?.filter((image) => image.src);
  const baseImages = studioPage?.gallery ?? [];
  const gallerySource = publishedGalleryImages?.length ? publishedGalleryImages : [...baseImages, ...baseImages, ...baseImages];
  const galleryItems = gallerySource.map((image, index) => ({
    alt: `${category.title} studio photograph ${index + 1}`,
    aspectRatio: "aspectRatio" in image ? image.aspectRatio : undefined,
    height: "height" in image ? image.height : undefined,
    src: image.src,
    width: "width" in image ? image.width : undefined
  }));

  return (
    <>
      <SiteHeader />
      <main className="nadon-page nadon-gallery-page">
        <div className="nadon-gallery-shell">
          <div className="nadon-gallery-content">
            <section className="nadon-gallery-story" aria-labelledby="studio-category-title">
              <p className="nadon-gallery-story-kicker">Studio gallery</p>
              <h2 id="studio-category-title">
                {category.title}
                <span>Portraits / connection / quiet detail</span>
              </h2>
              <div className="nadon-gallery-story-copy">
                <p>
                  A considered studio story shaped around presence, warm direction, and images that
                  feel personal without losing polish.
                </p>
              </div>
            </section>

            <MasonryGallery
              ariaLabel={`${category.title} studio photographs`}
              className="nadon-gallery-masonry"
              items={galleryItems}
            />
          </div>
        </div>

        <section className="nadon-view-gallery">
          <Link href="/studios">
            <ArrowCircleIcon />
            <span>back to studios</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteLegalPage({
  page
}: {
  page: {
    title: string;
    body: string[];
  };
}) {
  return (
    <>
      <SiteHeader />
      <main className="nadon-page">
        <section className="nadon-legal-page">
          <p className="nadon-label">{site.name}</p>
          <h1>{page.title}</h1>
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function SiteInteriorPage({ page }: { page: PageContent }) {
  return (
    <>
      <SiteHeader />
      <main className={`nadon-page nadon-interior nadon-${page.slug}`}>
        <section className="nadon-interior-hero">
          <div>
            <p className="nadon-label">{page.eyebrow}</p>
            <h1>{page.title}</h1>
          </div>
          <p>{page.description}</p>
        </section>

        <section className="nadon-feature">
          <LoadingImage src={page.hero.src} alt={page.hero.alt} />
        </section>

        <section className="nadon-about-band nadon-story-band">
          <div>
            <p className="nadon-label">{page.navLabel}</p>
            <h2>{page.introTitle}</h2>
          </div>
          <div className="nadon-about-copy">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href="/booking">{page.cta}</Link>
          </div>
        </section>

        <section className="nadon-gallery" aria-label={`${page.title} gallery`}>
          {page.gallery.map((image, index) => (
            <LoadingImage className={`nadon-gallery-${index + 1}`} key={`${image.src}-${index}`} src={image.src} alt={image.alt} />
          ))}
        </section>

        <section className="nadon-details">
          {page.details.map((detail) => (
            <article key={detail.title}>
              <h3>{detail.title}</h3>
              <p>{detail.body}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
