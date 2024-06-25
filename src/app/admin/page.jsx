import Link from "next/link";
import Button from "@/components/Button";

const Page = () => {
  return (
    <div className="m-5 flex flex-col gap-10 justify-center items-center w-full">
      <Button text="Create Article" link="/admin/article/create" />
    </div>
  );
};

export default Page;
