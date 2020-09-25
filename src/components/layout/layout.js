import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'
const Layout = (props) => {
    return (
        <div>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>)
}


export default Layout