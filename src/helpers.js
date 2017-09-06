class Main extends Array {
    constructor(query) {
        super()
        const collection = typeof query === 'string'
            ? document.querySelectorAll(query)
            : (query instanceof Array || query instanceof NodeList ? query : [query])

        this.map.call(collection, (element, index) => this[index] = element)
    }

    html = function (html = '') {
        this.map(el => el.innerHTML = html)
        return this
    }

    text = function (text = '') {
        this.map(el => el.textContent = text)
        return this
    }

    value = function (value) {
        return value
            ? this.map(el => el.value = value)
            : this[0].value
    }

    on = function (type, callback) {
        this.map(el => el.addEventListener(type, callback))
    }
}

export const $ = (query) => new Main(query)
export const ls = window.localStorage
