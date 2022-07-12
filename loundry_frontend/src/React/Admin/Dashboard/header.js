import React from 'react';
import './header.css';
const header =()=>{
    return(
    <>
        <header className='header'>
            <div className='header__left'>
                    <h3>Express <span>Loundry</span></h3>
            </div>
            <div className='header__right'>
                <span className='header__logoutButton'>Home</span>
                <span className='header__logoutButton'>Logout</span>
            </div>

        </header>
    </>
    )
}
export default header;