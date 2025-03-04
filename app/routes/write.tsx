import { useUser } from "@clerk/clerk-react"

export default function Write() {

  const {isLoaded, isSignedIn} = useUser()

  if(!isLoaded) {
    return <div className="">Loading...</div>
  }

  return (
    <div className="">Write</div>
  )
}