import each from 'lodash/each'
import qs from 'query-string'

/**
 * Хэлпер для создания строки URL адреса
 * @param   {String} url            Путь
 * @param   {Object} query          Объект параметров запроса
 * @example
 * createPath('/library', { id: 1 })  // => /library?id=1
 * @returns {String}                Итоговый путь
 */
export function createPath (url, query) {
  const [ urlPath, urlQuery ] = url.split('?')

  const queryParams = qs.stringify({
  ...qs.parse(urlQuery),
    ...query
})

  return [ urlPath, queryParams ].filter(s => !!s).join('?')
}

/**
 * Хэлпер для того чтобы парсить строку запроса (location.search)
 * @param  {String} query Строка запроса
 * @return {Object}       Объект содержащий параметры запроса
 * @example
 * parseQueryString('/library?id=1')  // => { id: 1 }
 */
export function parseQueryString (query) {
  return qs.parse(query)
}

export function wrapFormFields (wrapper, formFieldsString, untouchables = []) {
  const parts = formFieldsString.split('&')
  const newFields = []
  let oldField
  let newPart
  each(parts, function (oldPart) {
    oldField = oldPart.substr(0, oldPart.indexOf('='))

    if (untouchables.includes(oldField)) {
      newPart = oldPart
    } else {
      newPart = oldPart.replace(oldField, wrapField(wrapper, oldField))
    }

    newFields.push(newPart)
  })

  return newFields.join('&')
}

function wrapField (wrapper, field) {
  return `${wrapper}[${field}]`
}

/**
 * @example
 * <div dangerouslySetInnerHTML={rawMarkup('<b>text</b>')} />
 */
export function rawMarkup (text) {
  return { __html: text }
}

export function userTypeText (teacher, pupil) {
  if (user.get('is_teacher')) {
    return teacher
  } else {
    return pupil
  }
}

export function parseByDelimeterPrice (price) {
  return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

/**
 * Функция для парсинга строки вида:
 * "— Преподаватель кафедры общей физики МФТИ <br>
 * — Старший преподаватель вечерней физико-технической школы МФТИ"
 * в массив
 *
 * @export
 * @param {any} string
 * @returns array
 */
export function parseStringListToArray (string = '') {
  return string.split(/(?:^|<br>|\n)\s*[-\u\u2010-\u2015\ufe58\ufe63\uff0d]/mg).filter(({length}) => length)
}

export const texFunctions = {
  initEvents: (_this) => {
  setTimeout(() => {
  _this.removeEvents()
  $('.toggle_element').on('click', (e) => {
    const $toggle_element = $(e.target).closest('.toggle_element')
    $toggle_element.children('.toggle_content').slideToggle()
  $toggle_element.find('.toggle_arrow').toggleClass('down')
})
}, 0)
},

removeEvents: () => {
  $('.toggle_element').off('click')
}
}

/**
 * Функция извлекает URL следующей страницы из HTTP заголовка Link
 *
 * @param  {String} link Содержимое заголовка Link
 * @return {String}      URL адрес следующей страницы или пустая строка
 *
 * @example
 *   var link = "<http://localhost:3500/api/library/pupil_courses?page=2>; rel='next'"
 *   var url = getNextPageURLFromLinkHeader(link)
 *   url === 'http://localhost:3500/api/library/pupil_courses?page=2'
 */
export function getNextPageURLFromLinkHeader (link = '') {
  const result = link.match(/<([^>]+)>/)
  return result ? result[1] : ''
}
