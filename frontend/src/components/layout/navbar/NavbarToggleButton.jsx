import { RiMenu4Fill } from "react-icons/ri";

function NavbarToggleButton({ toggleMenu, ariaExpanded, ariaControls }) {
  return (
    <button
      className="nav-toggle"
      aria-label={ariaExpanded ? "Close menu" : "Open menu"}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={toggleMenu}
      type="button"
    >
      <RiMenu4Fill />
    </button>
  );
}

export default NavbarToggleButton;