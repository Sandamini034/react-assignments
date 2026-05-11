import './Assignment_17.css'
import {useState,useEffect} from 'react'

const colorMixer = (color1, color2,range) => {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
  
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const ratio = range/100;
    console.log(ratio);
    let rMixed ;
    let gMixed ;
    let bMixed ;

    if((r1+(r2-r1))<=255){
        rMixed = Math.round(r1*ratio + r2*(1-ratio)).toString(16).padStart(2, '0');
    }else{
        rMixed = 'ff';
    }

    if((g1+(g2-g1))<=255){
        gMixed = Math.round(g1*ratio + g2*(1-ratio)).toString(16).padStart(2, '0');
    }else{
        gMixed = 'ff';
    }

    if((b1+(b2-b1))<=255){
        bMixed = Math.round(b1*ratio + b2*(1-ratio)).toString(16).padStart(2, '0');
    }else{
        bMixed = 'ff';
    }

    console.log(rMixed,gMixed,bMixed);
    return `#${rMixed}${gMixed}${bMixed}`;
}

function Assignment_17(){
    const [color1, setColor1] = useState('#ff0000');
    const [color2, setColor2] = useState('#0000ff');
    const [range,setRange] = useState(0);

useEffect (() => {
    const colorDisplay = document.getElementById('colorDisplay');
    colorDisplay.style.backgroundColor = colorMixer(color1, color2, range);
}
,[color1,color2,range])

 return(
    <div className="colorBlender" style={{backgroundColor:colorMixer(color1,color2,range)}}>
        <h1>Color Blender</h1>
    <div className="colorMixer1">
        <input type="color" value={color1} onChange={(e)=>{setColor1(e.target.value)}}></input>
        <input type="color" value={color2} onChange={(e)=>{setColor2(e.target.value)}}></input>
        <input type="range" min="0" max="100" value={range} onChange={(e)=>{setRange(e.target.value)}}></input>   
    </div>
    <br></br>
        <div id="colorDisplay" style={{background:`linear-gradient(to right, ${color1},${colorMixer(color1,color2,range)},${color2})`}}></div>
    </div>
 )
}

export default Assignment_17;