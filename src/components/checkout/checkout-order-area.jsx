import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    clientSecret,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount,
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

  console.log("cart_products:", cart_products);
  const { total } = useCartInfo();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          {/* Calculate subtotal and discounts */}
          {(() => {
            let subtotal = 0;
            let totalItemDiscount = 0;
            cart_products.forEach((item) => {
              const itemSubtotal = item.price * item.orderQuantity;
              subtotal += itemSubtotal;
              if (item.discount && item.discount > 0) {
                totalItemDiscount +=
                  item.price * (item.discount / 100) * item.orderQuantity;
              }
            });

            // Use coupon discount if present, otherwise use per-item discount
            const showCouponDiscount = discountAmount > 0;
            const discountToShow = showCouponDiscount
              ? discountAmount
              : totalItemDiscount;
            const totalToShow = subtotal - discountToShow + shippingCost;

            return (
              <>
                {/*  header */}
                <li className="tp-order-info-list-header">
                  <h4>Product</h4>
                  <h4>Total</h4>
                </li>

                {/*  item list */}
                {cart_products.map((item) => {
                  const hasDiscount = !!item.discount && item.discount > 0;
                  const discountAmount = hasDiscount
                    ? item.price * (item.discount / 100)
                    : 0;
                  const discountedPrice = hasDiscount
                    ? (item.price - discountAmount) * item.orderQuantity
                    : item.price * item.orderQuantity;

                  return (
                    <li key={item._id} className="tp-order-info-list-desc">
                      <p>
                        {item.title} <span> x {item.orderQuantity}</span>
                        {hasDiscount && (
                          <span
                            style={{
                              color: "#4CAF50",
                              fontSize: "12px",
                              marginLeft: "8px",
                            }}
                          >
                            (Discount: {item.discount}%)
                          </span>
                        )}
                      </p>
                      <span>৳{discountedPrice.toFixed(2)}</span>
                    </li>
                  );
                })}

                {/*  subtotal */}
                <li className="tp-order-info-list-subtotal">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </li>

                {/*  shipping cost */}
                <li className="tp-order-info-list-subtotal">
                  <span>Shipping Cost</span>
                  <span>৳{shippingCost.toFixed(2)}</span>
                </li>

                {/* discount */}
                {discountToShow > 0 && (
                  <li className="tp-order-info-list-subtotal">
                    <span>Discount</span>
                    <span>-৳{discountToShow.toFixed(2)}</span>
                  </li>
                )}

                {/* total */}
                <li className="tp-order-info-list-total">
                  <span>Total</span>
                  <span>৳{totalToShow.toFixed(2)}</span>
                </li>
              </>
            );
          })()}
        </ul>
      </div>
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor="back_transfer"
            data-bs-toggle="direct-bank-transfer"
          >
            Credit Card
          </label>
          {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
