import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OrderChek from '@/components/shared/OrderChek';

const OrderTable = ({order}) => {
    
    const printRef = useRef();

    const handleDownload = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Chek_${data.checkNumber}.pdf`);
    };

    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // sahifani tiklash
    };

    return (
        <div className='mt-10 px-20'>
            <div className='min-h-screen'>
                <div ref={printRef}>
                    <OrderChek data={order} />
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        PDF yuklab olish
                    </button>
                    <button
                        onClick={handlePrint}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Print qilish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderTable;
