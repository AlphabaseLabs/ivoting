import useMediaQuery from '@material-ui/core/useMediaQuery';
import { tabletWidthPixels } from '~/styles';

export const useIsTablet = () =>
  useMediaQuery(`(max-width: ${tabletWidthPixels}px)`);
