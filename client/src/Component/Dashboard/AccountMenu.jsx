import { Link, useLocation } from "react-router-dom";

const AccountMenu = ({ links }) => {
    const location = useLocation();
    return (
        <ul className="menu bg-base-200 w-full rounded-box">
            {links.map((link, index) => {
                const PREFIX = link.prefix ? link.prefix : '';

                // Check if the current link matches the location pathname
                const isActive = PREFIX + link.to === location.pathname;

                // Define active class for non-first links
                const className = isActive && index !== 0 ? "bg-main/15" : "unselected";

                return (
                    <li key={index}>
                        <Link
                            to={PREFIX + link.to}
                            className={className}
                        >
                            {link.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default AccountMenu;
