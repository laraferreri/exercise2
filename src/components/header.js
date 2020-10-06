import React from "react";

function Header({changeCity}) {
    return(
        <header className="Header">
            <div>
                <h1>Header Title </h1>
            <nav>
                <a href= "/?city=Seoul">Seoul</a>
                <a href= "/?city=Chicago">Chicago</a>
                <a href= "/?city=Toronto">Toronto</a>
                <a href= "/?city=Shanghai">Shanghai</a>
            </nav>
            </div>
        </header>
    );
}

export default Header;