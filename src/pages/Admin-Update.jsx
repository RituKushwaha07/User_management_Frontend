import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';



export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });





    const params = useParams();
    console.log("params single user: ", params);
    const { authorizationToken } = useAuth();



    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                    // Authorization: `Bearer ${authorizationToken}`,

                },
            });
            const data = await response.json();
            console.log(`users  after delete ${data}`);
            setUsers(data);

            // console.log("users data:", data);
            // if (response.ok) {
            //     getSingleUserData
            // }
            // setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        getSingleUserData();
    }, []);







    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })

    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/users/update/${params.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: authorizationToken,
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );
            if (response.ok) {
                toast.success("Updated successful")
            } else {
                toast.error("Not updated")
            }

        } catch (error) {
            console.log(error);
        }
    };




    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data </h1>
                </div>


                <div className="conatainer grid grid-two-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text"
                                    name='username'
                                    id='username'
                                    autoComplete='off'
                                    value={data.username}
                                    onChange={handleInput}
                                    required />
                            </div>


                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email"
                                    name='email'
                                    id='email'
                                    autoComplete='off'
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>



                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="phone"
                                    name='phone'
                                    id='phone'
                                    autoComplete='off'
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>


                            <div>
                                <button type='submit'>Update</button>
                            </div>


                        </form>

                    </section>

                </div>


            </section>

        </>
    )
}

