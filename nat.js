const natpmp = require('nat-pmp')
const network = require('network')

network.get_gateway_ip((err, ip) => {
  console.log(ip)
  const client = natpmp.connect(ip)

  client.externalIp((err, info) => {
    if (err) throw err
    console.log('Current external IP address: %s', info.ip.join('.'))
  })

  client.portMapping({ private: 22, public: 2222, ttl: 3600 }, (err, info) => {
    if (err) throw err
    console.log(info)
  })
})
