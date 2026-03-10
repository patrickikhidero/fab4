import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AuthProvider } from "@/components/providers/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FabFour Foundation",
  description: "Empowering students through education and support",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RequireAuth>
         <AuthProvider>{children}</AuthProvider>   
        </RequireAuth>    
      </body>
    </html>
  )
}
