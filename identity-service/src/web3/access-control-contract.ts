import { HttpStatus } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { throwException } from 'src/utils/utils.service';

import { AbiItem, keccak256 } from 'web3-utils';
import { getWeb3 } from './web3.';

const ADMIN_LOGIN_ROLE = keccak256("ADMIN_LOGIN_ROLE");

export const hasAdminLoginRole = async (address: string): Promise<boolean> => {
  if (await hasRole(ADMIN_LOGIN_ROLE, address) == true) {
    return true;
  } else
    throwException('No Role Found', HttpStatus.UNAUTHORIZED);
}

async function hasRole(role, user): Promise<boolean | void> {
  try {
    const _web3 = getWeb3();
    const _accessControl = new _web3.eth.Contract(abi, configService.getContract('ACCESSCONTROL'));
    return await _accessControl.methods.hasRole(role, user).call();
  } catch (error) {
    console.error(error);
    throwException('hasRole error', HttpStatus.UNAUTHORIZED);
  }
}

const abi: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]