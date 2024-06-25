"use client";
import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  chevronForwardOutline,
  closeOutline,
  logOutOutline,
  menuOutline,
} from "ionicons/icons";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { user } = await fetch("/api/login").then(
        (res) => res?.json() ?? "false",
      );
      if (typeof user == "string") setUser(JSON.parse(user));
    })();
  }, []);

  return (
    <header className="header w-full">
      <div className="container">
        <h1>
          <a href="/" className="logo">
            AfroConnect
          </a>
        </h1>

        <button className="nav-open-btn" aria-label="Open Menu">
          <IonIcon icon={menuOutline}></IonIcon>
        </button>

        <nav className="navbar">
          <button
            className="nav-close-btn"
            aria-label="Close Menu"
            data-nav-close-btn
          >
            <IonIcon icon={closeOutline}></IonIcon>
          </button>
          <a href="/" className="logo">
            AfroConnect
          </a>
          <ul className="navbar-list">
            <li>
              <a href="/" className="navbar-link">
                <span>Accueil</span>

                <IonIcon
                  icon={chevronForwardOutline}
                  aria-hidden="true"
                ></IonIcon>
              </a>
            </li>
            <li>
              <a href="/#about" className="navbar-link">
                <span>A propos</span>
                <IonIcon
                  icon={chevronForwardOutline}
                  aria-hidden="true"
                ></IonIcon>
              </a>
            </li>
            <li>
              <a href="/article" className="navbar-link">
                <span>Articles</span>
                <IonIcon
                  icon={chevronForwardOutline}
                  aria-hidden="true"
                ></IonIcon>
              </a>
            </li>
            <li>
              <a href="/contact" className="navbar-link">
                <span>Contact</span>
                <IonIcon
                  icon={chevronForwardOutline}
                  aria-hidden="true"
                ></IonIcon>
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-action">
          {user ? (
            <button
              onClick={() => fetch("/api/logout").then(() => setUser(null))}
              className="search-btn"
              aria-label="Search"
            >
              <IonIcon icon={logOutOutline}></IonIcon>
            </button>
          ) : (
            <></>
          )}

          <Link
            href={user ? (user.role === "ADMIN" ? "/admin" : "#") : "/login"}
            className="btn btn-primary min-w-[8vw] min-h-[3.8vh] justify-center items-center"
          >
            <p>{user ? user.username : "Connexion"}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
