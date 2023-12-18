import RemoveTutorForm from "./RemoveTutorForm";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  console.log("Page.tsx");
  console.log("tutorId:", id);

  // Check if moduleId is available
  if (!id) {
    console.error("tutorId is not provided!");
    return <div>Error: tutorId is not provided!</div>;
  }

  return <RemoveTutorForm tutorId={id} />;
}
