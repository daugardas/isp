import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import AddFeedbackForm from "./AddFeedbackForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Wrap the asynchronous logic inside a try-catch block
  try {
    // Retrieve session information
    const session = await auth();

    // Check if the user is authenticated
    if (!session || !session.user) {
      // Use the correct method for redirection
      redirect("/");
    }

    // Retrieve module information
    const destytojas = await prisma.destytojas.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if the module is found
    if (!destytojas) {
      return <div>Destytojas not found</div>;
    }


    // Render the AddFeedbackForm component with the retrieved data
    return <AddFeedbackForm tutorId={id} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle any errors that occur during the data fetching process
    return <div>Error fetching data</div>;
  }
}
