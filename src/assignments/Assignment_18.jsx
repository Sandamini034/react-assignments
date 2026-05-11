import {useState, useEffect} from 'react';


function Assignment_18(){
    const [colors, setColors]= useState(["blue"]);;

    function addColor(){
        const number = Math.random();
        console.log(number);
        const color = number < 0.5 ? "blue" : "red";
        setColors(prev=>{
            const newColors = [...prev];
            newColors.unshift(color);
            return newColors;
        });

    }
    useEffect(()=>{
        const interval = setInterval(addColor, 1000);
        return () => clearInterval(interval);
    },[]);

    return(
        <div className="colorMixer1">
            <div style={{ display: 'flex' , flexWrap:`wrap`}}>  {}
        {colors.map((color, index) => (
            <div key={index} style={{
                backgroundColor: color,  
                width: '50px',
                height: '50px',
            }}>
            </div>
        ))}
    </div>
        </div>
    )
}

export default Assignment_18;   