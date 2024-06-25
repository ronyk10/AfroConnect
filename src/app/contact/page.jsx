"use client";
import React from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

const Page = () => {
  return (
    <section className="section event" id="contact">
      <div className="container">
        <p className="section-subtitle">
          <Image
            src="/images/subtitle-img-green.png"
            width="32"
            height="7"
            alt="Wavy line"
          />

          <span>Nous contacter</span>

          <Image
            src="/images/subtitle-img-green.png"
            width="32"
            height="7"
            alt="Wavy line"
          />
        </p>

        <h2 className="h2 section-title">
          Une question ? Une recommandation ?<strong>Nous sommes là</strong>
        </h2>

        <ul className="event-list">
          <ContactForm />
        </ul>
      </div>
    </section>
  );
};

export default Page;
