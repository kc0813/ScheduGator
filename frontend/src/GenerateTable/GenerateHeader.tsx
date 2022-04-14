import {TableRow, TableCell} from "@material-ui/core";
import {days} from "../UF";
  
//Generate the top row displaying the days
export function GenerateHeader(props: {headerType:string}){

    if(props.headerType == "filter"){
        return (
            <TableRow style={{ height: "3vh" }}>
                <TableCell 
                    align="center" 
                    style={{ padding: 0, background: "lightcyan", width: "12%" }}>
                </TableCell>

                {days.map((day, key) =>
                    <TableCell 
                        key={key} 
                        style={{ padding: 0, color: "black", background: "lightcyan", fontSize: 11 }} 
                        align="center"
                    >
                        {day}
                    </TableCell>
                )}

            </TableRow>
        )
    }
    else if(props.headerType == "schedule"){
        return (
            <TableRow style={{height:"5vh"}}>
                <TableCell style={{padding:0}}></TableCell>
                    {days.map((day:string, key:number) =>
                        <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                    )}
            </TableRow>
        )
    }
    else
    {
        return(
            <TableRow style={{height:"5vh"}}>
                INVALID HEADER TYPE
            </TableRow>
        )
    }
};

export default GenerateHeader;