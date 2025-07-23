import React, { useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";

const FAQPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // FAQ Data organized by categories
  const faqData = [
    {
      id: 1,
      category: "orders",
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to provide your shipping information and choose a payment method. We'll send you an order confirmation email once your order is placed.",
    },
    {
      id: 2,
      category: "orders",
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this time, orders are processed and cannot be changed. Please contact us immediately at +880 1758-711360 or email trendingimportbd@gmail.com.",
    },
    {
      id: 3,
      category: "orders",
      question: "What is your minimum order amount?",
      answer:
        "We have a minimum order amount of ৳500 for delivery within Dhaka and ৳1000 for outside Dhaka. This helps us maintain quality service and reasonable delivery costs.",
    },
    {
      id: 4,
      category: "shipping",
      question: "What are your delivery areas in Bangladesh?",
      answer:
        "We deliver throughout Bangladesh! We offer same-day delivery in Dhaka city, next-day delivery in major cities like Chittagong, Sylhet, and Rajshahi, and 2-3 days delivery in other areas across the country.",
    },
    {
      id: 5,
      category: "shipping",
      question: "How much does shipping cost?",
      answer:
        "Shipping costs vary by location: ৳60 within Dhaka city, ৳120 for areas outside Dhaka but within Bangladesh. Free shipping is available on orders over ৳2000 within Dhaka and ৳3000 outside Dhaka.",
    },
    {
      id: 6,
      category: "shipping",
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via SMS and email. You can track your order status by calling our customer service or checking your account dashboard on our website.",
    },
    {
      id: 7,
      category: "payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept multiple payment methods including: Cash on Delivery (COD), bKash, Nagad, Rocket, Bank Transfer, and Credit/Debit Cards. COD is available for orders up to ৳10,000.",
    },
    {
      id: 8,
      category: "payments",
      question: "Is it safe to pay online on your website?",
      answer:
        "Yes, absolutely! We use SSL encryption and secure payment gateways to protect your financial information. Your payment details are never stored on our servers and are processed through trusted payment partners.",
    },
    {
      id: 9,
      category: "payments",
      question: "Do you offer EMI or installment options?",
      answer:
        "Yes, we offer EMI options through select banks and digital payment platforms for orders above ৳5,000. You can choose 3, 6, or 12-month installment plans during checkout.",
    },
    {
      id: 10,
      category: "returns",
      question: "What is your return and exchange policy?",
      answer:
        "We offer a 7-day return policy for unopened, unused items in original packaging. Beauty and personal care items cannot be returned for hygiene reasons unless defective. Return shipping costs are borne by the customer unless the item is defective.",
    },
    {
      id: 11,
      category: "returns",
      question: "How do I return a product?",
      answer:
        "To return a product, contact our customer service within 7 days of delivery. We'll provide you with a return authorization number and instructions. Package the item securely and send it to our return address with the authorization number.",
    },
    {
      id: 12,
      category: "returns",
      question: "When will I receive my refund?",
      answer:
        "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method. For COD orders, refunds are processed via bank transfer or mobile banking.",
    },
    {
      id: 13,
      category: "products",
      question: "Are all your products authentic and imported?",
      answer:
        "Yes, all our products are 100% authentic and directly imported from authorized distributors and manufacturers worldwide. We provide authenticity guarantees and can show import documentation upon request.",
    },
    {
      id: 14,
      category: "products",
      question: "Do you sell expired or near-expiry products?",
      answer:
        "No, we never sell expired products. All our items have at least 12 months of shelf life remaining. We clearly mention manufacturing and expiry dates on product pages and packages.",
    },
    {
      id: 15,
      category: "products",
      question:
        "Can you import specific products that are not on your website?",
      answer:
        "Yes! We offer custom import services. If you need a specific product not available on our website, contact us with the product details. We'll provide you with a quote and timeline for importing the item.",
    },
    {
      id: 16,
      category: "account",
      question: "Do I need to create an account to shop?",
      answer:
        "You can shop as a guest, but creating an account allows you to track orders, save addresses, maintain a wishlist, and get exclusive offers. Account creation is free and takes less than a minute.",
    },
    {
      id: 17,
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      id: 18,
      category: "general",
      question: "Do you have a physical store I can visit?",
      answer:
        "Yes, our main office and showroom is located at House# 15, Road# 7, Block# C, Mirpur-1, Dhaka-1216. You can visit us during business hours (10 AM - 8 PM, Sunday to Thursday) to see products in person.",
    },
    {
      id: 19,
      category: "general",
      question: "How can I contact customer service?",
      answer:
        "You can reach us via: Phone: +880 1758-711360, Email: trendingimportbd@gmail.com, WhatsApp: +880 1758-711360, or visit our physical store. Our customer service is available 10 AM - 8 PM, Sunday to Thursday.",
    },
    {
      id: 20,
      category: "general",
      question: "Do you offer bulk or wholesale pricing?",
      answer:
        "Yes, we offer special pricing for bulk orders and wholesale customers. For orders over ৳50,000 or if you're a business customer, contact us directly for custom pricing and terms.",
    },
  ];

  // FAQ Categories
  const categories = [
    { key: "all", label: "All Questions", icon: "fa-solid fa-list" },
    { key: "orders", label: "Orders", icon: "fa-solid fa-shopping-cart" },
    {
      key: "shipping",
      label: "Shipping & Delivery",
      icon: "fa-solid fa-truck",
    },
    { key: "payments", label: "Payments", icon: "fa-solid fa-credit-card" },
    { key: "returns", label: "Returns & Refunds", icon: "fa-solid fa-undo" },
    { key: "products", label: "Products", icon: "fa-solid fa-box" },
    { key: "account", label: "Account", icon: "fa-solid fa-user" },
    { key: "general", label: "General", icon: "fa-solid fa-info-circle" },
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle accordion
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <Wrapper>
      <SEO pageTitle="Frequently Asked Questions - FAQ" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="FAQ" subtitle="Frequently Asked Questions" />

      <section className="tp-faq-area pt-80 pb-80">
        <div className="container">
          {/* FAQ Header */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#2c3e50",
                  marginBottom: "15px",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6c757d",
                  lineHeight: "1.6",
                }}
              >
                Find answers to the most common questions about shopping with
                TrendingImportBd. Can&apos;t find what you&apos;re looking for?
                Contact our customer service team.
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="row mb-5">
            <div className="col-lg-12">
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  padding: "30px",
                  marginBottom: "30px",
                }}
              >
                {/* Search Bar */}
                <div className="row mb-4">
                  <div className="col-lg-6 mx-auto">
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "15px 50px 15px 20px",
                          border: "2px solid #e9ecef",
                          borderRadius: "8px",
                          fontSize: "16px",
                          outline: "none",
                          transition: "border-color 0.3s ease",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#ff6b35")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                      />
                      <i
                        className="fa-solid fa-search"
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#6c757d",
                        }}
                      ></i>
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      {categories.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => setSelectedCategory(category.key)}
                          style={{
                            background:
                              selectedCategory === category.key
                                ? "#ff6b35"
                                : "white",
                            color:
                              selectedCategory === category.key
                                ? "white"
                                : "#6c757d",
                            border:
                              "2px solid " +
                              (selectedCategory === category.key
                                ? "#ff6b35"
                                : "#e9ecef"),
                            borderRadius: "25px",
                            padding: "10px 20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                          onMouseEnter={(e) => {
                            if (selectedCategory !== category.key) {
                              e.target.style.borderColor = "#ff6b35";
                              e.target.style.color = "#ff6b35";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedCategory !== category.key) {
                              e.target.style.borderColor = "#e9ecef";
                              e.target.style.color = "#6c757d";
                            }
                          }}
                        >
                          <i
                            className={category.icon}
                            style={{ fontSize: "12px" }}
                          ></i>
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {filteredFAQs.length > 0 ? (
                <div className="tp-faq-wrapper">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={faq.id}
                      style={{
                        background: "white",
                        border: "1px solid #e9ecef",
                        borderRadius: "8px",
                        marginBottom: "15px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        boxShadow:
                          activeAccordion === faq.id
                            ? "0 4px 15px rgba(0,0,0,0.1)"
                            : "none",
                      }}
                    >
                      {/* Question Header */}
                      <div
                        onClick={() => toggleAccordion(faq.id)}
                        style={{
                          padding: "20px 25px",
                          cursor: "pointer",
                          background:
                            activeAccordion === faq.id ? "#f8f9fa" : "white",
                          borderBottom:
                            activeAccordion === faq.id
                              ? "1px solid #e9ecef"
                              : "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (activeAccordion !== faq.id) {
                            e.currentTarget.style.background = "#f8f9fa";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeAccordion !== faq.id) {
                            e.currentTarget.style.background = "white";
                          }
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            flex: 1,
                          }}
                        >
                          <span
                            style={{
                              background: "#ff6b35",
                              color: "white",
                              borderRadius: "50%",
                              width: "30px",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {index + 1}
                          </span>
                          <h6
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#2c3e50",
                            }}
                          >
                            {faq.question}
                          </h6>
                        </div>
                        <i
                          className={`fa-solid fa-chevron-${
                            activeAccordion === faq.id ? "up" : "down"
                          }`}
                          style={{
                            color: "#6c757d",
                            transition: "transform 0.3s ease",
                            fontSize: "14px",
                          }}
                        ></i>
                      </div>

                      {/* Answer Content */}
                      <div
                        style={{
                          maxHeight: activeAccordion === faq.id ? "300px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        <div style={{ padding: "20px 25px" }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              lineHeight: "1.6",
                              color: "#495057",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "#f8f9fa",
                    borderRadius: "12px",
                  }}
                >
                  <i
                    className="fa-solid fa-search"
                    style={{
                      fontSize: "48px",
                      color: "#dee2e6",
                      marginBottom: "20px",
                    }}
                  ></i>
                  <h4 style={{ color: "#6c757d", marginBottom: "10px" }}>
                    No FAQs found
                  </h4>
                  <p style={{ color: "#6c757d", margin: 0 }}>
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="row mt-5">
            <div className="col-lg-10 mx-auto">
              <div
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #e55a2b)",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "white",
                  }}
                >
                  Still have questions?
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    marginBottom: "25px",
                    opacity: "0.9",
                  }}
                >
                  Our customer service team is here to help you with any
                  questions or concerns.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="tel:+8801758711360"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      padding: "12px 25px",
                      borderRadius: "25px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.3)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="fa-solid fa-phone"></i>
                    Call Us
                  </a>
                  <a
                    href="mailto:trendingimportbd@gmail.com"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      padding: "12px 25px",
                      borderRadius: "25px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.3)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="fa-solid fa-envelope"></i>
                    Email Us
                  </a>
                  <a
                    href="https://wa.me/8801758711360"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      padding: "12px 25px",
                      borderRadius: "25px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.3)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default FAQPage;
