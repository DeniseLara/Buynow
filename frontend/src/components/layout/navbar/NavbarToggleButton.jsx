import { RiMenu4Fill } from "react-icons/ri";

function NavbarToggleButton({ toggleMenu }) {
  return (
    <button
      className="nav-toggle"
      aria-label="open menu"
      onClick={toggleMenu}
      type="button"
    >
      <RiMenu4Fill />
    </button>
  );
}

export default NavbarToggleButton;