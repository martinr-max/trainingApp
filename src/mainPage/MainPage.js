import React from 'react';
import './MainPage.css'
import { Container, Typography } from '@material-ui/core';


const MainPage = () => {

    const imgURL = 'https://static.vecteezy.com/system/resources/previews/000/095/371/non_2x/sports-vector-illustration.jpg'
    
    
    return(
        <div>
            <Container>
                <div className="main_page_container">
                    <Typography
                     className="mainPage_title"
                     component="h1"
                     variant="h4">
                         Start your training today!
                    </Typography>
                    <img src={imgURL} alt="sport"></img>
                    <footer className="mainPage_footer">
                        <a href="https://www.vecteezy.com/free-vector/discus">Discus Vectors by Vecteezy</a>
                    </footer>
                </div>
              
            </Container>
        </div>
    )

}

export default MainPage;