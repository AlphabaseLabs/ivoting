import { useContext } from 'react';
import { AppContext } from '../components/AppProvider';

export const useAppProvider = () => useContext(AppContext);
