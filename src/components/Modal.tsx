"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, MouseEventHandler, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dismissModal = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissModal();
      }
    },
    [dismissModal]
  );

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlayRef.current && dismissModal) {
        dismissModal();
      }
    },
    [dismissModal, overlayRef]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlayRef}
      onClick={onClick}
      className="fixed w-screen h-screen flex bg-zinc-950 bg-opacity-90 z-40 justify-center items-center"
    >
      <div className="z-50">{children}</div>
    </div>
  );
}
