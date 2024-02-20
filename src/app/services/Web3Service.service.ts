// import { Injectable } from '@angular/core';
// import Web3 from 'web3';
// import { WindowRef } from './windowService.service';
// declare let require: any;
// declare let window: any;

// @Injectable()
// export class Web3Service {
//   private contractAddress = '0x8BD210896F7e773ea6EafB9A15551fa02A4de8F9';
//   private _account: string = '';

//   public ABI = [
//     {
//       inputs: [
//         { internalType: 'address', name: 'vrfCoordinatorV2', type: 'address' },
//         { internalType: 'uint64', name: 'subscriptionId', type: 'uint64' },
//         { internalType: 'bytes32', name: 'gasLane', type: 'bytes32' },
//         { internalType: 'uint256', name: 'interval', type: 'uint256' },
//         { internalType: 'uint256', name: 'entranceFee', type: 'uint256' },
//         { internalType: 'uint32', name: 'callbackGasLimit', type: 'uint32' },
//       ],
//       stateMutability: 'nonpayable',
//       type: 'constructor',
//     },
//     {
//       inputs: [
//         { internalType: 'address', name: 'have', type: 'address' },
//         { internalType: 'address', name: 'want', type: 'address' },
//       ],
//       name: 'OnlyCoordinatorCanFulfill',
//       type: 'error',
//     },
//     { inputs: [], name: 'Raffle__RaffleNotOpen', type: 'error' },
//     { inputs: [], name: 'Raffle__SendMoreToEnterRaffle', type: 'error' },
//     { inputs: [], name: 'Raffle__TransferFailed', type: 'error' },
//     {
//       inputs: [
//         { internalType: 'uint256', name: 'currentBalance', type: 'uint256' },
//         { internalType: 'uint256', name: 'numPlayers', type: 'uint256' },
//         { internalType: 'uint256', name: 'raffleState', type: 'uint256' },
//       ],
//       name: 'Raffle__UpkeepNotNeeded',
//       type: 'error',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'player',
//           type: 'address',
//         },
//       ],
//       name: 'RaffleEnter',
//       type: 'event',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: 'uint256',
//           name: 'requestId',
//           type: 'uint256',
//         },
//       ],
//       name: 'RequestedRaffleWinner',
//       type: 'event',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'player',
//           type: 'address',
//         },
//       ],
//       name: 'WinnerPicked',
//       type: 'event',
//     },
//     {
//       inputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
//       name: 'checkUpkeep',
//       outputs: [
//         { internalType: 'bool', name: 'upkeepNeeded', type: 'bool' },
//         { internalType: 'bytes', name: '', type: 'bytes' },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'enterRaffle',
//       outputs: [],
//       stateMutability: 'payable',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getEntranceFee',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getInterval',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getLastTimeStamp',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getNumWords',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'pure',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getNumberOfPlayers',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
//       name: 'getPlayer',
//       outputs: [{ internalType: 'address', name: '', type: 'address' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getRaffleState',
//       outputs: [
//         { internalType: 'enum Raffle.RaffleState', name: '', type: 'uint8' },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getRecentWinner',
//       outputs: [{ internalType: 'address', name: '', type: 'address' }],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'getRequestConfirmations',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       stateMutability: 'pure',
//       type: 'function',
//     },
//     {
//       inputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
//       name: 'performUpkeep',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       inputs: [
//         { internalType: 'uint256', name: 'requestId', type: 'uint256' },
//         { internalType: 'uint256[]', name: 'randomWords', type: 'uint256[]' },
//       ],
//       name: 'rawFulfillRandomWords',
//       outputs: [],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//   ];

//   private _web3: any;

//   private _tokenContract: any;
//   private _tokenContractAddress: string =
//     '0x8BD210896F7e773ea6EafB9A15551fa02A4de8F9';

//   constructor(private wService: WindowRef) {
//     if (window.web3 !== undefined) {
//       // Use Mist/MetaMask's provider
//       this._web3 = new Web3(this.wService.nativeWindow.web3.currentProvider);

//       if (this._web3.version.network !== '4') {
//         alert('Please connect to the Rinkeby network');
//       }
//     } else {
//       console.warn(
//         'Please use a dapp browser like mist or MetaMask plugin for chrome'
//       );
//     }

//     this._tokenContract = this._web3.eth
//       .contract(this.ABI)
//       .at(this._tokenContractAddress);
//   }
//   private async getAccount(): Promise<string> {
//     if (this._account == null) {
//       this._account = (await new Promise((resolve, reject) => {
//         this._web3.eth.getAccounts((err: any, accs: any) => {
//           if (err != null) {
//             alert('There was an error fetching your accounts.');
//             return;
//           }

//           if (accs.length === 0) {
//             alert(
//               "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
//             );
//             return;
//           }
//           resolve(accs[0]);
//         });
//       })) as string;

//       this._web3.eth.defaultAccount = this._account;
//     }

//     return Promise.resolve(this._account);
//   }

//   public async getUserBalance(): Promise<number> {
//     let account = await this.getAccount();

//     return new Promise((resolve, reject) => {
//       let _web3 = this._web3;
//       this._tokenContract.balanceOf.call(
//         account,
//         function (err: any, result: any) {
//           if (err != null) {
//             reject(err);
//           }

//           resolve(_web3.fromWei(result));
//         }
//       );
//     }) as Promise<number>;
//   }
// }
