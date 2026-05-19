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
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
          SnapKart
        </h1>

        <p className="text-gray-400 mt-4">
          Futuristic Ecommerce Platform
        </p>

        <div className="mt-10">
          {products.map((product) => (
            <div key={product.id} className="p-6 rounded-3xl bg-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-72 h-72 object-cover rounded-2xl"
              />

              <h2 className="text-2xl font-bold mt-4">{product.name}</h2>

              <p className="text-cyan-300">{product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p>Cart Items: {cart.length}</p>
          <p>Subtotal: {currency(subtotal)}</p>
        </div>
      </div>
    </div>
  );
}
