"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [themes, setThemes] = useState([]);
  const [originalArticles, setOriginalArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/article");
      const data = await res.json();
      data.reverse();
      setArticles(data);
      setOriginalArticles(data);
      const countryRes = await fetch("/api/country");
      const countryData = await countryRes.json();
      setCountry(countryData);
      const themeRes = await fetch("/api/theme");
      const themeData = await themeRes.json();
      setThemes(themeData);
    })();
  }, []);

  useEffect(() => {
    let temps = [...originalArticles];
    if (selectedCountry !== "") {
      temps = temps.filter((article) => article.country.id === selectedCountry);
    }

    if (selectedTheme !== "") {
      temps = temps.filter((article) => article.theme.id === selectedTheme);
    }

    setArticles(temps);
  }, [selectedCountry, selectedTheme]);

  return (
    <div className="flex flex-col bg-white w-full min-h-screen">
      <div className="w-fit">
        <Link
          className="m-5 flex flex-row underline-offset-4 underline h-fit items-center"
          href={"/"}
        >
          <IonIcon icon={arrowBack} />
          Back to menu
        </Link>
      </div>
      <div className="flex justify-center gap-5 items-center w-full">
        Pays :
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          <option value=""></option>
          {country.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        Theme :
        <select
          onChange={(e) => setSelectedTheme(e.target.value)}
          value={selectedTheme}
        >
          <option value=""></option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-around mt-[20px] p-[3rem] m-[3rem] gap-5">
        {articles.length > 0 ? (
          <>
            {articles.map((article) => (
              <div
                className="shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] transition  duration-[0.3s] hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.2)] rounded-xl"
                key={article.id}
              >
                <ServiceCard
                  id={article.id}
                  description={article.content}
                  imageUrl={article.imageURL}
                  title={article.title}
                />
              </div>
            ))}
          </>
        ) : (
          <>No articles</>
        )}
      </div>
    </div>
  );
};

export default Page;
