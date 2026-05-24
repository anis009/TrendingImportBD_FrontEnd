import { useSelector } from "react-redux";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    isCheckoutSubmit,
    register,
    shippingCost,
    discountAmount,
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

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
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            defaultChecked
            {...register("payment")}
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <p className="mb-0 mt-2">
            Pay in cash when your order is delivered.
          </p>
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          {isCheckoutSubmit ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
