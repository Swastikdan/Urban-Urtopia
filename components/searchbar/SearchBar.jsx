import SearchBarDesktop from "./SearchBarDesktop"
import SearchBarMobile from "./SearchBarMobile"

export default function SearchBar() {
  return (
    <>
      <div className="flex w-full md:hidden">
      <SearchBarMobile /></div>
      <div className="hidden md:flex w-auto">
      <SearchBarDesktop /></div>
    </>
  )
}
