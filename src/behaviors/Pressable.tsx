import React, { KeyboardEvent } from "react";

import "./pressable.css";

interface PressableProps {
  onClick?: Function,
  children: React.ReactNode
}

const handleClick = () => alert('Clicked!');

// Not sure about this function, but it's demo worthy enough
const handleKeyPress = (evt: KeyboardEvent) => {
    if (evt.code === 'Enter') {
        alert('Key Press!');
        evt.stopPropagation();
    }
}

// Something that is pressable, must also be focusable - which is why tabIndex is set to 0
// Unfortunately the focus outline is on the DOM element rendered by pressable and not the child

export const Pressable = ({children}: PressableProps) => (
  <div role="button" tabIndex={0} className="pressable" onClick={handleClick} onKeyPress={handleKeyPress}>
    {children}
  </div>
)
