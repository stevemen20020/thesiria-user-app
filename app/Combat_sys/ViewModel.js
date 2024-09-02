import { useEffect, useState } from "react";
import ApiService from "../../shared/services/apiService";
import { createSocket } from "../../shared/services/socketService";

const ViewModel = () => {
  const [socket, setSocket] = useState(null);

  const [showAttackDrawer, setShowAttackDrawer] = useState(false)

  const [enemies, setEnemies] = useState([]);
  const [attacks, setAttacks] = useState([])
  const [inventory, setInventory] = useState([])
  const [character, setCharacter] = useState([])

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
    setEnemies(BATTLE.npc_enemies)

    const characterIndex = BATTLE.players.findIndex(character => character.id === 3)

    setCharacter(BATTLE.players[characterIndex])

    parseAttacks(BATTLE.players[characterIndex].attacks)
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

    console.log(attacksData)
    setAttacks(attacksData);
  }

  const showAttacks = () => {
    setShowAttackDrawer(!showAttackDrawer)
  }

  return {
    enemies,
    attacks,
    inventory,
    character,
    showAttackDrawer,
    showAttacks
  };
};

export default ViewModel;
