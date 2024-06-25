"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");
  const [countryId, setCountryId] = useState("");
  const [themeId, setThemeId] = useState("");
  const [countries, setCountries] = useState([]);
  const [themes, setThemes] = useState([]);
  const router = useRouter();
  const fetchCountries = async () => {
    const res = await fetch("/api/country");
    const data = await res.json();
    setCountries(data);
    setCountryId(data[0].id);
  };

  const fetchThemes = async () => {
    const res = await fetch("/api/theme");
    const data = await res.json();
    setThemes(data);
    setThemeId(data[0].id);
  };

  const fetchMyArticle = async () => {
    const res = await fetch("/api/article/" + params.id);
    const article = await res.json();
    console.log(article);
    setCountryId(article.country.id);
    setThemeId(article.theme.id);
    setTitle(article.title);
    setContent(article.content);
    setImageURL(article.imageURL);
  };

  useEffect(() => {
    fetchCountries();
    fetchThemes();
    fetchMyArticle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/article/" + params.id, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
        imageURL,
        countryId,
        themeId,
      }),
    }).then((res) => {
      return res.json();
    });
    await router.push("/admin/article/create");
  };
  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Admin Panel</h1>
      <form
        id="articleForm"
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Article Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            required
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="flex  rounded-xl h-[15vh] relative">
            <Image
              src={
                /(https?:\/\/.*\.)/i.test(imageURL)
                  ? imageURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdRuJUbPqVl4sn1M5J58ZdG8jDbJw-JEXxg&s"
              }
              alt={""}
              className="aspect-[16/9] object-contain"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            rows="5"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tag1"
            className="block text-sm font-medium text-gray-700"
          >
            Pays:
          </label>
          <select
            id="tag1"
            name="tag1"
            required
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {countries.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tag2"
            className="block text-sm font-medium text-gray-700"
          >
            Theme:
          </label>
          <select
            id="tag2"
            name="tag2"
            required
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {themes.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
