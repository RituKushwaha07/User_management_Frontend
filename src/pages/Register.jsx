import { useState } from "react";
import register from "../assets/register.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


const URL = `${process.env.VITE_APP_URI_API}/api/auth/register`;




export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        isAdmin: false
    })


    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();



    //hanling the input
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })

    };


    /// form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            console.log(response);
            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);


            if (response.ok) {

                storeTokenInLS(res_data.token);
                // localStorage.setItem("token", res_data);
                setUser({ username: "", email: "", phone: "", password: "", isAdmin: false });
                toast.success("Registration successful")
                navigate("/login");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("register", error);

        }

    }





    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src={register} alt="a girl is trying to do registration" width="400" height="500" />
                        </div>

                        {/* our main registration code  */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        onChange={handleInput}
                                        value={user.username}

                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email"
                                        name="email"
                                        placeholder="Enter Your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        onChange={handleInput}
                                        value={user.email}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number"
                                        name="phone"
                                        placeholder="phone"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        onChange={handleInput}
                                        value={user.phone}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        onChange={handleInput}
                                        value={user.password}

                                    />
                                </div>

                                <div className="mt-3">
                                    <label>Role</label>

                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="isAdmin"
                                            checked={user.isAdmin}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    isAdmin: e.target.checked,
                                                })
                                            }
                                        />
                                        <span className="slider round"></span>
                                    </label>

                                    <span className="role-text">
                                        {user.isAdmin ? "Admin User" : "Normal User"}
                                    </span>
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>


                        </div>


                    </div>
                </div>
            </main>
        </section>
    </>
};