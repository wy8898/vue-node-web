const digitsRE = /(\d{3})(?=\d)/g

export let sum = (x, y) => {
  return x + y
}

export let minus = (m, n) => {
  return m - n
}

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}



var arr = {
  userId:"100000",
  userName:"wangyan",
  userPwd:"123456",
  addressList:[
    {
      addressId:"1",
      streetName:"广东省深圳市宝安区西乡街道",
      userName: "wangyan",
      tel:"13753068898",
      isDefault:true
    },
    {
      addressId:"2",
      streetName:"山西省太原市迎泽区",
      userName: "王艳",
      tel:"15846235982",
      isDefault:false
    },
    {
      addressId:"3",
      streetName:"北京市朝阳区朝阳公园",
      userName: "小艳子",
      tel:"13945268975",
      isDefault:false
    },
    {
      addressId:"4",
      streetName:"山西省太原市迎泽区",
      userName: "王艳",
      tel:"15846235982",
      isDefault:false
    },
    {
      addressId:"5",
      streetName:"北京市朝阳区朝阳公园",
      userName: "小艳子",
      tel:"13945268975",
      isDefault:false
    }
  ]
}
