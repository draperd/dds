import React from "react";
import { AbstractBox, PublicBoxProps, PressableBoxProps } from "../primitives/Box";

import "./pressable.css";

export type PressableProps = PublicBoxProps & PressableBoxProps;

// Since something that is pressable MUST have some sort of DOM element I've decided to make
// the Pressable component an instance of a Box component. This may or may not be the right approach
// to take, but it seemed more composable to do this than to create a component that attempted to
// manipulate its child components or added an additional DOM layer
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