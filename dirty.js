'use strict'

const fs = require ('fs')
const marked = require ('marked')
const beautify = require ('js-beautify').html

const CONTENT_DIR = './site/content/'
const DIR = './site/'

function listMarkdownFiles(dir) {
    let md_files = []
    fs.readdirSync(dir).forEach( (file) => {
        md_files.push(file)
    })
    return md_files
}

function listDirtyFiles(dir) {
    let dirty_files = []
    fs.readdirSync(dir).forEach( (file) => {
        if (file.split('.')[1] === 'dirty')
            dirty_files.push(file)
    })
    console.log('Found: \n'+dirty_files)
    return dirty_files
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

function run(dirtyFiles) {
    const md = listMarkdownFiles(CONTENT_DIR)
    
    let clean = []
    dirtyFiles.forEach( (dirtyFile) => {
        let cleanPage = beautify(populatePage(fileContents(DIR+dirtyFile), md))
        let cleanName = dirtyFile.split('.')[0]+'.html'
        if (dirtyFile === cleanName) {
            console.log('Input name: '+dirtyFile+' is the same as output name: '
                    +cleanName+'\nChange input file\'s extension. Eg. \'.dirty\'')
            process.exit(1)
        }
        fs.writeFileSync(DIR+cleanName, cleanPage,'utf-8')
        console.log('Cleaned: ', dirtyFile)
    })
    
    console.log('All done :)')
}

if (process.argv[2]) {
    run([process.argv[2]])
} else {
    console.log('Looking in '+DIR)
    run(listDirtyFiles(DIR))
}