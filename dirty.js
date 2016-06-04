'use strict'

const fs = require ('fs')
const marked = require ('marked')

const CONTENT_DIR = './site/content/'
const DIR = './site/'

function listMarkdownFiles(dir) {
    let md_files = []
    fs.readdirSync(dir).forEach( (file) => {
        md_files.push(file)
    })
    return md_files
}

function fileContents(file) {
    return fs.readFileSync(file, 'utf-8') || false
}

function populatePage(page, sections) {
    console.log('message');
    sections.forEach( (s) => {
        let md = marked(fileContents(CONTENT_DIR+s))
        page = page.split('{{{'+s+'}}}').join(md)
    })
    return page
}

function run(dirtyFile) {
    const md = listMarkdownFiles(CONTENT_DIR)
    const dirty = fileContents(DIR+dirtyFile)
    const clean = dirty ? populatePage(dirty, md) : 'Error processing page :('
    const cleanName = dirtyFile.split('.')[0]+'.html'
    if (dirtyFile === cleanName)
        console.log('Input name: '+dirtyFile+' is the same as output name: '
                    +cleanName+'\nChange input file\'s extension. Eg. \'.dirty\'')
    fs.writeFileSync(DIR+cleanName, clean,'utf-8')
    console.log('All done :)')
}

run(process.argv[2])