import { useState } from 'react';

function HoverBtn(
    props : {
        courseID: string, 
        top: string, 
        deletable: boolean, 
        delete: () => void, 
        color:string
    }
) {
    const [style, setStyle] = useState({display: 'none', fontSize: "2.5vh"});
    
    return (
        <div className = "hoverBtn" style={{position: "absolute", top: props.top, background: props.color}}
            onMouseEnter={e => {
                if(props.deletable)
                    setStyle({display: 'inline', fontSize: "2.5vh"});
            }}
            onMouseLeave={e => {
                setStyle({display: 'none', fontSize: "2.5vh"})
            }}
        >
        <button className = 'inLine' style={style} onClick = {props.delete}>x</button>
        {props.courseID}
        </div>
    );
}

export default HoverBtn