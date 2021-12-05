import req from '../utils/req.js';
const PREFIX_URL = "api/v1/layers";

/**
 * Lấy toàn bộ dữ liệu 
 * @returns danh sách dữ liệu
 * CreatedBy: NGDuong 07/11/2021
 */
export const getGeoDatas = () =>
    req.get(`https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
export const getGeoDatas2 = () =>
    req.get(`http://203.162.10.117:6080/arcgis/rest/services/MapHYServices/MapServer/1/query?returnGeometry=true&where=1%3D1&outSR=4326&outFields=*&inSR=4326&geometry=%7B%22xmin%22%3A105.46875%2C%22ymin%22%3A20.632784250388028%2C%22xmax%22%3A106.171875%2C%22ymax%22%3A21.289374355860424%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&resultType=tile&f=json`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
/**
 * Lấy toàn bộ dữ liệu 
 * @returns danh sách dữ liệu
 * CreatedBy: NGDuong 07/11/2021
 */
export const getAll = () =>
    req.get(PREFIX_URL)
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));

/**
 * Lấy dữ liệu theo tìm kiếm, phân trang, sắp xếp
 * @param {object} filterData chuỗi json filter
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

/**
* Xóa một layer
* @param {uuid} id mã layer  
* @returns true/false
* CreatedBy: NGDuong (08/11/2021)
*/
export const deleteItemByID = (id) =>
    req.delete(`${PREFIX_URL}/${id}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy thông tin theo ID
* @param {uuid} id  
* @returns true/false
* CreatedBy: NGDuong (08/11/2021)
*/
export const getItemByID = (id) =>
    req.get(`${PREFIX_URL}/${id}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
/**
* Lấy mã mới
* @param {}  
* @returns 
* CreatedBy: NGDuong (08/11/2021)
*/
export const getNewCode = (tableName, fieldName) =>
    req.get(`${PREFIX_URL}/GetNewCode?tableName=${tableName}&fieldName=${fieldName}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
/**
* Lưu thông tin layer
* @param {object, boolean}  
* @returns 
* CreatedBy: NGDuong (08/11/2021)
*/
export const saveItem = (data, isInsert = true) =>
    req({
        url: isInsert ? `${PREFIX_URL}` : `${PREFIX_URL}/${data.id}`,
        data: data,
        method: isInsert ? 'POST' : 'PUT'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
