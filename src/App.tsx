import { RouterProvider } from 'react-router-dom';
import { FallbackElement } from '@/components/fallback-element';
import router from '@/routes';
import { useAccountStore } from '@/stores';
import { useEffect } from 'react';

function App() {
  const getAccount = useAccountStore.use.updateAccount();
  useEffect(() => {
    getAccount();
  }, [getAccount]);
  return (
    <main className="dark text-foreground bg-background">
      <RouterProvider router={router} fallbackElement={<FallbackElement />} />
    </main>
  );
}

export default App;
