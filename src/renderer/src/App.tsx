import { RouterProvider } from 'react-router';
import router from './app/router';
import UpdateBanner from './components/update-banner';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <RouterProvider router={router} />
      <UpdateBanner />
    </>
  )
}

export default App
