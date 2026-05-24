import Image from "next/image";
import Link from "next/link";
import logoDark from "@assets/img/logo/logo.svg";

const LOGO_PRESETS = {
  small: {
    src: "/small-logo.png",
    width: 436,
    height: 572,
    style: { width: "auto", height: "64px" },
  },
  primary: {
    src: "/logo.png",
    width: 500,
    height: 500,
    style: { width: "auto", height: "64px" },
  },
  dark: {
    src: logoDark,
    width: 140,
    height: 35,
    style: { width: "140px", height: "35px" },
  },
};

export const LogoImage = ({
  variant = "small",
  alt = "Trending Import BD logo",
  className,
  priority = false,
  style,
}) => {
  const logo = LOGO_PRESETS[variant];

  return (
    <Image
      {...logo}
      alt={alt}
      className={className}
      priority={priority}
      style={{ ...logo.style, ...style }}
    />
  );
};

const SiteLogo = ({ href = "/", ...props }) => {
  return (
    <Link href={href}>
      <LogoImage {...props} />
    </Link>
  );
};

export default SiteLogo;
