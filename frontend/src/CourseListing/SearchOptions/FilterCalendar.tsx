import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData(period: string, time: string) {
    return { period, time };
}

// Create table rows (periods)
const rows = [
    createData("1", "7:25 - 8:15"),
    createData("2", "8:30 - 9:20"),
    createData("3", "9:35 - 10:25"),
    createData("4", "10:40 - 11:30"),
    createData("5", "11:45 - 12:35"),
    createData("6", "12:50 - 1:40"),
    createData("7", "1:55 - 2:45"),
    createData("8", "3:00 - 3:50"),
    createData("9", "4:05 - 4:55"),
    createData("10", "5:10 - 6:00"),
    createData("11", "6:15 - 7:05"),
    createData("12", "7:20 - 8:10"),
    createData("13", "8:20 - 9:10"),
    createData("14", "9:20 - 10:10"),
];

function FilterCalendar() {
    return(
        <TableContainer component={Paper}>
        <Table size="small">
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.period} style={{height:"20px"}}>
                    <TableCell style={{padding:0}}></TableCell>
                    <TableCell style={{padding:0}}></TableCell>
                    <TableCell style={{padding:0}}></TableCell>
                    <TableCell style={{padding:0}}></TableCell>
                    <TableCell style={{padding:0}}></TableCell>
                    <TableCell style={{padding:0}}></TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default FilterCalendar