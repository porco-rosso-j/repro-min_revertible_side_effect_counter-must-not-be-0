`No bytecode found at` error with v0.81.0

### Logs

sandbox log

```bash
[11:21:11.195] WARN: simulator:public_tx_context SETUP phase reverted! 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa:0xd5441b0d failed with reason: Error: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting...
[11:21:11.195] WARN: simulator:public_tx_context Setup phase reverted! The transaction will be thrown out.
[11:21:11.196] WARN: simulator:public-processor Failed to process tx 0x19a7085fedc85a7c5746d261f083516cfae92c6fd906da5de5e47efa0cb2f990: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting... Simulation error: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting...
at 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa.undefined
[11:21:11.196] INFO: simulator:public-processor Processed 0 successful txs and 1 failed txs in 0.007891416013240815s {"duration":0.007891416013240815,"rate":0,"totalPublicGas":{"daGas":0,"l2Gas":0},"totalBlockGas":{"daGas":0,"l2Gas":0},"totalSizeInBytes":0}
[11:21:11.196] WARN: node Simulated tx 0x19a7085fedc85a7c5746d261f083516cfae92c6fd906da5de5e47efa0cb2f990 fails: Error: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting... {"txHash":"0x19a7085fedc85a7c5746d261f083516cfae92c6fd906da5de5e47efa0cb2f990"}
[11:21:11.197] WARN: pxe:service Could not find function artifact in contract EcdsaKAccount for function 'undefined' when enriching error callstack
[11:21:11.198] WARN: cli Error in JSON RPC server call pxe_simulateTx: [Simulation error: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting...
at EcdsaKAccount.undefined] {
  originalMessage: 'No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting...',
  functionErrorStack: [
    {
      contractAddress: AztecAddress<0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa>,
      functionName: 'undefined',
      contractName: 'EcdsaKAccount'
    }
  ],
  revertData: [],
  noirErrorStack: [],
  aztecContext: '\n' +
    'Context:\n' +
    'TxExecutionRequest(0x0000000000000000000000000000000000000000000000000000000000000004 called 0xea92cc40)\n' +
    'simulatePublic=true\n' +
    'msgSender=undefined\n' +
    'skipTxValidation=true\n' +
    'profile=false\n' +
    'scopes=undefined',
  headers: { 'Access-Control-Allow-Origin': '*', vary: 'Origin' },
  [cause]: AvmRevertReason [Error]: No bytecode found at: 0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa. Reverting...
      at AvmSimulator.handleFailureToRetrieveBytecode (file:///usr/src/yarn-project/simulator/dest/public/avm/avm_simulator.js:170:30)
      at async AvmSimulator.execute (file:///usr/src/yarn-project/simulator/dest/public/avm/avm_simulator.js:71:20)
      at async PublicTxSimulator.simulateEnqueuedCallInternal (file:///usr/src/yarn-project/simulator/dest/public/public_tx_simulator/public_tx_simulator.js:247:31)
      at async PublicTxSimulator.simulateEnqueuedCall (file:///usr/src/yarn-project/simulator/dest/public/public_tx_simulator/public_tx_simulator.js:218:24)
      at async PublicTxSimulator.simulatePhase (file:///usr/src/yarn-project/simulator/dest/public/public_tx_simulator/public_tx_simulator.js:186:40)
      at async PublicTxSimulator.simulateSetupPhase (file:///usr/src/yarn-project/simulator/dest/public/public_tx_simulator/public_tx_simulator.js:122:16)
      at async PublicTxSimulator.simulate (file:///usr/src/yarn-project/simulator/dest/public/public_tx_simulator/public_tx_simulator.js:63:37)
      at async PublicProcessor.processTxWithPublicCalls (file:///usr/src/yarn-project/simulator/dest/public/public_processor/public_processor.js:341:91)
      at async PublicProcessor.processTxWithinDeadline (file:///usr/src/yarn-project/simulator/dest/public/public_processor/public_processor.js:296:20)
      at async elapsed (file:///usr/src/yarn-project/foundation/dest/timer/elapsed.js:8:20) {
    failingFunction: {
      contractAddress: AztecAddress<0x27f65a6c49754c60ee89613e4bbedc74a2cf2df9be8796b07372a8a686d448aa>,
      functionName: 'undefined',
      contractName: 'EcdsaKAccount'
    },
    noirCallStack: []
  }
}

```
