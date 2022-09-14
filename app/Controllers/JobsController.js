import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    appState.on('jobs', _drawJobs)
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GET JOBS]', error)
      Pop.error(error)
    }
  }

  showJobs() {
    this.getJobs()
    setHTML('forms', Job.getJobForm())
    setHTML('formButton', Job.getJobButton())

  }
  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)

      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }


      // @ts-ignore
      form.reset()

    } catch (error) {
      console.error('[addJob]', error)
    }
  }
  async addJob() {

  }
  beginEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)
    setHTML('forms', template)
  }
}