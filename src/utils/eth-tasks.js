const ethereum = window.ethereum;

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
    return Promise.resolve(typeof v);
  }
}

/**
 * 任务类型：
 * 1. checkExist() —— 检测对象是否存在
 * 2. return Promise —— then获取成功值，catch获取失败原因，如 ethereum.request
 * 3. callback(err, response) —— 通过回调返回结果，第一个参数是错误原因，第二个参数是数据，如 ethereum.sendAsync
 * 4. checkMatch() —— 检测获取到的值是否与预期相符
 */
const tasks = [
  {
    name: 'checkExist(window.ethereum)',
    test: () => checkExist(window.ethereum)
  },
  {
    name: 'checkExist(window.web3)',
    test: () => checkExist(window.web3)
  },
  {
    name: 'checkExist(ethereum.isMetaMask)',
    test: () => checkExist(ethereum.isMetaMask)
  },
  {
    name: 'checkExist(ethereum.chainId)',
    test: () => checkExist(ethereum.chainId)
  },
  {
    name: 'checkExist(ethereum.networkVersion) (旧)',
    test: () => checkExist(ethereum.networkVersion)
  },
  {
    name: 'checkExist(ethereum.selectedAddress) (旧)',
    test: () => checkExist(ethereum.selectedAddress)
  },
  {
    name: 'checkExist(ethereum.isConnected())',
    test: () => checkExist(ethereum.isConnected())
  },
  {
    name: 'ethereum.enable() (旧)',
    test: () => ethereum.enable()
  },
  {
    name: 'ethereum.sendAsync({method: "eth_blockNumber"}) (旧)',
    test: () => {
      return new Promise((resolve, reject) => {
        ethereum.sendAsync({method: 'eth_blockNumber', params: []}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    }
  },
  {
    name: 'request eth_requestAccounts',
    test: () => ethereum.request({method: 'eth_requestAccounts'})
  },
  {
    name: 'request eth_accounts',
    test: () => ethereum.request({method: 'eth_accounts'})
  },
  {
    name: 'request eth_coinbase',
    test: () => ethereum.request({method: 'eth_coinbase'})
  },
  {
    name: 'request net_version',
    test: () => ethereum.request({method: 'net_version'})
  },
  {
    name: 'request eth_uninstallFilter',
    test: () => ethereum.request(req({method: 'eth_uninstallFilter', "params":["0xb"]}))
  },
];

const ETHTasks = {
  getTasks() {
    return tasks;
  }
};


export default ETHTasks;

