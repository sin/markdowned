const traverseArray = (array, parent, visitor) => {
    array.forEach(child => traverseNode(child, parent, visitor))
}

const traverseNode = (node, parent, visitor) => {
    const { type, body } = node
    const { enter, exit } = visitor[type] || {}

    if (enter) enter(node, parent)
    if (body) traverseArray(body, node, visitor)
    if (exit) exit(node, parent)
}

const traverser = (ast, visitor) => {
    traverseNode(ast, null, visitor)
}

export default traverser
