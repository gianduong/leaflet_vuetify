import req from '../utils/req.js';
const PREFIX_URL = "api/v1/charts";

/**
* Lấy thông tin theo ID
* @param {uuid} id  
* @returns true/false
* CreatedBy: NGDuong (08/11/2021)
*/
export const getChartByID = (id) =>
    req.get(`${PREFIX_URL}/${id}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));