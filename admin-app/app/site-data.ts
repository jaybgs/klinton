export type GalleryImage = {
  src: string;
  alt: string;
  shape?: "portrait" | "landscape" | "square" | "wide";
};

export type PageContent = {
  slug: string;
  aliases?: string[];
  navLabel: string;
  title: string;
  eyebrow: string;
  description: string;
  hero: GalleryImage;
  introTitle: string;
  intro: string[];
  gallery: GalleryImage[];
  details: {
    title: string;
    body: string;
  }[];
  cta: string;
};

export const site = {
  name: "Nadon Klinton",
  tagline: "Wedding photography available worldwide",
  email: "nadonclinton888@gmail.com",
  instagram: "@nadon.klinton"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Weddings" },
  { href: "/studios", label: "Studios" },
  { href: "/booking", label: "Bookings" }
];

export const images = {
  weddingWalk:
    "https://static.showit.co/2400/Z5eKLTR8vCQebz2ONHtpVw/shared/luxury-wedding-photographer-france-balcony-couple.jpg",
  veil:
    "https://static.showit.co/2400/QvjrGMjsEK_Y9Kku2nQ3FA/shared/new-york-city-wedding-photography-skyline-view.jpg",
  dinner: "https://static.showit.co/1200/H8aG8FvrJ0ANpo9xA6wFmQ/shared/website-3.jpg",
  contactBackdrop: "https://static.showit.co/1200/Y3yvuuEnsJR7MfvaoaonXg/shared/photo-34.jpg",
  rings: "https://static.showit.co/800/hZ0W15Tcs0NR18rEXt9xhg/shared/charliescott_spedits-29.jpg",
  bride: "https://static.showit.co/800/JpTvSAS2D2-rabbUZDAI5Q/shared/taylorluke_spedits-20.jpg",
  couple: "https://static.showit.co/1200/MXqomReihiWWN-G5ZBNFnQ/shared/9685257238_jpg_exif1.jpg",
  portrait: "/images/nadon-portrait.jpg",
  editorial: "https://static.showit.co/1200/73Cu5_6gb9flkHRqxADOPA/shared/french-riviera-wedding-photographer-nice-cityscape.jpg",
  weddingGuests: "https://static.showit.co/1200/FuQIsZDMe9VV85W7dbvv1A/shared/jordanasam_spedits-29.jpg",
  editorialDetail: "https://static.showit.co/800/uTeQgKv6qG-1yxbimsFDEA/shared/photo-23.jpg",
  camera: "https://static.showit.co/800/2wyfAwqHhF7cw83OwiZ8Hg/shared/bali-wedding-bride-grrom-champange-tower.jpg",
  table: "https://static.showit.co/1200/UgAaHcSlgMgh_jctBJnLqw/shared/photo-74.jpg",
  balconyCouple:
    "https://static.showit.co/1200/zv-bvxVCFDnIgwgVJl31Kg/334981/wedding-photography-by-cassandra-ladru_00048.jpg",
  weddingDetail: "https://static.showit.co/800/J3KEQosF7WpU-2h5ZFuXFA/shared/photo-33.jpg",
  bridalProfile: "https://static.showit.co/800/iGkS8kNbmRQjNbgn2skEPw/shared/photo-61.jpg",
  receptionMoment: "https://static.showit.co/800/uD5MWCFvfdQHKXz8t8mhow/shared/photo-45.jpg",
  bouquet: "https://static.showit.co/800/mfwQae1NFVPkuQQXAgMXSA/shared/photo-50.jpg",
  ceremonyMoment:
    "https://static.showit.co/1200/OHaczqS48GEMkC8yzeeLnQ/334981/wedding_photography_by_cassandra_ladru_00024.jpg",
  aboutBackdrop: "https://static.showit.co/1200/Cw920oyjXJAUn9aoXB4Rqw/shared/photo-32.jpg",
  testimonial:
    "https://static.showit.co/800/ZI3JiIQcsvJnXBvKY810UQ/334981/hannah-luke-cassandra-ladru-testimonial.jpg",
  studioPortrait:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=82",
  studioProfile:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=82",
  studioCamera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=82",
  studioBackdrop:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=82",
  studioDesk:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82"
};

export const homeImages = [
  { className: "nadon-home-image nadon-home-image-a", src: images.weddingWalk, alt: "Editorial wedding scene" },
  { className: "nadon-home-image nadon-home-image-b", src: images.veil, alt: "Editorial city wedding portrait" },
  { className: "nadon-home-image nadon-home-image-c", src: images.balconyCouple, alt: "Wedding portrait" },
  { className: "nadon-home-image nadon-home-image-d", src: images.weddingDetail, alt: "Wedding detail" },
  { className: "nadon-home-image nadon-home-image-e", src: images.bridalProfile, alt: "Editorial wedding scene" },
  { className: "nadon-home-image nadon-home-image-f", src: images.receptionMoment, alt: "Wedding celebration" },
  { className: "nadon-home-image nadon-home-image-g", src: images.table, alt: "Reception atmosphere" },
  { className: "nadon-home-image nadon-home-image-h", src: images.bouquet, alt: "Portrait in natural light" },
  { className: "nadon-home-image nadon-home-image-i", src: images.camera, alt: "Wedding champagne tower" },
  { className: "nadon-home-image nadon-home-image-j", src: images.weddingGuests, alt: "Wedding guests" },
  { className: "nadon-home-image nadon-home-image-k", src: images.editorialDetail, alt: "Wedding portrait detail" },
  { className: "nadon-home-image nadon-home-image-l", src: images.editorial, alt: "French Riviera wedding" },
  { className: "nadon-home-image nadon-home-image-m", src: images.dinner, alt: "Reception editorial scene" },
  { className: "nadon-home-image nadon-home-image-n", src: images.rings, alt: "Wedding details" },
  { className: "nadon-home-image nadon-home-image-o", src: images.couple, alt: "Couple portrait" },
  { className: "nadon-home-image nadon-home-image-p", src: images.bride, alt: "Bridal portrait" },
  { className: "nadon-home-image nadon-home-image-q", src: images.ceremonyMoment, alt: "Editorial wedding moment" },
  { className: "nadon-home-image nadon-home-image-r", src: images.portrait, alt: "Portrait" }
];

export const aboutImages = [
  { className: "nadon-about-image-1", src: images.aboutBackdrop, alt: "" },
  { className: "nadon-about-image-2", src: images.bridalProfile, alt: "" },
  { className: "nadon-about-image-3", src: images.portrait, alt: "" },
  { className: "nadon-about-image-4", src: images.bouquet, alt: "" }
];

export const testimonials = [
  {
    name: "Hannah & Luke",
    context: "Wedding clients",
    image: images.testimonial,
    alt: "Hannah and Luke wedding portrait",
    quote:
      "Cass, where to even begin with how beautiful our photos turned out. You gave us all the right direction while making everything feel easy and natural."
  },
  {
    name: "Lauren & Nate",
    context: "MCA, Sydney",
    image:
      "https://static.showit.co/222/oIqIvLG5m67PbJiQEYj9SQ/shared/laurennate_spedits-121.jpg",
    alt: "Lauren and Nate wedding portrait",
    quote:
      "The images feel exactly like the day did: calm, emotional, and full of the little details we never wanted to forget."
  },
  {
    name: "Monique & Alex",
    context: "Editorial wedding",
    image:
      "https://static.showit.co/222/lk9N47yD_y4Vly9_4ldyQw/shared/moniquealex_spedits-73.jpg",
    alt: "Monique and Alex wedding portrait",
    quote:
      "Every frame has such a quiet confidence. Nothing felt forced, yet the whole gallery feels considered and timeless."
  },
  {
    name: "Jordana & Sam",
    context: "Sydney celebration",
    image:
      "https://static.showit.co/222/FuQIsZDMe9VV85W7dbvv1A/shared/jordanasam_spedits-29.jpg",
    alt: "Jordana and Sam wedding portrait",
    quote:
      "We felt completely looked after from the first email through to the final gallery. The photos are refined, warm, and so us."
  },
  {
    name: "Charlie & Scott",
    context: "Real wedding",
    image:
      "https://static.showit.co/222/hZ0W15Tcs0NR18rEXt9xhg/shared/charliescott_spedits-29.jpg",
    alt: "Charlie and Scott wedding detail",
    quote:
      "The gallery brought us right back to the atmosphere of the day. Honest moments, beautiful details, and no fuss."
  }
];

export const footerImages = [
  "https://static.showit.co/222/JpTvSAS2D2-rabbUZDAI5Q/shared/taylorluke_spedits-20.jpg",
  "https://static.showit.co/222/lk9N47yD_y4Vly9_4ldyQw/shared/moniquealex_spedits-73.jpg",
  "https://static.showit.co/222/Ud3IFL5Zj2XvqGf-9DSDfw/shared/photo_24-9-2022_4_49_59_pm.jpg",
  "https://static.showit.co/222/MXqomReihiWWN-G5ZBNFnQ/shared/9685257238_jpg_exif1.jpg",
  "https://static.showit.co/222/oIqIvLG5m67PbJiQEYj9SQ/shared/laurennate_spedits-121.jpg",
  "https://static.showit.co/222/bz76bQ4SIzxNsbPgnT4a3Q/shared/laurennate_spedits-185.jpg",
  "https://static.showit.co/222/_Zk2M_g9WPS_00qTw6Bq4g/shared/photo_3-8-2023_1_01_36_pm.jpg",
  "https://static.showit.co/222/H8aG8FvrJ0ANpo9xA6wFmQ/shared/website-3.jpg",
  "https://static.showit.co/222/FuQIsZDMe9VV85W7dbvv1A/shared/jordanasam_spedits-29.jpg",
  "https://static.showit.co/222/H9jAK-pudNz4TCV664ZmSQ/shared/website-5.jpg",
  "https://static.showit.co/222/HPtNGsah-eh_6YL3CjrWhQ/shared/helenawill_finals_daytwo-505.jpg",
  "https://static.showit.co/222/TXU58BfWWb3c7PFoQ3RALg/shared/lerosejune25edits-122.jpg",
  "https://static.showit.co/222/wdtQplhQPWYq1ksqvd1DzA/shared/lerose0909_finals-431.jpg",
  "https://static.showit.co/222/hZ0W15Tcs0NR18rEXt9xhg/shared/charliescott_spedits-29.jpg",
  "https://static.showit.co/222/UCBN_waU8D7G_Sryms2Tww/shared/laurennate_spedits-12.jpg",
  "https://static.showit.co/222/z-isKM5uiY64K2SE66-C3g/shared/photo_3-8-2023_1_01_40_pm.jpg",
  "https://static.showit.co/222/82nWWl9xlqEPN2jpqK5v3A/shared/photo_3-8-2023_1_01_43_pm.jpg",
  "https://static.showit.co/222/qdxhj3tEaQvh39nBICMnVA/shared/photo_4-3-2022_4_33_33_pm.jpg",
  "https://static.showit.co/222/BNGxmKBhPXq9v-z_Du8SpQ/shared/adelleross_finals-56.jpg",
  "https://static.showit.co/222/etgeu6TkzCJSdi2hCPJ5eA/shared/reedit-5.jpg"
];

export const pressLogos = [
  {
    src: "/images/bellanaija-weddings-logo.png",
    alt: "BellaNaija Weddings"
  },
  {
    src: "/images/pulse-nigeria-logo.png",
    alt: "Pulse Nigeria"
  },
  {
    src: "https://static.showit.co/400/6FbOI9D4-Dzedp5EDwkpvQ/shared/the-bridal-journey-logo.png",
    alt: "The Bridal Journey"
  },
  {
    src: "https://static.showit.co/400/deTerozZTIcTh9O1tANyvw/shared/brides-logo.png",
    alt: "Brides"
  },
  {
    src: "https://static.showit.co/400/CqRvaugqRPskQiefspTijg/shared/lane-logo.png",
    alt: "The Lane"
  }
];

const homeGallery: GalleryImage[] = [
  { src: images.rings, alt: "Wedding rings in soft light", shape: "square" },
  { src: images.veil, alt: "Couple walking through sunlight", shape: "portrait" },
  { src: images.editorial, alt: "Editorial bridal portrait", shape: "landscape" },
  { src: images.dinner, alt: "Candlelit wedding reception", shape: "wide" }
];

export const pages: PageContent[] = [
  {
    slug: "portfolio",
    aliases: ["weddings"],
    navLabel: "Weddings",
    title: "Weddings",
    eyebrow: "For modern romantics",
    description:
      "Honest, luminous wedding photography for celebrations that feel deeply personal and quietly refined.",
    hero: { src: images.weddingWalk, alt: "Bride and groom walking in evening light" },
    introTitle: "A wedding story should feel like memory, not performance.",
    intro: [
      "The work is calm, observant, and intentional. We follow the atmosphere of the day rather than forcing it into a formula.",
      "From welcome drinks to final embraces, the images are composed with restraint and emotion so the gallery feels timeless years from now."
    ],
    gallery: [
      { src: images.bride, alt: "Outdoor wedding ceremony", shape: "wide" },
      { src: images.rings, alt: "Wedding rings held in hands", shape: "square" },
      { src: images.couple, alt: "Couple embraced after ceremony", shape: "portrait" },
      { src: images.dinner, alt: "Reception tables under warm light", shape: "landscape" }
    ],
    details: [
      {
        title: "Coverage",
        body: "Full day and multi-day coverage is available for intimate gatherings, destination weddings, and large celebrations."
      },
      {
        title: "Delivery",
        body: "Every gallery is edited with a consistent, filmic tone and delivered in a private online viewing experience."
      },
      {
        title: "Travel",
        body: "Available for commissions across the country and worldwide with custom travel estimates."
      }
    ],
    cta: "Enquire about your date"
  },
  {
    slug: "about",
    aliases: [],
    navLabel: "About",
    title: "About",
    eyebrow: "Behind the lens",
    description:
      "A photographer with an editorial eye, a gentle presence, and a deep belief that beauty lives in the unscripted.",
    hero: { src: images.portrait, alt: "Photographer portrait" },
    introTitle: "Quiet direction. Real feeling. Refined composition.",
    intro: [
      "Nadon Klinton creates imagery for couples, celebrations, and creative brands who value emotion, atmosphere, and understated elegance.",
      "The approach blends documentary patience with fashion-informed framing, preserving the day without pulling it away from the people living it."
    ],
    gallery: [
      { src: images.camera, alt: "Camera in hand", shape: "landscape" },
      { src: images.editorial, alt: "Editorial portrait in studio", shape: "portrait" },
      { src: images.table, alt: "Creative notes on a table", shape: "square" },
      { src: images.veil, alt: "Couple in soft sun", shape: "wide" }
    ],
    details: [
      {
        title: "Philosophy",
        body: "Images are strongest when they have room to breathe: clean frames, honest expression, and a considered sense of place."
      },
      {
        title: "Direction",
        body: "You will be guided when it helps and left alone when the real moment is better than anything staged."
      },
      {
        title: "Experience",
        body: "The process is designed to feel organized, calm, and human from the first email to the final gallery."
      }
    ],
    cta: "Meet the studios"
  },
  {
    slug: "studios",
    aliases: ["studio"],
    navLabel: "Studios",
    title: "Studios",
    eyebrow: "The practice",
    description:
      "A quiet look into Nadon Klinton’s studio portrait process, visual language, client experience, and the atmosphere behind the work.",
    hero: { src: images.studioPortrait, alt: "Studio portrait against a clean backdrop" },
    introTitle: "A considered portrait studio for images with feeling, texture, and restraint.",
    intro: [
      "The studio is built around calm direction, clean light, editorial composition, and the kind of observation that lets character stay alive.",
      "Every portrait commission is approached with care: clear communication, thoughtful pacing, and imagery shaped by the person in front of the lens."
    ],
    gallery: [
      { src: images.studioBackdrop, alt: "Photography studio with backdrop and camera", shape: "wide" },
      { src: images.studioProfile, alt: "Studio portrait in soft light", shape: "portrait" },
      { src: images.studioCamera, alt: "Studio camera close up", shape: "square" },
      { src: images.studioDesk, alt: "Creative studio desk and workspace", shape: "landscape" }
    ],
    details: [
      {
        title: "Approach",
        body: "The work blends documentary patience with refined composition, creating images that feel natural without losing polish."
      },
      {
        title: "Experience",
        body: "The client process is simple, warm, and organized from the first note through delivery of the final gallery."
      },
      {
        title: "Direction",
        body: "Guidance is offered when it helps the frame, then pulled back when the honest moment is better left untouched."
      }
    ],
    cta: "Book a Session"
  },
  {
    slug: "booking",
    aliases: ["contact"],
    navLabel: "Bookings",
    title: "Bookings",
    eyebrow: "Tell us everything",
    description:
      "Share the date, place, people, and feeling of what you are planning. We will reply with availability and next steps.",
    hero: { src: images.dinner, alt: "Elegant candlelit wedding table" },
    introTitle: "The best stories begin with a clear, generous note.",
    intro: [
      "Please include your date, location, guest count if relevant, and the kind of coverage you are looking for.",
      "For weddings, you will receive availability, collection details, and a calm path toward reserving your date."
    ],
    gallery: [
      { src: images.bride, alt: "Wedding ceremony", shape: "wide" },
      { src: images.rings, alt: "Wedding rings", shape: "square" },
      { src: images.portrait, alt: "Photographer portrait", shape: "portrait" },
      { src: images.weddingWalk, alt: "Couple walking", shape: "landscape" }
    ],
    details: [
      {
        title: "Email",
        body: site.email
      },
      {
        title: "Location",
        body: "Based locally, available for commissions worldwide."
      },
      {
        title: "Response time",
        body: "Most enquiries receive a thoughtful reply within two business days."
      }
    ],
    cta: "Send an enquiry"
  }
];

export const legalPages = {
  "terms-and-conditions": {
    title: "Terms and Conditions",
    body: [
      "These terms outline the general conditions for working with Nadon Klinton Photography. A commission is confirmed once the agreed proposal, payment schedule, and usage terms have been accepted in writing.",
      "Bookings, usage rights, cancellation policies, travel costs, payment schedules, and delivery timelines are confirmed before work begins so every commission has a clear shared understanding.",
      "All imagery, copy, and brand materials on this site are owned by their respective rights holders and may not be copied, edited, redistributed, or used commercially without written permission."
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: [
      "Nadon Klinton Photography collects enquiry details such as names, contact information, event dates, locations, and project notes so we can respond thoughtfully and manage commissions.",
      "Information shared through email or enquiry forms is used for communication, booking, planning, gallery delivery, and maintaining the client relationship.",
      "Client information is treated with care and is not sold. Requests about stored personal information can be sent to the studio by email."
    ]
  }
};

export const home: PageContent = {
  slug: "",
  navLabel: "Home",
  title: site.name,
  eyebrow: site.tagline,
  description:
    "Journalistic wedding photography and studio-led imagery with a refined editorial eye and an instinct for honest emotion.",
  hero: { src: images.weddingWalk, alt: "Wedding couple in soft outdoor light" },
  introTitle: "Images that feel effortless, sophisticated, and alive.",
  intro: [
    "Nadon Klinton creates photographs with a quiet sense of intimacy: the gestures you missed, the details you chose, and the atmosphere everyone felt.",
    "The work is guided by a love of natural movement, graceful composition, and stories that remain beautiful long after the day has passed."
  ],
  gallery: homeGallery,
  details: [
    {
      title: "Weddings",
      body: "Full-day and destination wedding photography with an editorial documentary approach."
    },
    {
      title: "Studios",
      body: "A considered studio practice shaped by calm direction, refined composition, and a deeply human client experience."
    }
  ],
  cta: "Begin your enquiry"
};
