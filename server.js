const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent JSON file paths
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');

// Initial Seed Data for Diwali Products
const initialProducts = [
  {
    id: "prod-1",
    name: "Handcrafted Terracotta Clay Diyas (Set of 12)",
    category: "Diyas & Candles",
    originalPrice: 499,
    price: 249,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 320,
    inStock: true,
    stockCount: 150,
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80",
    description: "Traditional handmade earthen clay diyas painted with natural festive colors, embellished with sparkling golden glitter. Perfect for welcoming Goddess Lakshmi.",
    tags: ["Handmade", "Eco-friendly", "Bestseller"],
    features: ["100% natural clay", "Hand-painted organic dyes", "Long burn time with cotton wicks"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-2",
    name: "Royal Brass Akhand Diya with Glass Chimney",
    category: "Diyas & Candles",
    originalPrice: 1299,
    price: 799,
    discountPercent: 38,
    rating: 4.8,
    reviewsCount: 184,
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1605335197825-9f5b61e0bb56?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty pure virgin brass Akhand Jyoti lamp with a heat-resistant borosilicate glass cover that keeps the divine flame burning through winds.",
    tags: ["Pure Brass", "Akhand Jyot", "Premium"],
    features: ["Pure solid brass", "Heat-resistant glass cover", "Safe for 24-hour continuous burning"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-3",
    name: "Shubh Laxmi-Ganesh Brass Idol Set (Gold Finish)",
    category: "Puja Essentials",
    originalPrice: 2499,
    price: 1499,
    discountPercent: 40,
    rating: 5.0,
    reviewsCount: 412,
    inStock: true,
    stockCount: 30,
    image: "https://images.unsplash.com/photo-1599818818585-1eef19b91b92?auto=format&fit=crop&w=800&q=80",
    description: "Exquisitely detailed antique gold finished Lakshmi and Ganesha deities. Blessed for Diwali Puja to attract health, wealth, and prosperity.",
    tags: ["Puja", "Spiritual", "Auspicious"],
    features: ["Intricate handcrafted carvings", "Rust & tarnish resistant polish", "Height: 6 inches, Weight: 850g"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-4",
    name: "Royal Kaju Katli & Assorted Dry Fruit Gift Hamper (1kg)",
    category: "Sweets & Dry Fruits",
    originalPrice: 1899,
    price: 1199,
    discountPercent: 37,
    rating: 4.9,
    reviewsCount: 520,
    inStock: true,
    stockCount: 80,
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    description: "Pure cashew silver-foiled Kaju Katli sweets alongside premium California almonds, jumbo cashews, raisins, and Afghan pistachios in an embossed festive royal box.",
    tags: ["Pure Desi Ghee", "Festive Hamper", "Gift Ready"],
    features: ["Zero preservatives", "Vacuum sealed freshness", "Includes Diwali greeting card"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-5",
    name: "Festive Rangoli Colors & Stencils Mega Kit (12 Colors + 6 Stamps)",
    category: "Decor & Rangoli",
    originalPrice: 699,
    price: 349,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 156,
    inStock: true,
    stockCount: 120,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    description: "Non-toxic, skin-friendly vibrant gulal rangoli powders with 6 intricate stencil stamps (Peacock, Lotus, Diya, Mandala, Swastik, Footprints) and precision pourers.",
    tags: ["Easy-to-use", "Kids Friendly", "Skin Safe"],
    features: ["12 vivid neon & traditional shades", "Reusable stencil plates", "Easy pour nozzle bottles"],
    isBestseller: false,
    isDiwaliSpecial: true
  },
  {
    id: "prod-6",
    name: "Warm Golden Fairy Curtain LED Lights (16 Strings, 3x3m)",
    category: "Lights & Lanterns",
    originalPrice: 1199,
    price: 599,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 290,
    inStock: true,
    stockCount: 95,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
    description: "Waterfall fairy curtain lights with 8 shimmering modes, waterproof copper wire, and convenient USB plug-in for balconies, pooja rooms, and living spaces.",
    tags: ["Energy Efficient", "8 Modes", "Waterproof"],
    features: ["300 warm LED bulbs", "Remote control with timer", "Safe low-voltage operation"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-7",
    name: "Handcrafted Hanging Paper Lanterns / Akash Kandil (Pack of 3)",
    category: "Lights & Lanterns",
    originalPrice: 899,
    price: 449,
    discountPercent: 50,
    rating: 4.6,
    reviewsCount: 110,
    inStock: true,
    stockCount: 60,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Maharashtrian festive Kandil hanging lanterns with silk tassels and kaleidoscopic geometric patterns that illuminate your doorway.",
    tags: ["Traditional", "Handmade", "Vibrant"],
    features: ["Collapsible for easy storage", "Pre-cut hanging string", "Compatible with any bulb holder"],
    isBestseller: false,
    isDiwaliSpecial: false
  },
  {
    id: "prod-8",
    name: "Pure Brass Pooja Thali Deluxe 9-Piece Set",
    category: "Puja Essentials",
    originalPrice: 2199,
    price: 1299,
    discountPercent: 41,
    rating: 4.9,
    reviewsCount: 204,
    inStock: true,
    stockCount: 40,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    description: "Complete ceremonial pooja thali featuring engraved Om & Gayatri mantra, incense holder, diya, roli chawal katori, bell (ghanti), and kalash.",
    tags: ["9-Piece Set", "Engraved Brass", "Sacred"],
    features: ["Engraved Gayatri Mantra border", "Mirror gloss polish", "Thali diameter: 11 inches"],
    isBestseller: false,
    isDiwaliSpecial: true
  },
  {
    id: "prod-9",
    name: "Assorted Motichoor & Besan Ladoo Box (800g)",
    category: "Sweets & Dry Fruits",
    originalPrice: 799,
    price: 499,
    discountPercent: 38,
    rating: 4.8,
    reviewsCount: 340,
    inStock: true,
    stockCount: 75,
    image: "https://images.unsplash.com/photo-1599818818585-1eef19b91b92?auto=format&fit=crop&w=800&q=80",
    description: "Mouthwatering pure ghee Motichoor Ladoos infused with saffron and cardamom pearls, paired with melt-in-mouth slow-roasted Magas Besan Ladoo.",
    tags: ["Desi Ghee", "Saffron Infused", "Fresh"],
    features: ["Prepared fresh on dispatch day", "Rich in dry fruits", "FSSAI certified quality"],
    isBestseller: true,
    isDiwaliSpecial: false
  },
  {
    id: "prod-10",
    name: "Antique Brass Urli Bowl with Scented Rose Petals & Floating Diyas",
    category: "Decor & Rangoli",
    originalPrice: 1999,
    price: 1099,
    discountPercent: 45,
    rating: 4.9,
    reviewsCount: 167,
    inStock: true,
    stockCount: 35,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Majestic peacock-embossed brass urli bowl for floating flowers, candles, and aromatic potpourri. Creates a serene royal Indian welcoming aura.",
    tags: ["Traditional Decor", "Centerpiece", "Peacock Motifs"],
    features: ["Hand-hammered brass finish", "Includes 6 floating diyas", "Diameter: 12 inches"],
    isBestseller: false,
    isDiwaliSpecial: true
  },
  {
    id: "prod-11",
    name: "Eco-Friendly Safe Green Sparklers & Flower Pots Gift Box",
    category: "Green Crackers",
    originalPrice: 1499,
    price: 899,
    discountPercent: 40,
    rating: 4.7,
    reviewsCount: 215,
    inStock: true,
    stockCount: 50,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "CSIR-NEERI approved low-smoke, zero-barium green crackers! Features gold & silver dazzling sparklers, color anar flower pots, and dazzling ground chakras.",
    tags: ["CSIR Certified", "Low Smoke", "Family Safe"],
    features: ["30% lower particulate emissions", "Includes 50 sparklers & 10 anars", "Child-safe protective handles"],
    isBestseller: true,
    isDiwaliSpecial: true
  },
  {
    id: "prod-12",
    name: "Marigold & Mango Leaf Floral Entrance Toran (6 Feet)",
    category: "Decor & Rangoli",
    originalPrice: 599,
    price: 299,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 142,
    inStock: true,
    stockCount: 85,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
    description: "Vibrant yellow and orange artificial marigold garland with green mango leaves, gold beads, and traditional lucky bells to drape on entrance doorways.",
    tags: ["Door Decor", "Auspicious", "Washable"],
    features: ["Durable fabric flowers", "Realistic fresh look", "Fitted with hanging loops"],
    isBestseller: false,
    isDiwaliSpecial: false
  }
];

// Initial Seed Data for Diwali Events
const initialEvents = [
  {
    id: "evt-1",
    title: "Grand Diwali Mela & Cultural Carnival 2026",
    category: "Festival & Mela",
    date: "November 08, 2026",
    time: "05:00 PM - 11:00 PM IST",
    location: "Shubh Utsav Grounds, Heritage Avenue",
    organizer: "Diwali Mahotsav Committee",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    description: "Immerse in India's brightest celebration! Over 100 handicraft stalls, live folk dance, traditional food street, puppet show, and a synchronized music & laser fountain.",
    ticketPrice: 0,
    totalSpots: 500,
    bookedSpots: 342,
    highlights: ["Live Kathak & Garba performances", "Street Food Bazaar", "Kids Joyride Zone", "Free entry for family"],
    status: "Open"
  },
  {
    id: "evt-2",
    title: "Community Lakshmi-Ganesh Maha Aarti & Deepotsav",
    category: "Puja & Aarti",
    date: "November 09, 2026 (Diwali Night)",
    time: "06:30 PM - 09:00 PM IST",
    location: "Shri Mahalakshmi Temple Courtyard & Live Stream",
    organizer: "Devasthan Trust",
    banner: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1000&q=80",
    description: "Join thousands of devotees lighting 51,000 ghee diyas together during the auspicious Pradosh Kaal Lakshmi Puja. Chanting by 21 Vedic pandits.",
    ticketPrice: 0,
    totalSpots: 1000,
    bookedSpots: 810,
    highlights: ["51,000 Diyas lighting ceremony", "Vedic Mantra Chanting", "Special Prasad distribution", "Worldwide 4K Live Broadcast"],
    status: "Filling Fast"
  },
  {
    id: "evt-3",
    title: "National Rangoli Championship & Masterclass",
    category: "Workshop & Contest",
    date: "November 07, 2026",
    time: "10:00 AM - 02:00 PM IST",
    location: "Kala Bhavan Cultural Center",
    organizer: "Indian Folk Art Guild",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    description: "Showcase your artistic talent in freehand, floral, and portrait rangoli. Cash prizes worth ₹51,000 for top 3 winners, plus certification for all participants.",
    ticketPrice: 199,
    totalSpots: 150,
    bookedSpots: 112,
    highlights: ["Colors and tools provided", "Judged by renowned folk artists", "Grand Trophy & Cash Prizes", "Live tutorial workshop"],
    status: "Open"
  },
  {
    id: "evt-4",
    title: "Eco-Friendly Musical Drone & Sky Lantern Spectacle",
    category: "Light Show",
    date: "November 09, 2026",
    time: "09:30 PM - 10:30 PM IST",
    location: "City Lake Promenade",
    organizer: "Green City Council",
    banner: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80",
    description: "An awe-inspiring pollution-free sky show featuring 800 synchronized LED drones forming Ramayana scenes, diyas, and greetings in the night sky.",
    ticketPrice: 99,
    totalSpots: 400,
    bookedSpots: 388,
    highlights: ["800 Drones in sync", "No noise or smoke", "Synchronized orchestral music", "Spectacular lakeside views"],
    status: "Almost Full"
  }
];

// Initial Wishes Seed Data
const initialWishes = [
  {
    id: "wish-1",
    name: "Aarav & Family",
    city: "Mumbai",
    message: "May the divine lights of Diwali illuminate our hearts with joy, good health, and abundant prosperity. Shubh Deepavali to everyone! 🪔✨",
    date: "Just now",
    likes: 24
  },
  {
    id: "wish-2",
    name: "Dr. Sunita Sharma",
    city: "New Delhi",
    message: "Wishing every family a blessed Lakshmi Puja. Let's celebrate with green lights, love, and compassion for every living being! 🪔🌸",
    date: "10 mins ago",
    likes: 19
  },
  {
    id: "wish-3",
    name: "Rohan & Sneha",
    city: "Bengaluru",
    message: "Happy Diwali to all our friends across the globe! May the darkness turn into bright radiant dawn of peace and fortune. 🪔🌟",
    date: "35 mins ago",
    likes: 31
  }
];

// Helper functions for reading and writing JSON data
function readData(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  writeData(filePath, fallback);
  return fallback;
}

function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initialize seed data
readData(PRODUCTS_FILE, initialProducts);
readData(ORDERS_FILE, []);
readData(EVENTS_FILE, initialEvents);
readData(WISHES_FILE, initialWishes);

// ======================== API ROUTES ========================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', festival: 'Deepavali 2026', time: new Date().toISOString() });
});

// 1. PRODUCTS ROUTES
// GET all products with filtering, search & sort
app.get('/api/products', (req, res) => {
  let products = readData(PRODUCTS_FILE, initialProducts);
  const { category, search, sort, diwaliSpecial } = req.query;

  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (diwaliSpecial === 'true') {
    products = products.filter(p => p.isDiwaliSpecial);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (sort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'discount') {
    products.sort((a, b) => b.discountPercent - a.discountPercent);
  }

  res.json(products);
});

// GET single product by id
app.get('/api/products/:id', (req, res) => {
  const products = readData(PRODUCTS_FILE, initialProducts);
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST add new product
app.post('/api/products', (req, res) => {
  const { name, category, originalPrice, price, image, description, stockCount, tags, features, isDiwaliSpecial } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }

  const products = readData(PRODUCTS_FILE, initialProducts);
  const origPrice = Number(originalPrice) || Number(price);
  const curPrice = Number(price);
  const discountPercent = origPrice > curPrice ? Math.round(((origPrice - curPrice) / origPrice) * 100) : 0;

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category,
    originalPrice: origPrice,
    price: curPrice,
    discountPercent,
    rating: 4.8,
    reviewsCount: 1,
    inStock: Number(stockCount || 10) > 0,
    stockCount: Number(stockCount || 20),
    image: image || "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80",
    description: description || "Festive Diwali special item crafted with care.",
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(s => s.trim()) : ["Diwali Special"]),
    features: Array.isArray(features) ? features : ["Festive edition", "High quality"],
    isBestseller: false,
    isDiwaliSpecial: Boolean(isDiwaliSpecial)
  };

  products.unshift(newProduct);
  writeData(PRODUCTS_FILE, products);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const products = readData(PRODUCTS_FILE, initialProducts);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existing = products[index];
  const updated = {
    ...existing,
    ...req.body,
    price: req.body.price ? Number(req.body.price) : existing.price,
    originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : existing.originalPrice,
    stockCount: req.body.stockCount !== undefined ? Number(req.body.stockCount) : existing.stockCount
  };

  if (updated.originalPrice && updated.price) {
    updated.discountPercent = updated.originalPrice > updated.price ? Math.round(((updated.originalPrice - updated.price) / updated.originalPrice) * 100) : 0;
  }
  updated.inStock = updated.stockCount > 0;

  products[index] = updated;
  writeData(PRODUCTS_FILE, products);
  res.json(updated);
});

// DELETE remove product
app.delete('/api/products/:id', (req, res) => {
  let products = readData(PRODUCTS_FILE, initialProducts);
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products = products.filter(p => p.id !== req.params.id);
  writeData(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'Product removed successfully', removedId: req.params.id });
});

// 2. COUPON VALIDATION
const ACTIVE_COUPONS = {
  'DIWALI2026': { type: 'percent', value: 25, minOrder: 500, description: '25% off festive celebration discount' },
  'SHUBH500': { type: 'fixed', value: 500, minOrder: 1500, description: 'Flat ₹500 discount on orders above ₹1500' },
  'LAKSHMI10': { type: 'percent', value: 10, minOrder: 300, description: '10% auspicious Puja discount' },
  'FESTIVE100': { type: 'fixed', value: 100, minOrder: 499, description: 'Flat ₹100 instant festive off' }
};

app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Coupon code required' });
  }

  const coupon = ACTIVE_COUPONS[code.trim().toUpperCase()];
  if (!coupon) {
    return res.status(404).json({ valid: false, message: 'Invalid coupon code. Try DIWALI2026 or SHUBH500!' });
  }

  const orderTotal = Number(subtotal) || 0;
  if (orderTotal < coupon.minOrder) {
    return res.status(400).json({
      valid: false,
      message: `Coupon requires a minimum cart value of ₹${coupon.minOrder}. Add items worth ₹${coupon.minOrder - orderTotal} more!`
    });
  }

  let discountAmount = 0;
  if (coupon.type === 'percent') {
    discountAmount = Math.round((orderTotal * coupon.value) / 100);
  } else {
    discountAmount = coupon.value;
  }

  res.json({
    valid: true,
    code: code.toUpperCase(),
    discountAmount,
    description: coupon.description
  });
});

// 3. PAYMENT GATEWAY SIMULATION
app.post('/api/payment/process', (req, res) => {
  const { amount, paymentMethod, cardDetails, upiId } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid payment amount' });
  }

  // Generate realistic gateway transaction details
  const txnId = `TXN_DIWALI_${Math.floor(10000000 + Math.random() * 90000000)}`;
  const paymentTime = new Date().toISOString();

  // Simulate payment processing
  setTimeout(() => {
    res.json({
      success: true,
      transactionId: txnId,
      amount,
      currency: "INR",
      paymentMethod: paymentMethod || "UPI",
      status: "SUCCESS",
      bankRef: `BNK-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: paymentTime,
      message: "Payment captured successfully via Shubh Pay Gateway"
    });
  }, 1200);
});

// 4. ORDERS ROUTES
app.post('/api/orders', (req, res) => {
  const { items, customer, deliveryAddress, paymentDetails, pricing } = req.body;

  if (!items || !items.length || !customer || !deliveryAddress) {
    return res.status(400).json({ error: 'Incomplete order information' });
  }

  const orders = readData(ORDERS_FILE, []);
  const orderId = `ORD-DIWALI-${Date.now().toString().slice(-6)}`;

  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    deliveryStatus: 'Preparing for Shubh Diwali Dispatch',
    estimatedDelivery: 'November 07, 2026',
    customer,
    deliveryAddress,
    items,
    pricing,
    paymentDetails: {
      method: paymentDetails?.method || 'UPI',
      transactionId: paymentDetails?.transactionId || `TXN-${Date.now()}`,
      status: 'Paid'
    },
    trackingTimeline: [
      { step: 'Order Placed & Confirmed', time: new Date().toLocaleTimeString(), completed: true },
      { step: 'Packed with Shubh Puja Blessing', time: 'Pending', completed: false },
      { step: 'Shipped via Express Express', time: 'Pending', completed: false },
      { step: 'Delivered to Doorstep', time: 'Estimated Nov 07', completed: false }
    ]
  };

  orders.unshift(newOrder);
  writeData(ORDERS_FILE, orders);

  // Update stock counts for ordered items
  const products = readData(PRODUCTS_FILE, initialProducts);
  items.forEach(cartItem => {
    const prod = products.find(p => p.id === cartItem.id);
    if (prod && prod.stockCount) {
      prod.stockCount = Math.max(0, prod.stockCount - cartItem.quantity);
      prod.inStock = prod.stockCount > 0;
    }
  });
  writeData(PRODUCTS_FILE, products);

  res.status(201).json(newOrder);
});

app.get('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE, []);
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const orders = readData(ORDERS_FILE, []);
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// 5. EVENTS & FUNCTIONS ROUTES
app.get('/api/events', (req, res) => {
  const events = readData(EVENTS_FILE, initialEvents);
  res.json(events);
});

app.post('/api/events/:id/book', (req, res) => {
  const { name, email, phone, attendeesCount } = req.body;
  const count = Number(attendeesCount) || 1;

  const events = readData(EVENTS_FILE, initialEvents);
  const evtIndex = events.findIndex(e => e.id === req.params.id);
  if (evtIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const evt = events[evtIndex];
  if (evt.bookedSpots + count > evt.totalSpots) {
    return res.status(400).json({ error: 'Not enough seats available for this Diwali event.' });
  }

  evt.bookedSpots += count;
  if (evt.bookedSpots >= evt.totalSpots) {
    evt.status = 'Sold Out';
  } else if (evt.bookedSpots >= evt.totalSpots * 0.8) {
    evt.status = 'Almost Full';
  }

  events[evtIndex] = evt;
  writeData(EVENTS_FILE, events);

  const ticketPass = {
    passId: `PASS-DW-${Date.now().toString().slice(-6)}`,
    eventId: evt.id,
    eventTitle: evt.title,
    eventDate: evt.date,
    eventTime: evt.time,
    location: evt.location,
    attendeeName: name,
    email,
    phone,
    passCount: count,
    totalPaid: evt.ticketPrice * count,
    bookingDate: new Date().toISOString()
  };

  res.json({
    success: true,
    message: `Booked ${count} pass(es) successfully for ${evt.title}!`,
    pass: ticketPass
  });
});

app.post('/api/events', (req, res) => {
  const { title, category, date, time, location, organizer, banner, description, ticketPrice, totalSpots, highlights } = req.body;
  if (!title || !date || !location) {
    return res.status(400).json({ error: 'Title, date, and location are required' });
  }

  const events = readData(EVENTS_FILE, initialEvents);
  const newEvent = {
    id: `evt-${Date.now()}`,
    title,
    category: category || "Festive Celebration",
    date,
    time: time || "06:00 PM IST",
    location,
    organizer: organizer || "Diwali Community",
    banner: banner || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    description: description || "Celebration gathering with joyful moments and sweets.",
    ticketPrice: Number(ticketPrice) || 0,
    totalSpots: Number(totalSpots) || 200,
    bookedSpots: 0,
    highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map(s => s.trim()) : ["Cultural programs", "Festive lights"]),
    status: "Open"
  };

  events.unshift(newEvent);
  writeData(EVENTS_FILE, events);
  res.status(201).json(newEvent);
});

// 6. WISHES & GREETINGS BOARD
app.get('/api/wishes', (req, res) => {
  const wishes = readData(WISHES_FILE, initialWishes);
  res.json(wishes);
});

app.post('/api/wishes', (req, res) => {
  const { name, city, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const wishes = readData(WISHES_FILE, initialWishes);
  const newWish = {
    id: `wish-${Date.now()}`,
    name,
    city: city || "India",
    message,
    date: "Just now",
    likes: 1
  };

  wishes.unshift(newWish);
  writeData(WISHES_FILE, wishes);
  res.status(201).json(newWish);
});

app.post('/api/wishes/:id/like', (req, res) => {
  const wishes = readData(WISHES_FILE, initialWishes);
  const wish = wishes.find(w => w.id === req.params.id);
  if (!wish) {
    return res.status(404).json({ error: 'Wish not found' });
  }

  wish.likes = (wish.likes || 0) + 1;
  writeData(WISHES_FILE, wishes);
  res.json(wish);
});

// 7. DIWALI PUJA MUHURAT & CALENDAR
app.get('/api/muhurat', (req, res) => {
  res.json({
    year: 2026,
    festival: "Deepavali Mahotsav 5-Day Calendar",
    days: [
      {
        day: "Day 1",
        name: "Dhanteras (Dhanatrayodashi)",
        date: "Friday, November 06, 2026",
        shubhMuhurat: "06:12 PM to 08:08 PM",
        significance: "Auspicious day for purchasing gold, silver, brass utensils, and Lakshmi-Ganesh idols.",
        mantra: "Om Shreem Hreem Kleem Shreem Kleem Lakshmi Aagachha Aagachha Mam Mandire Tishtha Tishtha Swaha"
      },
      {
        day: "Day 2",
        name: "Choti Diwali / Narak Chaturdashi / Kali Chaudas",
        date: "Saturday, November 07, 2026",
        shubhMuhurat: "Abhyanga Snan: 05:08 AM to 06:38 AM",
        significance: "Triumph of Lord Krishna over demon Narakasura. 14 diyas are lit in evening (Yamadeep).",
        mantra: "Om Namo Bhagavate Vasudevaya"
      },
      {
        day: "Day 3 (Main)",
        name: "Badi Diwali / Lakshmi-Ganesh Pujan",
        date: "Sunday, November 08, 2026",
        shubhMuhurat: "Pradosh Kaal: 05:48 PM to 08:24 PM | Nishita Kaal: 11:38 PM to 12:31 AM",
        significance: "Worship of Goddess Mahalakshmi, Lord Ganesha, and Lord Kuber for boundless peace and wealth.",
        mantra: "Om Shreem Maha Lakshmyai Namah | Om Gam Ganapataye Namaha"
      },
      {
        day: "Day 4",
        name: "Govardhan Puja / Annakut",
        date: "Monday, November 09, 2026",
        shubhMuhurat: "Morning: 06:36 AM to 08:47 AM | Afternoon: 03:22 PM to 05:33 PM",
        significance: "Offering of 56 Bhog to Lord Krishna in reverence for lifting the Govardhan mountain.",
        mantra: "Om Krishnaya Namaha"
      },
      {
        day: "Day 5",
        name: "Bhai Dooj (Bhau Beej)",
        date: "Tuesday, November 10, 2026",
        shubhMuhurat: "Aparahna Kaal: 01:10 PM to 03:22 PM",
        significance: "Sacred bond and affection between brothers and sisters, exchanging gifts and blessings.",
        mantra: "Shubh Bhai Dooj"
      }
    ]
  });
});

// Serve frontend dist static files if built
const FRONTEND_DIST = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🪔 Shubh Deepavali Server running on http://localhost:${PORT}`);
});
