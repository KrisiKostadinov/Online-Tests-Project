import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import AdminManager from "../../AdminManager";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [error, setError] = useState('');

    const { setUserContext } = useContext(UserContext);

    useEffect(() => {
        checkValidForm();
    });

    function login(event) {
        event.preventDefault();

        async function submitLogin() {
            try {
                const result = await AdminManager.login(email, password);
                if (result.status !== 200) {
                    const errorData = await result.json();
                    return setError(errorData.message);
                }

                const data = await result.json();
                setUserContext({
                    token: data.token,
                    email: email
                });

                return navigate('/');
            } catch (error) {
                setError(error);
            }
        }

        submitLogin();
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function checkValidForm() {
        if (email.length > 0 && password.length > 0) {
            return setIsValidForm(true);
        }

        setIsValidForm(false);
    }

    return (
        <>
            <div className="row">
                <form onSubmit={login} className="col-md-4 col-ms-12 mx-auto mt-5">
                    <h2 className="text-center">Вход в състемата</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onChange={handleChangeEmail} defaultValue={email} id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Парола</label>
                        <input type="password" className="form-control" name="password" onChange={handleChangePassword} defaultValue={password} id="password" />
                    </div>
                    {error != '' ? <div className="text-center text-danger">{error}</div> : ''}
                    <button disabled={!isValidForm} type="submit" className="btn btn-primary">Вход</button>
                </form>
            </div>
        </>
    )
}

export default Login;