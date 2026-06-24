"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Truck, RotateCcw, Shield, Sparkles, Heart, TrendingUp, Package, ChevronRight } from 'lucide-react';
import {
  products,
  categories,
  type Product,
  type Category,
  APP_NAME,
  APP_TAGLINE,
  BRAND_COLORS,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline section data ───────────────────────────────────────────────

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast, reliable delivery to your door.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. No questions asked.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Your payment info is always encrypted and protected.",
  },
  {
    icon: Package,
    title: "Quality Guaranteed",
    description: "Every product is curated and quality-checked before listing.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia R.",
    location: "New York, NY",
    rating: 5,
    text: "Lumio has completely changed how I shop online. The curation is impeccable and everything arrives beautifully packaged.",
    product: "Merino Wool Crewneck",
    avatar: "https://images.squarespace-cdn.com/content/v1/55ecad93e4b097dd68b71341/1552508220117-2ENOH1V1WPO9B15U9QOK/18922208_10211298040064581_7261989867091406680_n.jpg",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Austin, TX",
    rating: 5,
    text: "The headphones I ordered exceeded every expectation. Sound quality is phenomenal and shipping was faster than promised.",
    product: "Wireless Noise-Cancelling Headphones",
    avatar: "https://m.media-amazon.com/images/M/MV5BMTg2NzM3MDgzMV5BMl5BanBnXkFtZTcwNjg0MTQ5MQ@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 3,
    name: "Priya K.",
    location: "San Francisco, CA",
    rating: 5,
    text: "I love the lifestyle section. The ceramic coffee set is a daily ritual now. Lumio finds things I didn't know I needed.",
    product: "Ceramic Pour-Over Coffee Set",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFjb0oGgSOYPA/profile-displayphoto-shrink_200_200/B4DZZCoiL8G8AY-/0/1744874647031?e=2147483647&v=beta&t=iz-x6HzQIMtn31vtR_7FQLb0f3k09LJMyTJzm42hHDI",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Curated Products" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

// ─── Sub-components ────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-[#e94560] text-[#e94560]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-[#1a1a2e]/50 font-medium">({count})</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f5] aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e94560] text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1a1a2e] text-white shadow-sm">
              New
            </span>
          )}
          {discount != null && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-[#e94560] text-[#e94560]" : "text-[#1a1a2e]/40"
            }`}
          />
        </motion.button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl bg-[#1a1a2e] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e94560] transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs font-medium text-[#e94560] uppercase tracking-wider capitalize">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-[#1a1a2e] leading-snug line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-[#1a1a2e]">
            ${product.price}
          </span>
          {product.originalPrice != null && (
            <span className="text-sm text-[#1a1a2e]/40 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#1a1a2e] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(233,69,96,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 39px,rgba(255,255,255,1) 40px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e94560]/15 border border-[#e94560]/30 text-[#e94560] text-xs font-semibold uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5" />
                New Season Arrivals
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] text-balance"
            >
              {APP_TAGLINE}.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 leading-relaxed max-w-md text-pretty"
            >
              Curated fashion, electronics, and lifestyle products chosen for
              people with taste. Shop the edit that defines modern living.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(233,69,96,0.45)] hover:bg-[#d63652] transition-colors duration-200"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 pt-4 border-t border-white/10"
            >
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-extrabold text-white">
                    {s.value}
                  </span>
                  <span className="text-xs text-white/50">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — featured product mosaic */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 ${
                  i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold leading-snug line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-white/70 text-xs">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── VALUE PROPS ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {valueProps.map((vp) => {
            const Icon = vp.icon;
            return (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f5f5f5] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e94560]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e94560] transition-colors duration-200">
                  <Icon className="w-5 h-5 text-[#e94560] group-hover:text-white transition-colors duration-200" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a2e] mb-0.5">
                    {vp.title}
                  </h3>
                  <p className="text-xs text-[#1a1a2e]/55 leading-relaxed">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────────────────── */}
      <section id="categories" className="bg-[#f5f5f5] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest text-[#e94560] mb-3"
            >
              Browse by Category
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight text-balance"
            >
              Shop Every Style
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                id: "fashion",
                label: "Fashion",
                desc: "Timeless wardrobe essentials",
                image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90",
                count: 320,
              },
              {
                id: "electronics",
                label: "Electronics",
                desc: "Tech that elevates your life",
                image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg",
                count: 180,
              },
              {
                id: "lifestyle",
                label: "Lifestyle",
                desc: "Curated for how you live",
                image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Lifestyle_Stores_-_New.jpg",
                count: 240,
              },
              {
                id: "accessories",
                label: "Accessories",
                desc: "The finishing touch",
                image: "https://panaxmart.com/cdn/shop/articles/Jewelry-laydown-two.jpg?v=1695801014&width=1920",
                count: 150,
              },
            ].map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
                  i === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ minHeight: "180px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-[#1a1a2e]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.desc}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[#e94560] text-xs font-semibold">
                    {cat.count}+ items
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold uppercase tracking-widest text-[#e94560] mb-3"
              >
                Featured Products
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight text-balance"
              >
                The Current Edit
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#e94560] hover:gap-3 transition-all duration-200"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat: Category) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-[#e94560] text-white shadow-[0_4px_12px_rgba(233,69,96,0.35)]"
                    : "bg-[#f5f5f5] text-[#1a1a2e]/70 hover:bg-[#1a1a2e]/10"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filteredProducts ?? []).map((product: Product, i: number) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEALS BANNER ─────────────────────────────────────────────────── */}
      <section id="deals" className="relative bg-[#1a1a2e] overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(233,69,96,0.22),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-[#e94560]/20 border border-[#e94560]/40 text-[#e94560] text-xs font-semibold uppercase tracking-widest"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Limited Time Offer
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance"
              >
                Up to 30% Off
                <br />
                <span className="text-[#e94560]">This Week Only.</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-lg leading-relaxed max-w-md text-pretty"
              >
                Our biggest seasonal sale is live. Grab premium fashion,
                electronics, and lifestyle picks at prices that won&apos;t last.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory("all");
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(233,69,96,0.45)] hover:bg-[#d63652] transition-colors duration-200"
                >
                  Shop the Sale
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right — sale products */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {products
                .filter((p) => p.badge === "Sale")
                .slice(0, 4)
                .map((product) => (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    whileHover={{ scale: 1.04 }}
                    className="relative rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-white/10 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#e94560] text-white">
                        Sale
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-semibold line-clamp-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-white text-sm font-bold">
                          ${product.price}
                        </span>
                        {product.originalPrice != null && (
                          <span className="text-white/50 text-xs line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest text-[#e94560] mb-3"
            >
              Customer Love
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight text-balance"
            >
              Real People, Real Reviews
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col gap-4 ${
                  i === 1 ? "md:-mt-4 md:mb-4" : ""
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[#e94560] text-[#e94560]"
                    />
                  ))}
                </div>
                <p className="text-[#1a1a2e]/75 text-sm leading-relaxed flex-1 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#e94560]/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#1a1a2e]/45">{t.location}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-[#e94560] font-medium bg-[#e94560]/10 px-2.5 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / BRAND STORY ────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/7] shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
                <img
                  src="https://www.lumiolegacypark.com/wp-content/uploads/2025/12/925025_hd_Forum-Architecture-Legacy-Park-C5-e1772122437476.jpg"
                  alt="Lumio curated lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                <img
                  src="https://www.lumiolegacypark.com/wp-content/uploads/2025/12/925025_hd_Forum-Architecture-Legacy-Park-C5-e1772122437476.jpg"
                  alt="Lumio premium packaging"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                <img
                  src="https://dcassetcdn.com/design_img/3214101/597701/597701_19667590_3214101_e6a48409_image.jpg"
                  alt="Lumio team curation"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-5 -right-5 bg-[#e94560] text-white rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(233,69,96,0.4)]"
              >
                <p className="text-3xl font-extrabold">50K+</p>
                <p className="text-xs text-white/80 mt-0.5">Happy Customers</p>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold uppercase tracking-widest text-[#e94560]"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight leading-tight text-balance"
              >
                Curated with Care,
                <br />
                Delivered with Pride.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a2e]/65 leading-relaxed text-pretty"
              >
                {APP_NAME} was founded on a simple belief: shopping should feel
                like discovery. We spend hundreds of hours sourcing products
                that meet our standards for quality, design, and value so you
                never have to wade through the noise.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a2e]/65 leading-relaxed text-pretty"
              >
                From independent fashion labels to cutting-edge electronics,
                every item in our catalog earns its place. We partner with
                makers who share our commitment to craft and sustainability.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={fadeInUp}
                    className="p-4 rounded-2xl bg-[#f5f5f5] border border-black/5"
                  >
                    <p className="text-2xl font-extrabold text-[#1a1a2e]">
                      {s.value}
                    </p>
                    <p className="text-xs text-[#1a1a2e]/55 mt-0.5">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(233,69,96,0.15),transparent)]" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6"
        >
          <motion.div
            variants={scaleIn}
            className="w-14 h-14 rounded-2xl bg-[#e94560] flex items-center justify-center shadow-[0_4px_20px_rgba(233,69,96,0.5)]"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance"
          >
            Get First Access to New Drops
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/55 text-lg leading-relaxed text-pretty"
          >
            Join 50,000+ subscribers and be the first to know about new
            arrivals, exclusive deals, and curated picks delivered weekly.
          </motion.p>
          <motion.form
            variants={fadeInUp}
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex flex-col sm:flex-row gap-3 mt-2"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              defaultValue=""
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]/60 focus:border-[#e94560]/60 transition-all duration-200"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(233,69,96,0.45)] hover:bg-[#d63652] transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe Free
            </motion.button>
          </motion.form>
          <motion.p variants={fadeIn} className="text-white/30 text-xs">
            No spam, ever. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
