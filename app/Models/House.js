export class House {

  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.price = data.price
    this.description = data.description
    this.year = data.year
  }
  get HouseCardTemplate() {
    return/*html*/`
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img src="${this.imgUrl}" alt="${this.price}" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
            ${this.price} 
          </h5>
            <h3 class="text-uppercase">
              ${this.bedrooms} bed | ${this.bathrooms} bath | ${this.levels} stories
            </h3>
          <p>
            <strong>$ ${this.price}</strong>
          </p>
          <p><b>${this.year}</b></p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }
  static getHouseButton() {
    return/*html*/`
    <button class="btn btn-outline-light" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.housesController.addHouse()">🏠 Add House</button>
    `
  }
  /**@param {House} [editable] */
  static getHouseForm(editable) {
    editable = editable || new House({ description: '', price: 0, imgUrl: '', levels: 0, bathrooms: 0, bedrooms: 0, year: 2022 })

    return/*html*/`
      <form onsubmit="app.housesController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bedrooms" required min="0" value="${editable.bedrooms}">
          <label for="bedrooms">Bedrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bathrooms" min="0" required value="${editable.bathrooms}">
          <label for="bathrooms">Bathrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="levels" required min="0" max="9999" value="${editable.levels}">
          <label for="levels">Levels</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="100" max="9999" value="${editable.year}">
          <label for="year">Year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="price" required min="0" value="${editable.price}">
          <label for="price">Price</label>
        </div>

        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="imgUrl" value="${editable.imgUrl}">
          <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description}</textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>
`
  }
}
