import useMediaQuery from '@material-ui/core/useMediaQuery';
import { mobileLandscapeWidthPixels, mobileWidthPixels } from '~/styles';

export const useIsMobile = () =>
  useMediaQuery(`(max-width: ${mobileLandscapeWidthPixels}px)`);
export const useIsMobileSm = () =>
  useMediaQuery(`(max-width: ${mobileWidthPixels}px)`);
