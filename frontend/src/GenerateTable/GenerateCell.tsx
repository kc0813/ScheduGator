import {TableCell, Typography} from "@material-ui/core";
import { isPropertySignature } from "typescript";

export function GenerateCell(
  props: {
    courseID: string, 
    colorMap: Map<string, string>
  }
) {
    let color: string | undefined = "white"
    let id: string = props.courseID
    if(props.courseID == "reserved"){
      id = "";
    }
    else if (props.courseID != ""){
      color = props.colorMap.get(props.courseID)
    }   

    return (
        <TableCell
          align="center"
          padding="none"
          scope="row" 
          style={{width: "12%", height: "1vh", fontSize: 12, background: color}}>
          <Typography style={{ color: "white" }}>
              {id}
          </Typography>
        </TableCell>
      )
};

export default GenerateCell;