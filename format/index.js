import moment from 'moment'

export const get = (object, keys, defaultVal) => {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  object = object[keys[0]]
  if (object && keys.length > 1 ) {
    return get( object, keys.slice(1))
  }
  return object === undefined ? defaultVal : object
}

export const mask = (pattern, value) => {
  let masked = ''
  value = unMask(pattern, value)
  if (!value) {
    return ''
  }
  let j = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      masked += '*'
      continue
    }
    if (j > value.length - 1) {
      return masked
    }
    if (pattern[i] === '#') {
      masked += value[j]
      j++
      continue
    }
    masked += pattern[i]
  }
  return masked
}

export const noDuplicates = (array) => {
  const a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }
  return a
}

export const unMask = (pattern, value) => {
  const chars = noDuplicates(String(pattern).replace(/[#,*]/g, '').split(''))
  return String(value).replace(new RegExp('[' + chars.join(',') + ']', 'g'), '')
}

export const parseDate = (value, format = 'DD/MM/YYYY') => {
  if (!String(value).substring(0, 10).match(/^\d{4}-\d{2}-\d{2}$/)) {
    return ''
  }
  const date = moment(value)
  if (!date.isValid()) {
    return ''
  }
  return moment(value).format(format)
}

export const formatDate = (value) => {
  return parseDate(value)
}

export const formatDateTime = (value) => {
  return parseDate(value, 'DD/MM/YYYY HH:mm')
}

export const formatBoolean = (value) => {
  let icon = 'check_box_outline_blank'
  if (value) {
    icon = 'check_box'
  }
  return '<i class="material-icons" style="margin: 0 0 0 10px; font-size: 20px; line-height: 0;">' + icon + '</i>'
}

export const formatMoney = (value) => {
  return '<div style="text-align: right;">' + money(value) + '</div>'
}

export const formatPhone = (value) => {
  let pattern = '(##) ####-####'
  if (length > 13) {
    pattern = '(##) #-####-####'
  }
  return mask(pattern, value)
}

export const money = (value, precision = 2) => {
  if (typeof value === 'undefined') {
    value = 0
  }
  value = Number(value).toFixed(precision)

  value = String(value)
    .replace(/\D/g, '')
    .replace(/(\d)(\d{11})$/, '$1.$2')
    .replace(/(\d)(\d{8})$/, '$1.$2')
    .replace(/(\d)(\d{5})$/, '$1.$2')

  return value.replace(/(\d)(\d{2})$/, '$1,$2')
}

export const formatOptions = (options) => {
  return (value) => {
    if (Array.isArray(options)) {
      const option = options.find(option => String(option.value) === String(value))
      return get(option, 'label', '')
    }
    return value
  }
}
