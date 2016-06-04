'use strict'

const fs = require ('fs')

function fileIsValid(file) {
    let type = file.split('.')[1]
    return type === 'md' || type === 'mmd'
}

function listMarkdownFiles(dir) {
    let md_files = []

    fs.readdirSync(dir).forEach( (file) => {
        if (fileIsValid(file))
            md_files.push(file)
    })

    return md_files
}

function fileContents(file) {
    return fs.readFileSync(file, 'utf-8')
}

function markdown(file) {
    md = fs.readFileSync(file, 'utf-8')
}

function popolatePage(page, sections) {
    sections.forEach( (s) => {
        let tag = s.split('.')[1]
        page.replace('{{{ '+tag+' }}}', markdown(s))
    })
}