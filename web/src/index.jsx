import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TronProvider } from './contexts/Tron'
import Launch from './pages/Launch'
import Make from './pages/Make'
import MakeComponent from './pages/MakeComponent'
import View from './pages/View'
import About from './pages/About'

ReactDOM.createRoot(document.getElementById('app')).render(
  <TronProvider>
    <RouterProvider
      router={createBrowserRouter([
        { path: '/', element: <Launch /> },
        { path: '/about', element: <About /> },
        { path: '/make', element: <Make /> },
        { path: '/make-component', element: <MakeComponent /> },
        { path: '/view/:tokenAddress/:tokenId', element: <View /> },
      ])}
    />
  </TronProvider>,
)
