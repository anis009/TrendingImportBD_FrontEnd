import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { getImageUrl, getLimitText } from "@/utils/common";

const ProductItem = ({ product, style_2 = false }) => {
  const { _id, img, category, title, reviews, price, discount, tags, status } =
    product || {};
  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  console.log("discount~~", discount);
  console.log("price~~", price);

  return (
    <>
      <div className={`tp-product-item-2 ${style_2 ? "" : ""}`}>
        <div className="tp-product-thumb-2 p-relative z-index-1 fix">
          <Link href={`/product-details/${_id}`}>
            <Image
              src={getImageUrl(img)}
              alt="product img"
              width={284}
              height={302}
              style={{
                height: "320px",
              }}
            />
          </Link>
          <div className="tp-product-badge">
            {status === "out-of-stock" && (
              <span className="product-hot">out-stock</span>
            )}
          </div>
          {/* product action */}
          <div className="tp-product-action-2 tp-product-action-blackStyle">
            <div className="tp-product-action-item-2 d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn-2 ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    View Cart
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddProduct(product)}
                  className={`tp-product-action-btn-2 ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add to Cart
                  </span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                className="tp-product-action-btn-2 tp-product-quick-view-btn"
              >
                <QuickView />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Quick View
                </span>
              </button>
              <button
                disabled={status === "out-of-stock"}
                onClick={() => handleWishlistProduct(product)}
                className={`tp-product-action-btn-2 ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add To Wishlist
                </span>
              </button>
              <button
                disabled={status === "out-of-stock"}
                onClick={() => handleCompareProduct(product)}
                className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
              >
                <CompareThree />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add To Compare
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="tp-product-content-2 pt-15">
          <div className="tp-product-tag-2">
            {tags.map((t, i) => (
              <a key={i} href="#">
                {t}
                {i < tags.length - 1 && ","}
              </a>
            ))}
          </div>
          <h3 className="tp-product-title-2">
            <Link
              style={{
                wordBreak: "break-all",
              }}
              href={`/product-details/${_id}`}
            >
              {getLimitText(title, 35)}
            </Link>
          </h3>
          <div className="tp-product-rating-icon tp-product-rating-icon-2">
            <Rating
              allowFraction
              size={16}
              initialValue={ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-price-wrapper-2">
            {discount > 0 ? (
              <>
                <span className="tp-product-price-2 new-price">
                  ৳
                  {(
                    Number(price) -
                    (Number(price) * Number(discount)) / 100
                  ).toFixed(2)}
                </span>
                <span className="tp-product-price-2 old-price">
                  {" "}
                  ৳{price.toFixed(2)}{" "}
                </span>
              </>
            ) : (
              <span className="tp-product-price-2 new-price">
                ৳{price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        {isAddedToCart ? (
          <Link
            style={{
              background: "#EC1766",
              color: "#fff",
              border: "none",

              padding: "10px 32px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background 0.2s",
              width: "100%",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: status === "out-of-stock" ? "not-allowed" : "pointer",
              opacity: status === "out-of-stock" ? 0.6 : 1,
            }}
            href="/cart"
            className={` ${isAddedToCart ? "active" : ""} mt-2 mb-4  `}
          >
            <span>View Cart</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => handleAddProduct(product)}
            className={` ${isAddedToCart ? "active" : ""} mt-2 mb-4 `}
            disabled={status === "out-of-stock"}
            style={{
              background: "#EC1766",
              color: "#fff",
              border: "none",

              padding: "10px 32px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background 0.2s",
              width: "100%",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: status === "out-of-stock" ? "not-allowed" : "pointer",
              opacity: status === "out-of-stock" ? 0.6 : 1,
            }}
          >
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ProductItem;
