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
    const modulis = await prisma.modulis.findUnique({
      where: { id: parseInt(id) },
    });

    // Check if the module is found
    if (!modulis) {
      return <div>Module not found</div>;
    }

    // Render the AddFeedbackForm component with the retrieved data
    return <AddFeedbackForm moduleId={id} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle any errors that occur during the data fetching process
    return <div>Error fetching data</div>;
  }
}
