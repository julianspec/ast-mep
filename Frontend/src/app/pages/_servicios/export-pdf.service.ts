import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Encabezado } from '../_model';
import { GlobalService } from '../_helpers/global.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ExportPDFService {

   imagen: Encabezado;

   constructor(private global:GlobalService) {
      this.imagen = new Encabezado();
   }

   generatePdf(action = 'open', data, titulo = "", subtitulo = "", pageOrientation = "vertical") {
      switch (pageOrientation){
         case 'horizontal': pageOrientation = "landscape"; break;
         case 'vertical': pageOrientation = "portrait"; break;
      }
      switch (action) {
        case 'open': pdfMake.createPdf(this.getDocumentDefinition(data, titulo, subtitulo, pageOrientation)).open(); break;
        case 'print': pdfMake.createPdf(this.getDocumentDefinition(data, titulo, subtitulo, pageOrientation)).print(); break;
        case 'download': pdfMake.createPdf(this.getDocumentDefinition(data, titulo, subtitulo, pageOrientation)).download(); break;
        default: pdfMake.createPdf(this.getDocumentDefinition(data, titulo, subtitulo, pageOrientation)).open(); break;
      }
   }

   getDocumentDefinition(data: any, titulo: string, subtitulo: string, Orientation: string) {
      return {
         header: {
            table: {
               widths: ["*"],
               body: [
                  [
                     {text: 'TRANSFERENCIAS MEP - Fecha: ' + new Date().toLocaleString() + ' - Usuario: ' + this.global.getUser().usuario, alignment: 'center'},
                     //{text: '', alignment: 'right'},
                  ]
               ],
            },
            layout: 'noBorders',
            fontSize: 8,
            margin: [5, 10, 5, 0],
            color: '#8d8d90'
         },
         footer: function (currentPage, pageCount) {
            return {

               table: {
                  widths: ["*"],
                  body: [
                     [
                        {text: currentPage.toString() + ' de ' + pageCount, alignment: 'center'}
                     ]
                  ],
               },
               layout: 'noBorders',
               fontSize: 8,
               color: '#8d8d90'
            };
         },

         pageOrientation: Orientation,
         alignment: 'center',
         content: [
            {
               image: 'data:image/jpeg;base64,' + this.imagen.imagenBase64,
               width: 200,
               alignment: 'center',
               margin: [0, 15, 0, 10]
            },
            {
               canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 0.1, color: '#8d8d90'}],
               margin: [0, 0, 0, 15]
            },
            {
               text: 'Reporte de ' + titulo + ':',
               bold: true,
               fontSize: 15,
               alignment: 'left',
               color: '#52678a',
               margin: [0, 0, 0, 0]
            },
            {
               text: subtitulo,
               color: '#52678a',
               style: 'header'
            },
            data
         ],

         info: {
            title: 'Transferencias MEP - ' + titulo,
            author: 'BANCO DE VALORES',
            subject: titulo,
            keywords: titulo + ', Transferencias MEP',
         },

         styles: {
            header: {
               fontSize: 10,
               bold: true,
               margin: [0, 10, 0, 10]
            },
            name: {
               fontSize: 8,
               bold: false
            },
            jobTitle: {
               fontSize: 14,
               bold: true,
               italics: true
            },
            sign: {
               margin: [0, 50, 0, 10],
               alignment: 'right',
               italics: true
            },
            tableHeader: {
               fontSize: 10,
               bold: true,
               alignment: 'center',
               fillColor: '#868e96',
               color: 'white'
            },
            tableBody: {
               fontSize: 8,
               bold: false
            }
         }
      };
    }
}
