interface EmailRequestConfirmTemplateProps {
  firstName: string;
  confirmCode: string;
}

export default function EmailRequestConfirmTemplate({
  firstName,
  confirmCode,
}: Readonly<EmailRequestConfirmTemplateProps>) {
  return (
    <div>
      <h1>Informacinės sistema Forumas</h1>
      <p>Sveiki, {firstName}!</p>
      <p>
        Jūsų patvirtinimo kodas:{" "}
        <span style={{ fontWeight: "bold" }}>{confirmCode}</span>
      </p>
    </div>
  );
}
