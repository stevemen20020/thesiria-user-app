import { useEffect, useState } from "react";
import ApiService from "../../shared/services/apiService";
import { createSocket } from "../../shared/services/socketService";
import { Alert } from "react-native";

const ViewModel = () => {
  const [socket, setSocket] = useState(null);

  const [showAttackDrawer, setShowAttackDrawer] = useState(false)
  const [showWeaponDrawer, setShowWeaponDrawer] = useState(false)

  const [enemies, setEnemies] = useState([]);
  const [attacks, setAttacks] = useState([])
  const [inventory, setInventory] = useState([])
  const [character, setCharacter] = useState(null)

  const [currentObjective, setCurrentObjective] = useState(-1)
  const [currentObjectiveName, setCurrentObjectiveName] = useState('')

  const apiService = new ApiService();

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const socketInstance = await createSocket();
        setSocket(socketInstance);
        console.log('listening')
        socketInstance.connect();
        socketInstance.on('battle-round', values => parseSocketInfo(values.BATTLE));
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };
    console.log('starting initialization')
    if(socket === null)  initializeSocket();
   

    return () => {
      if (socket) {
        socket.off('battle-round');
        socket.disconnect();
      }
    };
  }, []);

  const parseSocketInfo = (BATTLE) => {
    console.log('BATALIA', BATTLE)

    const characterIndex = BATTLE.players.findIndex(character => character.id === 3)

    setCharacter(BATTLE.players[characterIndex])

    if(BATTLE.allied_attacks.length > 0) {
      BATTLE.allied_attacks.forEach((attack, index) => {
        if(attack.attack_type === 1) { //IF THE ATTACK IS TO AN NPC
          if (BATTLE.npc_enemies.length > 0 && attack.objective_ids !== -1) {
            const index = BATTLE.npc_enemies.findIndex(npc => npc.id === attack.objective_ids);
            let atk = BATTLE.players[characterIndex].attacks.find(a => a.id === attack.attack_id);
            
            // Crear una copia del ataque para evitar referencias mutables
            atk = { ...atk };
          
            console.log('doing...', BATTLE.players[characterIndex].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon);
            
            // Asignar el arma al ataque copiado
            atk.weapon = BATTLE.players[characterIndex].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon;
            console.log('did');
          
            if (!BATTLE.npc_enemies[index].received_attacks) {
              BATTLE.npc_enemies[index].received_attacks = [];
            }
          
            // Push del ataque clonado
            BATTLE.npc_enemies[index].received_attacks.push(atk);
          
            console.log('ATTACKED', BATTLE.npc_enemies[index].received_attacks);
          }
        } else if(attack.attack_type === 2) { //IF THE ATTACK IS TO A MONSTER
          if(BATTLE.monsters.length > 0 && attack.objective_ids !== -1) {
            const index = BATTLE.monsters.findIndex(npc => npc.id === attack.objective_ids)

            const atk = BATTLE.players[characterIndex].attacks.find(a => a.id === attack.attack_id)

            if (!BATTLE.npc_enemies[index].received_attacks) {
              BATTLE.npc_enemies[index].received_attacks = [];
            }

            BATTLE.monsters[index].received_attacks.push(atk)
          }
        }
      })
    }

    if(BATTLE.npc_enemies.length >0) setEnemies(BATTLE.npc_enemies)
    if(BATTLE.monsters.length >0) setEnemies([...enemies, BATTLE.monsters])

    parseAttacks(BATTLE.players[characterIndex].attacks)

    //console.log(BATTLE)
  }

  const parseAttacks = (attacks) => {
    const favoriteAttacks = attacks.filter(attack => attack.favorite === 1);
    const regularAttacks = attacks.filter(attack => attack.favorite === 0);

    const attacksData = [
      {
        title: "Favoritos",
        data: favoriteAttacks
      },
      {
        title: "Ataques",
        data: regularAttacks
      }
    ];
    setAttacks(attacksData);
  }

  const showAttacks = () => {
    setShowAttackDrawer(!showAttackDrawer)
  }

  const showWeapons = () => {
    setShowWeaponDrawer(!showWeaponDrawer)
  }

  const sendAttack = (id_attack, attack_objectives) => {
    const body = {
      attack_id: parseInt(id_attack),
      objective_ids: currentObjective,
      roll: Math.floor(Math.random() * 20) + 1,
      attack_type: 1
    }

    const enemyIndex = enemies.findIndex(enemy => enemy.id === currentObjective && enemy.name === enemy.name)

    if (enemies[enemyIndex] && typeof enemies[enemyIndex] === 'object' && 'biography' in enemies[enemyIndex]) {
      // Perform actions if 'biography' exists in the object
    } else {
        body.attack_type = 2;
    }

    if(attack_objectives === 1) {
      body.objective_ids = -1
    }

    if (socket) {
      socket.emit("send-attack", JSON.stringify(body));
      console.log("Attack sent", body);
    } else {
      console.error("Socket is not connected");
    }
  }

  const handleEnemyChange = (id, name) => {
    setCurrentObjective(id)
    setCurrentObjectiveName(name)
  }

  const changeWeapon = (id) => {
    console.log(id, 3)

    const body = {
      player_id: 3,
      new_weapon_id: parseInt(id)
    }

    if (socket) {
      socket.emit("weapon-swap", JSON.stringify(body));
      console.log("Weapon swapped", body);
    } else {
      console.error("Socket is not connected");
    }
  }
  
  const fleeBattle = () => {
    console.log('fleeing')
    Alert.alert('¿Deseas intentar huir de la batalla?', "Solo podrás regresar si tus compañeros mueren.",[
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel"
      },
      {
        text: 'Huir',
        style:'destructive',
        onPress:() => {
          const randomNumber = Math.floor(Math.random() * 5) + 1;
          console.log('RANDOM NUMBER')
          if(randomNumber === 5 && socket) {
            socket.emit("flee-battle", JSON.stringify(3));
          } else {
            Alert.alert('No pudiste huir', 'Severo caso de skill issue. Espera a la siguiente ronda.')
          }
        }
      }
    ])
  }

  return {
    enemies,
    attacks,
    inventory,
    character,
    showAttackDrawer,
    showWeaponDrawer,
    showAttacks,
    showWeapons,
    sendAttack,
    handleEnemyChange,
    changeWeapon,
    fleeBattle
  };
};

export default ViewModel;
