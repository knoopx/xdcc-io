export function humanFileSize(size) {
  if (size > 0) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }
  return '0.00MB'
}

export function binaryInsert(array, cmp = (a, b) => a - b) {
  return (current) => {
    let left = 0
    let right = array.length - 1

    while (left <= right) {
      const middle = (left + right) / 2 | 0
      const result = cmp(array[middle], current)
      if (result > 0) {
        right = middle - 1
        continue
      }

      left = middle + 1

      if (result === 0) {
        return
      }
    }

    array.splice(left, 0, current)
  }
}
