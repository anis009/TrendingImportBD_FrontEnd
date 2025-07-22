import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cartSlice";
import { getImageUrl } from "@/utils/common";
import Colors from "@/constants/colors";

const CartItem = ({ product }) => {
  const { _id, img, title, price, orderQuantity = 0, discount } = product || {};

  const dispatch = useDispatch();

  // Calculate discounted price
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
    dispatch(remove_product(prd));
  };

  console.log("discount~~", discount);
  console.log("orderQuantity~~", orderQuantity);

  return (
    <tr className="tp-cart-item">
      {/* img */}
      <td className="tp-cart-img">
        <div className="tp-cart-img-wrapper">
          <Link href={`/product-details/${_id}`}>
            <Image
              src={getImageUrl(img)}
              alt="product img"
              width={80}
              height={80}
              style={{
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #f0f0f0",
              }}
            />
          </Link>
        </div>
      </td>

      {/* title */}
      <td className="tp-cart-title">
        <div className="tp-cart-title-wrapper">
          <Link
            href={`/product-details/${_id}`}
            style={{
              color: "#333",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "1.4",
              display: "block",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.target.style.color = Colors.primary)}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            {title}
          </Link>
        </div>
      </td>

      {/* price */}
      <td className="tp-cart-price">
        <div className="tp-cart-price-wrapper" style={{ minWidth: "120px" }}>
          {discount && discount > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  className="tp-cart-price-current"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: Colors.primary,
                  }}
                >
                  ৳{(finalPrice * orderQuantity).toFixed(2)}
                </span>
                <span
                  className="tp-cart-discount-badge"
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
                className="tp-cart-price-old"
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                ৳{(originalPrice * orderQuantity).toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              className="tp-cart-price-current"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              ৳{(finalPrice * orderQuantity).toFixed(2)}
            </span>
          )}
        </div>
      </td>

      {/* quantity */}
      <td className="tp-cart-quantity">
        <div
          className="tp-product-quantity"
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
          <button
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
            onMouseEnter={(e) => (e.target.style.background = "#e9ecef")}
            onMouseLeave={(e) => (e.target.style.background = "#f8f9fa")}
            disabled={orderQuantity <= 1}
          >
            <Minus />
          </button>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              backgroundColor: "white",
              height: "100%",
              minWidth: "50px",
            }}
          >
            {orderQuantity || 1}
          </div>

          <button
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
            onMouseEnter={(e) => (e.target.style.background = "#e9ecef")}
            onMouseLeave={(e) => (e.target.style.background = "#f8f9fa")}
          >
            <Plus />
          </button>
        </div>
      </td>

      {/* action */}
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
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 8px rgba(255, 71, 87, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 4px rgba(255, 71, 87, 0.3)";
          }}
        >
          <Close />
          <span>Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
