import { Table } from "@mui/material";
import React from "react";

export const ItemCombinationDetail = ({selectedOptionCombination}) => {
    return(
        <div className="item-combination-detail">
            <span className="item-combination-detail-header">Details</span>
            <table>
                {
                    Object.keys(selectedOptionCombination?.details || {}).map(specName => 
                    <tr>
                        <th>{specName}</th>
                        <td>{selectedOptionCombination?.details[specName]}</td>
                    </tr>)
                }
            </table>
        </div>
    );
};