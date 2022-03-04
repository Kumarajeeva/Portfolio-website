import React from "react";

const Navigationdots = ({active}) => {
  return (
    <div className="app__navigation">
        {["home","about","projects","skills","testimonials","contact"].map((item,index) => (
            <a 
                href={`#${item}`} 
                key={item + index}
                className="app__navigation-dot"
                style={active===item? {backgroundColor: "#313BAC"}: {}}
            > </a>
        ))}
    </div>
  )
}

export default Navigationdots;