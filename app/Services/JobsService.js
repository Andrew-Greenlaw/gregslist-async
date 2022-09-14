import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { saveState } from "../Utils/Store.js"
import { SandboxServer } from "./AxiosService.js"

class JobsService {
  async deleteJob(id) {
    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }
  setActiveJob(id) {
    const job = appState.jobs.find(j => j.id == id)
    if (!job) {
      throw new Error('This is a bad id')
    }
    appState.activeJob = job
    console.log('what is the active car', appState.activeJob)
  }
  async editJob(formData) {
    console.log('what does this look like?', formData)
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    console.log('the updated response', res)
    const updatedJob = new Job(res.data)
    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit('jobs')
  }
  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
  }

  async addJob(formData) {
    // TODO call to the server

    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('what is the response when I create a job?', res)
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
}
export const jobsService = new JobsService()