import React from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";

const CartCheckout = () => {
  const {
    total,
    originalTotal,
    totalDiscount,
    hasDiscount,
    discountPercentage,
  } = useCartInfo();

  const [shipCost, setShipCost] = useState(0);

  // handle shipping cost
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };

  return (
    <div className="tp-cart-checkout-wrapper">
      {/* Original Subtotal (if there are discounts) */}
      {hasDiscount && (
        <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
          <span className="tp-cart-checkout-top-title">Original Subtotal</span>
          <span
            className="tp-cart-checkout-top-price"
            style={{
              textDecoration: "line-through",
              color: "#999",
              fontSize: "14px",
            }}
          >
            ৳{originalTotal.toFixed(2)}
          </span>
        </div>
      )}

      {/* Discount Row (if there are discounts) */}
      {hasDiscount && (
        <div className="tp-cart-checkout-discount d-flex align-items-center justify-content-between">
          <span
            className="tp-cart-checkout-discount-title"
            style={{ color: "#28a745", fontWeight: "500" }}
          >
            Discount ({discountPercentage}% off)
          </span>
          <span
            className="tp-cart-checkout-discount-price"
            style={{
              color: "#28a745",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            -৳{totalDiscount.toFixed(2)}
          </span>
        </div>
      )}

      {/* Current Subtotal */}
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">
          {hasDiscount ? "Discounted Subtotal" : "Subtotal"}
        </span>
        <span
          className="tp-cart-checkout-top-price"
          style={{
            fontWeight: "600",
            color: hasDiscount ? "#28a745" : "#333",
            fontSize: "16px",
          }}
        >
          ৳{total.toFixed(2)}
        </span>
      </div>

      {/* Savings Badge (if there are discounts) */}
      {hasDiscount && (
        <div
          className="tp-cart-savings-badge"
          style={{
            background: "linear-gradient(135deg, #28a745, #20c997)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            textAlign: "center",
            margin: "10px 0",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 2px 4px rgba(40, 167, 69, 0.3)",
          }}
        >
          🎉 You save ৳{totalDiscount.toFixed(2)} ({discountPercentage}% off)!
        </div>
      )}

      {/* Shipping Options */}
      <div className="tp-cart-checkout-shipping">
        <h4 className="tp-cart-checkout-shipping-title">Shipping</h4>
        <div className="tp-cart-checkout-shipping-option-wrapper">
          <div className="tp-cart-checkout-shipping-option">
            <input id="flat_rate" type="radio" name="shipping" />
            <label htmlFor="flat_rate" onClick={() => handleShippingCost(20)}>
              Flat rate: <span>৳20.00</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="local_pickup" type="radio" name="shipping" />
            <label
              htmlFor="local_pickup"
              onClick={() => handleShippingCost(25)}
            >
              Local pickup: <span> ৳25.00</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="free_shipping" type="radio" name="shipping" />
            <label
              onClick={() => handleShippingCost("free")}
              htmlFor="free_shipping"
            >
              Free shipping
            </label>
          </div>
        </div>
      </div>

      {/* Final Total */}
      <div
        className="tp-cart-checkout-total d-flex align-items-center justify-content-between"
        style={{
          borderTop: "2px solid #f0f0f0",
          paddingTop: "15px",
          marginTop: "15px",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "600" }}>Total</span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#333",
          }}
        >
          ৳{(total + shipCost).toFixed(2)}
        </span>
      </div>

      {/* Final Savings Summary */}
      {hasDiscount && (
        <div
          className="tp-cart-final-savings"
          style={{
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
            marginTop: "8px",
            fontStyle: "italic",
          }}
        >
          Total savings: ৳{totalDiscount.toFixed(2)} | Final price: ৳
          {(total + shipCost).toFixed(2)}
          (was ৳{(originalTotal + shipCost).toFixed(2)})
        </div>
      )}

      {/* Checkout Button */}
      <div className="tp-cart-checkout-proceed">
        <Link href="/checkout" className="tp-cart-checkout-btn w-100">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
