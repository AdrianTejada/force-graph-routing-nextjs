import Link from "next/link"

export default function StyledLink({
  href, 
  isCurrentLink,
  children
}) {
  return (
    <Link 
      href={href}
      className={`
        mr-2
        tracking-wider
        ${isCurrentLink ? 'text-blue-600' : 'text-black'}
      `}
    >
      {children}
    </Link>
  )
}
