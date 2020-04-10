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
