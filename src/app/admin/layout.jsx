import "../globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "AfroConnect Admin Panel",
};

export default function DashboardLayout({ children }) {
  return <div className="flex bg-[#282b30] min-h-screen h-fit">{children}</div>;
}
