import React, { useState, useEffect } from "react";

import "./grid.css";

interface GridProps {
//   children?: React.ReactNode
}

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

// Currently this grid simply changes the number of columns that are used based on a media query
// The thinking for this is that we want to be able to change the positioning of child elements based on
// the "breakpoints" of the changing grid
export const Grid = ({ }: GridProps) => {

    // This feels potentially expensive being here :/
    // Maybe I should be setting up the matchMedia query just once outside the function and then calling it
    const getMedia: GetMedia = () => {
        if (window.matchMedia(LARGE_DESKTOP_MEDIA_QUERY).matches) {
            return 'LARGE_DESKTOP';
        }
        if (window.matchMedia(SMALL_DESKTOP_MEDIA_QUERY).matches) {
            return 'SMALL_DESKTOP';
        }
        if (window.matchMedia(TABLET_MEDIA_QUERY).matches) {
            return 'TABLET';
        }
        if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
            return 'MOBILE';
        }
        return 'UNSUPPORTED';
    }

    // Set the initial state for the media type
    const [matches, setMatches] = useState(
        getMedia()
    )

    useEffect(() => {
        // If this is running on every render then it suggests that we're just repeatedly creating listeners, which would be bad :/ 
        // Need to check and then fix this if that's the case...
        window.matchMedia(MOBILE_MEDIA_QUERY).addEventListener('change', () => setMatches(getMedia()));
        window.matchMedia(TABLET_MEDIA_QUERY).addEventListener('change', e => setMatches(getMedia()));
        window.matchMedia(SMALL_DESKTOP_MEDIA_QUERY).addEventListener('change', e => setMatches(getMedia()));
        window.matchMedia(LARGE_DESKTOP_MEDIA_QUERY).addEventListener('change', e => setMatches(getMedia()));
    }, []); // <- I think that this empty array solves the efficiency problem by only running on mount and unmount, but I need to check


    const getClassName = (matches: Media) => {
        return `grid ${matches.toLowerCase()}`;
    }

    return (
        <div className={getClassName(matches)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
        </div>
    )
};
