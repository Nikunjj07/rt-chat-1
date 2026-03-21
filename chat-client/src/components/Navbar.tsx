export const NavBar = ()=>{
    return(
    <nav className="w-full border-b border-border bg-background">
    <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        
        <div className="text-lg font-semibold text-primary">
        SketchGame
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-foreground">
        <a href="/" className="hover:text-primary transition">Home</a>
        <a href="/chat" className="hover:text-primary transition">Rooms</a>
        </div>

        <div className="flex items-center gap-3">

        <button
        onClick={()=>{
            document.documentElement.classList.toggle('dark')
        }}
        className="p-2 rounded-md border border-border hover:bg-muted transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-foreground"
        >
          <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"/>
        </svg>
      </button>

        <button
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm 
                hover:opacity-90 transition"
        >
            Join Room
        </button>

        </div>
    </div>
    </nav>
    )
}