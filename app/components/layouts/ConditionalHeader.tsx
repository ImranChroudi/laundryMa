'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader({ showNavLinksDark }: { showNavLinksDark: boolean }) {
  const pathname = usePathname()
  
  // Hide header on checkout/ramassage page and admin pages
  if (
    pathname === '/checkout' || 
    pathname.startsWith('/checkout/') ||
    pathname.startsWith('/admin')
  ) {
    return null
  }
  
  return <Header showNavLinksDark={showNavLinksDark} />
}



