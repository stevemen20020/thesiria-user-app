import { useEffect, useState } from "react";
import ApiService from "../../shared/services/apiService";
import { createSocket } from "../../shared/services/socketService";

const ViewModel = () => {
  const [socket, setSocket] = useState(null);

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
    console.log('BATTLE', BATTLE)
    setEnemies(BATTLE.npc_enemies)

    const characterIndex = BATTLE.players.findIndex(character => character.id === 3)

    console.log('PLAYERS', BATTLE.players[characterIndex])
    setCharacter(BATTLE.players[characterIndex])
    setAttacks(BATTLE.players[characterIndex].attacks)
  }

  return {
    enemies,
    attacks,
    inventory,
    character
  };
};

export default ViewModel;
