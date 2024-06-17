class ApiService {

  //-------------------------------------------------------//
  //------------------GLOBAL VARIABLES---------------------//
  //-------------------------------------------------------//

  // URL = `${process.env.EXPO_PUBLIC_API_DEVELOPMENT}${process.env.EXPO_PUBLIC_API_VERSION_1}`
  URL = `${process.env.EXPO_PUBLIC_API_PRODUCTION}${process.env.EXPO_PUBLIC_API_VERSION_1}`

  endpoints = {
    playable_character:'playable_character',
    mission_journal:'mission_journal',
    mission_fases: 'mission_fases',
    missions: 'missions',
    playable_character_journal: 'playable_character_journal',
    npc:'npc',
    playable_character_journal:'playable_character_journal',
    inventory: 'inventory',
    inventoryWeapon: 'inventory_weapon',
    inventoryArmor: 'inventory_armor',
    giftMoney:'gift-money',
    giftItem: 'gift-inventory',
    transferWeapon: 'transfer-weapon',
    transferArmor: 'transfer-armor',
    attack: 'attack'
  }

  //-------------------------------------------------------//
  //--------------COMMON METHODS---------------------------//
  //-------------------------------------------------------//

  getAllPlayableCharacters = async() => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.playable_character}`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  putPlayableCharacter = async(body, id_playable_character) => {
    try{
      const response = await fetch(`${this.URL}${this.endpoints.playable_character}/${id_playable_character}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  putInventory = async (body, id_inventory) => {
    try{
      const response = await fetch(`${this.URL}${this.endpoints.inventory}/${id_inventory}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  //-------------------------------------------------------//
  //--------------FUNCTIONS FOR AUTH-----------------------//
  //-------------------------------------------------------//

  //-------------------------------------------------------//
  //--------------FUNCTIONS FOR JOURNAL--------------------//
  //-------------------------------------------------------//

  getMissionJournalByPlayerId = async(playable_character_id) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.mission_journal}?playable_character_id=${playable_character_id}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  getMissionJournalById = async(id_mission_journal) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.mission_journal}/${id_mission_journal}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  getNPCJournalByPlayerId = async(playable_character_id) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.playable_character_journal}?playable_character_id=${playable_character_id}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  getNPCJournalById = async(id_npc_journal) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.playable_character_journal}/${id_npc_journal}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch ( error ) {
      return error;
    }
  }

  //-------------------------------------------------------//
  //-----------FUNCTIONS FOR CHARACTER SHEET---------------//
  //-------------------------------------------------------//

  getPlayerById = async (id_player) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.playable_character}/${id_player}`, {

        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  getSpecificInventory = async (id_player, id_object) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventory}?id_playable_character=${id_player}&id_object=${id_object}`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  upgradeWeapon = async (id_inventory_weapon, body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryWeapon}/${id_inventory_weapon}`, {
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  upgradeArmor = async (id_inventory_armor, body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryArmor}/${id_inventory_armor}`, {
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  patchInventory = async (body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventory}`, {
        method: 'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  getInventory = async (id_user) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventory}?id_playable_character=${id_user}`, {
        method:'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  getWeapons = async (id_user) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryWeapon}?id_playable_character=${id_user}`, {
        method:'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  getArmors = async (id_user) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryArmor}?id_playable_character=${id_user}`, {
        method:'GET'
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  giftMoney = async (body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.playable_character}/${this.endpoints.giftMoney}`, {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  giftItem = async(body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventory}/${this.endpoints.giftItem}`, {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }
  
  giftWeapon = async(body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryWeapon}/${this.endpoints.transferWeapon}`, {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  giftArmor = async(body) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.inventoryArmor}/${this.endpoints.transferArmor}`, {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }

  //-------------------------------------------------------//
  //-----------FUNCTIONS FOR ATTACKS-----------------------//
  //-------------------------------------------------------//

  getMyAttacks = async(id_user) => {
    try {
      const response = await fetch(`${this.URL}${this.endpoints.attack}?id_playable_character=${id_user}`, {
        method:'GET',
      })
      if (!response.ok) {
        throw {status: response.status, message:'Error' };
      }
      return response.json()
    } catch (error) {
      return error;
    }
  }
}

export default ApiService