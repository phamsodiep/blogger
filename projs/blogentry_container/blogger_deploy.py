#!/usr/bin/python

f = open("./build/index.html")
html = f.read()
f.close()

scripts = []
preIdx = 0
idx = -1
while True:
    idx = html.find("<script", preIdx)
    if idx >= 0:
        if html[idx + len("<script")] == '>':
            endIdx = html.find("</script>", preIdx)
            if endIdx < 0:
                break
            preIdx = endIdx + len("</script>")
            scripts.append(html[idx:preIdx] + "\n")
        else:
            idx = html.find("src=\"", idx)
            if idx < 0:
                break
            endIdx = html.find("\">", idx)
            if endIdx < 0:
                break
            path = html[(idx + len("src=\"")):endIdx]
            if (path.find("/static/") == 0):
                f = open("./build" + path)
                script = "<script>" + f.read() + "</script>\n"
                scripts.append(script)
                f.close()
            preIdx = endIdx + len("\">")
    else:
        break



brief = "T.B.D."
githubver = "1.0.0"
githubsrc = "https://github.com/phamsodiep/blogger/"
f = open("./src/article.js")
html = f.read()
f.close()
idx = html.find(githubsrc)
if idx >= 0:
    endIdx = html.find("\n", idx)
    if endIdx >= 0:
        githubsrc = "Source: " + html[idx:endIdx]
    idx = html.find("//", endIdx)
    if idx >= 0:
        endIdx = html.find("\n", idx)
        if endIdx >= 0:
            githubver = html[(idx + 2):endIdx]
    idx = html.find("/*\n", endIdx)
    if idx >= 0:
        endIdx = html.find("\n*/", idx)
        if endIdx >= 0:
            brief = html[(idx + 3):endIdx]


template = [
"""
<div id="entry_article">
<details class="hidden">
    <summary>
        <div id="entry_brief_tmp"><em><i>
""",
brief,
"""
        </i></em></div>
    </summary>
    <p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>
</details>
""",
"""


<div class="naturalsciencefont0">""",


#"""<!-- DELMEPLEASE --><input id="notyet$" style="display: none;" type="button" value="off" onclick="switchDisplay(this, ['on', 'off']);"/><div style="display: none;" class="notyet$on"><div id="minpage233">&nbsp;</div>""",
"    <div id=\"react_entry_article\" />",
#"<!-- DELMEPLEASE --></div>",



"""</div>


<div id="githubsrc" class="hidden">""",
githubsrc,
"</div>\n",

"<div id=\"githubver\" class=\"hidden\">",
githubver,
"</div>",

"""
<script>doDefaultDecorate();doScrollIntoViewDecoration();</script>
</div>
"""
]

print "".join(template)
print ""
print "\n".join(scripts)

