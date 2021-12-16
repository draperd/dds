import React from 'react';

import { Card } from './Card';
import { Inline } from './Inline';
import './page.css';

interface PageProps {
  
}

const description: string =
  "An astronomical event that occurs during the last stages of a massive star's life.";


export const Page = ({  }: PageProps) => (
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
  
);
