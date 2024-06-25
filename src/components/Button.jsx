import React from "react";
import Link from "next/link";

const Button = ({ text, link }) => {
  return (
    <Link href={link}>
      <p className="btn min-w-[10vw] justify-center">{text}</p>
    </Link>
  );
};

export default Button;
