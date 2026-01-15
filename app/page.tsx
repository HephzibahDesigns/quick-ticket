import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col text-center items-center  justify-center min-h-screen">
      <FaTicketAlt size={60} className=" mb-4 text-red-500" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600 font-poppins ">
        Quick Ticket
      </h1>
      <p className="text-lg text-gray-600 mb-8 font-roboto">
        Fast and simple support ticket management system
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide opacity-0">
        <Link
          href="/tickets/new"
          className=" bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition font-medium font-poppins"
        >
          Submit a Tickets
        </Link>

        <Link
          href="/tickets"
          className=" bg-blue-300 text-gray-700 px-6 py-3 rounded-md shadow hover:bg-blue-200 transition font-medium font-poppins"
        >
          View Tickets
        </Link>
      </div>
    </div>
  );
}
