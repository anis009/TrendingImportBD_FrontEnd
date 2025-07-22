import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);

  useEffect(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const { price, orderQuantity, discount } = cartItem;

        // Calculate original price for this item
        const originalPrice = price || 0;
        const itemOriginalTotal = originalPrice * orderQuantity;

        // Calculate discount amount
        const discountAmount = discount ? (originalPrice * discount) / 100 : 0;
        const discountedPrice = originalPrice - discountAmount;

        // Calculate final price for this item
        const itemFinalTotal = discountedPrice * orderQuantity;
        const itemDiscountTotal = discountAmount * orderQuantity;

        // Add to cart totals
        cartTotal.total += itemFinalTotal;
        cartTotal.originalTotal += itemOriginalTotal;
        cartTotal.totalDiscount += itemDiscountTotal;
        cartTotal.quantity += orderQuantity;

        return cartTotal;
      },
      {
        total: 0,
        originalTotal: 0,
        totalDiscount: 0,
        quantity: 0,
      }
    );

    setQuantity(cart.quantity);
    setTotal(cart.total);
    setOriginalTotal(cart.originalTotal);
    setTotalDiscount(cart.totalDiscount);
  }, [cart_products]);

  return {
    quantity,
    total, // Final discounted total
    originalTotal, // Total before discounts
    totalDiscount, // Total discount amount
    savings: totalDiscount, // Alias for savings
    discountPercentage:
      originalTotal > 0
        ? ((totalDiscount / originalTotal) * 100).toFixed(1)
        : 0,
    hasDiscount: totalDiscount > 0,
    setTotal,
  };
};

export default useCartInfo;
