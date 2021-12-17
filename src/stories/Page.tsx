import React from 'react';

import { Card } from '../recipes/Card';
import { Dialog } from "../recipes/Dialog";
import { Inline } from '../primitives/Inline';
import { Stack } from '../primitives/Stack';
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
  </Stack>
  
);
