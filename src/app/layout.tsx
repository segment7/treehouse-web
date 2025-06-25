import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import './globals.css';

import { Providers } from './provider';

export const metadata: Metadata = {
  title: 'TreeHouse',
  description: 'TreeHouse',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
