import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { saveState } from "../Utils/Store.js"
import { SandboxServer } from "./AxiosService.js"

class JobsService {
  setActiveJob(id) {
    const job = appState.jobs.find(j => j.id == id)
    if (!job) {
      throw new Error('This is a bad id')
    }
    appState.activeJob = job
    console.log('what is the active car', appState.activeJob)
  }
  editJob(formData) {
    throw new Error("Method not implemented.")
  }
  async getJobs() {

    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
  }

  constructor() {
  }
  async addJob(formData) {
    // TODO call to the server

    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('what is the respnse when I create a job?', res)
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]


    // let job = new Job(formData)
    // appState.jobs = [job, ...appState.jobs]
    // saveState('jobs', appState.jobs)
  }
}
export const jobsService = new JobsService()