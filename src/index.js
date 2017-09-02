import { readFile } from 'fs'
import lexer from './lexer'
import parser from './parser'
import transformer from './transformer'

readFile('README.md', 'utf8', (err, data) => {

    const tokens = lexer(data)
    const markdownAst = parser(tokens)
    const htmlAst = transformer(markdownAst)

    console.log(JSON.stringify(htmlAst, null, 2))
})