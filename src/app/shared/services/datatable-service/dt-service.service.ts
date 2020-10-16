import {ElementRef, Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class DtServiceService {

  constructor() {
  }

  exportToExcel(elem: ElementRef, name: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elem.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, name);

    /* save to file */
    XLSX.writeFile(wb, name + '.xlsx');
  }

  exportToPdf(id: string, name: string) {

    const data = document.getElementById(id);

    html2canvas(data).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      pdf.save(name + '.pdf'); // Generated PDF
    });
  }

  generatePdf(id: string, name: string) {
    const data = document.getElementById(id);
    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jspdf('p', 'mm', 'a4');
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 10);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 10);
        heightLeft -= pageHeight;
      }
      doc.save(name + '.pdf');
    });
  }
}
