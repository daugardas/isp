import RemoveModuleForm from './RemoveModuleForm';

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id} = params;
  console.log('Page.tsx');
  console.log('moduleId:', id);

  // Check if moduleId is available
  if (!id) {
    console.error('moduleId is not provided!');
    return <div>Error: moduleId is not provided!</div>;
  }

  return <RemoveModuleForm moduleId={id} />;
}
