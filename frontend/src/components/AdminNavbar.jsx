// eslint-disable-next-line no-unused-vars
import React from 'react'
import ThemeToggleButton from './ThemeToggleButton';


const AdminNavbar = () => {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

  return (
        <div className="navbar max-w-[1200px] mx-auto">

        <div className="navbar-center flex ">
            <button onClick={logout} className='btn'>Logout</button>
        </div>

        <div className="navbar-end gap-12">
            <ThemeToggleButton/>
        </div>
  
</div>
  )
}

export default AdminNavbar