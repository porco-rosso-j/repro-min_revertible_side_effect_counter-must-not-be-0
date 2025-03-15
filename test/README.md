## `min_revertible_side_effect_counter must not be 0` reproduction

This error happens when the account contract is deployed in the following way:

1. `construcotr` calls a public internal method.
2. account is deployed using `DefaultMultiCallEntryPoint` using account manager.

Note this doesn't occur if you deploy the account using another deployed account as deployer, e.g. test shcnorr account in sandbox.

### Reproduction steps

1. Run `pnpm i`
2. Run `pnpm test`

### Logs

test log

```bash
 FAIL  test/test.test.ts > E2E Batcher setup > should successfully deploy ecdsa k account
Error: Error 500 from server http://localhost:8080 on pxe_simulateTx: Circuit execution failed: min_revertible_side_effect_counter must not be 0
 ❯ defaultFetch node_modules/.pnpm/@aztec+foundation@0.76.1/node_modules/@aztec/foundation/src/json-rpc/client/fetch.ts:63:13
 ❯ retry node_modules/.pnpm/@aztec+foundation@0.76.1/node_modules/@aztec/foundation/src/retry/index.ts:57:14
 ❯ node_modules/.pnpm/@aztec+foundation@0.76.1/node_modules/@aztec/foundation/src/json-rpc/client/fetch.ts:86:12
 ❯ request node_modules/.pnpm/@aztec+foundation@0.76.1/node_modules/@aztec/foundation/src/json-rpc/client/safe_json_rpc_client.ts:45:35
 ❯ DeployAccountMethod.proveInternal node_modules/.pnpm/@aztec+aztec.js@0.76.1_typescript@5.8.2_zod@3.24.2/node_modules/@aztec/aztec.js/src/contract/base_contract_interaction.ts:53:32
 ❯ node_modules/.pnpm/@aztec+aztec.js@0.76.1_typescript@5.8.2_zod@3.24.2/node_modules/@aztec/aztec.js/src/contract/base_contract_interaction.ts:82:31
 ❯ DeployAccountSentTx.waitForReceipt node_modules/.pnpm/@aztec+aztec.js@0.76.1_typescript@5.8.2_zod@3.24.2/node_modules/@aztec/aztec.js/src/contract/sent_tx.ts:100:20
 ❯ DeployAccountSentTx.wait node_modules/.pnpm/@aztec+aztec.js@0.76.1_typescript@5.8.2_zod@3.24.2/node_modules/@aztec/aztec.js/src/contract/sent_tx.ts:67:21
 ❯ DeployAccountSentTx.wait node_modules/.pnpm/@aztec+aztec.js@0.76.1_typescript@5.8.2_zod@3.24.2/node_modules/@aztec/aztec.js/src/account_manager/deploy_account_sent_tx.ts:37:21
```

sandbox log

```bash
aztec-1     | [13:56:43.374] INFO: aztecjs:utils:watcher Slot 467 was missed, jumped to next slot
aztec-1     | [13:56:45.372] INFO: pxe:service Simulating transaction execution request to 0xea92cc40 at 0x0000000000000000000000000000000000000000000000000000000000000004 {"origin":"0x0000000000000000000000000000000000000000000000000000000000000004","functionSelector":"0xea92cc40","simulatePublic":true,"chainId":"0x0000000000000000000000000000000000000000000000000000000000007a69","version":"0x0000000000000000000000000000000000000000000000000000000000000001","authWitnesses":[]}
aztec-1     | [13:56:45.789] ERROR: pxe:service Error: Error: Circuit execution failed: min_revertible_side_effect_counter must not be 0
aztec-1     |     at module.exports.__wbg_constructor_a10f2b77c63b8d5e (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:646:17)
aztec-1     |     at acvm_js::js_execution_error::JsExecutionError::new::ha17452420ab10d5c (wasm://wasm/009399f2:wasm-function[653]:0x123731)
aztec-1     |     at acvm_js::execute::ProgramExecutor<B>::execute_circuit::{{closure}}::hee8c002e0b28ffa8 (wasm://wasm/009399f2:wasm-function[89]:0x60dc9)
aztec-1     |     at acvm_js::execute::execute_program_with_native_program_and_return::{{closure}}::hd6b43ec46240ad05 (wasm://wasm/009399f2:wasm-function[364]:0xeca50)
aztec-1     |     at acvm_js::execute::execute_program_with_native_type_return::{{closure}}::h52c71f27836bbfce (wasm://wasm/009399f2:wasm-function[561]:0x1154dc)
aztec-1     |     at wasm_bindgen_futures::future_to_promise::{{closure}}::{{closure}}::h2e063ef25d237c8d (wasm://wasm/009399f2:wasm-function[295]:0xd781f)
aztec-1     |     at wasm_bindgen_futures::queue::Queue::new::{{closure}}::hc9750bc69f09fd8d (wasm://wasm/009399f2:wasm-function[729]:0x12df31)
aztec-1     |     at wasm_bindgen::convert::closures::invoke1_mut::h6c5376bbe1ce2f74 (wasm://wasm/009399f2:wasm-function[2355]:0x180305)
aztec-1     |     at __wbg_adapter_22 (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:220:10)
aztec-1     |     at real (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:205:20) {
aztec-1     |   callStack: [ '0.1795', '0.7312', '0.16588' ],
aztec-1     |   rawAssertionPayload: { selector: '10529075911881641908', data: [] },
aztec-1     |   brilligFunctionId: 0
aztec-1     | }
aztec-1     | [13:56:45.789] WARN: cli Error in JSON RPC server call pxe_simulateTx: Error: Circuit execution failed: min_revertible_side_effect_counter must not be 0
aztec-1     |     at module.exports.__wbg_constructor_a10f2b77c63b8d5e (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:646:17)
aztec-1     |     at acvm_js::js_execution_error::JsExecutionError::new::ha17452420ab10d5c (wasm://wasm/009399f2:wasm-function[653]:0x123731)
aztec-1     |     at acvm_js::execute::ProgramExecutor<B>::execute_circuit::{{closure}}::hee8c002e0b28ffa8 (wasm://wasm/009399f2:wasm-function[89]:0x60dc9)
aztec-1     |     at acvm_js::execute::execute_program_with_native_program_and_return::{{closure}}::hd6b43ec46240ad05 (wasm://wasm/009399f2:wasm-function[364]:0xeca50)
aztec-1     |     at acvm_js::execute::execute_program_with_native_type_return::{{closure}}::h52c71f27836bbfce (wasm://wasm/009399f2:wasm-function[561]:0x1154dc)
aztec-1     |     at wasm_bindgen_futures::future_to_promise::{{closure}}::{{closure}}::h2e063ef25d237c8d (wasm://wasm/009399f2:wasm-function[295]:0xd781f)
aztec-1     |     at wasm_bindgen_futures::queue::Queue::new::{{closure}}::hc9750bc69f09fd8d (wasm://wasm/009399f2:wasm-function[729]:0x12df31)
aztec-1     |     at wasm_bindgen::convert::closures::invoke1_mut::h6c5376bbe1ce2f74 (wasm://wasm/009399f2:wasm-function[2355]:0x180305)
aztec-1     |     at __wbg_adapter_22 (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:220:10)
aztec-1     |     at real (/usr/src/noir/packages/acvm_js/nodejs/acvm_js.js:205:20) {
aztec-1     |   callStack: [ '0.1795', '0.7312', '0.16588' ],
aztec-1     |   rawAssertionPayload: { selector: '10529075911881641908', data: [] },
aztec-1     |   brilligFunctionId: 0,
aztec-1     |   headers: { 'Access-Control-Allow-Origin': '*', vary: 'Origin' }
aztec-1     | }
```
