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
          <p className="mt-8 text-md md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque quis deserunt, 
            nesciunt saepe unde adipisci.
          </p>
        </div>
        {/* animated button */}
        <Link to="write">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
          >
            <path 
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">Write your story •</textPath>
              <textPath href="#circlePath" startOffset="50%">Share your idea •</textPath>
            </text>
          </svg>
        
        </Link>
      </div>
      {/* FEATURED POST */}
      {/* POST LIST */}
    </div>
  )
}
