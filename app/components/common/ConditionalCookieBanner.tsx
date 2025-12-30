'use client'

import { usePathname } from 'next/navigation'
import CookieBanner from './CookieBanner'

export default function ConditionalCookieBanner() {
  const pathname = usePathname()
  
  // Hide CookieBanner on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }
  
  return <CookieBanner />
}




