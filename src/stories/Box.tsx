import React from 'react';
import './box.css';


type SpacingStyle = 'INSET' | 'STACK' | 'INLINE' | 'SQUISHED-INSET';
type SpacingSize = 'SMALL' | 'MEDIUM';

interface BoxProps {
  

  // Rather than defining components individually, these could just be properties of box for now
  // We might want to export a component that sets this property
  spacingStyle?: SpacingStyle,

  spacingSize?: SpacingSize,

  children?: React.ReactNode
}

// interface GetSpacing {
//   spacing: spacing;
// };

const cssPrefix = 'box-';

type GetSpacingClassNamesArgs = {
  spacingStyle: SpacingStyle,
  spacingSize: SpacingSize
}

// This is a bit of a short cut and we'd want unit tests for this!
export const getSpacingClassNames = ({spacingStyle, spacingSize}: GetSpacingClassNamesArgs) => {
  return `box-defaults ${cssPrefix}${spacingStyle.toLowerCase()}-${spacingSize.toLowerCase()}`
}

/**
 * Primary UI component for user interaction
 */
export const Box = ({
  spacingStyle = 'INSET',
  spacingSize = 'MEDIUM',
  children
}: BoxProps) => {
  // const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  // We need to select the appropriate styling for the spacing type... so we need to evaluate the property
  // Should this be CSS or directly set style?
  // Ideally we want to use CSS here because it should reduce DOM size and be more efficient

  const spacingClassNames = getSpacingClassNames({spacingStyle, spacingSize});
  return (
    <div className={spacingClassNames}
      // type="button"
      // className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      // style={{ backgroundColor }}
      // {...props}
    >
      {children}
    </div>
  );
};
