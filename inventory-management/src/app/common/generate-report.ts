import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

export const generateReport = {

    downloadPDF(DATA: any) {

        let fileName = DATA.getAttribute("id")

        html2canvas(DATA).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save(`${fileName}.pdf`);
        });
    },

    downloadEXL(DATA:any): void {
        let fileName = DATA.getAttribute("id")
        /* pass here the table id */
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(DATA);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, `${fileName}.xlsx`);

    }

}
