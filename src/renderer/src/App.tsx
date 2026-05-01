import { RouterProvider } from 'react-router';
import router from './app/router';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return <RouterProvider router={router} />
}

export default App
