import { cloneDeep } from 'lodash'
import traverser from './traverser'

export default function transformer(ast) {
    let clonedAst = cloneDeep(ast)
    let newAst = {
        type: 'HTML',
        body: []
    }

    clonedAst._context = newAst.body

    traverser(clonedAst, {
        'TextNode': {
            enter: function ({ value }, parent) {
                parent._context.push({
                    type: 'TextNode',
                    value
                })
            }
        },
        'EOL': {
            enter: function (node, parent) {
                parent._context.push({
                    type: 'Tag',
                    name: 'br'
                })
            }
        },
        'HeaderTag': {
            enter: function (node, parent) {
                node._context = []
                parent._context.push({
                    type: 'Tag',
                    name: `h${Math.min(node.value.length, 6)}`,
                    body: node._context
                })
            }
        },
        'BoldTag': {
            enter: function (node, parent) {
                node._context = []
                parent._context.push({
                    type: 'Tag',
                    name: 'strong',
                    body: node._context
                })
            }
        },
        'ItalicTag': {
            enter: function (node, parent) {
                node._context = []
                parent._context.push({
                    type: 'Tag',
                    name: 'em',
                    attrs: [
                        {
                            name: 'class',
                            value: 'italic'
                        }
                    ],
                    body: node._context
                })
            }
        },
        'LinkTag': {
            enter: function (node, parent) {
                node._context = []
                parent._context.push({
                    type: 'Tag',
                    name: 'a',
                    attrs: [
                        {
                            name: 'href',
                            value: node.value
                        }
                    ],
                    body: node._context
                })
            }
        }
    })

    return newAst
}
