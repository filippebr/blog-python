export function Navbar() {
  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      {/* LOGO */}
      <div className="">
        <img src="/logo.png" className="w-8 h-8" alt="" />
        <span>devlog</span>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">M</div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex">D</div>
    </div>
  )
}


