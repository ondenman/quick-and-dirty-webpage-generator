# quick-and-dirty-webpage-generator
A quick and dirty page generator. 

Create your page in regular HTML. Add your markdown content files to the `site/content/` directory.

Add placeholders in your HTML where your content should be:

~~~
<body>
    <main>
        <div class="wrapper">
            <div class="content">
                {{{content.md}}}
            </div>
        </div>
        <div class="wrapper">
            <div class="content">
                {{{more_content.md}}}
            </div>
        </div>
    </main>
</body>
~~~

Wrap your content file names in triple braces. (No spaces!)

Save HTML template in `site/` directory with `.dirty` extension.

Run:

~~~
$ node dirty.js file.dirty
~~~
