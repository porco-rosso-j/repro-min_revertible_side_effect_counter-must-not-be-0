
/* Autogenerated file, do not edit! */

/* eslint-disable */
import {
  type AbiType,
  AztecAddress,
  type AztecAddressLike,
  CompleteAddress,
  Contract,
  type ContractArtifact,
  ContractBase,
  ContractFunctionInteraction,
  type ContractInstanceWithAddress,
  type ContractMethod,
  type ContractStorageLayout,
  type ContractNotes,
  decodeFromAbi,
  DeployMethod,
  EthAddress,
  type EthAddressLike,
  EventSelector,
  type FieldLike,
  Fr,
  type FunctionSelectorLike,
  L1EventPayload,
  loadContractArtifact,
  loadContractArtifactForPublic,
  type NoirCompiledContract,
  NoteSelector,
  Point,
  type PublicKey,
  PublicKeys,
  type Wallet,
  type U128Like,
  type WrappedFieldLike,
} from '@aztec/aztec.js';
import EcdsaKAccountContractArtifactJson from '../contracts/ecdsa_k_account_contract/target/ecdsa_k_account_contract-EcdsaKAccount.json' assert { type: 'json' };
export const EcdsaKAccountContractArtifact = loadContractArtifact(EcdsaKAccountContractArtifactJson as NoirCompiledContract);



/**
 * Type-safe interface for contract EcdsaKAccount;
 */
export class EcdsaKAccountContract extends ContractBase {
  
  private constructor(
    instance: ContractInstanceWithAddress,
    wallet: Wallet,
  ) {
    super(instance, EcdsaKAccountContractArtifact, wallet);
  }
  

  
  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(
    address: AztecAddress,
    wallet: Wallet,
  ) {
    return Contract.at(address, EcdsaKAccountContract.artifact, wallet) as Promise<EcdsaKAccountContract>;
  }

  
  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]) {
    return new DeployMethod<EcdsaKAccountContract>(PublicKeys.default(), wallet, EcdsaKAccountContractArtifact, EcdsaKAccountContract.at, Array.from(arguments).slice(1));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeys(publicKeys: PublicKeys, wallet: Wallet, signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]) {
    return new DeployMethod<EcdsaKAccountContract>(publicKeys, wallet, EcdsaKAccountContractArtifact, EcdsaKAccountContract.at, Array.from(arguments).slice(2));
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof EcdsaKAccountContract['methods']>(
    opts: { publicKeys?: PublicKeys; method?: M; wallet: Wallet },
    ...args: Parameters<EcdsaKAccountContract['methods'][M]>
  ) {
    return new DeployMethod<EcdsaKAccountContract>(
      opts.publicKeys ?? PublicKeys.default(),
      opts.wallet,
      EcdsaKAccountContractArtifact,
      EcdsaKAccountContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }
  

  
  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return EcdsaKAccountContractArtifact;
  }

  /**
   * Returns this contract's artifact with public bytecode.
   */
  public static get artifactForPublic(): ContractArtifact {
    return loadContractArtifactForPublic(EcdsaKAccountContractArtifactJson as NoirCompiledContract);
  }
  

  public static get storage(): ContractStorageLayout<'public_key'> {
      return {
        public_key: {
      slot: new Fr(1n),
    }
      } as ContractStorageLayout<'public_key'>;
    }
    

  public static get notes(): ContractNotes<'EcdsaPublicKeyNote'> {
    return {
      EcdsaPublicKeyNote: {
          id: new NoteSelector(0),
        }
    } as ContractNotes<'EcdsaPublicKeyNote'>;
  }
  

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public declare methods: {
    
    /** constructor(signing_pub_key_x: array, signing_pub_key_y: array) */
    constructor: ((signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** entrypoint(app_payload: struct, fee_payload: struct, cancellable: boolean) */
    entrypoint: ((app_payload: { function_calls: { args_hash: FieldLike, function_selector: FunctionSelectorLike, target_address: AztecAddressLike, is_public: boolean, is_static: boolean }[], nonce: FieldLike }, fee_payload: { function_calls: { args_hash: FieldLike, function_selector: FunctionSelectorLike, target_address: AztecAddressLike, is_public: boolean, is_static: boolean }[], nonce: FieldLike, is_fee_payer: boolean }, cancellable: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** process_log(log_ciphertext: struct, tx_hash: field, unique_note_hashes_in_tx: struct, first_nullifier_in_tx: field, recipient: struct) */
    process_log: ((log_ciphertext: { storage: FieldLike[], len: (bigint | number) }, tx_hash: FieldLike, unique_note_hashes_in_tx: { storage: FieldLike[], len: (bigint | number) }, first_nullifier_in_tx: FieldLike, recipient: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** public_dispatch(selector: field) */
    public_dispatch: ((selector: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** sync_notes() */
    sync_notes: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** verify_private_authwit(inner_hash: field) */
    verify_private_authwit: ((inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
  };

  
}
