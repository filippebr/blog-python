export default function Comments() {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="">
        <textarea placeholder="Write a comment..." />
        <button>Send</button>
      </div>
    </div>
  )
}