import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getErrors } from "@/lib/errorLog";
import { dateFormat } from "@/lib/dateFormat";

export default function Errors() {
    const entries = getErrors();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>When</TableCell>
                    <TableCell>Where</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Details</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry, index) => (
                    <TableRow key={`error-row-${index}`}>
                        <TableCell>{`${dateFormat(entry.date)}`}</TableCell>
                        <TableCell>{entry.catcher}</TableCell>
                        <TableCell>{entry.message}</TableCell>
                        <TableCell>LATER</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}