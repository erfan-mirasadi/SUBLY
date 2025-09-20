import { FiShoppingBag } from "react-icons/fi";
import CartItem from "./CartItem";

export default function CartItemsList({ cartItems, onAccountInfoChange }) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-md p-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-vazirmatn">
          محصولات سبد خرید
        </h2>
        <FiShoppingBag className="text-2xl text-blue-400 mx-4" />
      </div>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            totalItemsCount={cartItems.length}
            onAccountInfoChange={onAccountInfoChange}
          />
        ))}
      </div>
    </div>
  );
}
