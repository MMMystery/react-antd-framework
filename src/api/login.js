/**
 * Created by hayzroyanghuanzhou on 2018/12/4.
 */
import request from '../utils/request';


export function IO_Login(params) {
    return request('/api/v1/auth/login', {
        method: 'POST',
        body: {
            ...params,
        },
    });
}