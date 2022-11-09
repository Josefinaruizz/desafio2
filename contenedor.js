const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombreArchivo) {
    this.Archivo = `./${nombreArchivo}.txt`
    this.contID = 1
  }

  async save(obj) {
    try {
      let text = ''
      if (!fs.existsSync(this.Archivo)) {
        obj.id = this.contID
        text = JSON.stringify([obj])
      } else {
        const content = await this.getAll()
        if (content.length > 0) {
          this.contID = content[content.length - 1].id + 1
        } else {
          this.contID = 1
        }
        obj.id = this.contID
        text = JSON.stringify([...content, obj])
      }
      await fs.promises.writeFile(this.Archivo, text)
      return obj.id
    } catch (error) {
      throw new Error(`Error al escribir el OBJETO: ${JSON.stringify(obj)} en el ARCHIVO: ${this.Archivo} \n\t Más info: ${error.message}`)
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll()
      if (content.length > 0) {
        const obj = content.find(obj => obj.id === id)
        if (obj) return obj
      }
      throw new Error(`Objecto no encontrado con ID: ${id} en el ARCHIVO: ${this.Archivo}`)
    } catch (error) {
      throw new Error(`Error al obtener el objeto con ID: ${id} del ARCHIVO: ${this.Archivo} \n\t Más info: ${error.message}`)
    }
  }
 
  async getAll() {
    try {
      if (!fs.existsSync(this.Archivo)) throw new Error(`No se puede leer el ARCHIVO: ${this.Archivo} porque no existe`)
      const content = await fs.promises.readFile(this.Archivo, 'utf-8')
      if (!content.length > 0) {
        await fs.promises.writeFile(this.Archivo, '[]')
      } else {
        const array = JSON.parse(content)
        return array
      }
      return []
    } catch (error) {
      throw new Error(`Error al leer el ARCHIVO: ${this.Archivo} \n\t Más info: ${error.message}`)
    }
  }

  async deleteById(id) {
    try {
      if (!fs.existsSync(this.Archivo)) {
        throw new Error(`No se puede eliminar el objeto con ID: ${id} del ARCHIVO: ${this.Archivo} porque no existe`)
      } else {
        const content = await this.getAll()
        if (content.length > 0) {
          const index = content.findIndex(obj => obj.id === id)
          if (index === -1) {
            throw new Error(`No se puede eliminar el objeto con ID: ${id} porque no existe en el ARCHIVO: ${this.Archivo}`)
          } else {
            content.splice(index, 1)
            const text = JSON.stringify(content)
            await fs.promises.writeFile(this.Archivo, text)
          }
        }
      }
    } catch (error) {
      throw new Error(`Error al eliminar el objeto con ID: ${id} del ARCHIVO: ${this.Archivo} \n\t Más info: ${error.message}`)
    }
  }

  async deleteAll() {
    try {
      if (!fs.existsSync(this.Archivo)) {
        throw new Error(`No se puede limpiar el ARCHIVO: ${this.Archivo} porque no existe`)
      } else {
        await fs.promises.writeFile(this.Archivo, '')
        console.log(`Se limpió el ARCHIVO: ${this.Archivo}`)
      }
    } catch (error) {
      throw new Error(`Error al limpiar el ARCHIVO: ${this.Archivo} \n\t Más info: ${error.message}`)
    }
  }
