import { Link, useLocation } from 'react-router-dom'
import { Calendar, Users, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'
import './Sidebar.css'

const menuItems = [
  {
    label: 'Profiles',
    href: '/profiles',
    icon: Users,
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: Calendar,
  },
]

export function CustomSidebar() {
  const { isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed } = useSidebar()
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`custom-sidebar ${isMobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
      >
        {/* Header with Collapse Button */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h1 className="logo-text">Booking App</h1>
          </div>
          {/* Desktop Collapse Button */}
          <button
            className="collapse-btn hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-label">Navigation</h3>
            <ol className="nav-menu !list-none">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const active = isActive(item.href)
                return (
                  <li key={item.href} className="!list-none">
                    <Link
                      to={item.href}
                      className={`nav-link ${active ? 'active' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                      title={item.label}
                    >
                      <IconComponent size={20} className="nav-icon" />
                      <span className="nav-text">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)} />}
    </>
  )
}
