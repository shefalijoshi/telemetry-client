// Gets data for specified points

import { getUrlsForPoints } from "../utils/util";
import { HISTORY_API } from "../constants";

export const get_data = async (points, start, end) => {
    //TODO: try/catch
    //for each point, get the url
    const urls = getUrlsForPoints(HISTORY_API, points, start, end);
    let pointData = [];
    //for each url get the data
    const promises = urls.map((url) => {
        return fetch(url, {method: 'get', mode: 'cors'}).then((response) => {
            return response.json();
        })
    });
    const dataList = await Promise.all(promises)
                    .then(data => {
                        return data;
                    });
    //return the combined the data
    dataList.forEach((data) => {
       pointData = pointData.concat(data);
    });
    return pointData;
};
