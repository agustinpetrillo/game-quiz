import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill, BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="fixed flex items-center justify-end w-full min-h-0 px-10 py-4 dark:bg-[#241e4e]">
        <div className="flex space-x-4">
          <MdDarkMode size={25} />
          {theme === "light" ? (
            <BsToggleOn
              size={25}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="cursor-pointer"
            />
          ) : (
            <BsToggleOff
              size={25}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="cursor-pointer"
            />
          )}
          <BsFillSunFill size={25} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
