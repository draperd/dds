import React, { useState, useEffect } from "react";

import "./grid.css";


// Let's assume we're going to plan for the following media types (these are just randomly picked, no research or science on these)
// - mobile
// - tablet
// - small browser
// - larger browser 

// There are more realistic screen sizes on https://www.hobo-web.co.uk/best-screen-size/
// The following sizes have just been used so that I can see columns changing in my browser
const MOBILE_WIDTH = 500;
const TABLET_WIDTH = 800;
const SMALL_DESKTOP_WIDTH = 1000;
const LARGE_DESKTOP_WIDTH = 1200; 

const getMediaQuery = (width: number) => `screen and (min-width: ${width}px)`;

const MOBILE_MEDIA_QUERY = getMediaQuery(MOBILE_WIDTH);
const TABLET_MEDIA_QUERY = getMediaQuery(TABLET_WIDTH);
const SMALL_DESKTOP_MEDIA_QUERY = getMediaQuery(SMALL_DESKTOP_WIDTH);
const LARGE_DESKTOP_MEDIA_QUERY = getMediaQuery(LARGE_DESKTOP_WIDTH);

export type Media = 'UNSUPPORTED' | 'MOBILE' | 'TABLET' | 'SMALL_DESKTOP' | 'LARGE_DESKTOP';

export type GetMedia = {(): Media}


// There might be some elaborate ways to calculate row spans, but it's probably realistic to expect
// developers to be able to work out the layout they want for themselves.
interface GridItemProps {
    columnSpan?: number,
    rowSpan?: number,
    children?: React.ReactNode,
}

export const GridItem = ({ columnSpan = 1, rowSpan = 1, children}: GridItemProps) => (
    <div className="griditem" style={{gridColumnStart: `span ${columnSpan}`, gridRowStart: `span ${rowSpan}`}}>
      {children}
    </div>
)


interface GridProps {
    //   children?: React.ReactNode
    childrenForMobileDisplay?: React.ReactNode,
    childrenForTabletDisplay?: React.ReactNode,
    childrenForSmallDesktopDisplay?: React.ReactNode,
    childrenForLargeDesktopDisplay?: React.ReactNode,   
}

const matchMobile = window.matchMedia(MOBILE_MEDIA_QUERY);
const matchTablet = window.matchMedia(TABLET_MEDIA_QUERY);
const matchSmallDesktop = window.matchMedia(SMALL_DESKTOP_MEDIA_QUERY);
const matchLargeDesktop = window.matchMedia(LARGE_DESKTOP_MEDIA_QUERY);

// Currently this grid simply changes the number of columns that are used based on a media query
// The thinking for this is that we want to be able to change the positioning of child elements based on
// the "breakpoints" of the changing grid
export const Grid = ({ childrenForMobileDisplay, childrenForTabletDisplay, childrenForSmallDesktopDisplay, childrenForLargeDesktopDisplay }: GridProps) => {

    // This feels potentially expensive being here :/
    // Maybe I should be setting up the matchMedia query just once outside the function and then calling it
    const getMedia: GetMedia = () => {
        if (matchLargeDesktop.matches) {
            return 'LARGE_DESKTOP';
        }
        if (matchSmallDesktop.matches) {
            return 'SMALL_DESKTOP';
        }
        if (matchTablet.matches) {
            return 'TABLET';
        }
        if (matchMobile.matches) {
            return 'MOBILE';
        }
        return 'UNSUPPORTED';
    }

    // Set the initial state for the media type
    const [media, setMedia] = useState(
        getMedia()
    )

    useEffect(() => {
        // If this is running on every render then it suggests that we're just repeatedly creating listeners, which would be bad :/ 
        // Need to check and then fix this if that's the case...
        matchMobile.addEventListener('change', () => setMedia(getMedia()));
        matchTablet.addEventListener('change', () => setMedia(getMedia()));
        matchSmallDesktop.addEventListener('change', () => setMedia(getMedia()));
        matchLargeDesktop.addEventListener('change', () => setMedia(getMedia()));
    }, []); // <- I think that this empty array solves the efficiency problem by only running on mount and unmount, but I need to check


    const getClassName = (media: Media) => {
        return `grid ${media.toLowerCase()}`;
    }
    
    switch (media) {
        case 'MOBILE': {
            return <div className={getClassName(media)}>{childrenForMobileDisplay}</div>
        }
        case 'TABLET': {
            return <div className={getClassName(media)}>{childrenForTabletDisplay}</div>
        }
        case 'SMALL_DESKTOP': {
            return <div className={getClassName(media)}>{childrenForSmallDesktopDisplay}</div>
        }
        default: {
            return <div className={getClassName(media)}>{childrenForLargeDesktopDisplay}</div>
        }
    }
};
