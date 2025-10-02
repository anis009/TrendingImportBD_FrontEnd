import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

// language
function Language({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-lang">
      <span
        onClick={() => handleActive("lang")}
        className="tp-header-lang-toggle"
        id="tp-header-lang-toggle"
      >
        English
      </span>
      {/* <ul className={active === 'lang' ? "tp-lang-list-open" : ""}>
        <li>
          <a href="#">Spanish</a>
        </li>
        <li>
          <a href="#">Russian</a>
        </li>
        <li>
          <a href="#">Portuguese</a>
        </li>
      </ul> */}
    </div>
  );
}

// currency
function Currency({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      <span
        onClick={() => handleActive("currency")}
        className="tp-header-currency-toggle"
        id="tp-header-currency-toggle"
      >
        BDT ৳
      </span>
      {/* <ul className={active === "currency" ? "tp-currency-list-open" : ""}>
        <li>
          <a href="#">EUR</a>
        </li>
        <li>
          <a href="#">CHF</a>
        </li>
        <li>
          <a href="#">GBP</a>
        </li>
        <li>
          <a href="#">KWD</a>
        </li>
      </ul> */}
    </div>
  );
}

// setting
function ProfileSetting({ active, handleActive }) {
  const { user } = useSelector((state) => state.auth);
  console.log("user~~", user);
  const dispatch = useDispatch();
  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push("/");
  };
  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive("setting")}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
      >
        Setting
      </span>
      <ul className={active === "setting" ? "tp-setting-list-open" : ""}>
        {user?._id && (
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
        )}

        <li>
          <Link href="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          {!user?._id && (
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          )}
          {user?._id && (
            <a onClick={handleLogout} className="cursor-pointer">
              Logout
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}
const UserLoggedIn = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  return (
    <div className="tp-header-top-menu-item tp-header-login">
      <div
        style={{
          cursor: "pointer",
        }}
        className="d-flex  align-items-center"
        onClick={() => router.push("/profile")}
      >
        <i
          className="fa-solid fa-user-check"
          style={{ marginRight: "5px", color: "#0989FF" }}
        ></i>
        <span className="text-success">Welcome, {user?.name || "User"}!</span>
      </div>
    </div>
  );
};

const UserLoggedOut = () => {
  return (
    <div className="tp-header-top-menu-item tp-header-login">
      <div className="d-flex align-items-center">
        <i
          className="fa-solid fa-user"
          style={{ marginRight: "5px", color: "#6c757d" }}
        ></i>
        <Link href="/login" className="text-muted">
          Sign In
        </Link>
      </div>
    </div>
  );
};

const HeaderTopRight = () => {
  const [active, setIsActive] = useState("");
  const { user } = useSelector((state) => state.auth);
  console.log("user in header top right", user);
  // handle active
  const handleActive = (type) => {
    if (type === active) {
      setIsActive("");
    } else {
      setIsActive(type);
    }
  };
  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <Language active={active} handleActive={handleActive} />
      <Currency active={active} handleActive={handleActive} />
      <ProfileSetting active={active} handleActive={handleActive} />
      {user?._id ? <UserLoggedIn /> : <UserLoggedOut />}
    </div>
  );
};

export default HeaderTopRight;
