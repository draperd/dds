import React from 'react';
import { SpacingSize, SpacingStyle } from '../foundations/Spacing';
import './box.css';

interface BoxProps {

  // Rather than defining components individually, these could just be properties of box for now
  // We might want to export a component that sets this property
  spacingStyle?: SpacingStyle,
  spacingSize?: SpacingSize,
  children?: React.ReactNode
  className?: string
}

const cssPrefix = 'box-';

type GetSpacingClassNamesArgs = {
  className: string,
  spacingStyle: SpacingStyle,
  spacingSize: SpacingSize
}

// This is a bit of a short cut and we'd want unit tests for this!
export const getSpacingClassNames = ({className, spacingStyle, spacingSize}: GetSpacingClassNamesArgs) => {
  return `${cssPrefix}defaults ${cssPrefix}${spacingStyle.toLowerCase()}-${spacingSize.toLowerCase()} ${className}`
}

export const Box = ({
  spacingStyle = 'INSET',
  spacingSize = 'MEDIUM',
  className = '',
  children
}: BoxProps) => {
  
  // We need to select the appropriate styling for the spacing type... so we need to evaluate the property
  // Should this be CSS or directly set style?
  // Ideally we want to use CSS here because it should reduce DOM size and be more efficient

  const spacingClassNames = getSpacingClassNames({className, spacingStyle, spacingSize});

  return (
    <div className={spacingClassNames}>
      {children}
    </div>
  );
};
