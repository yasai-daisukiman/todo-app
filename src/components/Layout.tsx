import { ReactNode } from 'react';
import { Header } from './ui/Header';
import { ThemeProvider } from './theme-provider';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      {children}
    </ThemeProvider>
  </>
);

export default Layout;
