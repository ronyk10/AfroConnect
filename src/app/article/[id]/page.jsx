"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [country, setCountry] = useState("");
  const [theme, setTheme] = useState("");
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [needToBeSorted, setNeedToBeSorted] = useState(false);
  const [legend, setLegend] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const article = await fetch(`/api/article/${params.id}`).then((res) =>
        res.json(),
      );
      setTitle(article.title);
      setCountry(article.country.name);
      setContent(article.content);
      setTheme(article.theme.name);
      setImageURL(article.imageURL);
      setLegend(article.legend);
      const comments = await fetch(`/api/article/${params.id}/comment`).then(
        (res) => res.json(),
      );
      setComments(
        comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
      const { user } = await fetch("/api/login").then(
        (res) => res?.json() ?? "false",
      );
      if (typeof user == "string") setUser(JSON.parse(user));
    })();
  }, []);

  useEffect(() => {
    if (!needToBeSorted) return;
    (async () => {
      const newComments = await fetch(`/api/article/${params.id}/comment`).then(
        (res) => res.json(),
      );
      setComments(
        newComments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      );
      setNeedToBeSorted(false);
    })();
  }, [comments, needToBeSorted]);

  return (
    <div className="bg-white w-full min-h-screen">
      <Link
        className="m-5 flex flex-row underline-offset-4 underline h-fit items-center"
        href={"/article"}
      >
        <IonIcon icon={arrowBack} />
        Back to menu
      </Link>
      <div id="EMAIL_CONTAINER" className="w-full">
        <div className="mx-auto max-w-2xl w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="h-5"></td>
              </tr>
              <tr>
                <td className="h-3.5 w-full bg-black"></td>
              </tr>
              <tr>
                <td className="h-5"></td>
              </tr>
            </tbody>
          </table>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-center">
                  <Image
                    width={500}
                    height={500}
                    className="inline-block w-5/6 max-w-xl h-auto pt-4"
                    src={
                      /(https?:\/\/.*\.)/i.test(imageURL)
                        ? imageURL
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdRuJUbPqVl4sn1M5J58ZdG8jDbJw-JEXxg&s"
                    }
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td className="text-center w-full pt-1 pb-5 leading-3">
                  <span className="inline-block w-5/6 max-w-xl text-right">
                    <span className="m-0 text-[11px] leading-[11px] font-georgia text-gray-500 pl-0">
                      {legend}
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 className="text-black font-bold text-[31px] leading-[34px] font-nyt-cheltenham m-0 mb-2.5">
            {title}
          </h1>
          <p className="font-normal text-lg leading-[25px] font-georgia text-gray-800 m-0 mb-3.5">
            {content}
          </p>
          <p className="font-normal text-lg leading-[25px] font-georgia text-gray-800 m-0 mb-3.5">
            TAGS: {country} - {theme}
          </p>
          <div className="mt-8">
            <h2 className="text-black font-bold text-2xl mb-4">Comments</h2>
            <div className="mb-4">
              <input
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Add a comment"
              />
              <button
                onClick={() => {
                  setCommentContent("");
                  if (!user) router.push("/login");
                  fetch(`/api/article/${params.id}/comment`, {
                    method: "POST",
                    body: JSON.stringify({ content: commentContent }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(async () => {
                    setNeedToBeSorted(true);
                  });
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                Post Comment
              </button>
            </div>
            <div className="border-t border-gray-300 pt-4">
              {comments &&
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-4 flex flex-row justify-between"
                  >
                    <div className="">
                      <p className="font-bold">{comment.author.username}</p>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    {user?.role === "ADMIN" && (
                      <button
                        onClick={() => {
                          fetch(`/api/article/${params.id}/comment`, {
                            method: "DELETE",
                            body: JSON.stringify({ id: comment.id }),
                          }).then((res) => {
                            setNeedToBeSorted(true);
                            return res.json();
                          });
                        }}
                        className="bg-red-500 text-white w-1/6 p-2 rounded-md"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
