import { container, markdown } from './styles.css'
import compiler from './compiler'
import { $, ls } from './helpers'
$('#app').html(`
  <div class='${container}'>
    <textarea class='editor'></textarea>
    <div class="result ${markdown}"></div>
  </div>
`)

const $result = $('.result')
const $editor = $('.editor')
const initialMarkdown = ls.getItem('markdown') || '# Hello world!'

const update = () => {
    const markdown = $editor.value()

    $result.html(compiler(markdown))
    ls.setItem('markdown', markdown)
}

$editor.value(initialMarkdown)
$result.html(compiler(initialMarkdown))
$editor.on('keyup', update)

window.$ = $
