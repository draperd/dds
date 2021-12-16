import React from 'react';

import { Box } from './Box';
import { Text } from './Text';
import './card.css';

interface CardProps {
  
}

/* This is what I want it to look like

   An inset box (should inset be a component?)
   <Box>

     <Stack> // Is stack a property?
       
      <Heading>Video</Heading> what type of header is this? Typography concern
       
      <Heading>Supernova</Heading>
      
      <Text>An astronomoical event ...</Text>
      
      <Inline>

        <Box>Galaxies</Box>   // These are all inset
        <Box>Milky Way</Box>
        <Box>Speed of Light</Box>

      </Inline>

      <Box><Text>View</Text></Box> // A squished inset, but is this really a button?
     </Stack>
   </Box>

  */

const description: string = "An astronomical event that occurs during the last stages of a massive star's life."


export const Card = ({  }: CardProps) => (
  <div className="card">
    <Box spacingStyle='INSET'>
      <Box spacingStyle="STACK">
        <Text content="VIDEO"></Text>
        <Text content="Supernova"></Text>
        <Text content={description}></Text>
        <Box spacingStyle="INLINE">
          <Box spacingStyle="INSET" spacingSize='SMALL'>
            <Text content="Galaxies"></Text>
          </Box>
          <Box spacingStyle="INSET" spacingSize='SMALL'>
            <Text content="Milky Way"></Text>
          </Box>
          <Box spacingStyle="INSET" spacingSize='SMALL'>
            <Text content="Speed of Light"></Text>
          </Box>
        </Box>
        <Box spacingStyle="SQUISHED-INSET" spacingSize='MEDIUM'>
          <Text content="View"></Text>
        </Box>
      </Box>
    </Box>
  </div>
  
);
