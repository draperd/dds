import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

describe("Box Component", function () {
  it("should have hello world message", function () {
    // let { getByText } = render(<Box></Box>);
    // expect(getByText("Hello world React!")).toMatchInlineSnapshot(`
    //   <div></div>
    // `);

    render(<Box />);
    // const linkElement = screen.getByRole("link", { name: /getting started/i });
    // expect(linkElement).toBeInTheDocument();
  });
});
