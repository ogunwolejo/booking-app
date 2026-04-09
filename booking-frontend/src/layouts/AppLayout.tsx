import { Outlet } from 'react-router-dom'
import { CustomSidebar } from '@/components/CustomSidebar'
import { useSidebar } from '@/contexts/SidebarContext'
import './AppLayout.css'

export default function AppLayout() {
  const { isCollapsed } = useSidebar()

  return (
    <div className={`app-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <CustomSidebar />
      <main className={`app-main ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="app-content p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
