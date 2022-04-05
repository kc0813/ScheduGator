import { useState } from 'react';

function HoverBtn(props : {courseID: string, top: number, delete: () => void}) {
    const [style, setStyle] = useState({display: 'none'});
  
    return (
        <div className="hoverBtn">
            <div style={{border: '1px solid orange', width: 110, height: 20, padding: 2, margin: 1,
                         position:'absolute', left: 30, top: props.top}}
                 onMouseEnter={e => {
                     setStyle({display: 'inline'});
                 }}
                 onMouseLeave={e => {
                     setStyle({display: 'none'})
                 }}
            >
              <button className = 'inLine' style={style} onClick = {props.delete}>x</button> 
              {props.courseID}
            </div>
        </div>
    );
  }

export default HoverBtn