import React from "react";

export default function LogOut ({setLoggedIn, setActiveMembers, member}) {
    
    const handleLogOut = () => {
        setLoggedIn(false);
        window.location.reload(false);
      }

    return (
        <button className="button-active2" type="submit" onClick={handleLogOut}>Log out</button>
    )
}