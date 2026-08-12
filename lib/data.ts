export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Collections", href: "#featured-collections", key: "collections" },
  { label: "Shop", href: "#product-grid", key: "shop" },
  { label: "About", href: "#testimonials", key: "about" },
  { label: "Contact", href: "#newsletter", key: "contact" },
];

export const brandName = "Pet360";
export const brandTagline = "A Home They'll Love as Much as You Do";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  image: string;
  description: string;
  category: string;
  badge?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}