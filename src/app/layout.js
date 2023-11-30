import { Inter } from 'next/font/google'
import Navbar from './_components/Navbar'
import ForceGraph from './_components/ForceGraph'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Force Graph Routing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen flex justify-center`}>
        <div className='max-w-[1440px] px-10 w-full h-full flex flex-row justify-between'>
          <div className='h-full w-full'>
            <Navbar/>
            <div className='w-full h-full'>
              {children}
            </div>
          </div>
          <div className='h-full min-w-[294px] flex justify-between flex-col p-5'>
            <ForceGraph/>
          </div>
        </div>
      </body>
    </html>
  )
}
