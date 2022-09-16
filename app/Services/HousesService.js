import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { SandboxServer } from "./AxiosService.js"

class HousesService {
  async deleteHouse(id) {
    await SandboxServer.delete(`/api/houses/${id}`)
    appState.houses = appState.houses.filter(h => h.id != id)
  }
  setActiveHouse(id) {
    const house = appState.houses.find(h => h.id == id)
    if (!house) {
      throw new Error('This is a bad id')
    }
    appState.activeHouse = house
    console.log('the active house', appState.activeHouse)
  }
  async editHouse(formData) {
    debugger
    const house = appState.activeHouse
    const res = await SandboxServer.put(`/api/houses/${house.id}`, formData)
    console.log('the updated edit response', res.data);
    const updatedHouse = new House(res.data)
    const index = appState.houses.findIndex(h => h.id == house.id)
    appState.houses.splice(index, 1, updatedHouse)
    appState.emit('houses')
  }
  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    console.log('what the heck is the response?', res.data)
    let house = new House(res.data)
    appState.houses = [...appState.houses, house]

  }
  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    console.log(res)
    appState.houses = res.data.map(h => new House(h))
  }

}
export const housesService = new HousesService()