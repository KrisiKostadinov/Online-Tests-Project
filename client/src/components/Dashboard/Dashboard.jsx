import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

const Dashboard = () => {

    const { userContext } = useContext(UserContext);

    useEffect(() => {
        
    });

    return (
        <div>Hello, {userContext.email}</div>
    )
}

export default Dashboard;