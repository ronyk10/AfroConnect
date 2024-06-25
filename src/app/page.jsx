"use client";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  shieldCheckmarkOutline,
  alertCircleOutline,
  chatboxEllipsesOutline,
  atOutline,
  checkmarkCircle,
  arrowForward,
  logoInstagram,
  logOutOutline,
} from "ionicons/icons";
import ContactForm from "@/components/ContactForm";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

export default function Page() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      let fetchedArticles = await fetch("/api/article").then((res) =>
        res.json(),
      );
      fetchedArticles = fetchedArticles
        .splice(fetchedArticles.length - 3, 3)
        .reverse();
      setArticles(fetchedArticles);
    })();
  }, []);

  return (
    <>
      {/*<pre>{`${user ? JSON.stringify(user) : null}`}</pre>*/}

      <main>
        <article>
          <section className="hero" id="home">
            <div className="container">
              <p className="section-subtitle">
                <Image
                  src="/images/subtitle-img-white.png"
                  width="32"
                  height="7"
                  alt="Wavy line"
                />

                <span>Bienvenue sur AfroConnect</span>
              </p>

              <h2 className="h1 hero-title">
                Célébrez dignement <strong>vos racines</strong>
              </h2>

              <p className="hero-text">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Nous méritons tous de savoir d'où nous venons. Faisons perdurer
                nos cultures et nos traditions.
              </p>

              <button className="btn btn-primary">
                <span>Découvrir</span>

                <IonIcon icon={heartOutline} aria-hidden="true"></IonIcon>
              </button>
            </div>
          </section>

          <section className="section features">
            <div className="container">
              <ul className="features-list">
                <li className="features-item flex">
                  <div className="item-icon">
                    <IonIcon icon={shieldCheckmarkOutline}></IonIcon>
                  </div>
                  <div>
                    <div>
                      <h3 className="h4 item-title">Informations vérifiées</h3>
                    </div>
                    <p className="item-text">
                      Les informations que vous trouverez sur notre plateforme
                      sont vérifiées et fiables.
                    </p>
                  </div>
                </li>

                <li className="features-item">
                  <div className="item-icon">
                    <IonIcon icon={alertCircleOutline}></IonIcon>
                  </div>

                  <div>
                    <h3 className="h4 item-title">Mise à jour régulière</h3>

                    <p className="item-text">
                      Nous mettons à jour régulièrement notre site pour vous
                      fournir des informations récentes.
                    </p>
                  </div>
                </li>

                <li className="features-item">
                  <div className="item-icon">
                    <IonIcon icon={chatboxEllipsesOutline}></IonIcon>
                  </div>

                  <div>
                    <h3 className="h4 item-title">Forum</h3>

                    <p className="item-text">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Discutez avec d'autres membres de la communauté et
                      partagez vos expériences.
                    </p>
                  </div>
                </li>

                <li className="features-item">
                  <div className="item-icon">
                    <IonIcon icon={atOutline}></IonIcon>
                  </div>

                  <div>
                    <h3 className="h4 item-title">Newsletter</h3>

                    <p className="item-text">
                      Restez informé des dernières actualités et événements en
                      vous abonnant à notre newsletter.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="section about" id="about">
            <div className="container">
              <div className="about-banner">
                <h2 className="deco-title">About Us</h2>
                <Image
                  src="/images/deco-img.png"
                  width="58"
                  height="261"
                  alt=""
                  className="deco-img"
                />

                <div className="banner-row">
                  <div className="banner-col">
                    <Image
                      src="/images/about-banner-2.png"
                      width="315"
                      height="380"
                      loading="lazy"
                      alt="Désert du Maroc"
                      className="about-img w-100"
                    />

                    <Image
                      src="/images/about-banner-1.png"
                      width="386"
                      height="250"
                      loading="lazy"
                      alt="Village Maasai"
                      className="about-img about-img-2 w-100"
                    />
                  </div>

                  <div className="banner-col">
                    <Image
                      src="/images/about-banner-3.png"
                      width="250"
                      height="277"
                      loading="lazy"
                      alt="Musée égyptien"
                      className="about-img about-img-3 w-100"
                    />

                    <Image
                      src="/images/about-banner-4.png"
                      width="315"
                      height="380"
                      loading="lazy"
                      alt="Boulders Beach, Afrique du Sud"
                      className="about-img w-100"
                    />
                  </div>
                </div>
              </div>

              <div className="about-content">
                <p className="section-subtitle">
                  <Image
                    src="/images/subtitle-img-green.png"
                    width="32"
                    height="7"
                    alt="Wavy line"
                  />

                  <span>Pourquoi AfroConnect ?</span>
                </p>

                <h2 className="h2 section-title">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Accéder à l'information pour{" "}
                  <strong>préserver nos racines</strong>
                </h2>

                <ul className="tab-nav">
                  <li>
                    <button className="tab-btn active">Notre Mission</button>
                  </li>
                </ul>

                <div className="tab-content">
                  <p className="section-text">
                    Notre origine est notre force. AfroConnect est une
                    plateforme qui a pour but de vous aider à mieux connaître
                    vos racines et à les préserver. Nous croyons que la culture
                    et les traditions sont des éléments essentiels de notre
                    identité. C&amp;est pourquoi nous mettons tout en oeuvre
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    pour donner accès à l'information et aux ressources
                    nécessaires pour préserver notre héritage.
                  </p>

                  <ul className="tab-list">
                    <li className="tab-item">
                      <div className="item-icon">
                        <IonIcon icon={checkmarkCircle}></IonIcon>
                      </div>

                      <p className="tab-text">Education pour tous</p>
                    </li>

                    <li className="tab-item">
                      <div className="item-icon">
                        <IonIcon icon={checkmarkCircle}></IonIcon>
                      </div>

                      <p className="tab-text">Cultiver la diversité</p>
                    </li>

                    <li className="tab-item">
                      <div className="item-icon">
                        <IonIcon icon={checkmarkCircle}></IonIcon>
                      </div>

                      <p className="tab-text">Partager notre richesse</p>
                    </li>

                    <li className="tab-item">
                      <div className="item-icon">
                        <IonIcon icon={checkmarkCircle}></IonIcon>
                      </div>

                      <p className="tab-text">Préserver notre héritage</p>
                    </li>
                  </ul>

                  <button className="btn btn-secondary">
                    <span>Découvrir</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="section cta">
            <div className="container">
              <div className="cta-content">
                <h2 className="h2 section-title">
                  Soyez au courant de nos dernières actualités et événements
                </h2>

                <button className="btn btn-outline">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>S'inscrire à la newsletter</span>
                </button>
              </div>
              <figure className="cta-banner">
                <Image
                  src="/images/cta-banner.jpg"
                  width="520"
                  height="228"
                  loading="lazy"
                  alt="Renard du Cap"
                  className="img-cover"
                />
              </figure>
            </div>
          </section>

          <section
            className="section service"
            id="service"
            style={{ backgroundImage: 'url("/images/service-map.png")' }}
          >
            <div className="container">
              <p className="section-subtitle">
                <Image
                  name={"subtitle-img-green.png"}
                  src="/images/subtitle-img-green.png"
                  width="32"
                  height="7"
                  alt="Wavy line"
                />
                <span>Découvrir nos articles</span>
              </p>
              <h2 className="h2 section-title">
                Soyez <strong>curieux</strong>
              </h2>
              <ul className="service-list">
                {articles.length > 0 ? (
                  articles.map((article) => {
                    return (
                      <li key={article.id}>
                        <ServiceCard
                          id={article.id}
                          title={article.title}
                          description={article.content}
                          imageUrl={article.imageURL}
                        />
                      </li>
                    );
                  })
                ) : (
                  <>Pas d'articles</>
                )}
              </ul>
            </div>
            <br />
            <a href="/article" className="btn-link">
              <span>Découvrez-les tous</span>
              <IonIcon icon={arrowForward} aria-hidden="true"></IonIcon>
            </a>
          </section>
          <section className="testi">
            <div className="testi-content">
              <p className="section-subtitle">
                <Image
                  src="/images/subtitle-img-green.png"
                  width="32"
                  height="7"
                  alt="Wavy line"
                />
                <span>Témoignage</span>
              </p>
              <h2 className="h2 section-title">
                Que disent les gens à propos de{" "}
                <strong>notre plateforme ?</strong>
              </h2>
              <div className="testi-card">
                <figure className="card-avatar">
                  <Image
                    src="/images/testi-avatar.png"
                    width="60"
                    height="60"
                    loading="lazy"
                    alt="Avatar"
                    className="rounded"
                  />
                </figure>
                <div>
                  <blockquote className="testi-text">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    "AfroConnect m'a permis de redécouvrir la Côte d'Ivoire, mon{" "}
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    pays d'origine. Je comprends beaucoup mieux certains aspects{" "}
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    de ma culture et de mes traditions. Merci à toute l'équipe{" "}
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    pour ce travail formidable."
                  </blockquote>
                  <h3 className="testi-name">Awa O.</h3>
                  <p className="testi-title">Etudiante en communication</p>
                </div>
              </div>
            </div>
            <figure className="testi-banner">
              <Image
                src="/images/testi-banner.jpg"
                width="960"
                height="846"
                loading="lazy"
                alt="Rhinoceros"
                className="img-cover"
              />
            </figure>
          </section>

          <section className="section partner">
            <div className="container">
              <a href="#" className="partner-logo">
                <Image
                  src="/images/partner-2.png"
                  width="163"
                  height="55"
                  loading="lazy"
                  alt="Non Profit Agency"
                  className="gray"
                />
                <Image
                  src="/images/partner-2-active.png"
                  width="163"
                  height="55"
                  loading="lazy"
                  alt="Non Profit Agency"
                  className="color"
                />
              </a>

              <a href="#" className="partner-logo">
                <Image
                  src="/images/partner-4.png"
                  width="169"
                  height="58"
                  loading="lazy"
                  alt="Helping"
                  className="gray"
                />

                <Image
                  src="/images/partner-4-active.png"
                  width="169"
                  height="58"
                  loading="lazy"
                  alt="Helping"
                  className="color"
                />
              </a>
            </div>
          </section>

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
                Une question ? Une recommandation ?
                <strong>Nous sommes là</strong>
              </h2>

              <ul className="event-list">
                <ContactForm />
              </ul>
            </div>
          </section>

          <section className="insta-post">
            <ul className="insta-post-list">
              <li className="insta-post-item">
                <a href="#" className="insta-post-link">
                  <Image
                    src="/images/insta-1.jpg"
                    width="320"
                    height="300"
                    loading="lazy"
                    alt="Lion"
                    className="img-cover"
                  />

                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>

              <li className="insta-post-item">
                <a href="#" className="insta-post-link">
                  <Image
                    src="/images/insta-2.jpg"
                    width="320"
                    height="300"
                    loading="lazy"
                    alt="Deer"
                    className="img-cover"
                  />

                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>

              <li className="insta-post-item">
                <a href="#" className="insta-post-link">
                  <Image
                    src="/images/insta-3.jpg"
                    width="320"
                    height="300"
                    loading="lazy"
                    alt="Wild Bear"
                    className="img-cover"
                  />

                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>

              <li className="insta-post-item">
                <a href="#" className="insta-post-link">
                  <Image
                    src="/images/insta-4.jpg"
                    width="320"
                    height="300"
                    loading="lazy"
                    alt="Deer"
                    className="img-cover"
                  />

                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>

              <li className="insta-post-item">
                <a href="#" className="insta-post-link">
                  <Image
                    src="/images/insta-5.jpg"
                    width="320"
                    height="300"
                    loading="lazy"
                    alt="Horses"
                    className="img-cover"
                  />

                  <IonIcon icon={logoInstagram}></IonIcon>
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
