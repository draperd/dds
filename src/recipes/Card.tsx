import React from "react";

import { Pressable } from "../behaviors/Pressable";
import { Box } from "../primitives/Box";
import { Button } from "./Button";
import { Inline } from "../primitives/Inline";
import { Pill } from "./Pill";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import "./card.css";

interface CardProps {
  type: string;
  title: string;
  description: string;
  tags?: string[];
}

const onPress = () => {
  console.log("Clicked on card!");
};

const onButtonPress = () => {
  console.log("Clicked on button!");
};

export const Card = ({ type, title, description, tags = [] }: CardProps) => (
  <Stack className="card">
    <Pressable onPress={onPress} spacingStyle="FLUSH">
      <Box spacingStyle="INSET">
        <Stack>
          <Text content={type}></Text>
          <Stack spacingSize="SMALL">
            <Text typographyStyle="HEADING" content={title}></Text>
            <Text content={description}></Text>
          </Stack>
          <Inline spacingSize="SMALL" wrapContent={true}>
            {tags.map((tag) => (
              <Pill key={tag} content={tag}></Pill>
            ))}
          </Inline>
          <Button label="View" onPress={onButtonPress}></Button>
        </Stack>
      </Box>
    </Pressable>
  </Stack>
);
