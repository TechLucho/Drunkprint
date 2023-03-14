let { databases } = require('../config');

// Base de datos Local | A implementar en el resto de archivos.
class databaseDriver {
  /**
   * @param {Object} options 
   * @param {String} options.collection
   */
  constructor(options = {}) {
    this.name_collection = options.collection;
    this.collection;

    if (options) {
      this.collection = databases[`${options.collection}`]
    };

    if (this.collection != undefined) {
      return this;
    } else {
      throw new Error("No se encuentra la base de datos especificada en el constructor")
    }
  };

  async find(query = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.find(query, (err, data) => {
        if (err) {
          //console.log(err)
          reject({ collection: this.name_collection, code: 'error', result: err })
        }

        if (data != null) {
          resolve({ collection: this.name_collection, code: true, result: data })
        } else {
          resolve({ collection: this.name_collection, code: false, result: null })
        }
      })
    })
  };

  async findOne(query = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.findOne(query, (err, data) => {
        if (err) {
          //console.log(err)
          reject({ collection: this.name_collection, code: 'error', result: err })
        }

        if (data != null) {
          resolve({ collection: this.name_collection, code: true, result: data })
        } else {
          resolve({ collection: this.name_collection, code: false, result: null })
        }
      })
    })
  };

  async add(inserted = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.insert(inserted, (err, data) => {
        if (err) {
          //console.log(err)
          reject({ collection: this.name_collection, code: 'error', result: err })
        }

        if (data != null) {
          resolve({ collection: this.name_collection, code: true, result: data })
        } else {
          resolve({ collection: this.name_collection, code: false, result: null })
        }
      })
    })
  };

  async update(query = {}, updated = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.update(query, updated, options, (err, data) => {
        if (err) {
          //console.log(err)
          reject({ collection: this.name_collection, code: 'error', result: err })
        }
        //console.log(data)

        if (data != null) {
          //console.log(data)
          if (data == 1) {
            //console.log(query)
            this.findOne(query).then((result) => {

              if (result != null) {
                resolve({ collection: this.name_collection, code: true, result: result.result })
              } else {
                resolve({ collection: this.name_collection, code: false, result: null })
              }
            }).catch((error) => {
              if (error) { reject(error) }
            })

          } else {
            resolve({ collection: this.name_collection, code: false, result: null })
          }
        } else {
          resolve({ collection: this.name_collection, code: false, result: null })
        }
      })
    })
  };

  async remove(query = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      this.collection.remove(query, options, (err, data) => {
        if (err) {
          //console.log(err)
          reject({ collection: this.name_collection, code: 'error', result: err })
        }

        if (data != null) {
          resolve({ collection: this.name_collection, code: true, result: data })
        } else {
          resolve({ collection: this.name_collection, code: false, result: null })
        }
      })
    })
  };


};

module.exports = { databaseDriver }