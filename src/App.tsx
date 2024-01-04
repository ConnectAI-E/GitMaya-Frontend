import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/layout';
import { FallbackElement } from '@/components/fallback-element';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const Component = (await import('@/routes/home')).default;
          return {
            Component
          };
        }
      }
    ]
  },
  {
    path: '/login',
    lazy: async () => {
      const Component = (await import('@/routes/login')).default;
      return {
        Component
      };
    }
  }
]);

function App() {
  return (
    <main className="dark text-foreground bg-background">
      <RouterProvider router={router} fallbackElement={<FallbackElement />} />
    </main>
  );
}

export default App;
