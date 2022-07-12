import React from 'react'
import './SidebarNavLinks.css'
function SidebarNavLinks({icon,linkName}) {
    return (
        <>
            <span className="SidebarNavLinks__link">{icon} {linkName}</span>
        </>
    )
}

export default SidebarNavLinks
