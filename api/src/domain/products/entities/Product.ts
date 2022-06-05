export class Product {
  private title: string

  constructor (title: string) {
    this.validate(title)
    this.title = title
  } 

  validate (title: string) {
    this.validateTitle(title)
  }

  get () {
    return Object.freeze({
      title: this.title
    })
  }

  validateTitle (title: string) {
    if (title.length < 3) throw new Error('O titulo deve ter ao menos 3 caracteres')
  }
}
