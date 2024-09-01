import { useEffect, useState } from "react"
import ApiService from "../../shared/services/apiService"

const ViewModel = () => {
  const [npcs, setNpcs] = useState([])

  const apiService = new ApiService()

  useEffect(() => {
    const fetchNpc = async() => {
      const response = await apiService.getAllNpcCharacters()
      setNpcs(response.result)
    }

    fetchNpc()
    .catch(error => console.log(error))
  },[])

  return {
    npcs
  }
}

export default ViewModel