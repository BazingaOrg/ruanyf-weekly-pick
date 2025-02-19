"use client"

import { useEffect, useState } from "react"
import { Link } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    const updateToc = () => {
      const headings = document.querySelectorAll("h1, h2, h3")
      const tocItems: TocItem[] = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      }))
      setToc(tocItems)
    }

    updateToc() // Initial update

    // Listen for route changes
    window.addEventListener("routeChange", updateToc)

    return () => {
      window.removeEventListener("routeChange", updateToc)
    }
  }, [])

  return (
    <nav className="sticky top-16 space-y-2">
      <h3 className="font-semibold mb-2 flex items-center">
        <Link className="mr-2" size={16} />
        On this page
      </h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

