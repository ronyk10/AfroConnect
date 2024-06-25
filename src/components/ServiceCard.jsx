import React from "react";
import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ id, imageUrl, title, description }) => {
  return (
    <div className="service-card flex flex-col min-w-[10vw] h-[50vh] w-[20vw]">
      <div className="flex rounded-xl min-h-[15vh] relative">
        <Image
          src={
            /(https?:\/\/.*\.)/i.test(imageUrl)
              ? imageUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdRuJUbPqVl4sn1M5J58ZdG8jDbJw-JEXxg&s"
          }
          alt={""}
          className="aspect-[16/9] object-contain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="h3 justify-center flex flex-wrap break-words card-title">
        {title}
      </h3>
      <p className="card-text h-full line-clamp-3 min-h-[5vh] pv-2 justify-center flex flex-wrap break-words ">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {description}
      </p>
      <Link
        href={`/article/${id}`}
        className="flex h-[20vh] items-end justify-center "
      >
        <div className="flex flex-row items-center underline underline-offset-4">
          <span>Lire la suite</span>
          <IonIcon icon={arrowForward} aria-hidden="true"></IonIcon>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
