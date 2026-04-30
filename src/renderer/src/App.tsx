import { createBrowserRouter, RouterProvider } from 'react-router';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="bg-bg text-white border border-border p-4 rounded-lg">
          Hello World
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
