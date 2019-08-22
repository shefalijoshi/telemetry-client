import { get_data } from "./apis/data";
import { connect, disconnect, subscribe, unsubscribe } from "./apis/realtime";

import {sortPoints, addRow, removeRow} from "./utils/util";
import { POINTS, SORT_ASC, SORT_DESC, CONNECTED_EVENT, RECEIVED_EVENT } from "./constants";

import "./css/style.css";

let pointsData, sortDirection = SORT_DESC, selectedPoints = POINTS;

const init = () => {
    loadData();

    addListeners();

    connect();
};

const loadData = async () => {
    let end = new Date();
    const start = (end.getTime()-(15*60*1000));

    let data = await get_data(selectedPoints, start, end.getTime());

    pointsData = sortPoints(data, sortDirection);

    showData();

};

const addListeners = () => {

    let pointSelectionEl = document.querySelector('#points');
    let sortEl = document.querySelector('.timestamp-sort');

    window.addEventListener(RECEIVED_EVENT, handlePointsData);
    window.addEventListener(CONNECTED_EVENT, handleConnected);

    pointSelectionEl.onchange = handleUpdateSelectedPoints;
    sortEl.onclick = handleUpdateSortOrder;
};

const clearData = () => {
    //remove any existing rows
    let rowEls = document.querySelectorAll('.content-body tr');
    if (rowEls && rowEls.length) {
        rowEls.forEach((rowEl => {
            rowEl.remove();
        }));
    }
};

const showData = () => {
    const tableBody = document.querySelector('.content-body');
    pointsData.forEach((point) => {
        addRow(point, tableBody, sortDirection, true);
    });
};

const subscribeToSelectedPoints = () => {
    selectedPoints.forEach((point) => {
        subscribe(point);
    });
};

const unSubscribeToSelectedPoints = () => {
    selectedPoints.forEach((point) => {
        unsubscribe(point);
    });
};

const handlePointsData = (e) => {
    const point = JSON.parse(e.detail);
    const tableBody = document.querySelector('.content-body');
    addRow(point, tableBody, sortDirection);
    removeRow(tableBody, sortDirection);
};

const handleConnected = (e) => {
    subscribeToSelectedPoints();
};

const handleUpdateSelectedPoints = (event) => {

    clearData();

    const pointSelection = event.target.options;
    let newSelectedPoints = [];


    unSubscribeToSelectedPoints();

    for (let point of pointSelection) {
        if (point.selected) {
            newSelectedPoints.push(point.value);
        }
    }
    selectedPoints = newSelectedPoints;

    loadData();

    selectedPoints.forEach((point) => {
        subscribe(point);
    });
};

const handleUpdateSortOrder = (event) => {
    const sortOrderEl = document.querySelector('.timestamp-sort');

    if (sortDirection === SORT_ASC) {
        sortOrderEl.className = 'timestamp-sort desc';
        sortDirection = SORT_DESC;
    } else {
        sortOrderEl.className = 'timestamp-sort asc';
        sortDirection = SORT_ASC;
    }

    clearData();

    loadData();

};

export const destroy = (e) => {
    window.removeEventListener('pointsDataReceived', handlePointsData);
    window.removeEventListener('pointsConnected', handleConnected);
    unSubscribeToSelectedPoints();
    disconnect();
};

window.onload = () => {
    init();
};

window.onbeforeunload = () => {
    destroy();
};
