import React from 'react';
import { render } from 'react-dom';
import { DocumentContextProvider } from './context.js';
import { ARTICLE, FigureList } from './article.js';


render(
  <DocumentContextProvider figureList={FigureList}>
    {ARTICLE}
  </DocumentContextProvider>,
  document.getElementById('react_entry_article')
);
// Version 0.0.2

