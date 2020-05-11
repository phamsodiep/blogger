const UC_DESC_EN = {
  id :        "ID",
  ucName:     "Use Case Name",
  desc:       "Description",
  xref:       "XRef",
  priAct:     "Primary Actor",
  secAct:     "Secondary Actor",
  incUc:      "Include use cases",
  trigger:    "Trigger",
  preCond:    "Precondition",
  postCond:   "Postconditions",
  basicPath:  "Basic Path",
  altPath:    "Alternative Paths",
  exceptPath: "Exception Paths",
  other:      "Other",
  none:       "None"
};
const UC_DESC_PATH_IDS = [10, 11, 12];
function fillUCDesc(elemId, ucDesc) {
  let elem = document.getElementById(elemId);
  if (!(elem !== null && typeof elem.innerHTML === "string")) {
    return false;
  }
  if (!Array.isArray(ucDesc)) {
    return false;
  }
  let fillPath = function(steps) {
    if (steps === null) {
      return "";
    }
    return [
      '<ol class="uc_desc_flow"><li>',
      steps.join("</li><li>"),
      '</li></ol>'
    ].join("");
  }
  let tabElem = document.createElement("TABLE");
  tabElem.className = "uc_description";
  for (let i = 0; i < ucDesc.length; i++) {
    let row = ucDesc[i];
    if (!Array.isArray(row)) {
      return false;
    }
    let rowElem = document.createElement("TR");    
    for (let j = 0; j < 2; j++) {
      let colElem = document.createElement("TD");
      if (j === 0) {
        colElem.innerHTML = "<b>" + row[j] + "</b>";
      }
      else {
        if (UC_DESC_PATH_IDS.includes(i)) {
          colElem.innerHTML = fillPath(row[j]);
        }
        else {
          colElem.innerHTML = row[j];
        }
      }
      rowElem.appendChild(colElem);
    }
    tabElem.appendChild(rowElem);
  }
  elem.appendChild(tabElem);
  return true;
}
/*let ucDesc = UC_DESC_EN;
fillUCDesc("4_1_1_reset_game", [
  [ucDesc.id, ""],
  [ucDesc.ucName, ""],
  [ucDesc.desc, ""],
  [ucDesc.xref, ""],
  [ucDesc.priAct, ""],
  [ucDesc.secAct, ""],
  [ucDesc.incUc, ""],
  [ucDesc.trigger, ""],
  [ucDesc.preCond, ""],
  [ucDesc.postCond, ""],
  [ucDesc.basicPath, ""],
  [ucDesc.altPath, ""],
  [ucDesc.exceptPath, ""],
  [ucDesc.other, ""]
]);*/

function fillFigure(
  elemId,
  imgSrc,
  orgW,
  height,
  leftAdj,
  clippedW,
  scrollClass,
  figId,
  figCaption
) {
  let elem = document.getElementById(elemId);
  if (!(elem !== null && typeof elem.innerHTML === "string")) {
    return false;
  }
  let ww = orgW;
  let hh = height;
  let scrollDiv =
    typeof scrollClass === "string" ?
    `<div class="${scrollClass}">`:
    "<div>";
  let figCap = typeof figCaption === "string" ?
    `<i>${figCaption}</i>` : "";
  let figcaption = "";
  if (typeof figId === "string") {
    figcaption = `<figcaption><b>Figure</b> ${figId}: ${figCap}</figcaption>`;
  }
  elem.innerHTML = `
    <div style="position: relative; left: ${leftAdj}px; width: ${clippedW}px;">
        ${scrollDiv}
            <div style="width:${ww}px;">
                <img
                  border="0"
                  data-original-height="${height}"
                  data-original-width="${orgW}"
                  height="${height}
                  width="${orgW}"
                  src="${imgSrc}"
                />
            </div>
        </div>
        <div style="text-align: center" class="para_sep0">${figcaption}</div>
    </div>
  `;
  return true;
}

function addMoreImgsToFigure(elemId, imgs) {
  if (typeof imgs !== "string"){
    return false;
  }
  let elem = document.getElementById(elemId);
  if (!(elem !== null && typeof elem.innerHTML === "string")) {
    return false;
  }
  let curHTML = elem.innerHTML;
  let idx = curHTML.indexOf("<img");
  if (idx < 0) {
    return false;
  }
  idx = curHTML.indexOf(">",idx);
  if (idx < 0) {
    return false;
  }
  idx++;
  let prePart = curHTML.substring(0, idx);
  let subPart = curHTML.substring(idx);
  elem.innerHTML = prePart + imgs + subPart;
}

function cloneHtmlContent(srcId, desId) {
  let srcElem = document.getElementById(srcId);
  if (srcElem !== null && typeof srcElem.innerHTML === "string") {
    let desElem = document.getElementById(desId);
    if (desElem !== null && typeof desElem.innerHTML === "string") {
      desElem.innerHTML = srcElem.innerHTML;
    }
  }
}

function doHighlight(elemId, reqs) {
  const ESPAN = "</span>";
  const CLASSES = [
    "hl_black_tor",        // 0
    "hl_azure_dra",        // 1
    "hl_vermilion_bir",    // 2
    "hl_yellow_qil",       // 3
    "hl_white_tig"         // 4
  ];

  let elem = document.getElementById(elemId);
  let chunks = [];
  let idx = 0;
  if (!(elem !== null && typeof elem.innerHTML === "string")) {
    return false;
  }
  let content = elem.innerHTML;
  for (let i = 0; i < reqs.length; i++) {
    let req = reqs[i];
    let id = content.indexOf(req[0], idx);
    if (id < 0) {
      return false;
    }
    chunks[chunks.length] = [idx, id]
    idx = id + req[0].length;
  }
  let highlightedContent = "";
  for (let i = 0; i < chunks.length; i++) {
    highlightedContent += content.substring(chunks[i][0], chunks[i][1]);
    let clId = reqs[i][1];
    let varId = 0;
    let tmpClId = Math.floor(clId / 100);
    if (tmpClId > 0) {
      clId = tmpClId;
      varId = 2;
    }
    else {
      tmpClId = Math.floor(clId / 10);
      if (tmpClId > 0) {
        clId = tmpClId;
        varId = 1;
      }
    }
    highlightedContent +=
      `<span class="${CLASSES[clId]}${varId}">${reqs[i][0]}</span>`;
  }
  highlightedContent += content.substring(idx, content.length);
  elem.innerHTML = highlightedContent;
  return true;
}

// THIS FUNCTION NOT WORKS CORRECTLY (Need to be debugged)
function clearHighlighted(elemId, removeClass) {
  let elem = document.getElementById(elemId);
  if (elem !== null && typeof elem.innerHTML === "string") {
    let content = elem.innerHTML;
    const ESPAN = "</span>";
    const CLASSES = [
      "hl_black_tor",        // 0
      "hl_azure_dra",        // 1
      "hl_vermilion_bir",    // 2
      "hl_yellow_qil",       // 3
      "hl_white_tig"         // 4
    ];
    let idx = 0;
    let chunks = [];
    for (let i = 0; i < CLASSES.length; i++) {
      for (let j = 0; j < 3; j++) {
        let keyword = `<span class="${CLASSES[i]}${j}">`;
        for (
          let s = content.indexOf(keyword, idx);
          s > 0;
          s = content.indexOf(keyword, idx)
        ) {
          chunks[chunks.length] = [idx, s];
          let e = content.indexOf(ESPAN, s);
          if (e < 0) {
            return false;
          }
          chunks[chunks.length] = [s + keyword.length, e];
          idx = e + ESPAN.length;
        }
      }
    }
    chunks[chunks.length] = [idx, content.length];
    let clearedContent = "";
    for (let i = 0; i < chunks.length; i++) {
      clearedContent += content.substring(chunks[i][0], chunks[i][1]);
    }
    elem.innerHTML = clearedContent;
    if (removeClass) {
      elem.removeAttribute("class");
    }
  }
  return true;
}

function doScrollIntoViewDecoration() {
  let topLvElem = document.getElementById("entry_article");
  // Extract targetId
  let targetId = "";
  let curUrl = window.location.href;
  let idx = curUrl.length;
  for (let ch = curUrl.charAt(--idx); ch !== '/'; ch = curUrl.charAt(--idx)) {
    if(ch === "#") {
      targetId = curUrl.substring(idx + 1);
      break;
    }
  }
  // id prefixed with 'cmd_' is reserved to command param sent to app
  let isCmd = targetId.startsWith("cmd_");
  if (isCmd) {
    return;
  }
  // retrieve element
  let targetElem = document.getElementById(targetId);
  if (!(targetElem !== null && topLvElem !== null)) {
    return;
  }
  // travel up and search for hidden div
  let classNames = [];
  let groups = [];
  let stateNames = [];
  for (let elem = targetElem.parentNode; elem !== topLvElem; elem = elem.parentNode) {
    if (elem.nodeName === "DIV" &&  elem.style.display === "none") {
      let className = elem.className;
      let endIdx = className.indexOf("$");
      if (endIdx >= 0) {
        classNames[classNames.length] = className;
        groups[groups.length] = className.substring(0, endIdx);
        stateNames[stateNames.length] =
          className.substring(endIdx + 1).split("_").join(" ");
      }
    }
  }
  // do decoration by clicking button
  for(let i = 0; i < groups.length; i++) {
    let elemId = groups[i] + "$";
    let elem = document.getElementById(elemId);
    if (elem !== null) {
      for (
        let curStateName = elem.value.toString();
        curStateName !== stateNames[i];
        curStateName = elem.value.toString()
      ) {
        elem.click();
      }
    }
  }
  // Scroll to
  targetElem.scrollIntoView();
}

const DiepSrcCode = {
  FORMAT_JAVA: 0,
  FORMAT_JS: 1,

  FORMATS: [
    // FORMAT_JAVA
    [
      ["  ", "&nbsp;&nbsp;"],
      ["package", "<b style='color: olive;'>package</b>"],
      ["import", "<b style='color: olive;'>import</b>"],
      ["public", "<b style='color: green;'>public</b>"],
      ["private", "<b style='color: green;'>private</b>"],
      ["void", "<b style='color: green;'>void</b>"],
      ["for", "<b style='color: maroon;'>for</b>"],
      ["if", "<b style='color: maroon;'>if</b>"],
      ["this", "<b style='color: maroon;'>this</b>"],
      ["return", "<b style='color: maroon;'>return</b>"]
    ],
    // FORMAT_JS
    [
      ["  ", "&nbsp;&nbsp;"],
      // keywords
      ["import[ ]", "<b style='color: blue;'>import</b>&nbsp;"],
      ["export[ ]", "<b style='color: blue;'>export</b>&nbsp;"],
      ["class[ ]", "<b style='color: blue;'>class</b>&nbsp;"],
      ["extends[ ]", "<b style='color: blue;'>extends</b>&nbsp;"],
      ["super[(]", "<b style='color: blue;'>super</b>("],
      ["new[ ]", "<b style='color: blue;'>new</b>&nbsp;"],
      ["constructor[(]", "<b style='color: darkgoldenrod;'>constructor</b>("],
      ["[ ]undefined", "&nbsp;<b style='color: blueviolet;'>undefined</b>"],
      ["[ ]null", "&nbsp;<b style='color: blue;'>null</b>"],
      ["[ ]false", "&nbsp;<b style='color: blue;'>false</b>"],
      ["[ ]true", "&nbsp;<b style='color: blue;'>true</b>"],
      ["const[ ]", "<b style='color: blue;'>const</b>&nbsp;"],
      ["let[ ]", "<b style='color: blue;'>let</b>&nbsp;"],
      ["var[ ]", "<b style='color: blue;'>var</b>&nbsp;"],
      ["for[ ]", "<b style='color: blue;'>for</b>&nbsp;"],
      ["if[ ]", "<b style='color: blue;'>if</b>&nbsp;"],
      ["else[ ]", "<b style='color: blue;'>else</b>&nbsp;"],
      ["switch[(]", "<b style='color: blue;'>switch</b>("],
      ["case[ ]", "<b style='color: blue;'>case</b>&nbsp;"],
      ["break", "<b style='color: blue;'>break</b>"],
      ["default:", "<b style='color: blue;'>default</b>:"],
      ["this", "<b style='color: blue;'>this</b>"],
      ["return[ ]", "<b style='color: blue;'>return</b>&nbsp;"],
      ["typeof[ ]", "<b style='color: blue;'>typeof</b>&nbsp;"],
      ["function[ ]", "<b style='color: blue;'>function</b>&nbsp;"],

      // objects
      ["document[.]", "<b style='color: darkgoldenrod;'>document</b>."],
      ["Array", "<b style='color: blueviolet;'>Array</b>"],
      ["Math[.]", "<b style='color: blueviolet;'>Math</b>."],
      //["Object", "<b style='color: blueviolet;'>Object</b>"],
      // methods
      ["toString[(][)]", "<b style='color: blueviolet;'>toString</b>()"],
      ["setTimeout[(]", "<b style='color: darkgoldenrod;'>setTimeout</b>("],
      ["alert[(]", "<b style='color: darkgoldenrod;'>alert</b>("],
      ["Object.assign[(]",
        [
          "<b style='color: blueviolet;'>Object</b>",
          ".",
          "<b style='color: darkgoldenrod;'>assign</b>("
        ].join("")
      ],
      ["[\u262F]", ""]
    ]
  ],

  commentedOutHtmlWrap: function (s, skipBreak) {
    if (skipBreak) {
        return "<i style='color: teal;'>".concat(s, "</i>");
    }
    return "<i style='color: teal;'>".concat(s, "</i><br />");
  },

  formatLine: function (formatId, line, skipBreak) {
    let formats = DiepSrcCode.FORMATS[formatId];
    for (let j = 0; j < formats.length; j++) {
        let format = formats[j];
        let regExp = new RegExp(format[0], 'g');
        line = line.replace(regExp, format[1])
    }
    if (skipBreak) {
        return line;
    }
    return line.concat("<br />");
  },

  processCommentedOut: function (line, formatId) {
    let idx = line.indexOf("//");
    if (idx >= 0) {
        let html =
          DiepSrcCode.formatLine(formatId, line.substring(0, idx), true);
        html = html.concat(
          DiepSrcCode.commentedOutHtmlWrap(line.substring(idx, line.length))
        );
        return [true, html];
    }
    idx = line.indexOf("/*");
    if (idx >= 0) {
        let html =
          DiepSrcCode.formatLine(formatId, line.substring(0, idx), true);
        html = html.concat(
          DiepSrcCode.commentedOutHtmlWrap(line.substring(idx, line.length))
        );
        return [false, html];;
    }
    return null;
  },

  detectCommentedOutClose: function (line, formatId) {
      let idx = line.indexOf("*/");
      if (idx >= 0) {
          idx += 2;
          let html =
            DiepSrcCode.commentedOutHtmlWrap(line.substring(0, idx), true);
          html = html.concat(
            DiepSrcCode.formatLine(formatId, line.substring(idx, line.length))
          );
          return [false, html];
      }
      return [true, DiepSrcCode.commentedOutHtmlWrap(line)];
  },

  escapeJSX: function (txtId) {
    let txtComp = document.getElementById(txtId);
    if (txtComp !== null) {
      let str = txtComp.value.toString();
      let regExp = new RegExp("[<]", 'g');
      str = str.replace(regExp, "&lt;");
      regExp = new RegExp("[>]", 'g');
      str = str.replace(regExp, "&gt;");
      txtComp.value = str;
    }
  },

  fillCFamilySourceCode: function (txtId, formatId) {
    // parse and convert source code
    let html = "";
    let txtComp = document.getElementById(txtId);
    let onCommentedOut = false;
    if (txtComp) {
      let lines = txtComp.value.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          if (onCommentedOut) {
              let detect = DiepSrcCode.detectCommentedOutClose(line, formatId);
              onCommentedOut = detect[0];
              html = html.concat(detect[1]);
              continue;
          }
          let commentedOut = DiepSrcCode.processCommentedOut(line, formatId);
          if (commentedOut == null) {
              html = html.concat(DiepSrcCode.formatLine(formatId, line));
          }
          else {
              if (commentedOut[0]) {
                  html = html.concat(commentedOut[1]);
              }
              else {
                  html = html.concat(commentedOut[1]);
                  onCommentedOut = true;
              }
          }
      }

      // apply converted source code to target div
      let divElement = document.createElement("DIV");
      divElement.innerHTML = html;
      divElement.className = "txt_sourcecodefont1";
      txtComp.parentNode.insertBefore(divElement, txtComp);
    }
  }
};

