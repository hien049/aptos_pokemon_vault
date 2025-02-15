import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
import { FormEvent, useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard.tsx";
import AddCollectionForm from "@/components/AddCollectionForm.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { MODULE_ADDRESS, pokeData } from "@/constants.ts";
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

export function PokemonCollectionContainer() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [pokemonCollection, setPokemonCollection] = useState<string[] | null>(null);
  const [collectionName, setCollectionName] = useState("");
  const moduleAddress = MODULE_ADDRESS;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function getPokemonList() {
    setIsLoading(true);
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::my_module::get_pokemon_collection`,
      functionArguments: [account?.address],
    };
    try {
      const response = (await aptos.view({ payload })) as string[];
      if (response.length >= 0) {
        setPokemonCollection(response);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try after sometime",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::my_module::initialize_pokemon_collection`,
        functionArguments: [collectionName],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      getPokemonList();
      toast({
        title: "Success",
        description: "Collection" + " added",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try after sometime",
      });
    }
  }

  async function addPokemon(name: string) {
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::my_module::add_${name}`,
        functionArguments: [],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      getPokemonList();
      toast({
        title: "Success",
        description: name + " added",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try after sometime",
      });
    }
  }

  useEffect(() => {
    if (account) {
      getPokemonList();
    }
  }, [account]);

  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium bg-rose-400 p-2 text-4xl text-center text-white rounded-lg">Pokemon Collection</h4>
      {isLoading ? (
        <>
          <p className={"text-pink-800 text-2xl"}>Loading...</p>
        </>
      ) : pokemonCollection ? (
        <>
          <h3 className={"capitalize text-2xl font-bold bg-pink-800 text-white w-fit rounded-lg p-2 mx-auto"}>
            <span className={"text-pink-200"}>Collection Name:</span>{" "}
            <span className={"italic bg-pink-300 p-1 rounded-xl inline-block text-pink-950 text-2xl"}>
              {pokemonCollection[0]}
            </span>
          </h3>
          <div className={"grid grid-cols-4 gap-3"}>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                const pokemon = pokeData[index];
                return (
                  <PokemonCard
                    index={index}
                    pokemon={pokemon}
                    pokeCount={pokemonCollection[index + 1]}
                    onClick={() => addPokemon(pokemon.name)}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <AddCollectionForm
          handleSubmit={handleSubmit}
          collectionName={collectionName}
          setCollectionName={setCollectionName}
        />
      )}
    </div>
  );
}
