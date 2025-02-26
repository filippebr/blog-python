import { SignIn } from "@clerk/clerk-react"

export default function Login() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <SignIn />
    </div>
  )
}