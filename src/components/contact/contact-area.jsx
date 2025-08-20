import React from "react";
import Image from "next/image";
// internal
import ContactForm from "../forms/contact-form";
import contact_icon_1 from "@assets/img/contact/contact-icon-1.png";
import contact_icon_2 from "@assets/img/contact/contact-icon-2.png";
import contact_icon_3 from "@assets/img/contact/contact-icon-3.png";

const ContactArea = () => {
  return (
    <>
      <section className="tp-contact-area pb-100">
        <div className="container">
          <div className="tp-contact-inner">
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-contact-wrapper">
                  <h3 className="tp-contact-title">Sent A Message</h3>

                  <div className="tp-contact-form">
                    {/* form start */}
                    <ContactForm />
                    {/* form end */}
                    <p className="ajax-response"></p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="tp-contact-info-wrapper">
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_1} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p data-info="mail">
                        <a href="mailto:trendingimportbd@gmail.com">
                          trendingimportbd@gmail.com
                        </a>
                      </p>
                      <p data-info="phone">
                        <a href="tel:+8801758711360">+880 1758-711360</a>
                      </p>
                    </div>
                  </div>
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_2} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <p>
                        <a
                          href="https://www.google.com/maps/place/Mirpur,+Dhaka,+Bangladesh/@23.8103,90.3535,13z/data=!3m1!4b1!4m6!3m5!1s0x3755c14c8682a473:0x6208b9f0ba5316f4!8m2!3d23.8103!4d90.4125!16zL20vMDZfaDNj"
                          target="_blank"
                        >
                          House# 15, Road# 7, Block# C <br /> Mirpur-1,
                          Dhaka-1216 <br />
                          Bangladesh
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="tp-contact-info-item">
                    <div className="tp-contact-info-icon">
                      <span>
                        <Image src={contact_icon_3} alt="contact-icon" />
                      </span>
                    </div>
                    <div className="tp-contact-info-content">
                      <div className="tp-contact-social-wrapper mt-5">
                        <h4 className="tp-contact-social-title">
                          Find on social media
                        </h4>

                        <div className="tp-contact-social-icon">
                          <a
                            href="https://www.facebook.com/share/1AAaKQbVMJ/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                          <a
                            href="https://www.instagram.com/trendingimportbd/profilecard/?igsh=MTN5OWkxaWlmeDg0aw=="
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                          <a
                            href="https://wa.me/8801758711360"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                          <a
                            href="https://www.youtube.com/@trendingimportbd"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
