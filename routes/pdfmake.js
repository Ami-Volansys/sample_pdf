const express = require('express');
const router = express.Router();
//const Window = require('window');

const pdfmake = require('../node_modules/pdfmake/build/pdfmake');
const vfsfonts = require('../node_modules/pdfmake/build/vfs_fonts');

pdfmake.vfs = vfsfonts.pdfMake.vfs;

//const htmlToPdfmake = require('html-to-pdfmake');


router.post('/pdf',(req,res)=>{
  


var docDefinition = {
  content: [
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],
      

        body: [
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true,fillColor: '#eeeeee', }, 'Val 2', 'Val 3', 'Val 4' ]
        ]
      }
    }
  ]
};
    const pdfDoc = pdfmake.createPdf(docDefinition);
   pdfDoc.getBase64((data)=>{
        const download = Buffer.from(data,'base64');
        res.end(download)

   });



});



module.exports = router;