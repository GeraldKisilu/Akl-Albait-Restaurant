import { useState, createContext, useContext, useCallback, useEffect } from "react";
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  ShoppingCart, X, Plus, Minus, ChevronRight, ChevronLeft,
  Clock, Phone, MapPin, Mail, Menu as MenuIcon, ArrowRight, Check, Star,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/albait.png";

// ─── EmailJS Config ───────────────────────────────────────────────────────────
const EJ = {
  SERVICE_ID: "service_33j2r0p",
  TEMPLATE_ID: "template_xcyvraw",
  PUBLIC_KEY: "0A0RRRb-XycqVRZFA",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface OptionChoice { name: string; price?: number; }
interface CustomGroup { label: string; choices: OptionChoice[]; }
interface MenuItem {
  id: string; name: string; description: string; price: number;
  image: string; category: string; customizations?: CustomGroup[];
  featured?: boolean; badge?: string;
}
interface CartItem {
  cartId: string; id: string; name: string;
  price: number; quantity: number;
  customizations: Record<string, string>; note: string; image: string;
}
interface CartCtx {
  cart: CartItem[];
  addItem: (i: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number; subtotal: number; tax: number; grandTotal: number;
}
interface UICtx { openMenu: () => void; openBasket: () => void; }

// ─── Menu Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Fried & Crispy",
  "Sandwiches & Quick Bites",
  "Grilled & Baked",
  "Rice & Biryani",
  "Indian & Pakistani Curries",
  "Vegetable Dishes",
  "Soft Drinks",
];

const IMG = {
  fries:   "https://images.unsplash.com/photo-1576107232684-1279f903cf89?w=600&h=400&fit=crop&auto=format",
  nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=400&fit=crop&auto=format",
  samosa:  "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&h=400&fit=crop&auto=format",
  rolls:   "https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&h=400&fit=crop&auto=format",
  sandwich:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop&auto=format",
  wrap:    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format",
  shawarma:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format",
  falafel: "https://images.unsplash.com/photo-1529006557810-274c8b923b28?w=600&h=400&fit=crop&auto=format",
  burger:  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&auto=format",
  grilled: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&h=400&fit=crop&auto=format",
  wings:   "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=400&fit=crop&auto=format",
  biryani: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&auto=format",
  biryani2:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&h=400&fit=crop&auto=format",
  rice:    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&auto=format",
  pulao:   "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format",
  mandi:   "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&h=400&fit=crop&auto=format",
  curry:   "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format",
  butter:  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop&auto=format",
  egg:     "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop&auto=format",
  veg:     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format",
  dal:     "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format",
  paneer:  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&auto=format",
  coke:    "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=400&fit=crop&auto=format",
  water:   "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&auto=format",
};

const ITEMS: MenuItem[] = [
  // ── FRIED & CRISPY ──
  { id: "f1", category: "Fried & Crispy", name: "French Fries", price: 5,
    description: "Golden crispy fries seasoned to perfection.",
    image: IMG.fries,
    customizations: [{ label: "Size", choices: [{ name: "Regular" }, { name: "Large", price: 2 }] }] },
  { id: "f2", category: "Fried & Crispy", name: "Chicken Nuggets", price: 8, featured: true,
    description: "Crispy golden chicken nuggets, juicy inside.",
    image: IMG.nuggets,
    customizations: [{ label: "Quantity", choices: [{ name: "6 pcs" }, { name: "10 pcs", price: 4 }] }] },
  { id: "f3", category: "Fried & Crispy", name: "Samosa", price: 2,
    description: "Crispy pastry triangles filled with spiced vegetables or chicken.",
    image: IMG.samosa,
    customizations: [{ label: "Type", choices: [{ name: "Veg" }, { name: "Chicken", price: 1 }] }] },
  { id: "f4", category: "Fried & Crispy", name: "Spring Rolls", price: 4,
    description: "Crunchy spring rolls with vegetarian or chicken filling.",
    image: IMG.rolls,
    customizations: [{ label: "Type", choices: [{ name: "Veg" }, { name: "Chicken", price: 1 }] }] },
  // ── SANDWICHES & QUICK BITES ──
  { id: "s1", category: "Sandwiches & Quick Bites", name: "Egg Sandwich", price: 8,
    description: "Fresh egg sandwich made to order on soft bread.",
    image: IMG.sandwich },
  { id: "s2", category: "Sandwiches & Quick Bites", name: "Chicken Sandwich", price: 8,
    description: "Tender chicken breast in a soft bun with fresh toppings.",
    image: IMG.sandwich },
  { id: "s3", category: "Sandwiches & Quick Bites", name: "Crispy Chicken Roll", price: 8,
    description: "Crunchy fried chicken wrapped in flatbread with sauce.",
    image: IMG.wrap },
  { id: "s4", category: "Sandwiches & Quick Bites", name: "Akl Albait Wrap", price: 12,
    badge: "House Special", featured: true,
    description: "Our signature chicken wrap — marinated grilled chicken with fresh vegetables and our special house sauce.",
    image: IMG.wrap,
    customizations: [{ label: "Sauce", choices: [{ name: "House Sauce" }, { name: "Garlic Sauce" }, { name: "Chilli Sauce" }] }] },
  { id: "s5", category: "Sandwiches & Quick Bites", name: "Falafel Plate", price: 12,
    description: "Crispy falafel balls served with hummus, salad, and pita bread.",
    image: IMG.falafel },
  { id: "s6", category: "Sandwiches & Quick Bites", name: "Falafel Wrap", price: 8,
    description: "Crispy falafel with pickles, tomatoes and tahini in Arabic bread.",
    image: IMG.falafel },
  { id: "s7", category: "Sandwiches & Quick Bites", name: "Chicken Shawarma Plate", price: 15,
    featured: true,
    description: "Slow-roasted spiced chicken shawarma as a plate with rice, salad, and garlic sauce.",
    image: IMG.shawarma,
    customizations: [{ label: "Sauce", choices: [{ name: "Garlic Sauce" }, { name: "Tahini" }, { name: "Both" }] }] },
  { id: "s8", category: "Sandwiches & Quick Bites", name: "Chicken Shawarma", price: 8,
    description: "Marinated chicken shawarma in Arabic bread with garlic sauce and pickles.",
    image: IMG.shawarma,
    customizations: [
      { label: "Size", choices: [{ name: "Small" }, { name: "Large", price: 4 }] },
      { label: "Sauce", choices: [{ name: "Garlic Sauce" }, { name: "Tahini" }, { name: "Hot Sauce" }] },
    ] },
  { id: "s9", category: "Sandwiches & Quick Bites", name: "Chicken Chilli Roll", price: 10,
    description: "Spicy chicken with fresh chillies and onions wrapped in a soft roll.",
    image: IMG.wrap },
  { id: "s10", category: "Sandwiches & Quick Bites", name: "Chicken Burger with Fries", price: 12,
    description: "Juicy crispy chicken burger in a bun, served with crispy fries.",
    image: IMG.burger },
  { id: "s11", category: "Sandwiches & Quick Bites", name: "Beef Burger with Fries", price: 14,
    description: "Hand-pressed beef patty in a toasted bun with all the trimmings and fries.",
    image: IMG.burger },
  { id: "s12", category: "Sandwiches & Quick Bites", name: "Kathi Roll", price: 10,
    description: "Classic street-style paratha roll with spiced chicken and tangy chutney.",
    image: IMG.wrap },
  // ── GRILLED & BAKED ──
  { id: "g1", category: "Grilled & Baked", name: "Grilled Chicken", price: 20, featured: true,
    description: "Juicy marinated chicken grilled over open flame. Choose half or full.",
    image: IMG.grilled,
    customizations: [
      { label: "Size", choices: [{ name: "Half" }, { name: "Full", price: 15 }] },
      { label: "Side", choices: [{ name: "None" }, { name: "Fries", price: 5 }, { name: "Rice", price: 5 }] },
    ] },
  { id: "g2", category: "Grilled & Baked", name: "BBQ Chicken Wings", price: 10, featured: true,
    description: "Smoky BBQ glazed chicken wings grilled to caramelized perfection.",
    image: IMG.wings,
    customizations: [{ label: "Quantity", choices: [{ name: "6 pcs" }, { name: "12 pcs", price: 8 }] }] },
  { id: "g3", category: "Grilled & Baked", name: "Chicken Strips", price: 10,
    description: "Tender grilled chicken strips seasoned with herbs and spices.",
    image: IMG.grilled,
    customizations: [{ label: "Quantity", choices: [{ name: "6 pcs" }, { name: "12 pcs", price: 8 }] }] },
  { id: "g4", category: "Grilled & Baked", name: "Chicken Lollipop", price: 12,
    description: "Crispy, juicy chicken lollipops with a spiced coating and dipping sauce.",
    image: IMG.wings,
    customizations: [{ label: "Quantity", choices: [{ name: "6 pcs" }, { name: "12 pcs", price: 8 }] }] },
  // ── RICE & BIRYANI ──
  { id: "r1", category: "Rice & Biryani", name: "Chicken Egg Fried Rice", price: 10,
    description: "Wok-tossed basmati rice with tender chicken, eggs and vegetables.",
    image: IMG.rice },
  { id: "r2", category: "Rice & Biryani", name: "Vegetable Fried Rice", price: 10,
    description: "Fragrant basmati wok-fried with fresh vegetables, soy and sesame.",
    image: IMG.rice },
  { id: "r3", category: "Rice & Biryani", name: "Vegetable Pulao", price: 8,
    description: "Aromatic basmati rice slow-cooked with whole spices and vegetables.",
    image: IMG.pulao },
  { id: "r4", category: "Rice & Biryani", name: "Jeera Pulao", price: 8,
    description: "Cumin-scented basmati rice, light and fragrant — a perfect accompaniment.",
    image: IMG.pulao },
  { id: "r5", category: "Rice & Biryani", name: "Chicken Biryani", price: 15, featured: true,
    description: "Fragrant slow-cooked biryani with tender chicken, saffron and whole spices. Served with raita.",
    image: IMG.biryani,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "r6", category: "Rice & Biryani", name: "Mutton Biryani", price: 18, featured: true,
    description: "Classic dum biryani with fall-off-the-bone mutton, aromatic spices and caramelized onions.",
    image: IMG.biryani2,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "r7", category: "Rice & Biryani", name: "Beef Biryani", price: 16,
    description: "Slow-cooked beef biryani layered with saffron rice and crispy fried onions.",
    image: IMG.biryani,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "r8", category: "Rice & Biryani", name: "Chicken Mandi", price: 18,
    description: "Traditional Yemeni-style smoked chicken and rice cooked in a sealed pot with fragrant spices.",
    image: IMG.mandi },
  { id: "r9", category: "Rice & Biryani", name: "Flavor Rice Meal Box", price: 15, badge: "Meal Box",
    description: "Flavoured rice served with crispy chicken strips — a complete meal in a box.",
    image: IMG.rice },
  // ── INDIAN & PAKISTANI CURRIES ──
  { id: "c1", category: "Indian & Pakistani Curries", name: "Chicken Karahi", price: 16,
    description: "Beloved Pakistani wok curry — chicken with tomatoes, ginger and whole spices.",
    image: IMG.curry,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "c2", category: "Indian & Pakistani Curries", name: "Butter Chicken", price: 16, featured: true,
    description: "The iconic North Indian curry — chicken in a velvety tomato cream sauce with aromatic spices.",
    image: IMG.butter,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "c3", category: "Indian & Pakistani Curries", name: "Chicken Handi", price: 16,
    description: "Slow-cooked chicken curry in a traditional clay pot with onions, tomatoes and cream.",
    image: IMG.curry },
  { id: "c4", category: "Indian & Pakistani Curries", name: "Chicken Korma", price: 15,
    description: "Mildly spiced chicken braised in a rich cashew and yogurt gravy.",
    image: IMG.butter },
  { id: "c5", category: "Indian & Pakistani Curries", name: "Chicken Rara", price: 18,
    description: "Pakistani specialty — minced and whole chicken pieces in a robust spiced gravy.",
    image: IMG.curry },
  { id: "c6", category: "Indian & Pakistani Curries", name: "Mutton Karahi", price: 22,
    description: "Tender mutton slow-cooked in a fiery wok with tomatoes, green chillies and ginger.",
    image: IMG.curry,
    customizations: [{ label: "Spice Level", choices: [{ name: "Mild" }, { name: "Medium" }, { name: "Hot" }] }] },
  { id: "c7", category: "Indian & Pakistani Curries", name: "Mutton Rogan Josh", price: 22,
    description: "Fragrant Kashmiri classic — tender mutton braised in a deep red sauce of whole spices.",
    image: IMG.curry },
  { id: "c8", category: "Indian & Pakistani Curries", name: "Mutton Korma", price: 20,
    description: "Slow-braised mutton in a rich almond, cashew and yogurt sauce.",
    image: IMG.butter },
  { id: "c9", category: "Indian & Pakistani Curries", name: "Beef Curry", price: 18,
    description: "Slow-cooked beef in a robust masala — hearty and satisfying.",
    image: IMG.curry },
  { id: "c10", category: "Indian & Pakistani Curries", name: "Beef Nihari", price: 18,
    description: "The iconic slow-cooked beef shank stew — rich, deeply spiced, traditionally served at dawn.",
    image: IMG.curry },
  { id: "c11", category: "Indian & Pakistani Curries", name: "Beef Korma", price: 18,
    description: "Tender beef slow-braised in a mildly spiced cream and almond gravy.",
    image: IMG.butter },
  { id: "c12", category: "Indian & Pakistani Curries", name: "Egg Curry", price: 12,
    description: "Boiled eggs nestled in a tangy, spiced tomato and onion masala gravy.",
    image: IMG.egg },
  { id: "c13", category: "Indian & Pakistani Curries", name: "Egg Bhurji", price: 12,
    description: "Scrambled eggs cooked with onions, tomatoes, green chillies and spices.",
    image: IMG.egg },
  // ── VEGETABLE DISHES ──
  { id: "v1", category: "Vegetable Dishes", name: "Mix Vegetable Curry", price: 10,
    description: "Seasonal vegetables simmered in a spiced tomato and onion gravy.",
    image: IMG.veg },
  { id: "v2", category: "Vegetable Dishes", name: "Aloo Gobi", price: 10,
    description: "Potato and cauliflower cooked with turmeric, cumin and whole spices.",
    image: IMG.veg },
  { id: "v3", category: "Vegetable Dishes", name: "Aloo Matar", price: 10,
    description: "Potato and green peas in a mildly spiced tomato gravy. Simple and comforting.",
    image: IMG.veg },
  { id: "v4", category: "Vegetable Dishes", name: "Dal Tadka", price: 8,
    description: "Yellow lentils tempered with cumin, garlic and dried chilli in clarified butter.",
    image: IMG.dal },
  { id: "v5", category: "Vegetable Dishes", name: "Dal Makhani", price: 10,
    description: "Slow-cooked black lentils and kidney beans simmered in butter and cream.",
    image: IMG.dal },
  { id: "v6", category: "Vegetable Dishes", name: "Paneer Butter Masala", price: 15,
    description: "Cottage cheese cubes in a rich, creamy tomato butter gravy.",
    image: IMG.paneer },
  { id: "v7", category: "Vegetable Dishes", name: "Malai Kofta", price: 15,
    description: "Soft paneer and potato dumplings in a luxurious cream and cashew sauce.",
    image: IMG.paneer },
  { id: "v8", category: "Vegetable Dishes", name: "Paneer Tikka Masala", price: 15,
    description: "Chargrilled paneer tikka simmered in a smoky tomato and cream masala.",
    image: IMG.paneer },
  { id: "v9", category: "Vegetable Dishes", name: "Vegetable Kolhapuri", price: 12,
    description: "Fiery Maharashtrian vegetable curry with coconut and a bold spice blend.",
    image: IMG.veg },
  // ── SOFT DRINKS ──
  { id: "dr1", category: "Soft Drinks", name: "Coca-Cola Can (320ml)", price: 4,
    description: "Ice-cold Coca-Cola, 320ml can.", image: IMG.coke },
  { id: "dr2", category: "Soft Drinks", name: "Pepsi Can (330ml)", price: 4,
    description: "Chilled Pepsi, 330ml can.", image: IMG.coke },
  { id: "dr3", category: "Soft Drinks", name: "Water Bottle (500ml)", price: 1,
    description: "Still mineral water, 500ml.", image: IMG.water },
  { id: "dr4", category: "Soft Drinks", name: "Coca-Cola 1.5L", price: 2,
    description: "Large bottle of Coca-Cola, 1.5 litres. Perfect for sharing.", image: IMG.coke },
  { id: "dr5", category: "Soft Drinks", name: "Pepsi 1.5L", price: 5,
    description: "Large bottle of Pepsi, 1.5 litres.", image: IMG.coke },
  { id: "dr6", category: "Soft Drinks", name: "Family Pack Soft Drink", price: 10,
    description: "Family-sized soft drink (2L–2.25L). Choose your brand.",
    image: IMG.coke,
    customizations: [{ label: "Brand", choices: [{ name: "Coca-Cola" }, { name: "Pepsi" }, { name: "7Up" }] }] },
];


const FEATURED = ITEMS.filter(i => i.featured);

// ─── Utilities ────────────────────────────────────────────────────────────────
const fmt = (n: number) => `AED ${n % 1 === 0 ? n : n.toFixed(2)}`;
const uid = () => Math.random().toString(36).slice(2, 10);
const genOrderId = () => `AKL-${Date.now().toString(36).toUpperCase().slice(-6)}-${uid().toUpperCase().slice(0, 4)}`;

// ─── Cart Context ─────────────────────────────────────────────────────────────
const CartContext = createContext<CartCtx | null>(null);
const useCart = () => useContext(CartContext)!;

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const key = JSON.stringify({ id: item.id, c: item.customizations, n: item.note });
      const match = prev.find(i => JSON.stringify({ id: i.id, c: i.customizations, n: i.note }) === key);
      if (match) return prev.map(i => i.cartId === match.cartId ? { ...i, quantity: i.quantity + item.quantity } : i);
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((cartId: string) =>
    setCart(p => p.filter(i => i.cartId !== cartId)), []);

  const updateQty = useCallback((cartId: string, qty: number) =>
    setCart(p => qty <= 0 ? p.filter(i => i.cartId !== cartId) : p.map(i => i.cartId === cartId ? { ...i, quantity: qty } : i)), []);

  const clearCart = useCallback(() => setCart([]), []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, itemCount, subtotal, tax, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── UI Context ───────────────────────────────────────────────────────────────
const UIContext = createContext<UICtx | null>(null);
const useUI = () => useContext(UIContext)!;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.56V6.78a4.85 4.85 0 0 1-1.07-.09z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  return (
    <div className={`${dim} rounded-full overflow-hidden flex-shrink-0 bg-[#1a1208]`}>
      <ImageWithFallback src={logoImg} alt="Akl Albait Restaurant" className="w-full h-full object-contain" />
    </div>
  );
}

// ─── Item Modal ───────────────────────────────────────────────────────────────
function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [sel, setSel] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    item.customizations?.forEach(g => { init[g.label] = g.choices[0].name; });
    return init;
  });
  const [added, setAdded] = useState(false);

  const extra = item.customizations?.reduce((s, g) => {
    const c = g.choices.find(c => c.name === sel[g.label]);
    return s + (c?.price ?? 0);
  }, 0) ?? 0;
  const unitPrice = item.price + extra;

  function handleAdd() {
    addItem({ cartId: uid(), id: item.id, name: item.name, price: unitPrice, quantity: qty, customizations: sel, note, image: item.image });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1100);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-[#241a0a] border border-[#D4A853]/25 rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl">
        {/* Image */}
        <div className="relative h-52 bg-[#1a1208]">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241a0a] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <X size={15} />
          </button>
          {item.badge && (
            <span className="absolute top-3 left-3 bg-[#C8622A] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.badge}</span>
          )}
        </div>

        <div className="px-5 pt-4 pb-2 max-h-[55vh] overflow-y-auto space-y-4">
          <div>
            <h3 className="text-xl font-bold text-[#F2E3C9] font-['Playfair_Display']">{item.name}</h3>
            <p className="text-sm text-[#8b7355] mt-1.5 leading-relaxed">{item.description}</p>
            <p className="text-[#D4A853] font-bold mt-2 text-lg">{fmt(item.price)}</p>
          </div>

          {item.customizations?.map(g => (
            <div key={g.label}>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#8b7355] mb-2 font-semibold">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.choices.map(c => (
                  <button key={c.name} onClick={() => setSel(s => ({ ...s, [g.label]: c.name }))}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${sel[g.label] === c.name
                      ? "bg-[#C8622A] border-[#C8622A] text-white font-medium"
                      : "border-[#D4A853]/25 text-[#F2E3C9] hover:border-[#D4A853]/60"
                    }`}>
                    {c.name}{c.price ? ` +${fmt(c.price)}` : ""}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8b7355] mb-2 font-semibold">Preparation Notes</p>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
              placeholder="Any special requests or dietary notes..."
              className="w-full bg-[#1a1208] border border-[#D4A853]/20 rounded-xl px-3 py-2.5 text-sm text-[#F2E3C9] placeholder-[#8b7355]/60 resize-none focus:outline-none focus:border-[#D4A853]/50 transition-colors" />
          </div>
        </div>

        <div className="p-4 border-t border-[#D4A853]/15 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1a1208] rounded-xl px-3 py-2.5 border border-[#D4A853]/15">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[#D4A853] hover:text-white transition-colors"><Minus size={13} /></button>
            <span className="text-[#F2E3C9] w-5 text-center text-sm font-bold">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="text-[#D4A853] hover:text-white transition-colors"><Plus size={13} /></button>
          </div>
          <button onClick={handleAdd}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${added
              ? "bg-green-600 text-white"
              : "bg-[#C8622A] hover:bg-[#b5541f] text-white active:scale-[0.98]"
            }`}>
            {added ? "✓ Added to Basket!" : `Add to Basket — ${fmt(unitPrice * qty)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Basket Panel ─────────────────────────────────────────────────────────────
function BasketPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeItem, updateQty, clearCart, subtotal, tax, grandTotal, itemCount } = useCart();
  const [phase, setPhase] = useState<"cart" | "checkout" | "success">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [savedTotal, setSavedTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => { if (!open) setTimeout(() => { setPhase("cart"); setError(""); }, 350); }, [open]);

  async function placeOrder() {
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setSending(true); setError("");
    const oid = genOrderId();
    const total = grandTotal;

    const itemsList = cart.map((item, idx) => {
      const opts = Object.entries(item.customizations).map(([k, v]) => `${k}: ${v}`).join(", ");
      return [
        `#${idx + 1}. ${item.name} × ${item.quantity} — ${fmt(item.price * item.quantity)}`,
        opts ? `   Options: ${opts}` : "",
        item.note ? `   Note: "${item.note}"` : "",
      ].filter(Boolean).join("\n");
    }).join("\n\n");

    const params = {
      order_id: oid,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone || "—",
      items_list: itemsList,
      subtotal: fmt(subtotal),
      tax_amount: fmt(tax),
      grand_total: fmt(total),
      delivery_notes: form.notes || "—",
      // Per-item receipt fields (first item, for simple template compatibility)
      item_id: cart[0]?.id ?? "",
      item_price: fmt(cart[0]?.price ?? 0),
      item_note: cart[0]?.note ?? "",
    };

    try {
      await emailjs.send(EJ.SERVICE_ID, EJ.TEMPLATE_ID, params, EJ.PUBLIC_KEY);
      setSavedTotal(total);
      setOrderId(oid);
      clearCart();
      setPhase("success");
    } catch {
      setError("Could not place order. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-[#1C140C] border-l border-[#D4A853]/20 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4A853]/20">
          <div>
            <h2 className="text-lg font-bold text-[#F2E3C9] font-['Playfair_Display']">
              {phase === "success" ? "Order Confirmed!" : phase === "checkout" ? "Checkout" : "Your Basket"}
            </h2>
            {phase === "cart" && itemCount > 0 && <p className="text-xs text-[#8b7355] mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#8b7355] hover:text-[#F2E3C9] transition-colors rounded-lg hover:bg-[#241a0a]">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart */}
          {phase === "cart" && (
            <div className="p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart size={48} className="mx-auto text-[#3a2e1a] mb-4" />
                  <p className="text-[#8b7355] font-medium">Your basket is empty</p>
                  <p className="text-xs text-[#8b7355]/60 mt-1">Add dishes from the menu to get started</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="flex gap-3 bg-[#241a0a] rounded-2xl p-3 border border-[#D4A853]/10">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-[#1a1208]" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-sm font-semibold text-[#F2E3C9] leading-snug">{item.name}</p>
                        <button onClick={() => removeItem(item.cartId)} className="text-[#8b7355] hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
                          <X size={13} />
                        </button>
                      </div>
                      {Object.keys(item.customizations).length > 0 && (
                        <p className="text-xs text-[#8b7355] mt-0.5 truncate">{Object.values(item.customizations).join(" · ")}</p>
                      )}
                      {item.note && <p className="text-xs text-[#8b7355]/70 mt-0.5 italic truncate">"{item.note}"</p>}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-[#1a1208] rounded-lg px-2 py-1 border border-[#D4A853]/10">
                          <button onClick={() => updateQty(item.cartId, item.quantity - 1)} className="text-[#D4A853] hover:text-white transition-colors"><Minus size={11} /></button>
                          <span className="text-[#F2E3C9] text-xs w-4 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQty(item.cartId, item.quantity + 1)} className="text-[#D4A853] hover:text-white transition-colors"><Plus size={11} /></button>
                        </div>
                        <p className="text-sm font-bold text-[#D4A853]">{fmt(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Checkout */}
          {phase === "checkout" && (
            <div className="p-4 space-y-4">
              <div className="bg-[#241a0a] rounded-2xl p-4 border border-[#D4A853]/10 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#8b7355] mb-3 font-semibold">Order Summary</p>
                {cart.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span className="text-[#F2E3C9]">{item.name} × {item.quantity}</span>
                    <span className="text-[#8b7355]">{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#8b7355] font-semibold">Your Details</p>
                {([
                  { key: "name", label: "Full Name *", type: "text", ph: "Your full name" },
                  { key: "email", label: "Email Address *", type: "email", ph: "your@email.com" },
                  { key: "phone", label: "Phone Number", type: "tel", ph: "+1 234 567 8900" },
                ] as const).map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-[#8b7355] mb-1 block">{f.label}</label>
                    <input type={f.type} placeholder={f.ph}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-[#241a0a] border border-[#D4A853]/20 rounded-xl px-3 py-2.5 text-sm text-[#F2E3C9] placeholder-[#8b7355]/50 focus:outline-none focus:border-[#D4A853]/50 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-[#8b7355] mb-1 block">Delivery / Pickup Notes</label>
                  <textarea placeholder="Address, special instructions, pickup time..." rows={3}
                    value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                    className="w-full bg-[#241a0a] border border-[#D4A853]/20 rounded-xl px-3 py-2.5 text-sm text-[#F2E3C9] placeholder-[#8b7355]/50 focus:outline-none focus:border-[#D4A853]/50 transition-colors resize-none" />
                </div>
              </div>
              {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-xl px-3 py-2">{error}</p>}
            </div>
          )}

          {/* Success */}
          {phase === "success" && (
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5 mt-10">
                <Check size={36} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#F2E3C9] font-['Playfair_Display'] mb-2">Thank You!</h3>
              <p className="text-sm text-[#8b7355] mb-6 leading-relaxed">Your order has been placed. A confirmation receipt will be sent to your email shortly.</p>
              <div className="bg-[#241a0a] rounded-2xl p-5 border border-[#D4A853]/20 text-left space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#8b7355] font-semibold mb-2">Receipt</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b7355]">Order ID</span>
                  <span className="text-[#D4A853] font-mono text-xs tracking-wider">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#D4A853]/10 pt-3">
                  <span className="text-[#8b7355]">Grand Total (incl. 5% tax)</span>
                  <span className="text-[#F2E3C9] font-bold">{fmt(savedTotal)}</span>
                </div>
              </div>
              <button onClick={() => { onClose(); }} className="mt-6 w-full py-3 bg-[#C8622A] hover:bg-[#b5541f] text-white rounded-xl font-semibold transition-colors">
                Continue Browsing
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {phase !== "success" && cart.length > 0 && (
          <div className="p-4 border-t border-[#D4A853]/20 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm"><span className="text-[#8b7355]">Subtotal</span><span className="text-[#F2E3C9]">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#8b7355]">Tax (5%)</span><span className="text-[#F2E3C9]">{fmt(tax)}</span></div>
              <div className="flex justify-between border-t border-[#D4A853]/15 pt-2">
                <span className="font-bold text-[#F2E3C9]">Grand Total</span>
                <span className="font-bold text-[#D4A853] text-lg">{fmt(grandTotal)}</span>
              </div>
            </div>
            {phase === "cart" && (
              <button onClick={() => setPhase("checkout")} className="w-full py-3 bg-[#C8622A] hover:bg-[#b5541f] text-white rounded-xl font-bold transition-colors">
                Proceed to Checkout
              </button>
            )}
            {phase === "checkout" && (
              <div className="flex gap-2">
                <button onClick={() => setPhase("cart")} className="flex-1 py-3 border border-[#D4A853]/25 text-[#F2E3C9] hover:border-[#D4A853]/60 rounded-xl font-semibold text-sm transition-colors">
                  Back
                </button>
                <button onClick={placeOrder} disabled={sending}
                  className="flex-1 py-3 bg-[#C8622A] hover:bg-[#b5541f] disabled:opacity-60 text-white rounded-xl font-bold transition-colors">
                  {sending ? "Placing..." : "Place Order"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Menu Popup (from Navbar) ─────────────────────────────────────────────────
function MenuPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { openBasket } = useUI();
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => { if (!open) setTimeout(() => setActiveCat(null), 300); }, [open]);

  const catItems = activeCat ? ITEMS.filter(i => i.category === activeCat) : [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C140C] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#D4A853]/20">
        <div className="flex items-center gap-3">
          {activeCat && (
            <button onClick={() => setActiveCat(null)} className="text-[#8b7355] hover:text-[#F2E3C9] transition-colors">
              <ChevronLeft size={20} />
            </button>
          )}
          <h2 className="text-xl font-bold text-[#F2E3C9] font-['Playfair_Display']">{activeCat ?? "Our Menu"}</h2>
          {activeCat && <span className="text-xs text-[#8b7355]">— {catItems.length} dishes</span>}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { onClose(); openBasket(); }}
            className="relative flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#F2E3C9] transition-colors px-3 py-1.5 rounded-lg border border-[#D4A853]/20 hover:border-[#D4A853]/50">
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Basket</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C8622A] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{itemCount}</span>
            )}
          </button>
          <button onClick={onClose} className="text-[#8b7355] hover:text-[#F2E3C9] transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
        {!activeCat ? (
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-[#8b7355] mb-6 text-center">Select a category to explore</p>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => {
                const sample = ITEMS.find(i => i.category === cat);
                const count = ITEMS.filter(i => i.category === cat).length;
                return (
                  <button key={cat} onClick={() => setActiveCat(cat)}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] text-left bg-[#241a0a] border border-[#D4A853]/15 hover:border-[#D4A853]/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50">
                    {sample && <img src={sample.image} alt={cat} className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-opacity duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C140C]/95 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-[#F2E3C9] font-bold font-['Playfair_Display'] text-lg leading-tight">{cat}</h3>
                      <p className="text-[#8b7355] text-xs mt-0.5">{count} dishes</p>
                    </div>
                    <ChevronRight size={15} className="absolute top-3 right-3 text-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {catItems.map(item => (
              <button key={item.id} onClick={() => setSelectedItem(item)}
                className="group text-left bg-[#241a0a] border border-[#D4A853]/10 rounded-2xl overflow-hidden hover:border-[#D4A853]/40 transition-all hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5">
                <div className="relative h-36 bg-[#1a1208] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.badge && <span className="absolute top-2 left-2 bg-[#C8622A] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">{item.badge}</span>}
                  <div className="absolute bottom-2 right-2 text-[#D4A853] text-xs font-bold bg-[#1C140C]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg">{fmt(item.price)}</div>
                </div>
                <div className="p-3.5">
                  <h4 className="font-bold text-[#F2E3C9] text-sm font-['Playfair_Display']">{item.name}</h4>
                  <p className="text-xs text-[#8b7355] mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                  <p className="text-[10px] text-[#C8622A] font-semibold mt-2 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Customize & add <ChevronRight size={10} />
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 sm:px-8 py-4 border-t border-[#D4A853]/20">
        <button onClick={() => { onClose(); navigate("/menu"); }}
          className="w-full py-3.5 bg-[#C8622A] hover:bg-[#b5541f] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm">
          View Full Menu Page <ArrowRight size={15} />
        </button>
      </div>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { itemCount } = useCart();
  const { openMenu, openBasket } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? "bg-[#1C140C]/95 backdrop-blur-md border-b border-[#D4A853]/20 py-3" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <div className="hidden sm:block leading-tight">
            <p className="text-[#F2E3C9] font-bold font-['Playfair_Display'] text-sm group-hover:text-[#D4A853] transition-colors">AKL ALBAIT</p>
            <p className="text-[#8b7355] text-[10px] tracking-wide uppercase">Restaurant</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/about" className="hidden sm:inline-flex items-center text-sm text-[#F2E3C9]/70 hover:text-[#D4A853] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#241a0a]">
            Our Story
          </Link>
          <button onClick={openMenu}
            className="flex items-center gap-1.5 text-sm text-[#F2E3C9] hover:text-[#D4A853] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#241a0a] border border-[#D4A853]/20 hover:border-[#D4A853]/50">
            <MenuIcon size={15} />
            <span className="hidden sm:inline font-medium">Menu</span>
          </button>
          <button onClick={openBasket}
            className="relative flex items-center gap-2 bg-[#C8622A] hover:bg-[#b5541f] text-white text-sm px-3 py-1.5 rounded-lg transition-colors font-medium">
            <ShoppingCart size={15} />
            {itemCount > 0 ? <span>{itemCount}</span> : <span className="hidden sm:inline">Basket</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Social Bar ───────────────────────────────────────────────────────────────
const SOCIALS = {
  facebook: "https://www.facebook.com/profile.php?id=61576813950745&mibextid=wwXIfr",
  instagram: "https://www.instagram.com/akl_albait_restaurant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  tiktok: "https://www.tiktok.com/@aklalbaitrestaura?_r=1&_t=ZS-97lJrMis240",
};

function SocialBar() {
  return (
    <div className="fixed top-[60px] left-0 right-0 z-20 bg-[#241a0a]/95 backdrop-blur-sm border-b border-[#D4A853]/15">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-5">
        <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#8b7355] hover:text-[#1877f2] transition-colors">
          <FacebookIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Facebook</span>
        </a>
        <span className="w-px h-3 bg-[#D4A853]/20" />
        <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#8b7355] hover:text-[#e4405f] transition-colors">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instagram</span>
        </a>
        <span className="w-px h-3 bg-[#D4A853]/20" />
        <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#8b7355] hover:text-[#F2E3C9] transition-colors">
          <TikTokIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">TikTok</span>
        </a>
        <span className="ml-auto hidden sm:flex items-center gap-1 text-[10px] text-[#8b7355]/60">
          <Star size={9} className="text-[#D4A853] fill-[#D4A853]" />
          Follow us for daily specials
        </span>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#120d06] border-t border-[#D4A853]/15 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <Logo />
              <div>
                <p className="text-[#F2E3C9] font-bold font-['Playfair_Display'] text-sm">Akl Albait</p>
                <p className="text-[#8b7355] text-[10px] tracking-wide">Restaurant</p>
              </div>
            </Link>
            <p className="text-sm text-[#8b7355] italic font-['Playfair_Display'] leading-relaxed">
              "Where every meal is a homecoming."
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                [SOCIALS.facebook, <FacebookIcon className="w-4 h-4" />, "hover:text-[#1877f2]"],
                [SOCIALS.instagram, <InstagramIcon className="w-4 h-4" />, "hover:text-[#e4405f]"],
                [SOCIALS.tiktok, <TikTokIcon className="w-4 h-4" />, "hover:text-[#F2E3C9]"],
              ].map(([href, icon, hover]) => (
                <a key={href as string} href={href as string} target="_blank" rel="noopener noreferrer"
                  className={`text-[#8b7355] transition-colors ${hover as string}`}>
                  {icon as React.ReactNode}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#D4A853] font-semibold mb-5 flex items-center gap-2">
              <Clock size={12} /> Working Hours
            </h4>
            <div className="space-y-2.5 mb-3">
              {[
                ["Saturday – Thursday", "Open All Day"],
                ["Friday", "Open All Day"],
              ].map(([day, hrs]) => (
                <div key={day} className="flex justify-between gap-3 text-xs">
                  <span className="text-[#8b7355]">{day}</span>
                  <span className="text-[#F2E3C9] text-right">{hrs}</span>
                </div>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] bg-green-500/15 text-green-400 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Always Open
            </span>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#D4A853] font-semibold mb-5">Contact Us</h4>
            <div className="space-y-3.5">
              <a href="tel:+971509413686" className="flex items-start gap-2.5 text-xs text-[#8b7355] hover:text-[#F2E3C9] transition-colors">
                <Phone size={13} className="text-[#C8622A] mt-0.5 flex-shrink-0" />
                <span>+971 50 941 3686</span>
              </a>
              <a href="mailto:aklalbaitrestaurant@gmail.com" className="flex items-start gap-2.5 text-xs text-[#8b7355] hover:text-[#F2E3C9] transition-colors">
                <Mail size={13} className="text-[#C8622A] mt-0.5 flex-shrink-0" />
                <span>aklalbaitrestaurant@gmail.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-xs text-[#8b7355]">
                <MapPin size={13} className="text-[#C8622A] mt-0.5 flex-shrink-0" />
                <span>Al Zahyia, Shop No 6,<br />Ajman Industrial 2,<br />Ajman — UAE</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#D4A853] font-semibold mb-5 flex items-center gap-2">
              <MapPin size={12} /> Find Us
            </h4>
            <div className="rounded-2xl overflow-hidden border border-[#D4A853]/20 h-36 bg-[#241a0a]">
              <iframe
                src="https://www.google.com/maps?q=Al+Zahyia+Shop+No+6+Ajman+Industrial+2+Ajman+UAE&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Akl Albait Restaurant Location" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#D4A853]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b7355]">
          <p>© 2024 Akl Albait Restaurant. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-[#F2E3C9] transition-colors">Our Story</Link>
            <Link to="/menu" className="hover:text-[#F2E3C9] transition-colors">Menu</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  const { openMenu } = useUI();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div>
      {/* Hero — full viewport */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1C140C]">
          <img src="https://images.unsplash.com/photo-1653611540493-b3a896319fbf?w=1600&h=900&fit=crop&auto=format"
            alt="Restaurant spread" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C140C]/40 via-[#1C140C]/10 to-[#1C140C]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-24">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4A853] mb-6 font-semibold">Est. 2018 · Authentic Middle Eastern Cuisine</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F2E3C9] font-['Playfair_Display'] leading-none mb-3">
            Akl Albait
          </h1>
          <p className="text-lg sm:text-xl text-[#D4A853] font-['Playfair_Display'] italic mb-6">عقل البيت — ESTD. 2025</p>
          <p className="text-base text-[#8b7355] leading-relaxed mb-10 max-w-xl mx-auto">
            Home cooking elevated. Every dish carries the warmth of a family kitchen and the soul of generations-old recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={openMenu}
              className="px-8 py-4 bg-[#C8622A] hover:bg-[#b5541f] text-white font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-[#C8622A]/30 active:scale-[0.98]">
              Browse Menu
            </button>
            <Link to="/about"
              className="px-8 py-4 border border-[#D4A853]/40 text-[#F2E3C9] hover:border-[#D4A853]/80 hover:bg-[#D4A853]/5 font-bold rounded-xl transition-all">
              Our Story
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10 bg-gradient-to-b from-[#D4A853] to-transparent" />
          <p className="text-[9px] text-[#D4A853] tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-[#1C140C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] mb-3 font-semibold">From Our Kitchen</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F2E3C9] font-['Playfair_Display']">Menu Highlights</h2>
            <p className="text-[#8b7355] mt-3 max-w-md mx-auto text-sm leading-relaxed">Our most beloved dishes — click any card to customize and add to your basket.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map(item => (
              <button key={item.id} onClick={() => setSelectedItem(item)}
                className="group text-left bg-[#241a0a] border border-[#D4A853]/10 rounded-2xl overflow-hidden hover:border-[#D4A853]/40 transition-all hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1.5">
                <div className="relative h-52 bg-[#1a1208] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241a0a]/70 to-transparent" />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#C8622A] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.badge}</span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-[#1C140C]/80 backdrop-blur-sm text-[#D4A853] text-sm font-bold px-2.5 py-0.5 rounded-lg">
                    {fmt(item.price)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#F2E3C9] font-['Playfair_Display'] text-lg mb-1.5">{item.name}</h3>
                  <p className="text-xs text-[#8b7355] leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#C8622A] text-xs font-semibold group-hover:gap-2 transition-all">
                    <span>Add to basket</span><ArrowRight size={11} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("/menu")}
              className="px-8 py-3.5 border border-[#D4A853]/30 text-[#F2E3C9] hover:border-[#D4A853]/70 hover:bg-[#D4A853]/5 rounded-xl font-semibold transition-all text-sm">
              See Full Menu →
            </button>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-[#241a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] mb-4 font-semibold">Our Philosophy</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F2E3C9] font-['Playfair_Display'] leading-snug mb-6">
                Food is memory.<br />We preserve both.
              </h2>
              <p className="text-[#8b7355] leading-relaxed mb-5 text-sm">
                At Akl Albait — "Home Food" in Arabic — we believe the most honest cooking happens in family kitchens. Our recipes are not invented; they are <em className="text-[#F2E3C9]">remembered</em>. Passed down through mothers and grandmothers, tested at countless dining tables before reaching yours.
              </p>
              <p className="text-[#8b7355] leading-relaxed mb-8 text-sm">
                We source our spices from the same markets our families have visited for decades. Our pastry dough is made fresh every morning before the kitchen opens. Nothing frozen. Nothing hurried.
              </p>
              <div className="flex flex-wrap gap-5 mb-8">
                {[["🌿", "Fresh Daily"], ["🤲", "Family Recipes"], ["✦", "Halal Certified"], ["🏠", "Home-Style"]].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-[#8b7355]">
                    <span className="text-base">{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C8622A] hover:bg-[#b5541f] text-white rounded-xl font-bold transition-colors text-sm">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#1a1208] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1748540459503-19efc015143b?w=700&h=900&fit=crop&auto=format"
                  alt="Our food spread" className="w-full h-full object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#C8622A] text-white p-5 rounded-2xl max-w-[210px] shadow-2xl">
                <p className="text-xs font-medium leading-relaxed italic font-['Playfair_Display']">
                  "Every recipe has a story. Every story deserves to be told at the table."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="bg-[#1C140C] min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#1C140C]">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=800&fit=crop&auto=format"
            alt="Restaurant dining room" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C140C] via-[#1C140C]/30 to-[#1C140C]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] mb-3 font-semibold">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F2E3C9] font-['Playfair_Display'] leading-tight">
            Rooted in Tradition,<br />Served with Heart
          </h1>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        
        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
          <div className="lg:col-span-3 space-y-8">
            {[
              { title: "Where It All Began", body: `Akl Albait was born from a simple conviction: the most extraordinary food is cooked not in Michelin-starred kitchens, but in homes. In the early hours of a Wednesday morning, over sizzling onions and the scent of cardamom, our founder Umm Khalid decided it was time to share what her family had kept private for generations.` },
              { title: "The Name", body: `In Arabic, Akl Albait means "home food" — not restaurant food, not chef food. Home food. The kind that brings tears to your eyes because it tastes exactly like your grandmother's kitchen. That is our standard. That is our promise.` },
              { title: "Our Commitment", body: `We are proudly halal, sourcing our meats from certified suppliers we know by name. Our spice blends are ground fresh weekly. Our pastry dough is never frozen. Every dish that leaves our kitchen has been made the hard way — the right way.` },
            ].map(s => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-[#F2E3C9] font-['Playfair_Display'] mb-3">{s.title}</h2>
                <p className="text-[#8b7355] leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[#241a0a] shadow-2xl sticky top-28">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop&auto=format"
                alt="Our kitchen" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "🌿", title: "Fresh Every Day", body: "No freezers, no shortcuts. Our ingredients arrive in the morning and are cooked before noon." },
            { icon: "📖", title: "Family Recipes", body: "Every dish traces back to a grandmother, an aunt, a mother — a real person who knew what love tastes like." },
            { icon: "🤝", title: "Community First", body: "We are a gathering place. Students, families, elders — our table has a seat for everyone." },
          ].map(v => (
            <div key={v.title} className="bg-[#241a0a] border border-[#D4A853]/15 rounded-2xl p-6">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="font-bold text-[#F2E3C9] font-['Playfair_Display'] mb-2">{v.title}</h3>
              <p className="text-sm text-[#8b7355] leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        {/* Founder Quote */}
        <div className="mt-20 border-t border-b border-[#D4A853]/15 py-14 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-[#F2E3C9] font-['Playfair_Display'] italic leading-relaxed max-w-2xl mx-auto">
            "We do not chase trends. We honour what has always worked — patience, quality, and the invisible ingredient: love."
          </p>
          <p className="text-[#D4A853] text-sm mt-5 font-medium">— Umm Khalid, Founder</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
// ─── Menu Page ────────────────────────────────────────────────────────────────
function MenuPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const displayed = activeCat === "All" ? ITEMS : ITEMS.filter(i => i.category === activeCat);

  return (
    <div className="min-h-screen bg-[#1C140C]">
      {/* Page header — pushed below fixed bars */}
      <div className="pt-[104px] pb-8 px-4 sm:px-6 border-b border-[#D4A853]/15">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A853] mb-2 font-semibold">Dine In · Takeaway · Delivery</p>
          <h1 className="text-4xl font-bold text-[#F2E3C9] font-['Playfair_Display']">Our Full Menu</h1>
          <p className="text-[#8b7355] mt-2 text-sm">All dishes are made to order. Click any item to customize.</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-[100px] z-20 bg-[#1C140C]/95 backdrop-blur-sm border-b border-[#D4A853]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["All", ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeCat === cat
                ? "bg-[#C8622A] text-white"
                : "border border-[#D4A853]/20 text-[#8b7355] hover:border-[#D4A853]/50 hover:text-[#F2E3C9]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map(item => (
            <button key={item.id} onClick={() => setSelectedItem(item)}
              className="group text-left bg-[#241a0a] border border-[#D4A853]/10 rounded-2xl overflow-hidden hover:border-[#D4A853]/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50">
              <div className="relative h-44 bg-[#1a1208] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.badge && (
                  <span className="absolute top-2 left-2 bg-[#C8622A] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
                <div className="absolute bottom-2 right-2 bg-[#1C140C]/85 backdrop-blur-sm text-[#D4A853] text-xs font-bold px-2 py-0.5 rounded-lg">
                  {fmt(item.price)}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-[#F2E3C9] text-sm font-['Playfair_Display'] mb-1">{item.name}</h4>
                <p className="text-xs text-[#8b7355] leading-relaxed line-clamp-2">{item.description}</p>
                <p className="text-[10px] text-[#C8622A] font-semibold mt-2.5 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Customize & Add <ChevronRight size={10} />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Footer />
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

// ─── Scroll To Top ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
}

// ─── Layout ───────────────────────────────────────────────────────────────────
function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  return (
    <UIContext.Provider value={{ openMenu: () => setMenuOpen(true), openBasket: () => setBasketOpen(true) }}>
      <ScrollToTop />
      <Navbar />
      <SocialBar />
      <main>{children}</main>
      <MenuPopup open={menuOpen} onClose={() => setMenuOpen(false)} />
      <BasketPanel open={basketOpen} onClose={() => setBasketOpen(false)} />
    </UIContext.Provider>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </HashRouter>
  );
}
