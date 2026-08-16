"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // function to apply active styles
  const isActive = (path: string) =>
    pathname === path
      ? "text-blue-600"
      : "text-gray-700 transition hover:text-blue-600";
  return (
    <div className=" bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-bold text-blue-600">
          Quick Ticket
        </Link>
      </div>

      <div className="flex items-center space-x-6 font-poppins font-medium">
        <Link href="/tickets/new" className={`${isActive("/tickets/new")}`}>
          New Ticket
        </Link>

        <Link href="/tickets" className={`${isActive("/tickets")}`}>
          My Tickets
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
