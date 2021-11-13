import React from "react";
import { render, screen } from "@testing-library/react";
import Box from "./Box";

describe("Box Component", function () {
  const buttonOneId = "button-1";
  it("should render a div with the supplied test id", function () {
    render(<Box testId={buttonOneId} />);
    screen.getByTestId(buttonOneId);
  });

  it("should render its children", function () {
    const testText = "Hello world";
    render(
      <Box>
        <span>{testText}</span>
      </Box>
    );
    screen.getByText(testText);
  });
});
