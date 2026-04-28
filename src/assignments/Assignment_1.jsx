import "./Assignment_1.css";
import {useState} from "react";

function Assignment_1() {

    const [section, setSection] = useState(0);

    const handleClick = (sectionNumber) => {
        setSection(sectionNumber);
    }

    const renderSection = () => {
        switch(section) {
            case 1:
                return <pre>{`
                I'm sitting here in a boring room
                It's just another rainy Sunday afternoon
                I'm wasting my time, I got nothing to do
                I'm hanging around, I'm waiting for you
                But nothing ever happens and I wonder
                
                I'm driving around in my car
                I'm driving too fast, I'm driving too far
                I'd like to change my point of view
                I feel so lonely, I'm waiting for you
                But nothing ever happens and I wonder
                
                I wonder how, I wonder why
                Yesterday you told me 'bout the blue blue sky
                And all that I can see
                Is just a yellow lemon tree`}</pre>;
            case 2:
                return <pre>{`
                I'm turning my head up and down
                I'm turning, turning, turning, turning, turning around
                And all that I can see is just another lemon tree
                
                Sing: dah
                Da da da da da - di da dah
                Da da da da da - di dah dah
                Da di di di dah
                
                I'm sitting here, I miss the power
                I'd like to go out, taking a shower
                But there's a heavy cloud inside my head
                I feel so tired, put myself into bed
                Well nothing ever happens and I wonder
                
                Isolation is not good for me
                Isolation
                I don't want to sit on a lemon tree
                `}
                </pre>;
            case 3:
                return <pre>{`
                I'm steppin' around in the desert of joy
                Baby, anyhow I'll get another toy
                And everything will happen and you'll wonder
                
                I wonder how, I wonder why
                Yesterday you told me 'bout the blue blue sky
                And all that I can see is just another lemon tree
                I'm turning my head up and down
                I'm turning, turning, turning, turning, turning around
                And all that I can see is just a yellow lemon tree
                
                And I wonder, wonder
                
                I wonder how, I wonder why
                Yesterday you told me 'bout the blue blue sky
                And all that I can see
                And all that I can see
                And all that I can see is just a yellow lemon tree
                `}</pre>;
            default:
                return null;
        }
    }


    return (
        <div className="container">
            <div className="Assignment_1">
            <h1>Lemon Tree</h1>
            <button onClick={()=>handleClick(1)}>Section #1</button>
            <br></br>
            <button onClick={()=>handleClick(2)}>Section #2</button>
            <br></br>
            <button onClick={()=>handleClick(3)}>Section #3</button>
            {renderSection()}
            </div>
        </div>
    );
}

export default Assignment_1;