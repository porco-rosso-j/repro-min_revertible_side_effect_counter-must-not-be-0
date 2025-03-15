import { beforeAll, it, describe } from "vitest";
import {
	Fr,
	PXE,
	createPXEClient,
	AccountWalletWithSecretKey,
	Fq,
	AccountManager,
} from "@aztec/aztec.js";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";
import {
	getEcdsaKAccount,
	EcdsaKAccountContract as EcdsaKAccountContractClass,
} from "./ecdsa";
import { EcdsaKAccountContract } from "../artifacts/EcdsaKAccount";

export const SANDBOX_URL = "http://localhost:8080";
export const L1_RPC_URL = "http://localhost:8545";
export const TIMEOUT = 300_000;

let pxe: PXE;
let deployer: AccountWalletWithSecretKey;

beforeAll(async () => {
	pxe = createPXEClient(SANDBOX_URL);
	deployer = (await getDeployedTestAccountsWallets(pxe))[0];
	console.log("deployer address: ", deployer.getAddress());
}, TIMEOUT);

describe("E2E Batcher setup", () => {
	it("should fail to deploy ecdsa k account", async () => {
		const accountManager: AccountManager = await getEcdsaKAccount(
			pxe,
			Fr.random(),
			Fq.random().toBuffer()
		);

		await accountManager.deploy().wait();
	});

	// walkaround
	it("should successfully deploy ecdsa k account with deployer", async () => {
		const ecdsaSigningPrivateKey = Fq.random().toBuffer();
		const ecdsaKAccountContractClass = new EcdsaKAccountContractClass(
			ecdsaSigningPrivateKey
		);

		const SALT = 1;

		const accountManager: AccountManager = await getEcdsaKAccount(
			pxe,
			Fr.random(),
			ecdsaSigningPrivateKey,
			SALT
		);

		await accountManager.register();

		const args = (await ecdsaKAccountContractClass.getDeploymentArgs()) ?? [];
		const deployed = await EcdsaKAccountContract.deployWithPublicKeys(
			accountManager.getInstance().publicKeys,
			deployer,
			Array.from(args[0]),
			Array.from(args[1])
		)
			.send({
				contractAddressSalt: new Fr(SALT),
				universalDeploy: true,
			})
			.wait();

		console.log("deployed address: ", deployed.contract.address.toString());
		console.log("wallet address: ", accountManager.getAddress().toString());

		// deployed address:  0x25db21c5e2240dde2f42da660de3872823683bd73df95ab033596e0b2f2d2a03
		// wallet address:  0x25db21c5e2240dde2f42da660de3872823683bd73df95ab033596e0b2f2d2a03
	});
});
