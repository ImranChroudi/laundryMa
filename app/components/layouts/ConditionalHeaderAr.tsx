'use client'

import { usePathname } from 'next/navigation'
import HeaderAr from './HeaderAr'

export default function ConditionalHeaderAr({ showNavLinksDark }: { showNavLinksDark: boolean }) {
  const pathname = usePathname()
  
  // Hide header on checkout/ramassage page and admin pages
  if (
    pathname === '/ar/checkout' || 
    pathname.startsWith('/ar/checkout/') ||
    pathname.startsWith('/admin')
  ) {
    return null
  }
  
  return <HeaderAr showNavLinksDark={showNavLinksDark} />
}








