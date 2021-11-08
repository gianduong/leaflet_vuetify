import req from '../utils/req.js';
const PREFIX_URL = "api/v1/inventoryItems";

/**
 * Lấy toàn bộ dữ liệu 
 * @returns danh sách dữ liệu
 * CreatedBy: NGDuong 07/11/2021
 */
export const getGeoDatas = () =>
    req.get(`https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson`)
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
        
/**
 * Lấy dữ liệu theo tìm kiếm, phân trang, sắp xếp
 * @param {object} filterData 
 * @returns danh sách
 * CreatedBy: NGDuong 07/11/2021
 */
 export const getPaging = (filterData) =>
 req({
     url: `${PREFIX_URL}/GetPaging`,
     data: filterData,
     method: 'POST'
 })
     .then(res => Promise.resolve(res.data))
     .catch(err => Promise.reject(err));
