import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
  // offerCoupons
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  // addOrder
  const [saveOrder, {}] = useSaveOrderMutation();
  // cart_products
  const { cart_products } = useSelector((state) => state.cart);
  // user
  const { user, accessToken } = useSelector((state) => state.auth);
  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  const [couponInfo, setCouponInfo] = useState({});
  //cartTotal
  const [cartTotal, setCartTotal] = useState("");
  // minimumAmount
  const [minimumAmount, setMinimumAmount] = useState(0);
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  const [discountAmount, setDiscountAmount] = useState(0);
  // discountPercentage
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // discountProductType
  const [discountProductType, setDiscountProductType] = useState("");
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  // coupon apply message
  const [couponApplyMsg, setCouponApplyMsg] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  let couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if ((minimumAmount > 0 && total < minimumAmount) || cart_products.length === 0) {
      setCouponInfo({});
      setDiscountPercentage(0);
      setMinimumAmount(0);
      setDiscountProductType("");
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    // Calculate subtotal with per-item discounts
    let subTotalWithItemDiscounts = 0;
    let totalItemDiscounts = 0;

    // Calculate totals with per-item discounts
    cart_products?.forEach((item) => {
      const hasDiscount = !!item.discount && item.discount > 0;
      const itemDiscountAmount = hasDiscount
        ? item.price * (item.discount / 100)
        : 0;
      const discountedPrice = hasDiscount
        ? (item.price - itemDiscountAmount) * item.orderQuantity
        : item.price * item.orderQuantity;

      subTotalWithItemDiscounts += discountedPrice;
      totalItemDiscounts += itemDiscountAmount * item.orderQuantity;
    });

    // Filter products for coupon discount (applied on already discounted prices)
    const result =
      discountProductType === "all"
        ? cart_products
        : cart_products?.filter((p) => p.productType === discountProductType);

    const discountProductTotal = result?.reduce((preValue, currentValue) => {
      const hasDiscount = !!currentValue.discount && currentValue.discount > 0;
      const itemDiscountAmount = hasDiscount
        ? currentValue.price * (currentValue.discount / 100)
        : 0;
      const discountedPrice = hasDiscount
        ? (currentValue.price - itemDiscountAmount) * currentValue.orderQuantity
        : currentValue.price * currentValue.orderQuantity;

      return preValue + discountedPrice;
    }, 0);

    let subTotal = Number(
      (subTotalWithItemDiscounts + shippingCost).toFixed(2)
    );
    let couponDiscountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );

    let totalValue = Number(subTotal - couponDiscountTotal);

    setDiscountAmount(couponDiscountTotal + totalItemDiscounts);
    setCartTotal(totalValue > 0 ? totalValue : 0);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
  ]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const couponCode = couponRef.current.value.trim().toLowerCase();
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode?.toLowerCase() === couponCode
    );

    if (!result || result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (result[0]?.status !== "active") {
      notifyError("This coupon is inactive!");
      return;
    }

    if (result[0]?.startTime && dayjs().isBefore(dayjs(result[0]?.startTime))) {
      notifyError("This coupon is not active yet!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ৳${result[0].minimumAmount} required to apply this coupon!`
      );
      return;
    }

    const appliesToCart = cart_products.some(
      (product) =>
        result[0].productType === "all" ||
        product.productType === result[0].productType
    );

    if (!appliesToCart) {
      notifyError("This coupon is not valid for your cart products!");
      return;
    } else {
      // notifySuccess(
      //   `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      // );
      setCouponApplyMsg(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType} productType!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      setCouponInfo(result[0]);
      dispatch(set_coupon(result[0]));
      setTimeout(() => {
        couponRef.current.value = "";
        setCouponApplyMsg("");
      }, 5000);
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    const [firstName = "", ...lastNameParts] = (user?.name || "").split(" ");
    const savedAddress = user?.checkoutAddress || {};
    const checkoutValues = {
      firstName: shipping_info.firstName || savedAddress.firstName || firstName,
      lastName:
        shipping_info.lastName ||
        savedAddress.lastName ||
        lastNameParts.join(" "),
      district: shipping_info.district || savedAddress.district || "",
      division: shipping_info.division || savedAddress.division || "",
      upzilla: shipping_info.upzilla || savedAddress.upzilla || "",
      country: shipping_info.country || savedAddress.country || "Bangladesh",
      address:
        shipping_info.address || savedAddress.address || user?.address || "",
      city: shipping_info.city || savedAddress.city || "",
      zipCode: shipping_info.zipCode || savedAddress.zipCode || "",
      contactNo:
        shipping_info.contactNo ||
        savedAddress.contactNo ||
        user?.phone ||
        user?.contactNumber ||
        "",
      email: shipping_info.email || savedAddress.email || user?.email || "",
      orderNote: shipping_info.orderNote || "",
      payment: "COD",
    };

    Object.entries(checkoutValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contactNo,
      email: data.email,
      upzilla: data.upzilla,
      district: data.district,
      division: data.division,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "Pending",
      cart: cart_products,
      paymentMethod: "COD",
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      orderNote: data.orderNote,
      user: `${user?._id}`,
      couponCode: couponInfo?.couponCode,
      coupon: couponInfo?._id ? couponInfo : undefined,
    };

    saveOrder({
      ...orderInfo,
    })
      .then((res) => {
        if (res?.error) {
          setIsCheckoutSubmit(false);
          notifyError(
            res?.error?.data?.message || "Order failed. Please try again."
          );
        } else {
          const { data: orderData } = res.data;
          if (orderData?.user) {
            let existingAuth = {};
            try {
              existingAuth = Cookies.get("userInfo")
                ? JSON.parse(Cookies.get("userInfo"))
                : {};
            } catch (_) {
              existingAuth = {};
            }
            const nextAuth = {
              accessToken: accessToken || existingAuth.accessToken,
              user: orderData.user,
            };
            Cookies.set("userInfo", JSON.stringify(nextAuth), { expires: 0.5 });
            dispatch(userLoggedIn(nextAuth));
          }
          localStorage.removeItem("cart_products");
          localStorage.removeItem("couponInfo");
          setIsCheckoutSubmit(false);
          notifySuccess("Your Order Confirmed!");
          router.push(`/order/${orderData?._id}`);
        }
      })
      .catch((error) => {
        setIsCheckoutSubmit(false);
        notifyError("Something went wrong. Please try again.");
        console.error("Order error:", error);
      });
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    watch,
    errors,
    submitHandler,
    handleSubmit,
    cartTotal,
    isCheckoutSubmit,
    couponApplyMsg,
  };
};

export default useCheckoutSubmit;
