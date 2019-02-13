import {notification} from 'antd';
import axios from 'axios';
import { stringify } from 'qs';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `请求错误 ${response.status}: ${response.config.url}`,
        description: errortext,
    });
};


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {

    /**
     * Produce fingerprints based on url and parameters
     * Maybe url has the same parameters
     */


    const newOptions = {url, ...option};
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {

            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.data = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData

            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
            newOptions.data = newOptions.body;
        }
    }else{
        const query = stringify(newOptions.body);
        newOptions.url += `?${query}`;
        console.log(newOptions);
    }
    return axios({...newOptions})
        .then(response => { // 请求成功时
            return response.data;
        }).catch(e => { // 请求失败时
            // 检测状态码，进行错误弹窗提示
            checkStatus(e.response);
            const status = e.response.status;
            if (status === 400) {
                console.log("跳转到400页面")
                return;
            }
            if (status === 403) {
                // router.push('/exception/403');
                return;
            }
            if (status <= 504 && status >= 500) {
                // router.push('/exception/500');
                return;
            }
            if (status >= 404 && status < 422) {
                return;
            }
            return ;
        });

}
