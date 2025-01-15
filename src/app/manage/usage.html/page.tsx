import { getUsage } from "@/lib/usage";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { dateFormat } from "@/lib/dateFormat";

export default function Usage() {
    const entries = getUsage();

    console.log('entries', entries.length, entries);

    entries.forEach((e) => console.log(e[1]));

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>URL</TableCell>
                    <TableCell>First Seen</TableCell>
                    <TableCell>Last Seen</TableCell>
                    <TableCell>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map(([url, entry]) => (
                    <TableRow key={url}>
                        <TableCell>{url}</TableCell>
                        <TableCell>{`${dateFormat(entry.value.firstSeen)}`}</TableCell>
                        <TableCell>{`${dateFormat(entry.value.lastSeen)}`}</TableCell>
                        <TableCell>{`${entry.value.count}`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
