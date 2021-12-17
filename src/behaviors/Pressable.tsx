import React from "react";
import { AbstractBox, PublicBoxProps, PressableBoxProps } from "../primitives/Box";

import "./pressable.css";

export type PressableProps = PublicBoxProps & PressableBoxProps;

// Something that is pressable, must also be focusable - which is why tabIndex is set to 0
// Unfortunately the focus outline is on the DOM element rendered by pressable and not the child
export const Pressable = ({children,
                           onPress, 
                           className = '', 
                           spacingSize = 'MEDIUM',
                           spacingStyle = 'INSET'}: PressableProps) => (
  <AbstractBox boxType="PRESSABLE"
               className={`pressable ${className}`}
               onPress={onPress}
               spacingSize={spacingSize}
               spacingStyle={spacingStyle}>
    {children}
  </AbstractBox>
)