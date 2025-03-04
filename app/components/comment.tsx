import Image from "./image"

export default function Comment() {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image src="userImg" alt="comment profile" className="w-10 h-10 rounded-full object-cover" w="40"/>
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div> 
    </div>
  )
}