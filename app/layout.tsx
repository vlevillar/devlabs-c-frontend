'use client';
import type { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import './styles/globals.css';
import { Roboto } from 'next/font/google';
import styles from './styles/layout.module.css';
import { ReduxProvider } from './providers';
import { AuthSyncProvider } from './authSyncProvider';

interface Props {
  readonly children: ReactNode;
}

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: Props) {
  return (
    <Auth0Provider
      domain="dev-yxc4j2q43r3bckhs.us.auth0.com"
      clientId="Ds4d9GuIy2mBKnPaOoO9a3l3JDlxwmtl"
      authorizationParams={{
        redirect_uri: 'https://devlabs-c-frontend.vercel.app/',
      }}
      cacheLocation="localstorage"
    >
      <html lang="en">
        <body className={styles.container}>
          <ReduxProvider>
            <AuthSyncProvider>
              <main className={roboto.className}>{children}</main>
            </AuthSyncProvider>
          </ReduxProvider>
        </body>
      </html>
    </Auth0Provider>
  );
}
