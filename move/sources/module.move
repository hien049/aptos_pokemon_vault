module poke_addr::my_module {
    use std::string::{String, utf8};
    use std::signer;

    const E_IS_NOT_INITIALIZED: u64 = 1;
    const E_IS_INITIALIZED: u64 = 3;

    struct PokemonCollection has key {
        name: String,
        pikachu: u64,
        squirtle: u64,
        jigglypuff: u64,
        meowth: u64,
        psyduck: u64,
        eevee: u64,
        snorlax: u64,
        mankey: u64,
        growlithe: u64,
        machop: u64,
    }

    public fun assert_uninitialized(addr: address) {
        // throw error if the PokemonCollection already exist on chain.
        assert!(!exists<PokemonCollection>(addr), 3);
    }

    public fun assert_is_initialized(addr: address) {
        // throws an error if pokemon coolection does not exits;
        assert!(exists<PokemonCollection>(addr), 1);
    }


    public entry fun initialize_pokemon_collection(account: &signer, name: String) {
        let addr = signer::address_of(account);
        assert_uninitialized(addr);
        let pokenmon_collection = PokemonCollection{
            name,
            pikachu: 0,
            squirtle: 0,
            jigglypuff: 0,
            meowth: 0,
            psyduck: 0,
            eevee: 0,
            snorlax: 0,
            mankey: 0,
            growlithe: 0,
            machop: 0,
        };
        move_to(account, pokenmon_collection);
    }

    public entry fun add_pikachu(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.pikachu = pokemon_collection.pikachu + 1;
    }

    public entry fun add_squirtle(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.squirtle = pokemon_collection.squirtle + 1;
    }

    public entry fun add_jigglypuff(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.jigglypuff = pokemon_collection.jigglypuff + 1;
    }

    public entry fun add_meowth(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.meowth = pokemon_collection.meowth + 1;
    }

    public entry fun add_psyduck(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.psyduck = pokemon_collection.psyduck + 1;
    }

    public entry fun add_eevee(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.eevee = pokemon_collection.eevee + 1;
    }

    public entry fun add_snorlax(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.snorlax = pokemon_collection.snorlax + 1;
    }

    public entry fun add_mankey(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.mankey = pokemon_collection.mankey + 1;
    }

    public entry fun add_growlithe(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.growlithe = pokemon_collection.growlithe + 1;
    }

    public entry fun add_machop(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_is_initialized(addr);
        let pokemon_collection = borrow_global_mut<PokemonCollection>(addr);
        pokemon_collection.machop = pokemon_collection.machop + 1;
    }

    #[view]
    public fun get_pokemon_collection(addr: address): (String, u64, u64, u64,u64,u64,u64,u64,u64,u64,u64) acquires PokemonCollection{
             assert_is_initialized(addr);
             let pokenmon_collection = borrow_global<PokemonCollection>(addr);
              let pikachu_count = pokenmon_collection.pikachu;
              let squirtle_count = pokenmon_collection.squirtle;
             let jigglypuff_count = pokenmon_collection.jigglypuff;
                let meowth_count = pokenmon_collection.meowth;
                let psyduck_count = pokenmon_collection.psyduck;
                let eevee_count = pokenmon_collection.eevee;
                let snorlax_count = pokenmon_collection.snorlax;
                let mankey_count = pokenmon_collection.mankey;
                let growlithe_count = pokenmon_collection.growlithe;
                let machop_count = pokenmon_collection.machop;
                (pokenmon_collection.name, pikachu_count, squirtle_count, jigglypuff_count, meowth_count, psyduck_count, eevee_count, snorlax_count, mankey_count, growlithe_count, machop_count)
    }


    #[test(acc = @0x1234)]
    public entry fun test_happy_case(acc: &signer) acquires PokemonCollection {
        let addr = signer::address_of(acc);
        assert_uninitialized(addr);

        // Initailze Pokemon Collection and check for name and pokemon count
        initialize_pokemon_collection(acc, utf8(b"John"));
        let (name,pikachu,_,_,_,_,_,_,_,_,_) = get_pokemon_collection(addr);
        assert!(name == utf8(b"John"),1);
        assert!(pikachu == 0, 1);

        // Add pickachu, check count
        add_pikachu(acc);
        let (name,pikachu,_,_,_,_,_,_,_,_,_) = get_pokemon_collection(addr);
        assert!(pikachu == 1, 1);
    }
}
