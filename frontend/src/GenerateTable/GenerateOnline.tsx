import {Typography, TableRow, TableCell} from "@material-ui/core";

export function GenerateOnline(
    props: {
        courseID: string, 
        colorMap: Map<string, string>,
        height: number
    }
){
        let color: string | undefined = props.colorMap.get(props.courseID)
        let relHeight: string = props.height.toString() + "vh"
            
        return(
            <TableRow style={{height: relHeight}}>
                <TableCell
                    style={{width: "12%", fontSize: "1.75vh"}}>
                    <b>Online</b>
                </TableCell>

                <TableCell
                    align="center"
                    padding="none"
                    scope="row" 
                    style={{width: "12%", fontSize: 12, background: color}}
                    colSpan={6}>
                    <Typography style={{ color: "white" }}>
                        {props.courseID}
                    </Typography>
                    
                </TableCell>
            </TableRow>
            );
}

export default GenerateOnline;