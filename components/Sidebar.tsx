import React from 'react';
import { Icon } from './Icon';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  openQuizSetup: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, openQuizSetup, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Dashboard', view: 'dashboard', icon: 'dashboard', action: () => setView('dashboard') },
        { name: 'Simulados', view: 'quizSetup', icon: 'quiz', action: openQuizSetup },
        { name: 'Edital DEGASE', view: 'editalDegase', icon: 'documentText', action: () => setView('editalDegase') },
    ];

    const sidebarContent = (
        <>
            <h1 className="sidebar-title">PsiConcurso</h1>
            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <a key={item.view}
                       href="#"
                       className={`sidebar-link ${(currentView === item.view && item.view !== 'quizSetup') ? 'active' : ''}`}
                       onClick={(e) => {
                           e.preventDefault();
                           item.action();
                           if (window.innerWidth < 768) setSidebarOpen(false);
                       }}>
                        <Icon name={item.icon} className="nav-icon" />
                        <span>{item.name}</span>
                    </a>
                ))}
            </nav>
        </>
    );

    return (
        <>
            {isSidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                 <button className="close-button sidebar-close-button" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button>
                {sidebarContent}
            </aside>
        </>
    );
};