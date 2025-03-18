import {
	AuthWitness,
	AuthWitnessProvider,
	CompleteAddress,
	ContractArtifact,
	loadContractArtifact,
	PXE,
} from "@aztec/aztec.js";
import { Ecdsa } from "@aztec/foundation/crypto";
import { Fr } from "@aztec/aztec.js";

import { AccountManager } from "@aztec/aztec.js";
import { EcdsaKAccountContractArtifact } from "../artifacts/EcdsaKAccount";
import { Salt } from "@aztec/aztec.js/account";
import { DefaultAccountContract } from "@aztec/accounts/defaults";

export function getEcdsaKAccount(
	pxe: PXE,
	secretKey: Fr,
	signingPrivateKey: Buffer,
	salt?: Salt
): Promise<AccountManager> {
	return AccountManager.create(
		pxe,
		secretKey,
		new EcdsaKAccountContract(signingPrivateKey),
		salt
	);
}

/** Creates auth witnesses using ECDSA signatures. */
class EcdsaKAuthWitnessProvider implements AuthWitnessProvider {
	constructor(private signingPrivateKey: Buffer) {}

	async createAuthWit(messageHash: Fr): Promise<AuthWitness> {
		const ecdsa = new Ecdsa();
		const signature = await ecdsa.constructSignature(
			messageHash.toBuffer(),
			this.signingPrivateKey
		);
		return Promise.resolve(
			new AuthWitness(messageHash, [...signature.r, ...signature.s])
		);
	}
}

/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 * This abstract version does not provide a way to retrieve the artifact, as it
 * can be implemented with or without lazy loading.
 */
export abstract class EcdsaKBaseAccountContract extends DefaultAccountContract {
	constructor(private signingPrivateKey: Buffer) {
		super();
	}

	async getDeploymentFunctionAndArgs() {
		const signingPublicKey = await new Ecdsa().computePublicKey(
			this.signingPrivateKey
		);
		return {
			constructorName: "constructor",
			constructorArgs: [
				signingPublicKey.subarray(0, 32),
				signingPublicKey.subarray(32, 64),
			],
		};
	}

	getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider {
		return new EcdsaKAuthWitnessProvider(this.signingPrivateKey);
	}
}

/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export class EcdsaKAccountContract extends EcdsaKBaseAccountContract {
	constructor(signingPrivateKey: Buffer) {
		super(signingPrivateKey);
	}
	override getContractArtifact(): Promise<ContractArtifact> {
		return Promise.resolve(EcdsaKAccountContractArtifact);
	}
}
