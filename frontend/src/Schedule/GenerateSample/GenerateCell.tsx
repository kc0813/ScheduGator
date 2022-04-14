import {TableCell, Typography} from "@material-ui/core";

export function GenerateCell(props: {courseID: string, colorMap: Map<string, string>}) {
    let color: string | undefined = "white"
    if (props.courseID != ""){
        color = props.colorMap.get(props.courseID)
    }   

    return (
        <TableCell
          align="center"
          padding="none"
          scope="row" 
          style={{width: "12%", fontSize: 12, background: color}}>
          <Typography style={{ color: "white" }}>
              {props.courseID}
          </Typography>
        </TableCell>
      )
};

export default GenerateCell;