export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "About", href: "#about" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const APP_NAME = "Lumio";
export const APP_TAGLINE = "Discover What You Love";

export const BRAND_COLORS = {
  primary: "#1a1a2e",
  accent: "#e94560",
  white: "#ffffff",
  surface: "#f5f5f5",
} as const;

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  isNew?: boolean;
};

export type Category = {
  id: string;
  label: string;
};

export const categories: Category[] = [
  { id: "all", label: "All Products" },
  { id: "fashion", label: "Fashion" },
  { id: "electronics", label: "Electronics" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "accessories", label: "Accessories" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Merino Wool Crewneck",
    category: "fashion",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviewCount: 214,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Lifestyle_Stores_-_New.jpg",
    badge: "Sale",
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 249,
    rating: 4.9,
    reviewCount: 876,
    image: "https://i5.walmartimages.com/seo/onn-Wireless-Over-Ear-Headphones-with-Active-Noise-Canceling-Black-New_aa870ab9-1da6-4f34-a297-9053b1105966.d8e64cb398fb27884b96ded908ea125b.jpeg",
    isNew: true,
  },
  {
    id: 3,
    name: "Minimalist Leather Watch",
    category: "accessories",
    price: 175,
    originalPrice: 220,
    rating: 4.7,
    reviewCount: 432,
    image: "https://urbandesigner.co/cdn/shop/files/Minimalist_stainless_steel_in_silver_natural_wooden_watch_with_Premium_Leather_band_030.jpg?v=1726166723",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Ceramic Pour-Over Coffee Set",
    category: "lifestyle",
    price: 64,
    rating: 4.6,
    reviewCount: 189,
    image: "https://freefoldingceramic.com/cdn/shop/products/freefolding-570copy_800x.jpg?v=1638619175",
    isNew: true,
  },
  {
    id: 5,
    name: "Slim Fit Chino Trousers",
    category: "fashion",
    price: 72,
    rating: 4.5,
    reviewCount: 301,
    image: "https://us.2tall.com/cdn/shop/files/chino_2t_juicy_beige_front_1_d8eb25dd-c48c-4a83-b3e4-849e5bb96165.jpg?v=1764643428&width=600",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 119,
    originalPrice: 149,
    rating: 4.7,
    reviewCount: 543,
    image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9130.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
    badge: "Sale",
  },
  {
    id: 7,
    name: "Linen Tote Bag",
    category: "accessories",
    price: 38,
    rating: 4.4,
    reviewCount: 127,
    image: "https://visibleartshop.com/cdn/shop/products/DSC_3953_2_82_2.jpg?v=1647352699&width=1445",
    isNew: true,
  },
  {
    id: 8,
    name: "Scented Soy Candle Set",
    category: "lifestyle",
    price: 45,
    rating: 4.8,
    reviewCount: 268,
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/2806756f-2709-4b34-9207-60fdee04b0e3.__CR0,0,600,450_PT0_SX600_V1___.jpg",
  },
];