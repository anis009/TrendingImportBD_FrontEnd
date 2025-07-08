import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Colors } from "@/constants/colors";

const FlashSaleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "FLASH SALE",
      discount: "UP TO 65% OFF",
      buttonText: "ORDER NOW",
      website: "www.TrendImport.Bd",
      backgroundColor: "#B91C3C", // Red-700
      image: "/assets/img/carousel/gift-boxes.png",
    },
    {
      id: 2,
      title: "SPECIAL OFFER",
      discount: "UP TO 50% OFF",
      buttonText: "SHOP NOW",
      website: "www.TrendImport.Bd",
      backgroundColor: Colors.primary,
      image: "/assets/img/carousel/beauty-products.png",
    },
    {
      id: 3,
      title: "NEW ARRIVALS",
      discount: "UP TO 40% OFF",
      buttonText: "EXPLORE",
      website: "www.TrendImport.Bd",
      backgroundColor: Colors.secondary,
      image: "/assets/img/carousel/cosmetics.png",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="flash-sale-carousel container"
      style={{
        marginTop: "60px",
      }}
    >
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ backgroundColor: slide.backgroundColor }}
          >
            {/* Background Pattern */}
            <div className="bg-pattern">
              <div className="dots-pattern top-left"></div>
              <div className="dots-pattern top-right"></div>
              <div className="wave-pattern bottom-left"></div>
              <div className="wave-pattern bottom-right"></div>
            </div>

            {/* Gift Boxes Left */}
            <div className="gift-boxes left">
              <div className="gift-box large">
                <div className="box"></div>
                <div className="ribbon"></div>
                <div className="bow"></div>
              </div>
              <div className="gift-box small">
                <div className="box"></div>
                <div className="ribbon"></div>
                <div className="bow"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="carousel-content">
              <h1 className="sale-title">{slide.title}</h1>
              <h2 className="discount-text">{slide.discount}</h2>
              <button className="order-btn">{slide.buttonText}</button>
              <p className="website-text">{slide.website}</p>
            </div>

            {/* Gift Boxes Right */}
            <div className="gift-boxes right">
              <div className="gift-box large">
                <div className="box"></div>
                <div className="ribbon"></div>
                <div className="bow"></div>
              </div>
              <div className="gift-box medium">
                <div className="box"></div>
                <div className="ribbon"></div>
                <div className="bow"></div>
              </div>
              <div className="gift-box small">
                <div className="box"></div>
                <div className="ribbon"></div>
                <div className="bow"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleCarousel;
