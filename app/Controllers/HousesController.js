import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { carsService } from "../Services/CarsService.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawHouses() {
  let template = ''
  appState.houses.forEach(h => template += h.HouseCardTemplate)
  setHTML('listings', template)
}
export class HousesController {

  constructor() {
    appState.on('houses', _drawHouses)

  }
  showHouses() {
    this.getHouses()
    setHTML('formButton', House.getHouseButton())
    setHTML('forms', House.getHouseForm())
  }
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error('[GET HOUSES]', error)
      Pop.error(error)
    }
  }
  addHouse() {
    // @ts-ignore
    appState.activeHouse = null
    const template = House.getHouseForm()
    setHTML('forms', template)
  }
  async handleSubmit() {
    debugger
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)
      if (appState.activeHouse) {
        await housesService.editHouse(formData)
      } else {
        await housesService.addHouse(formData)
      }
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[addCar or editCar]', error)
      Pop.error(error)
    }
  }
  beginEdit(id) {
    housesService.setActiveHouse(id)
    const editable = appState.activeHouse
    const template = House.getHouseForm(editable)
    setHTML('forms', template)
  }
  async deleteHouse(id) {
    try {
      const yes = await Pop.confirm('Delete This House?')
      if (!yes) { return }
      await housesService.deleteHouse(id)
    } catch (error) {
      console.log('[deleteHouse]', error)
      Pop.error(error)
    }

  }
}