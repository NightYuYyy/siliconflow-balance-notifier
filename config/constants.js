// config/constants.js
export const config = {
    API_KEY: process.env.API_KEY || '',
    BALANCE_CHECK_URL: 'https://api.siliconflow.cn/v1/user/info',
    extraHeaders: {
        'accept-language': 'zh-CN,zh;q=0.9',
        'sec-ch-ua': '"Chromium";v="136"'
    }
};
