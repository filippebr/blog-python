import { Link } from "react-router"
import Search from "./search"

export default function SideMenu() {
  return (
    <div className="px-4 h-max sticky top-8 ">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/posts" className="underline">All</Link>
        <Link to="/posts?cat=web-design" className="underline">Web Design</Link>
        <Link to="/posts?cat=development" className="underline">Development</Link>
        <Link to="/posts?cat=databases" className="underline">Databases</Link>
        <Link to="/posts?cat=seo" className="underline">Search Engines</Link>
        <Link to="/posts?cat=marketing" className="underline">Marketing</Link>
      </div>
    </div>
  )
}