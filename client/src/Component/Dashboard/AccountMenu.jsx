import { NavLink } from "react-router-dom";
const AccountMenu = ({ links }) => {
    return (
        <>
            <ul className="menu bg-base-200 w-full rounded-box">
                {links.map((link, index) => {
                    const PREFIX = link.prefix ? link.prefix : '';
                    return (
                        <li key={index}>
                            <NavLink
                                to={PREFIX + link.to}
                                activeclassname='active-link'
                                exact
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
export default AccountMenu;