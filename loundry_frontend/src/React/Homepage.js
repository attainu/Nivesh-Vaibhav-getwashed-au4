import  React from "react";
import { Card, Icon, Image } from 'semantic-ui-react';
import clothCollection from '../image/download .jpeg';
import londryTransport from '../image/loundryTransport.jpg'
import loundryMachine from '../image/loundryMachine.jpg'
import loundryTransport from '../image/loundryTransport.jpg'

import washIcon from '../image/washin-machine-icon.png'
import ironIcon from '../image/Iron-icon.png'
import clothIcon from '../image/shirt-icon.png';
import { Input, Menu } from 'semantic-ui-react'

class Homepage extends React.Component
{
    constructor()
    {
        super();
    }
    componentDidMount=()=>{

    }
    render()
    {
        return(
       
        <>
             <div className="homepageBodyBackground">
            <div className="backgroundHeading">
                <h3>Welcome To Express Loundry</h3>
                <button className='btn' id='btn-booking'>Book Loundry</button>
            </div>
        </div>
        {/* // code for How it Work section */}
        <section className="howItWorks">
                <div className="howItWorksBackgroundHeading">
                    <h2 className="heading">How It Works</h2>
                    <h4 className="subHeading">Super simple. Super quick</h4>
                </div>
                <div className="workingProcess">
                    <div class="card  shadow" style={{"width" : "14rem" , "height":"23rem"}}>
                        <img class="card-img-top" src={clothCollection}  weight='50%' height='50%' alt="Card image cap"/>
                        <div class="card-body">
                        <h5 class="card-title text-center text-info" id=''>Bag up your dirty cloths</h5>  
                        <p class="card-text text-center text-dark">Book a collection online or with our award winning app. We'll bring a bag .</p>
                            
                        </div>
                    </div>
                <div class="card" style={{"width" : "14rem" , "height":"23rem"}}>
                    <img class="card-img-top" src={londryTransport}  weight='50%' height='50%' alt="Card image cap"/>
                    <div class="card-body">
                    <h5 class="card-title text-center text-info ">We Pickup your Cloth</h5>  
                    <p class="card-text text-center text-dark">Collection and delivery is free.Just let us know where you are. Office or Home</p>          
                    </div>
                </div>
                <div class="card shadow" style={{"width" : "14rem" , "height":"23rem"}}>
                    <img class="card-img-top" src={loundryMachine}  weight='50%' height='50%' alt="Card image cap"/>
                    <div class="card-body">
                    <h5 class="card-title text-center text-info">We clean your Cloth</h5>  
                    <p class="card-text text-center text-dark">Our facility are so good,we gaurantee you'll be satisfied-weput quality on all items</p>          
                    </div>
                </div>
                <div class="card" style={{"width" : "14rem" , "height":"23rem"}}>
                    <img class="card-img-top " src={londryTransport}  weight='50%' height='50%' alt="Card image cap"/>
                    <div class="card-body">
                    <h5 class="card-title text-center text-info ">We deliver clean Cloth</h5>  
                    <p className="card-text text-center text-dark">We'll deliver your pristine garment back to you, anytime and anywhere</p>          
                    </div>
                </div>

            </div>
        </section>
        {/* / ---end section ---/ */}
        {/* // code for servieces we offer */}
            <section className="ourServices">
                <div className='ourServicesHeading'>
                    <h2 class='heading'>Our Services</h2>
                    <h4 className='subHeading'>Stay clean and dress well</h4>
                </div>
                <div className='workingProcess'>
                    <Card style={{"width":"12rem", "height":"15rem"}}>
                        <Image src={washIcon} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>WASHING</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card style={{"width":"12rem",  "height":"15rem","margin-top":"0px"}}>
                        <Image src={ironIcon} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>IRON</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card style={{"width":"12rem", "height":"15rem","margin-top":"0px"}}>
                        <Image src={clothIcon} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>DRY CLEAN</Card.Header>
                        </Card.Content>
                    </Card>
                </div>
            </section>
        {/* // --end code for section-- */}
        </>);  
    }
}
export default Homepage;