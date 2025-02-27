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
      {/* INTRODUCTION */}
      {/* FEATURED POST */}
      {/* POST LIST */}
    </div>
  )
}
