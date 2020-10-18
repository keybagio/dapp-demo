const ethereum = window.ethereum;
const req = (data) => {
  return {
    "jsonrpc": "2.0",
    "params": [],
    "id": 10,
    ...data,
  }
}
const tasks = [
  {
    name: 'typeof window.ethereum',
    test: () => {
      if (window.ethereum) {
        return Promise.resolve(typeof window.ethereum);
      } else {
        return Promise.reject(typeof window.ethereum);
      }
    }
  },
  {
    name: 'typeof window.web3',
    test: () => {
      if (window.web3) {
        return Promise.resolve(typeof window.web3);
      } else {
        return Promise.reject(typeof window.web3);
      }
    }
  },
  {
    name: 'ethereum.isMetaMask',
    test: () => Promise.resolve(ethereum.isMetaMask)
  },
  {
    name: 'ethereum.chainId',
    test: () => Promise.resolve(ethereum.chainId)
  },
  {
    name: 'ethereum.networkVersion (旧)',
    test: () => Promise.resolve(ethereum.networkVersion)
  },
  {
    name: 'ethereum.selectedAddress (旧)',
    test: () => Promise.resolve(ethereum.selectedAddress)
  },
  {
    name: 'ethereum.isConnected()',
    test: () => Promise.resolve(ethereum.isConnected())
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

