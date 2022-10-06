// fix object id to string

export const fixObjectId = (obj: any): any => {
  // if is an array then loop through it
  if (Array.isArray(obj)) {
    const fixedArray = obj.map((item) => {
      const id = item._id?.$oid
      delete item._id
      return { ...item, id }
    })
    return fixedArray
  }

  // if is an object then loop through it
  if (typeof obj === 'object') {
    const id = obj._id?.$oid
    delete obj._id
    return { ...obj, id }
  }
}
