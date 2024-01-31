import LinksDropdown from "./LinksDropdown";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <Button variant={"default"}>Sign Out</Button>
      </div>
    </nav>
  );
}
export default Navbar;
