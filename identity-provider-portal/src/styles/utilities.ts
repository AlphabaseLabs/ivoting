import { css, CSSProp } from "styled-components";

import {
  desktopLgWidthPixels,
  desktopWidthPixels,
  mobileLandscapeWidthPixels,
  mobileWidthPixels,
  tabletLandscapeWidthPixels,
  tabletWidthPixels,
} from "~/styles";
import { desktopXlWidthPixels } from "./varriables";

export const sizeMobileSm = (content: CSSProp) => css`
  @media (max-width: ${mobileWidthPixels - 1}px) {
    ${content};
  }
`;

export const sizeMobile = (content: CSSProp) => css`
  @media (max-width: ${mobileLandscapeWidthPixels - 1}px) {
    ${content};
  }
`;

export const sizeTablet = (content: CSSProp) => css`
  @media (max-width: ${tabletWidthPixels - 1}px) {
    ${content};
  }
`;

export const sizeTabletMin = (content: CSSProp) => css`
  @media (min-width: ${tabletWidthPixels - 1}px) {
    ${content};
  }
`;

export const sizeTabletLg = (content: CSSProp) => css`
  @media (max-width: ${tabletLandscapeWidthPixels - 1}px) {
    ${content};
  }
`;
export const sizeDesktop = (content: CSSProp) => css`
  @media (max-width: ${desktopWidthPixels - 1}px) {
    ${content};
  }
`;
export const sizeDesktopLg = (content: CSSProp) => css`
  @media (min-width: ${desktopLgWidthPixels - 1}px) {
    ${content};
  }
`;
export const sizeDesktopXl = (content: CSSProp) => css`
  @media (min-width: ${desktopXlWidthPixels - 1}px) {
    ${content};
  }
`;
