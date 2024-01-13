'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      className=' rounded-full'
      variant='outline'
      size='icon'
      onClick={handleSetTheme}
    >
      {theme === 'dark' ? (
        <Moon className='rotate-0 scale-100 transition-all' />
      ) : (
        <Sun className='rotate-0 scale-100 transition-all' />
      )}
    </Button>
  );
}
