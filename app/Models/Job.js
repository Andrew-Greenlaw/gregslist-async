
export class Job {
  /**
   * @param {{id?: string, company: string, jobTitle: string, hours: number, rate: number, description: string}} data
   */
  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }

  get JobCardTemplate() {
    return/*html*/`
    <div class="col-md-4 col-lg-3">
      <div class="card">
        <div class="card-body">
          <h3>${this.company} | ${this.jobTitle}</h3>
          <p><strong>${this.hours}hrs /Week</strong> </p>
          <p> <Strong>$${this.rate} /Hour</Strong></p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer">
        <button class="btn text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">EDIT</button>
        <button class="btn" onclick="app.jobsController.deleteJob('${this.id}')">DELETE</button>
        </div>
      </div>
    </div>
    `
  }

  static getJobButton() {

    return /*html*/ `
    <button class="btn btn-outline-light" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.addJob()">👷‍♂️ Add Job</button>
    `

  }
  /**@param {Job} [editable] */
  static getJobForm(editable) {

    editable = editable || new Job({ company: '', jobTitle: '', hours: 40, rate: 80, description: '' })



    return/*html*/`
    <form onsubmit="app.jobsController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="company" required minlength="2" maxlength="20" value="${editable.company}">
          <label for="company">Company</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="jobTitle" required value="${editable.jobTitle}">
          <label for="jobTitle">Job Title</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="hours" required min="0" max="80" value="${editable.hours}">
          <label for="hours">Hours</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="rate" required min="0" value="${editable.rate}">
          <label for= "rate">Rate/hr</label>
        </div >

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description}</textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
        </div>
      </form >
      `
  }




}
