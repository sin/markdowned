import { readFile } from 'fs'
import lexer from './lexer'
import parser from './parser'

readFile('markdown', 'utf8', (err, data) => {

    const tokens = lexer(data)
    const ast = parser(tokens)

    console.log(JSON.stringify(ast, null, 2))
})