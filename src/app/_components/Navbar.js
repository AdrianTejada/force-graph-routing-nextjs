'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import nodes from "@/data/nodes";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <header className="my-5">
      <nav className="flex flex-row gap-x-3">
        {nodes.map((node) => (
          <Link 
            key={node.id}
            href={node.route}
            className={`
              tracking-wider
              ${currentPath === node.route ? 'text-blue-600' : 'text-black'}
            `}
          >
            {node.id}
          </Link>
        ))}
      </nav>
    </header>
  )
}
