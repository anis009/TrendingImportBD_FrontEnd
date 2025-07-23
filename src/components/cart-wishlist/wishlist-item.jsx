import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import { remove_wishlist_product } from "@/redux/features/wishlist-slice";
import { getImageUrl } from "@/utils/common";
import Colors from "@/constants/colors";

const WishlistItem = ({ product }) => {
  const { _id, img, title, price, discount } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const isAddToCart = cart_products.find((item) => item._id === _id);
  const dispatch = useDispatch();

  // ✨ STEP 1: Calculate discount prices
  const originalPrice = price || 0;
  const discountAmount = discount ? (originalPrice * discount) / 100 : 0;
  const discountedPrice = originalPrice - discountAmount;
  const finalPrice = discount ? discountedPrice : originalPrice;

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_wishlist_product(prd));
  };

  return (
    <tr>
      {/* Product Image */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={getImageUrl(img)}
            alt="product img"
            width={150}
            height={100}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Link>
      </td>

      {/* Product Title */}
      <td className="tp-cart-title">
        <Link
          href={`/product-details/${_id}`}
          style={{
            color: "#333",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          {title}
        </Link>
      </td>

      {/* ✨ STEP 2: Enhanced Price Display with Discount */}
      <td className="tp-cart-price">
        <div className="tp-wishlist-price-wrapper ms-2">
          {discount && discount > 0 ? (
            // When product has discount
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  className="tp-wishlist-price-current"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: Colors.primary,
                  }}
                >
                  ৳{finalPrice.toFixed(2)}
                </span>
                <span
                  className="tp-wishlist-discount-badge"
                  style={{
                    background: Colors.primaryGradient,
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: "600",
                    boxShadow: "0 2px 4px rgba(255, 107, 53, 0.3)",
                  }}
                >
                  -{discount}%
                </span>
              </div>
              <span
                className="tp-wishlist-price-old"
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                ৳{originalPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            // When product has no discount
            <span
              className="tp-wishlist-price-regular"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              ৳{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </td>

      {/* Quantity Controls */}
      <td className="tp-cart-quantity">
        <div
          className="tp-product-quantity mt-10 mb-10 ms-2"
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            width: "120px",
            height: "40px",
          }}
        >
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
            style={{
              background: "#f8f9fa",
              border: "none",
              padding: "0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              borderRight: "1px solid #e0e0e0",
              width: "35px",
              height: "100%",
              fontSize: "14px",
            }}
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={isAddToCart ? isAddToCart?.orderQuantity : 0}
            readOnly
            style={{
              border: "none",
              textAlign: "center",
              padding: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              backgroundColor: "white",
              flex: 1,
              outline: "none",
            }}
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
            style={{
              background: "#f8f9fa",
              border: "none",
              padding: "0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              borderLeft: "1px solid #e0e0e0",
              width: "35px",
              height: "100%",
              fontSize: "14px",
            }}
          >
            <Plus />
          </span>
        </div>
      </td>

      {/* Add to Cart Button */}
      <td className="tp-cart-add-to-cart">
        <button
          onClick={() => handleAddProduct(product)}
          type="button"
          className="tp-btn tp-btn-2 tp-btn-blue"
          style={{
            background: Colors.primaryGradient,
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 123, 255, 0.3)",
            margin: "0px 10px",
          }}
        >
          Add To Cart
        </button>
      </td>

      {/* Remove Button */}
      <td className="tp-cart-action">
        <button
          onClick={() => handleRemovePrd({ title, id: _id })}
          className="tp-cart-action-btn"
          style={{
            background: "linear-gradient(135deg, #ff4757, #ff6b7a)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(255, 71, 87, 0.3)",
          }}
        >
          <Close />
          <span>Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
