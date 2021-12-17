import React from 'react';

import { Card } from '../recipes/Card';
import { Dialog } from "../recipes/Dialog";
import { Inline } from '../primitives/Inline';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Spread } from '../primitives/Spread';
import './page.css';
interface PageProps {
  
}

const description: string =
  "An astronomical event that occurs during the last stages of a massive star's life.";

export const Page = ({  }: PageProps) => (
  <Stack>
    <Inline>
        <Card type="VIDEO" 
          title="Supernova" 
          description={description}
          tags={["Galaxies", "Milky Way", "Speed of Light"]}></Card>
        <Card type="AUDIO" 
          title="Supernova" 
          description={description}
          tags={["Galaxies", "Milky Way"]}></Card>
    </Inline>
    <Dialog></Dialog>
    <Spread>
      <Inline alignment='LEFT'>
        <Text content='LEFT'></Text>
      </Inline>
      <Inline alignment='RIGHT'>
        <Text content='RIGHT'></Text>
      </Inline>
    </Spread>
  </Stack>
  
);
