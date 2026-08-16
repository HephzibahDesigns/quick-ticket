"use server";

import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// create ticket form actions
export const createTicket = async (
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    if (!subject || !description || !priority) {
      Sentry.captureMessage("validation Error: Missing ticket fields");
      return { success: false, message: "All Fields are required" };
    }

    // create ticket using prisma
    const ticket = await prisma.ticket.create({
      data: { subject, description, priority },
    });

    // describes the ticket created in sentry
    Sentry.addBreadcrumb({
      category: "ticket",
      message: `Ticket was created: ${ticket.id}`,
      level: "info",
    });

    // message is sent to sentry when a ticket is created successfully
    Sentry.captureMessage(`Ticket was created successfully: ${ticket.id}`);

    // it would list all our tickets that has been created
    revalidatePath("/tickets");

    return { success: true, message: "Ticket created Successfully" };
  } catch (error) {
    Sentry.captureException(error as Error);
    return {
      success: false,
      message: "An Error occured while creating the ticket",
    };
  }
};

// get tickets actions
export const getTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return tickets;
  } catch (error) {
    Sentry.captureException(error as Error);
    return [];
  }
};

// get each of the tickets by id
export const getTicketById = async (id: string) => {
  try {
    const ticketId = await prisma.ticket.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!ticketId) {
      Sentry.addBreadcrumb({
        message: `Ticket Not Found: ${id}`,
        category: "ticket",
        level: "warning",
      });
    }

    return ticketId;
  } catch (error) {
    Sentry.addBreadcrumb({
      message: `Error Fetching ticket details: ${id}`,
      category: "ticket",
      level: "error",
    });
    return;
  }
};
