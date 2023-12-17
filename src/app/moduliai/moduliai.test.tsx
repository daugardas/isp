// moduliai.test.tsx
import "@testing-library/jest-dom/extend-expect"; // Import to extend Jest matchers
import React from "react";
import { render, screen } from "@testing-library/react";
import Moduliai from "../page"; // Import your page component

describe("Moduliai Page", () => {
  it("should render without errors", () => {
    render(<Moduliai />);
    expect(screen.getByText("Your Page Title")); // Adjust this to match your page's content
  });

  it("should handle interactions correctly", () => {
    // Test user interactions here
  });
});
