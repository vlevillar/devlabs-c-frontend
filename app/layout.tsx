"use client"
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Auth0Provider } from "@auth0/auth0-react";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <Auth0Provider
      domain="dev-yxc4j2q43r3bckhs.us.auth0.com"
      clientId="Ds4d9GuIy2mBKnPaOoO9a3l3JDlxwmtl"
      authorizationParams={{
        redirect_uri: "https://devlabs-c-frontend.vercel.app/",
      }}
    >
      <StoreProvider>
        <html lang="en">
          <body className={styles.container}>{children}</body>
        </html>
      </StoreProvider>
    </Auth0Provider>
  );
}
