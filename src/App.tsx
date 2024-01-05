import { RouterProvider } from 'react-router-dom';
import { FallbackElement } from '@/components/fallback-element';
import router from '@/routes';

function App() {
  return (
    <main className="dark text-foreground bg-background">
      <RouterProvider router={router} fallbackElement={<FallbackElement />} />
    </main>
  );
}

export default App;
