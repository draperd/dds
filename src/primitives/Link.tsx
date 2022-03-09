import React from "react";
import { AbstractText } from "./AbstractText";

interface LinkProps {
  content: string;
  href: string;
}

export const Link = ({ content, href }: LinkProps) => (
  <AbstractText as="a" content={content} href={href}></AbstractText>
);
