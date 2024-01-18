import { RouterProvider } from 'react-router-dom';
import { FallbackElement } from '@/components/fallback-element';
import router from '@/routes';
import { Toaster } from 'sonner';

function App() {
  return (
    <main className="bg-dark">
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} fallbackElement={<FallbackElement />} />
    </main>
  );
}

export default App;
