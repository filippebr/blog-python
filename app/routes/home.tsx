import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Python Blog" },
    { name: "description", content: "Welcome to the Python Blog" },
  ];
}

export default function Home() {
  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      Home Page
      {/* NAVBAR */}
      {/* BREADCRUMB */}
      {/* INTRODUCTION */}
      {/* FEATURED POST */}
      {/* POST LIST */}
    </div>
  )
}
