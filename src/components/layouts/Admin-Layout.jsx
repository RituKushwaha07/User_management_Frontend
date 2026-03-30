

import { Outlet, NavLink, Navigate } from "react-router-dom";
// import { FaUser,FeMessage,FaRegListAlt,FaHome } from "react-icons/fa";
import { FaUser, FaEnvelope, FaRegListAlt, FaHome } from "react-icons/fa";
import { useAuth } from "../../store/auth";



export const AdminLayout = () => {
    const { user, isLoding } = useAuth();
    console.log("admin layout", user);


    if(isLoding){
        return <h1>Loading...</h1>;
    }

    if(!user.isAdmin){
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users">
                                    <FaUser />users
                                </NavLink>
                            </li>

                            {/* <li>
                                <NavLink to="/admin/contacts"><FeMessage />Contacts</NavLink>
                            </li>
                             */}

                            <li>
                                <NavLink to="/admin/contacts"><FaEnvelope />Contacts</NavLink>
                            </li>

                            <li>
                                <NavLink to="/service"><FaRegListAlt />Services</NavLink>
                            </li>

                            <li>
                                <NavLink to="/"><FaHome />Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    );
};