var ethUtil = require('ethereumjs-util')
const ethereum = window.ethereum;
const web3 = window.web3;
const testAddress = '0x7D2bCd53CFf1d7aE9c232338AA64D262cBe89a30';
const testKey = '5a1f2cf0a6fafca3997c1b3916fa9ea12a65764972a217ddb6cea2070dfe76e6';
const timeout = 8000;
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

/**
 * 任务类型：
 * 1. checkExist() —— 检测对象是否存在
 * 2. return Promise —— then获取成功值，catch获取失败原因，如 ethereum.request
 * 3. callback(err, response) —— 通过回调返回结果，第一个参数是错误原因，第二个参数是数据，如 ethereum.sendAsync
 * 4. checkMatch() —— 检测获取到的值是否与预期相符
 */
const tasks = [
  {
    name: 'eth_sendTransaction #1 非标准ERC20合约函数',
    test: () => {
      return new Promise((resolve, reject) => {
        const address = web3.eth.accounts[0];
        const msg = [
          {
            from: address,
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            gas: '0x4baa6',
            value: '0x38d7ea4c68000',
            data: ''
          }
        ]
        const method = 'eth_sendTransaction';
        web3.currentProvider.sendAsync({
          method,
          msg,
          from: address,
        }, (err, response) => {
          console.log('eth_sendTransaction', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`eth_sendTransaction => ${response.result}`);
            checkMatch(response.result, '0x3f8bf9120d935c802de4d0de4ab5815bc13ca80c9403ffa6c5555cb859ef7a280fb600b1ad6b8f9bc442d7d546b5f0f4159198c6846ec53691c3be34f5d27b911b', resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    }
  },
  {
    name: 'checkExist(window.ethereum)',
    test: () => checkExist(window.ethereum)
  },
  {
    name: 'checkExist(window.web3)',
    test: () => checkExist(window.web3)
  },
  {
    name: 'checkExist(web3.eth.accounts[0])',
    test: () => checkExist(web3.eth.accounts[0])
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
        setTimeout(() => reject('timeout'), timeout);
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
  {
    name: 'web3.eth.sign',
    test: () => {
      return new Promise((resolve, reject) => {
        const address = web3.eth.accounts[0];
        const msg = '0x12345678';
        web3.eth.sign(address, msg, (err, result) => {
          console.log('web3.eth.sign', err, result);
          if (err) {
            reject(err);
          } else {
            console.log(`web3.eth.sign - ${msg} => ${result}`);
            // checkMatch(result, '222', resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    desc: '待签名信息：0x12345678',
  },
  {
    name: '签名：personal_sign',
    test: () => {
      return new Promise((resolve, reject) => {
        const address = web3.eth.accounts[0];
        const msg = ethUtil.bufferToHex(Buffer.from('我是签名的内容', 'utf8'));
        const method = 'personal_sign';
        const params = [msg, address];
        web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：personal_sign', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：personal_sign => ${response.result}`);
            checkMatch(response.result, '0x7141cd351448bb73215ba4db28e7d426545fd35a7a9df43e90d4dd26cbb8034a64f4a46fe36813a010e98ece915ee8203bade68c4124c266e88afe979ca726521b', resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    desc: `
      测试地址: ${testAddress}
      测试密钥: ${testKey}
      测试消息: 我是签名的内容
      预期结果: 0x7141cd351448bb73215ba4db28e7d426545fd35a7a9df43e90d4dd26cbb8034a64f4a46fe36813a010e98ece915ee8203bade68c4124c266e88afe979ca726521b
    `,
  },
  {
    name: '签名：eth_signTypedData',
    test: () => {
      return new Promise((resolve, reject) => {
        const address = web3.eth.accounts[0];
        const msg = [
          {
            type: 'string',
            name: 'Message',
            value: 'Hi, Alice!'
          },
          {
            type: 'uint32',
            name: 'A number',
            value: '1337'
          }
        ]
        const method = 'eth_signTypedData';
        const params = [msg, address];
        web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：eth_signTypedData', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：eth_signTypedData => ${response.result}`);
            checkMatch(response.result, '0x3f8bf9120d935c802de4d0de4ab5815bc13ca80c9403ffa6c5555cb859ef7a280fb600b1ad6b8f9bc442d7d546b5f0f4159198c6846ec53691c3be34f5d27b911b', resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    desc: `
      测试地址: ${testAddress}
      测试密钥: ${testKey}
      测试消息: [
        {
          type: 'string',
          name: 'Message',
          value: 'Hi, Alice!'
        },
        {
          type: 'uint32',
          name: 'A number',
          value: '1337'
        }
      ]
      预期结果: 0x3f8bf9120d935c802de4d0de4ab5815bc13ca80c9403ffa6c5555cb859ef7a280fb600b1ad6b8f9bc442d7d546b5f0f4159198c6846ec53691c3be34f5d27b911b
    `,
  },
  {
    name: '签名：eth_signTypedData_v3',
    test: () => {
      return new Promise((resolve, reject) => {
        const address = web3.eth.accounts[0];
        const msg = JSON.stringify({types:{
          EIP712Domain:[
            {name:"name",type:"string"},
            {name:"version",type:"string"},
            {name:"chainId",type:"uint256"},
            {name:"verifyingContract",type:"address"}
          ],
          Person:[
            {name:"name",type:"string"},
            {name:"wallet",type:"address"}
          ],
          Mail:[
            {name:"from",type:"Person"},
            {name:"to",type:"Person"},
            {name:"contents",type:"string"}
          ]
        },
        primaryType:"Mail",
        domain:{name:"Ether Mail",version:"1",chainId:"1",verifyingContract:"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},
        message:{
          from:{name:"Cow",wallet:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},
          to:{name:"Bob",wallet:"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},
          contents:"Hello, Bob!"}
        });
        const method = 'eth_signTypedData_v3';
        const params = [address, msg];
        web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：eth_signTypedData_v3', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：eth_signTypedData_v3 => ${response.result}`);
            checkMatch(response.result, '0x9e7d129f856bc4f9e07d796fab62c4643c03445559537176acb15ebf045210025b83b3b85321e6dbb84bcb38b453cd527bcae0c3b0f7984b607dcc42bfbce3791b', resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    desc: `
      测试地址: ${testAddress}
      测试密钥: ${testKey}
      测试消息: JSON.stringify({types:{
        EIP712Domain:[
          {name:"name",type:"string"},
          {name:"version",type:"string"},
          {name:"chainId",type:"uint256"},
          {name:"verifyingContract",type:"address"}
        ],
        Person:[
          {name:"name",type:"string"},
          {name:"wallet",type:"address"}
        ],
        Mail:[
          {name:"from",type:"Person"},
          {name:"to",type:"Person"},
          {name:"contents",type:"string"}
        ]
      },
      primaryType:"Mail",
      domain:{name:"Ether Mail",version:"1",chainId:"1",verifyingContract:"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},
      message:{
        from:{name:"Cow",wallet:"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},
        to:{name:"Bob",wallet:"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},
        contents:"Hello, Bob!"}
      })
      预期结果: 0x9e7d129f856bc4f9e07d796fab62c4643c03445559537176acb15ebf045210025b83b3b85321e6dbb84bcb38b453cd527bcae0c3b0f7984b607dcc42bfbce3791b
    `,
  },
];

const ETHTasks = {
  getTasks() {
    return tasks;
  }
};


export default ETHTasks;

