import { configService } from 'src/config/config.service';

import Web3 from 'web3';
import { keccak256 } from 'web3-utils';

export const getWeb3 = (): Web3 => {
  const url = 'http://localhost:8545';
  const provider = new Web3.providers.HttpProvider(url);
  return new Web3(provider);
};

export const sign = async (payload: string): Promise<any> => {
  try {
    const { signature } = await getWeb3().eth.accounts.sign(
      keccak256(payload),
      configService.getPrivateKey(),
    );
    return signature;
  } catch (error) {
    throw new Error(
      'Could not unlock the access provider account (web3.eth.personal.unlockAccount).',
    );
  }
};

export const encodeParameters = (
  types: Array<any>,
  values: Array<any>,
): string => {
  try {
    return getWeb3().eth.abi.encodeParameters(types, values);
  } catch (error) {
    console.log(error);
    throw new Error('encode error');
  }
};

export const verifySignature = (
  payload: string,
  signature: string,
): boolean => {
  try {
    const _web3 = getWeb3();
    const signer: string = _web3.eth.accounts.recover(
      keccak256(payload),
      signature,
    );
    const { address } = _web3.eth.accounts.privateKeyToAccount(
      configService.getPrivateKey(),
    );

    if (signer == address) return true;
    else false;
  } catch (error) {
    console.log(error);
    throw new Error('verifySignature error');
  }
};

export const getECDSASignatureSigner = (payload: string, signature: string): string => {
  try {
    const _web3 = getWeb3();
    const signer: string = _web3.eth.accounts.recover(
      keccak256(payload),
      signature,
    );
    return signer;
  } catch (error) {
    console.log(error);
    throw new Error('signaturesigner error');
  }
};
