import { Link } from "react-router"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Python Blog" },
    { name: "description", content: "Welcome to the Python Blog" },
  ];
}

export default function Home() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      Home Page
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles   */}
        <div className="">
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque quis deserunt, 
            nesciunt saepe unde adipisci.
          </p>
        </div>
        {/* animated button */}
        <Link to="write"></Link>
      </div>
      {/* FEATURED POST */}
      {/* POST LIST */}
    </div>
  )
}
