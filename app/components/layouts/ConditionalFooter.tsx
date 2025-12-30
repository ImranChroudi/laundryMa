'use client'

import { usePathname } from 'next/navigation'
import Footer from './FooterComponent'
import FooterAr from './FooterComponentAr'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide Footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }
  
  // Use Arabic footer for Arabic routes
  if (pathname.startsWith('/ar')) {
    return <FooterAr />
  }
  
  // Use French footer for all other routes
  return <Footer />
}
