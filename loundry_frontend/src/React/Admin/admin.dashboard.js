import React from 'react';
import Header from './Dashboard/header';
import Sidebar from './Dashboard/sidebar';
import MainContent from './Dashboard/mainContent';
import './admin.dashboard.css';
function dashboard(){
    return(<div className='dashboard'>
       
            <Header/>
       
        <div className='dashboard_sideboard_maincontent'>
            <Sidebar/>
            <MainContent/>
        </div>

    </div>)
}
export default dashboard;