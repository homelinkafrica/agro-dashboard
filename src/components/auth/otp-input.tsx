"use client";

import { useRef, useState } from "react";

const LENGTH = 6;

export function OtpInput({ error }: { error?: string[] }) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function setDigit(index: number, value: string) {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleChange(index: number, rawValue: string) {
    const value = rawValue.replace(/\D/g, "");

    if (value.length > 1) {
      // Handles pasting a full code into one box.
      const pasted = value.slice(0, LENGTH).split("");
      setDigits((prev) => {
        const next = [...prev];
        pasted.forEach((digit, i) => {
          if (index + i < LENGTH) next[index + i] = digit;
        });
        return next;
      });
      const nextIndex = Math.min(index + pasted.length, LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    setDigit(index, value);
    if (value && index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const code = digits.join("");

  return (
    <div>
      <input type="hidden" name="code" value={code} readOnly />
      <div className="flex justify-between gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={LENGTH}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            aria-label={`Digit ${index + 1}`}
            className="h-12 w-12 rounded-lg border border-zinc-300 text-center text-lg font-semibold text-zinc-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
        ))}
      </div>
      {error?.map((message) => (
        <p key={message} className="mt-1.5 text-sm text-red-600">
          {message}
        </p>
      ))}
    </div>
  );
}
