'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header as HeaderView } from './HeaderView';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Sync admin login state from localStorage
    const checkAdmin = () => {
      const logged = localStorage.getItem('family_admin_logged');
      setIsAdmin(logged === 'true');
    };

    checkAdmin();

    // Listen for storage changes to handle login/logout across tabs/views
    window.addEventListener('storage', checkAdmin);
    
    // Add custom event listener for internal routing changes
    window.addEventListener('admin_state_change', checkAdmin);

    return () => {
      window.removeEventListener('storage', checkAdmin);
      window.removeEventListener('admin_state_change', checkAdmin);
    };
  }, []);

  // Map the current path to the active tab ID
  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/story')) return 'story';
    if (pathname.startsWith('/gallery')) return 'gallery';
    if (pathname.startsWith('/artgallery')) return 'artgallery';
    if (pathname.startsWith('/travel')) return 'travel';
    if (pathname.startsWith('/guestbook')) return 'guestbook';
    return '';
  };

  const handleActiveTabChange = (tabId: string) => {
    if (tabId === 'home') router.push('/');
    else if (tabId === 'story') router.push('/story');
    else if (tabId === 'gallery') router.push('/gallery');
    else if (tabId === 'artgallery') router.push('/artgallery');
    else if (tabId === 'travel') router.push('/travel');
    else if (tabId === 'guestbook') router.push('/guestbook');
  };

  const handleLogout = () => {
    localStorage.removeItem('family_admin_logged');
    setIsAdmin(false);
    
    // Dispatch events to notify other components immediately
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('admin_state_change'));
    
    alert('성공적으로 로그아웃되었습니다.');
    router.push('/');
  };

  const handleOpenLogin = () => {
    router.push('/admin');
  };

  return (
    <HeaderView
      activeTab={getActiveTab()}
      setActiveTab={handleActiveTabChange}
      isAdmin={isAdmin}
      onLogout={handleLogout}
      onOpenLogin={handleOpenLogin}
    />
  );
}
