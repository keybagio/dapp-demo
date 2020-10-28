import SimpleKeyring from 'eth-simple-keyring'
import {
  testKey,
  timeout,
} from '@/config/eth-config'
import {
  checkMatch,
} from './common'

const keyring = new SimpleKeyring([testKey]);

const MetaMaskTasks = [
  {
    name: 'SimpleKeyring signMessage',
    msg: '我是签名的原始内容',
    exspectResult: '0x639c6e61cdab2a6fa4a3775faf6026e1623a3da380044df07918b2191586c16b28b3a49847b18607cece1f8a88205771fb7333b12e86ac83eb8b648679374db51c',
    test: (task) => {
      return new Promise((resolve, reject) => {
        const address = window.web3.eth.accounts[0];
        const msg = window.web3.sha3(task.msg); // 以太坊中SHA3是指Keccak256
        keyring.signMessage(address, msg).then((response) => {
          checkMatch(response, task.exspectResult, resolve, reject);
        })
        setTimeout(() => reject('timeout'), timeout);
      });
    }
  },
]

export default MetaMaskTasks;