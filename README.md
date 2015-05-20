# FacetProject

An interactive retail experience to help bring context and stoy to the retail environment.

## Installation

a live version is up at facetnfctest.herokuapp.com
to run locally:

2. <a href="http://git-scm.com/"> Use Git</a> 
3.  npm install
4. npm start

## Components

Back End
- ws, the fastest websocket library for Node
- Jade, a widely-used template engine for Node apps
- SQLite, an easy-to-use database system contained within a file

Front End
- jQuery, used for Ajax, DOM manipulation, and page navigation
- Masonry, which made our arbitrary grid layouts a cinch
- Three.js, for bringing in our 3D watch model
- Leap.js, which enabled controlling the Leap device in the browser
- KeyshotVR, for the Keyshot version of our 3D watch model

##App Features
- Home Page
Displaying featured items on other pages.
- Brand History Icons
A photo gallery, curently featuring iconic people.
- Product View
Consisting of watch details, and watch 3d model. This info pulls from the sqlite db.
- Brand Timeline
Displaying brand history by year. This info pulls from the sqlite db.
