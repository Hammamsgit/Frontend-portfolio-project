import React, { useEffect, useState,useContext } from 'react';
import * as api from '../utils/api'
import {userContext} from "../utils/Context";


function SignInPage(props) {
    const {setLoggedIn} = useContext(userContext)
    const [signIn, setSignIn] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        setLoggedIn(signIn)


    }

    return (
        <div>
            <form className="signInCard" onSubmit={handleSubmit}>
                <ul>
                    <li>Username: <input type="text" value={signIn.username} onChange={(e) => {setSignIn(e.target.value)}}></input> </li>
                    <button type="submit" >Sign in</button>
                </ul>
            </form>
        </div>
    );
}

export default SignInPage;