import { useState, FormEvent } from "react";

const currency = (value: number) => `$${value.toFixed(2)}`;

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  amazonLink: string;
};

type ShoppingCartItem = Product & {
  quantity: number;
};

export default function SnapKartEcommerce() {
  const [cart, setCart] = useState<ShoppingCartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "Luxury Hoodie",
      price: "$59",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
      category: "Fashion",
      amazonLink: "https://www.amazon.in"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$129",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      category: "Electronics",
      amazonLink: "https://www.amazon.in"
    }
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const subtotal = cart.reduce((total, item) => {
    const amount = Number(item.price.replace("$", ""));
    return total + amount * item.quantity;
  }, 0);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser("Abhinav");
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-3xl bg-white/[0.05] border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            SnapKart
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
            >
              {user ? `Hi, ${user}` : "Login"}
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <p className="uppercase tracking-[6px] text-cyan-300 mb-4">
            Next Gen Ecommerce
          </p>

          <h1 className="text-5xl md:text-8xl font-black mb-6">
            Experience
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Future Shopping
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            A premium shopping experience built with glass UI and smooth interactions.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-[32px] overflow-hidden bg-white/[0.05] border border-cyan-500/10 backdrop-blur-3xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <p className="text-cyan-300 mb-2">{product.category}</p>

                <h3 className="text-2xl font-bold mb-4">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-cyan-200 font-black text-xl">
                    {product.price}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500"
                  >
                    Add
                  </button>
                </div>

                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-2xl bg-white/10 hover:bg-cyan-400 hover:text-black transition"
                >
                  Buy Now on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showCart && (
        <div className="fixed inset-0 bg-black/70 flex justify-end z-50">
          <div className="w-full max-w-md bg-[#0f172a] p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">Your Cart</h2>

              <button onClick={() => setShowCart(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-5">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-white/5 p-4 rounded-2xl"
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-cyan-500/10 pt-6">
              <div className="flex justify-between mb-6">
                <span>Subtotal</span>

                <span className="text-3xl font-black text-cyan-300">
                  {currency(subtotal)}
                </span>
              </div>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
          <div className="w-full max-w-md rounded-[36px] bg-[#0f172a] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">Login</h2>

              <button onClick={() => setShowLogin(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 rounded-2xl bg-white/10"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-4 rounded-2xl bg-white/10"
                required
              />

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="py-10 text-center border-t border-cyan-500/10">
        <p className="text-gray-400 text-lg font-medium">
          Made by Abhinav ❤️
        </p>
      </footer>
    </div>
  );
}
