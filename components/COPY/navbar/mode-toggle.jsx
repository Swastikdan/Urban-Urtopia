// import { Moon, Sun } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useTheme } from "@/components/theme-provider";

// export function ModeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
    setIsDark(!isDark);
  };

  return (
    <button
      aria-label="theme switch"
      className="items-center  "
      onClick={toggleTheme}
    >
      {isDark ? (
        <div className="m-[2px] block cursor-pointer rounded-full border-black bg-secondary p-1.5   ring-2 ring-gray-800 transition-transform duration-300 hover:opacity-80 focus:m-0 focus:border-2 active:rotate-[270deg] ">
          <Moon size={25} />
        </div>
      ) : (
        <div className="m-[2px] block cursor-pointer rounded-full border-black bg-white/60 p-1.5 ring-2   ring-gray-800  transition-transform duration-300 hover:opacity-80 focus:m-0 focus:border-2 active:-rotate-180 ">
          <Sun size={25} />
        </div>
      )}
    </button>
  );
}
