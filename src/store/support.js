import unquote from 'unquote'

export function stripColorsAndStyle(str) {
  return str.replace(/[\x0F\x02\x16\x1F]/g, '')
}

export function uint32ToIP(n) {
  const byte1 = n & 255
  const byte2 = n >> 8 & 255
  const byte3 = n >> 16 & 255
  const byte4 = n >> 24 & 255
  return `${byte4}.${byte3}.${byte2}.${byte1}`
}

export function humanSizeToBytes(value, unit) {
  switch (unit.toUpperCase()) {
    case 'G': return value * 1073741824
    case 'M': return value * 1048576
    case 'K': return value * 1024
    default: return -1
  }
}

export function parsePacket(msg) {
  const match = stripColorsAndStyle(msg).match(/(\d+)\s+(\d+)x\s+\[\s*[><]?([0-9.]+)([tgmkb]?)]\s+(.*)/i)

  if (match) {
    const [_, number, downloadCount, size, unit, name] = match
    return { number, name, size: humanSizeToBytes(size, unit), downloadCount }
  }

  return false
}

export function parseDCCSendOffer(msg) {
  const parts = stripColorsAndStyle(msg).match(/DCC SEND ([^\s"]+|"[^"]+") (\d+) (\d+) (\d+)/)
  if (parts) {
    return {
      file: unquote(parts[1]),
      ip: uint32ToIP(parseInt(parts[2], 10)),
      port: parseInt(parts[3], 10),
      size: parseInt(parts[4], 10),
    }
  }
  return null
}
