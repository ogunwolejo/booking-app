import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider } from './contexts/SidebarContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SidebarProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
        <Toaster />
      </SidebarProvider>
    </ErrorBoundary>
  </StrictMode>
)
