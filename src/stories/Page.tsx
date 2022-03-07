import React from "react";

import { Grid } from "../layout/Grid";
import { GridItem } from "../layout/GridItem";
import { Card } from "../recipes/Card";
// import "@atlaskit/css-reset/dist/bundle.css";
import "./page.css";
import "@atlaskit/tokens/css/atlassian-light.css";
import "@atlaskit/tokens/css/atlassian-dark.css";

interface PageProps {}

const description: string =
  "An astronomical event that occurs during the last stages of a massive star's life.";

const createDemoCards = ({
  numOfCards,
  colspan,
}: {
  numOfCards: number;
  colspan: number;
}) => {
  const cards = [];

  for (let i = 0; i < numOfCards; i++) {
    cards.push(
      <GridItem columnSpan={colspan}>
        <Card
          type="VIDEO"
          title="Supernova"
          description={description}
          tags={["Galaxies", "Milky Way", "Speed of Light", "Mars", "Venus"]}
        />
      </GridItem>
    );
  }
  return <>{cards}</>;
};

const cards = createDemoCards({ numOfCards: 6, colspan: 4 });

export const Page = ({}: PageProps) => (
  <section>
    <Grid
      childrenForMobileDisplay={cards}
      childrenForTabletDisplay={cards}
      childrenForSmallDesktopDisplay={cards}
      childrenForLargeDesktopDisplay={cards}
    />
  </section>
);
