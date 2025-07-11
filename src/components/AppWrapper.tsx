import { CacheProvider } from '@emotion/react';
import { muiCache } from '@/utils/emotionCache';


export default function AppWrapper({ children }: { readonly children: React.ReactNode }) {
  return (
    <CacheProvider value={muiCache}>
        {children}
    </CacheProvider>
  );
}
