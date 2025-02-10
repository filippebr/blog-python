import { Welcome } from "../welcome/welcome"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Python Blog" },
    { name: "description", content: "Welcome to the Python Blog" },
  ];
}

export default function Home() {
  return <Welcome />;
}
