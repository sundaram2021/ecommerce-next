
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import NextTopLoader from 'nextjs-toploader'
import { dark } from '@clerk/themes' 
import ProviderComponent from '@/components/Provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}} >
      <ProviderComponent>
        <html lang="en">
          <body className={inter.className}>
            <NextTopLoader showSpinner={false} />
            <Navbar />
            {children}
            <Toaster />
          </body>
        </html> 
      </ProviderComponent>
    </ClerkProvider>   
    
  )
}
