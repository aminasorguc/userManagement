import { React } from "react";
import { Input } from "semantic-ui-react";

export function DefaultFilterForColumn({
 column: {
   filterValue,
   preFilteredRows: { length },
   setFilter,
 },
}) {
 return (
   <Input
     value={filterValue || ""}
     onChange={(e) => {
       setFilter(e.target.value || undefined);
     }}
     placeholder={`Search ${length} records..`}
     style={{ marginTop: "10px" }}
   />
 );
}