import { getTickets } from "@/actions/ticket.actions";
import Link from "next/link";

const ViewTicketsPage = async () => {
  const tickets = await getTickets();

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold";
      case "Medium":
        return "text-yellow-600 font-semibold";
      case "Low":
        return "text-green-600 font-semibold";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 sm:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-8 text-center font-poppins">
        Support Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className="text-center font-medium text-gray-400 text-lg sm:text-xl font-roboto">
          No Tickets Found
        </p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6 gap-4"
            >
              {/* Left */}
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-medium text-blue-600 font-poppins">
                  {ticket.subject}
                </h2>
              </div>

              {/* Right */}
              <div className="text-center sm:text-right space-y-2">
                <div className="text-sm sm:text-md font-roboto text-gray-500">
                  Priority:{" "}
                  <span className={priorityColor(ticket.priority)}>
                    {ticket.priority}
                  </span>
                </div>

                <Link
                  href={`/tickets/${ticket.id}`}
                  className="block sm:inline-block w-full sm:w-auto bg-blue-500 rounded-md text-sm px-4 py-2 hover:bg-blue-700 transition font-medium font-poppins text-white text-center"
                >
                  View Ticket
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTicketsPage;
