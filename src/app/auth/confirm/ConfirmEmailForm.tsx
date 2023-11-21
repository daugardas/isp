"use client";

import Form from "@/components/Form";
import { useState, useRef, useEffect } from "react";
import CodeInputElement from "./CodeInputElement";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";

export default function ConfirmEmailForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const codeInput1 = useRef<HTMLInputElement>(null);
  const codeInput2 = useRef<HTMLInputElement>(null);
  const codeInput3 = useRef<HTMLInputElement>(null);
  const codeInput4 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    codeInput1.current?.focus();
  }, []);

  useEffect(() => {
    router.prefetch("/auth/signin");
  }, [router]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") setIsBackspacePressed(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") return;
    setIsBackspacePressed(true);

    const codeInputIndex = Number(event.currentTarget.name.split("-")[2]);
    if (
      event.key === "Backspace" &&
      event.currentTarget.selectionStart === 0 &&
      event.currentTarget.value.length === 1
    ) {
      setCode((prevCode) => {
        const codeArray = prevCode.split("");
        const currentInputCode = codeArray[codeInputIndex - 1];
        codeArray[codeInputIndex - 1] = "";
        codeArray[codeInputIndex - 2] = currentInputCode;
        return codeArray.join("");
      });

      switch (codeInputIndex) {
        case 2:
          codeInput1.current?.focus();
          codeInput1.current?.setSelectionRange(0, 0);
          break;
        case 3:
          codeInput2.current?.focus();
          codeInput2.current?.setSelectionRange(0, 0);
          break;
        case 4:
          codeInput3.current?.focus();
          codeInput3.current?.setSelectionRange(0, 0);
          break;
      }

      return;
    }

    if (event.key === "Backspace") {
      setCode((prevCode) => {
        const codeArray = prevCode.split("");
        codeArray[codeInputIndex - 1] = "";
        return codeArray.join("");
      });

      switch (codeInputIndex) {
        case 1:
          codeInput1.current?.focus();
          break;
        case 2:
          codeInput1.current?.focus();
          break;
        case 3:
          codeInput2.current?.focus();
          break;
        case 4:
          codeInput3.current?.focus();
          break;
      }
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isBackspacePressed) return;
    let { name, value } = event.target;
    if (value.length === 2) value = value.charAt(1);

    if (RegExp(/[a-z]/).exec(value)) {
      value = value.toUpperCase();
    }

    setCode((prevCode) => {
      const codeArray = prevCode.split("");

      codeArray[Number(name.split("-")[2]) - 1] = value;

      return codeArray.join("");
    });

    if (value === "") {
      switch (Number(name.split("-")[2])) {
        case 1:
          codeInput1.current?.focus();
          break;
        case 2:
          codeInput1.current?.focus();
          break;
        case 3:
          codeInput2.current?.focus();
          break;
        case 4:
          codeInput3.current?.focus();
          break;
      }

      return;
    }

    if (Number(name.split("-")[2]) < 4) {
      switch (Number(name.split("-")[2])) {
        case 1:
          codeInput2.current?.focus();
          break;
        case 2:
          codeInput3.current?.focus();
          break;
        case 3:
          codeInput4.current?.focus();
          break;
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting code");
    setLoading(true);

    const response = await fetch("/api/auth/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Successfully confirmed email");
      console.log(data);
    } else {
      console.log("Failed to confirm email");
      console.log(data);
    }

    if (data.message) setMessage(data.message);
    setLoading(false);

    // time out for a few seconds and then reroute to signin
    setTimeout(() => {
      router.push("/auth/signin");
    }, 1000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2">
        <CodeInputElement
          inputRef={codeInput1}
          name="code-letter-1"
          value={code.charAt(0)}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          minLength={1}
          maxLength={2}
          disabled={loading}
        />
        <CodeInputElement
          inputRef={codeInput2}
          name="code-letter-2"
          value={code.charAt(1)}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          minLength={1}
          maxLength={2}
          disabled={loading}
        />
        <CodeInputElement
          inputRef={codeInput3}
          name="code-letter-3"
          value={code.charAt(2)}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          minLength={1}
          maxLength={2}
          disabled={loading}
        />
        <CodeInputElement
          inputRef={codeInput4}
          name="code-letter-4"
          value={code.charAt(3)}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          minLength={1}
          maxLength={2}
          disabled={loading}
        />
      </div>
      <SubmitButton type="submit" disabled={loading}>
        Patvirtinti
      </SubmitButton>
      {message && <p className="text-red-500 text-lg text-center">{message}</p>}
    </Form>
  );
}
