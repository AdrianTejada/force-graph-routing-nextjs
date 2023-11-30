'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { pages } from "@/data/NavbarData";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <header className="my-5">
      <nav className="flex flex-row gap-x-3">
        {pages.map((page) => (
          <Link 
            key={page.path}
            href={page.path}
            className={`
              tracking-wider
              ${currentPath === page.path ? 'text-blue-600' : 'text-black'}
            `}
          >
            {page.name}  
          </Link>
        ))}
      </nav>
    </header>
  )
}
