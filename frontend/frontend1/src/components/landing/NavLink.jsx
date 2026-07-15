import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";

// simple cn function (if your utils path is wrong, use this)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavLink = forwardRef(
  (
    {
      className = "",
      activeClassName = "",
      pendingClassName = "",
      to,
      end = false,
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        end={end}
        className={({ isActive, isPending }) =>
          cn(
            "transition-all duration-200",
            className,
            isActive ? activeClassName : "",
            isPending ? pendingClassName : ""
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };