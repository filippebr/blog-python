import Search from "./search"

export default function SideMenu() {
  return (
    <div className="px-4 h-max sticky top-8 ">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
    </div>
  )
}