import * as React from "react";

type BoxProps = {
  testId?: string;
};

const Box: React.FC<BoxProps> = ({ children, testId }): React.ReactElement => {
  return <div data-testid={testId}>{children}</div>;
};

export default Box;
