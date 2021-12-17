import React from 'react';
import { SpacingSize, SpacingStyle } from '../foundations/Spacing';
import './box.css';

// This defines the different types that we think a box could be
// - layout = no behaviour
// - focusable = can be given focus
// - pressable = can be given focus and responds to mouse click or enter key events (do we want to consider other keys to trigger an event?)
export type BoxType = 'LAYOUT' | 'FOCUSABLE' | 'PRESSABLE';

export interface PressHandler {(): void};

// The abstract interface extending the concrete implementation looks weird, but we want to constrain
export type AbstractBoxProps = PrivateBoxProps & PublicBoxProps & PressableProps;

export interface PressableProps {
  onPress?: PressHandler,
}

// These are props that we DON'T want to expose for public use
// No component should declare these for use
export type PrivateBoxProps = {
  boxType?: BoxType,
}

export interface PublicBoxProps {
  // Rather than defining components individually, these could just be properties of box for now
  // We might want to export a component that sets this property
  spacingStyle?: SpacingStyle,
  spacingSize?: SpacingSize,
  children?: React.ReactNode
  className?: string
}

export type PressableBoxProps = BoxProps & PressableProps;

export type BoxProps = PublicBoxProps;

const cssPrefix = 'box-';

type GetSpacingClassNamesArgs = {
  className: string,
  spacingStyle: SpacingStyle,
  spacingSize: SpacingSize
}

// This is a bit of a short cut and we'd want unit tests for this!
export const getSpacingClassNames = ({className, spacingStyle, spacingSize}: GetSpacingClassNamesArgs) => {
  return `${cssPrefix}defaults ${cssPrefix}${spacingStyle.toLowerCase()} ${cssPrefix}${spacingStyle.toLowerCase()}-${spacingSize.toLowerCase()} ${className}`
}

export type OnClickHandlerArgs = {
  evt: React.MouseEvent<HTMLElement>, 
  onPress: PressHandler | undefined
}

export const handleClick = ({evt, onPress}: OnClickHandlerArgs) => {
    evt.stopPropagation();
    evt.preventDefault();
    if (onPress) {
      onPress();
    }
  }

export type KeyPressHandlerArgs = {
  evt: React.KeyboardEvent<HTMLElement>, 
  onPress: PressHandler | undefined
}

// Not sure about this function, but it's demo worthy enough
export const handleKeyPress = ({evt, onPress}: KeyPressHandlerArgs) => {
  if (evt.code === 'Enter') {
    alert('Key Press!');
    evt.stopPropagation();
    if (onPress) {
      onPress();
    }
  }
}

export const AbstractBox = ({
  boxType = 'LAYOUT',
  children,
  className = '',
  onPress,
  spacingSize = 'MEDIUM',
  spacingStyle = 'INSET',
}: AbstractBoxProps) => {
  
  // We need to select the appropriate styling for the spacing type... so we need to evaluate the property
  // Should this be CSS or directly set style?
  // Ideally we want to use CSS here because it should reduce DOM size and be more efficient
  const spacingClassNames = getSpacingClassNames({className, spacingStyle, spacingSize});

  switch (boxType) {
    
    case 'FOCUSABLE':
      return (
        <div tabIndex={0} className={spacingClassNames}>
          {children}
        </div>
      );

    case 'PRESSABLE':
      return (
        <div className={spacingClassNames}
             role="button" 
             tabIndex={0} 
             onClick={evt => handleClick({evt, onPress})} 
             onKeyPress={evt => handleKeyPress({evt, onPress})}>
          {children}
        </div>
      );

    default:
      return (
        <div className={spacingClassNames}>
          {children}
        </div>
      );
  }
};


// Box is a concrete implementation of AbstractBox
// The idea is that it is JUST a box - with not pressable or focusable behaviours
export const Box = ({
  spacingStyle = 'INSET',
  spacingSize = 'MEDIUM',
  className = '',
  children
}: BoxProps) => (
  <AbstractBox className = {className} spacingStyle={spacingStyle} spacingSize={spacingSize}>
    {children}
  </AbstractBox>
)
