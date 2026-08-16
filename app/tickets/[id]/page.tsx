import * as Sentry from "@sentry/nextjs";
import { getTicketById } from "@/actions/ticket.actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { priorityColor } from "@/utils/ui";

const TicketDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const ticket = await getTicketById(id);
  console.log(ticket);

  if (!ticket) {
    notFound();
  }

  Sentry.addBreadcrumb({
    message: `Viewing ticket details: ${id}`,
    category: "ticket",
    level: "info",
  });

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className=" max-w-2xl mx-auto bg-white rounded-lg shadow border-gray-200 border p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">{ticket.subject}</h1>

        <div className=" text-gray-700">
          <h2 className="text-lg font-semibold mb-2 font-roboto">
            Description
          </h2>
          <p className=" font-poppins font-medium text-[16px] capitalize">
            {ticket.description}
          </p>
        </div>

        <div className=" text-gray-700">
          <h2 className="text-lg font-semibold mb-2 font-roboto">Priority</h2>
          <p className={priorityColor(ticket.priority)}>{ticket.priority}</p>
        </div>

        <div className=" text-gray-700">
          <h2 className="text-lg font-semibold mb-2 font-roboto">Created At</h2>
          <p className="text-[17px] font-normal font-poppins">
            {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        <Link
          href={"/tickets"}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-poppins font-medium"
        >
          Back to Tickets
        </Link>
      </div>
    </div>
  );
};

export default TicketDetails;
