import { useContext } from 'react';
import { AppContext } from '~/components';

export const useAppProvider = () => useContext(AppContext);
