import { escape } from 'lodash'

const generateTextNode = node => escape(node.value)

const generateBrNode = () => `<br />\n`

const generateTagNode = ({ name, attrs = [], body }) => {
    const attrsCode = attrs.map(({ name, value }) => ` ${name}='${value}'`).join('')
    const bodyCode = generateNodes(body)
    return `<${name}${attrsCode}>${bodyCode}</${name}>\n`
}

const generateNode = node => node.type === 'Tag'
    ? (node.name === 'br' ? generateBrNode(node) : generateTagNode(node))
    : generateTextNode(node)

const generateNodes = array => array.map(node => generateNode(node)).join('')

const codeGenerator = ({ body }) => generateNodes(body)

export default codeGenerator