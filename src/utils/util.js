//utility methods

import { SORT_ASC } from "../constants";

export const getUrlsForPoints = (api, points, start, end) => {
    points = points || [];

    return points.map((point) => {
        return `${api}${point}?start=${start}&end=${end}`;
    });
};

// sort data - should sorting be batched? This can get expensive
export const sortPoints = (data, sortDirection) => {

    let sorted;

    if (sortDirection === SORT_ASC) {
        sorted = data.sort((a, b) => {
            return a.timestamp - b.timestamp;
        });
    } else {
        sorted = data.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
    }

    return sorted;
};

export const addRow = (point, el, sortDirection, append) => {
    const rowIndex = (append || (sortDirection === 'asc')) ? -1 : 0;
    let newRow = el.insertRow(rowIndex);
    addCell(newRow, 0, point.id);
    addCell(newRow, 1, getStringDate(point.timestamp));
    addCell(newRow, 2, point.value);
};

const addCell = (newRow, index, value) => {
    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(index);
    // Append a text node to the cell
    let newText = document.createTextNode(value);
    newCell.appendChild(newText);
};

export const removeRow = (el, sortDirection) => {
    const rowIndex = (sortDirection === 'asc') ? 0 : -1;
    let newRow = el.deleteRow(rowIndex);
};

export const getStringDate = (timestamp) => {
    return new Date(timestamp).toISOString();
};

