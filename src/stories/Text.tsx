import React from 'react';
import './text.css';

interface TextProps {
  content: string
}


export const Text = ({
  content
}: TextProps) => {
   return (
    <span className="text">{content}</span>
  );
};
