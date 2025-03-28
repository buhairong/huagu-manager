import instance from "@/api";
import url from "@/api/url";

export function getCarBrandList(data) {
    return instance({
        url: url['getCarBrandList'],
        method: 'POST',
        data
    })
}

// export function user(data) {
//     return instance({
//         url: url['getCarBrandList'],
//         method: 'GET',
//         params: data
//     })
// }

// export function home(data) {
//     return instance({
//         url,
//         method: 'POST',
//         data
//     })
// }

export function login(data) {
    return instance({
        url: url['login'],
        method: 'POST',
        data
    })
}