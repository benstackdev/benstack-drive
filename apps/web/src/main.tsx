import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import router from './routes.ts'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
