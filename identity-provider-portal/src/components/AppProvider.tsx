import { createContext, useState } from 'react';

interface AppContextProps {
  showSideNav: boolean;
  toggleSideNav(): void;
  setShowSideNav(val: boolean): void;
}

const warnMissingProvider = () => console.log('Missing AppContext.Provider');

export const AppContext = createContext<AppContextProps>({
  showSideNav: true,
  toggleSideNav: warnMissingProvider,
  setShowSideNav: warnMissingProvider,
});
export const AppProvider: React.FC = ({ children }) => {
  const [showSideNav, _setShowSideNav] = useState(true);
  const setShowSideNav = (val: boolean) => {
    _setShowSideNav(val);
  };
  const toggleSideNav = () => setShowSideNav(!showSideNav);

  return (
    <AppContext.Provider
      value={{
        showSideNav,
        toggleSideNav,
        setShowSideNav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
