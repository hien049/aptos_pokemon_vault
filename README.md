# APTOS Pokemon Collection APP

Users can login via wallet, for creating pokemon collection, provide name for their collection

Add pokemon to their PokemonCollection resource.

- PokeVault dApp [link](https://aptos-pokemon-collection.vercel.app/)

- Contract deployed on testnet: [link](https://explorer.aptoslabs.com/account/0x1801bcc65720aef077114d769829df91a5305ac737cc9e0d4cee1b441e23e8e2/modules/code/my_module?network=testnet)

## Smart Contract
- Deployed on Testnet
- Move language
- Struct and entry function for global storage and manipulating the resource
- View function for getting collection data
- Test for checking different scenarios

```move
/*
    Struct for adding rersource to user collection
    contains a name - collection name
    pokemon count
*/
    struct PokemonCollection has key {
    name: String,
    pikachu: u64,
    squirtle: u64,....}


/*
    For initializing pokemon collection
    Contains check for returning error if already intilzised
*/
     public entry fun initialize_pokemon_collection(account: &signer, name: String){}

/*
    individual entry functions for updating Pokemon code, throws Error uf not initialized 
*/
    public entry fun add_pikachu(acc: &signer) acquires PokemonCollection {}


/*
    View function for getting PokemonCollection resource of address
*/
    #[view]
    public fun get_pokemon_collection(addr: address): (String, u64, u64, u64,u64,u64,u64,u64,u64,u64,u64) acquires PokemonCollection{}

/*
Test case for testing over all flow
*/
    #[test(acc = @0x1234)]
    public entry fun test_happy_case(acc: &signer) acquires PokemonCollection{}
```

## Frontend
- React
- Tailwind for UI
- Aptos TS SDK for calling smart contract functions
- Wallet adapter for connecting to wallet
- Toast Notification
- Loading State

## Social Link
- [Twitter](https://x.com/ayushagarwal027)
- [Portfolio](https://ayush-website.netlify.app/)

`Contract address : 0x1801bcc65720aef077114d769829df91a5305ac737cc9e0d4cee1b441e23e8e2`