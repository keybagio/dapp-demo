import {
  testAddress,
  testKey,
  timeout,
} from '@/config/eth-config'

// 构造请求体
const req = (data) => {
  return {
    "jsonrpc": "2.0",
    "params": [],
    "id": 10,
    ...data,
  }
}

/**
 * 构造测试说明
 * @param {*} testMessage 
 * @param {*} exspectResult 
 */
const createDesc = (testMessage, exspectResult) => {
  return `
测试地址: ${testAddress}
测试密钥: ${testKey}
测试消息: ${testMessage}
预期结果: ${exspectResult} 
  `;
}

/**
 * 检测对象是否存在
 * @param {*} v 检查的对象
 * @returns 返回值（undefined | string | array | JSON object | typeof(v)）
 *  - 
 */
const checkExist = (v) => {
  if (typeof v === 'undefined') {
    return Promise.reject('undefined');
  }

  if ((typeof v === 'string') || (v instanceof Array)) {
    return Promise.resolve(v);
  }

  try {
    const strV = JSON.stringify(v, null, 2);
    return Promise.resolve(strV);
  } catch (e) {
    // JSON解析出错通过resolve返回类型
    return Promise.resolve(typeof v);
  }
}

const checkMatch = (a, b, resolve, reject) => {
  console.log('checkMatch ', a, b);
  try {
    if (a === b || JSON.stringify(a) === JSON.stringify(b)) {
      return resolve(true);
    }
  } catch (e) {
    console.log('checkMatch error', e);
  }
  return reject(false);
}

const sendTransaction = (task) => {
  return new Promise((resolve, reject) => {
    const address = window.web3.eth.accounts[0];
    const msg = task.msg;
    const method = 'eth_sendTransaction';
    const params = [msg];
    window.web3.currentProvider.sendAsync({
      method,
      params,
      from: address,
    }, (err, response) => {
      console.log('发起交易：eth_sendTransaction', err, response);
      if (err) {
        reject(err);
      } else {
        console.log(`发起交易：eth_sendTransaction => ${response.result}`);
        checkMatch(response.result, task.exspectResult, resolve, reject)
      }
    })
    setTimeout(() => reject('timeout'), timeout);
  })
}

export {
  req,
  createDesc,
  checkExist,
  checkMatch,
  sendTransaction,
}