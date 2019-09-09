/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  203: 'NOT AUTHORIZED',
  204: 'NO CONTENT',
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  406: 'NOT ACCEPTABLE',
  410: 'DELETED',
  422: 'UNPROCESSABLE',
  500: 'INTERNAL SERVER ERROR',
  502: 'BAD GATEWAY',
  503: 'SERVICE UNAVAILABLE',
  504: 'GATEWAY TIMEOUT',
};

const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `Error ${status}: ${url}`,
    description: errortext,
  });
};

const request = extend({
  errorHandler, 
  credentials: 'include', 
});

export default request;
