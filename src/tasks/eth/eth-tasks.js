import * as ethUtil from 'ethereumjs-util'
import MetaMaskTasks from './eth-metamask-tasks'
import {
  timeout,
  contractAddress,
  ercData,
  eoaAddress,
  eoaData
} from '@/config/eth-config'

import {
  req,
  createDesc,
  checkExist,
  checkMatch,
  sendTransaction,
} from './common'

const getAccount = (index) => window.web3 ? window.web3.eth.accounts[index] : '';

/**
 * 任务类型：
 * 1. checkExist() —— 检测对象是否存在
 * 2. return Promise —— then获取成功值，catch获取失败原因，如 window. ethereum.request
 * 3. callback(err, response) —— 通过回调返回结果，第一个参数是错误原因，第二个参数是数据，如 window.ethereum.sendAsync
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
    name: 'checkExist(window.web3.version)',
    test: () => checkExist(window.web3.version)
  },
  {
    name: 'checkExist(window.web3.version.api)',
    test: () => checkExist(window.web3.version.api)
  },
  {
    name: 'checkExist(window.web3.eth.accounts[0])',
    test: () => checkExist(window.web3.eth.accounts[0])
  },
  {
    name: 'checkExist(window.ethereum.isMetaMask)',
    test: () => checkExist(window.ethereum.isMetaMask)
  },
  {
    name: 'checkExist(window.ethereum.chainId)',
    test: () => checkExist(window.ethereum.chainId)
  },
  {
    name: 'checkExist(window.ethereum.networkVersion) (旧)',
    test: () => checkExist(window.ethereum.networkVersion)
  },
  {
    name: 'checkExist(window.ethereum.selectedAddress) (旧)',
    test: () => checkExist(window.ethereum.selectedAddress)
  },
  {
    name: 'checkExist(window.ethereum.isConnected())',
    test: () => checkExist(window.ethereum.isConnected())
  },
  {
    name: 'checkExist(window.ethereum._metamask.isEnabled()) (旧)',
    test: () => checkExist(window.ethereum.isEnabled())
  },
  {
    name: 'window.ethereum.enable() (旧)',
    test: () => window.ethereum.enable()
  },
  {
    name: 'window.ethereum.sendAsync({method: "eth_blockNumber"}) (旧)',
    test: () => {
      return new Promise((resolve, reject) => {
        window.ethereum.sendAsync({method: 'eth_blockNumber', params: []}, (err, response) => {
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
    test: () => window.ethereum.request({method: 'eth_requestAccounts'})
  },
  {
    name: 'request eth_accounts',
    test: () => window.ethereum.request({method: 'eth_accounts'})
  },
  {
    name: 'request eth_coinbase',
    test: () => window.ethereum.request({method: 'eth_coinbase'})
  },
  {
    name: 'request net_version',
    test: () => window.ethereum.request({method: 'net_version'})
  },
  {
    name: 'request eth_uninstallFilter',
    test: () => window.ethereum.request(req({method: 'eth_uninstallFilter', "params":["0xb"]}))
  },
  {
    name: 'eth_sendTransaction - eip20 symbol',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x95d89b41"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - eip20 name',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x06fdde03"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - eip20 approve',
    msg: {
      "from": getAccount(0),
      "gas": "0xbe9f",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000000e261a4529a8f40000"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - eip20 approve data参数不合法',
    msg: {
      "from": getAccount(0),
      "gas": "0xbe9f",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - eip20 transfer',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0xa9059cbb000000000000000000000000fd01573e156026e438fd05e50bf0a0a8a6182ca50000000000000000000000000000000000000000000000000de0b6b3a7640000"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - eip20 transferFrom',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x23b872dd0000000000000000000000005c1c9ef1635dce4109199b18c7c459810641e525000000000000000000000000fd01573e156026e438fd05e50bf0a0a8a6182ca50000000000000000000000000000000000000000000000000de0b6b3a7640000"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #1 value有值，data空值',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": eoaAddress
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #2 value空值，data有值非标准erc20',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "to": eoaAddress,
      "data": eoaData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #3 value有值，data有值非标准erc20',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": eoaAddress,
      "data": eoaData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #4 value有值，data有值标准erc20',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": contractAddress,
      "data": ercData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #5 value有值，data有值标准erc20, address: contract',
    msg: {
      "from": getAccount(0),
      "gas": "0xbe9f",
      "value": "0x38d7ea4c68000",
      "to": "0x66186008c1050627f979d464eabb258860563dbe",
      "data": "0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #6 value有值，data有值标准erc20, address: EOA',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "value": "0x38d7ea4c68000",
      "to": eoaAddress,
      "data": ercData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #7 value空值，data有值标准erc20, address: EOA',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "to": eoaAddress,
      "data": ercData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #8 value空值，data有非标准erc20, address: EOA',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "to": eoaAddress,
      "data": eoaData
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: 'eth_sendTransaction - #9 value空值，data空值, address: EOA',
    msg: {
      "from": getAccount(0),
      "gas": "0x4baa6",
      "to": eoaAddress
    },
    exspectResult: '未知',
    test: (task) => sendTransaction(task),
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: '签名：window.web3.eth.sign',
    msg: '我是签名的原始内容',
    exspectResult: '0x639c6e61cdab2a6fa4a3775faf6026e1623a3da380044df07918b2191586c16b28b3a49847b18607cece1f8a88205771fb7333b12e86ac83eb8b648679374db51c',
    test: (task) => {
      return new Promise((resolve, reject) => {
        const address = getAccount(0);
        const msg = window.web3.sha3(task.msg); // 以太坊中SHA3是指Keccak256
        window.web3.eth.sign(address, msg, (err, result) => {
          if (err) {
            reject(err);
          } else {
            checkMatch(result, task.exspectResult, resolve, reject)
          }
        });
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    getDesc: (task) => createDesc(task.msg, task.exspectResult)
  },
  {
    name: '签名：personal_sign',
    msg: '我是签名的内容',
    exspectResult: '0x7141cd351448bb73215ba4db28e7d426545fd35a7a9df43e90d4dd26cbb8034a64f4a46fe36813a010e98ece915ee8203bade68c4124c266e88afe979ca726521b',
    test: (task) => {
      return new Promise((resolve, reject) => {
        const address = getAccount(0);
        const msg = ethUtil.bufferToHex(Buffer.from(task.msg, 'utf8'));
        const method = 'personal_sign';
        const params = [msg, address];
        window.web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：personal_sign', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：personal_sign => ${response.result}`);
            checkMatch(response.result, task.exspectResult, resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: '签名：eth_signTypedData',
    msg: [
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
    ],
    exspectResult: '0x3f8bf9120d935c802de4d0de4ab5815bc13ca80c9403ffa6c5555cb859ef7a280fb600b1ad6b8f9bc442d7d546b5f0f4159198c6846ec53691c3be34f5d27b911b',
    test: (task) => {
      return new Promise((resolve, reject) => {
        const address = getAccount(0);
        const msg = task.msg;
        const method = 'eth_signTypedData';
        const params = [msg, address];
        window.web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：eth_signTypedData', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：eth_signTypedData => ${response.result}`);
            checkMatch(response.result, task.exspectResult, resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
  {
    name: '签名：eth_signTypedData_v3',
    msg: {types:{
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
    },
    exspectResult: '0x9e7d129f856bc4f9e07d796fab62c4643c03445559537176acb15ebf045210025b83b3b85321e6dbb84bcb38b453cd527bcae0c3b0f7984b607dcc42bfbce3791b',
    test: (task) => {
      return new Promise((resolve, reject) => {
        const address = getAccount(0);
        const msg = JSON.stringify(task.msg);
        const method = 'eth_signTypedData_v3';
        const params = [address, msg];
        window.web3.currentProvider.sendAsync({
          method,
          params,
          from: address,
        }, (err, response) => {
          console.log('签名：eth_signTypedData_v3', err, response);
          if (err) {
            reject(err);
          } else {
            console.log(`签名：eth_signTypedData_v3 => ${response.result}`);
            checkMatch(response.result, task.exspectResult, resolve, reject)
          }
        })
        setTimeout(() => reject('timeout'), timeout);
      })
    },
    getDesc: (task) => createDesc(JSON.stringify(task.msg, null, 2), task.exspectResult)
  },
];

const ETHTasks = {
  getTasks() {
    return [
      ...tasks,
      ...MetaMaskTasks,
    ];
  }
};


export default ETHTasks;

