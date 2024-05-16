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
    playable_character_journal:'playable_character_journal'
  }

  //-------------------------------------------------------//
  //--------------COMMO METHODS----------------------------//
  //-------------------------------------------------------//

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
}

export default ApiService