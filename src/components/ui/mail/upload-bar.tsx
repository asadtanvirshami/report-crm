import React from "react";
import { Button } from "../button";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

import { trucks } from "@/utils/truck-arrays";
type Props = {};

const UploadBar = (props: Props) => {
  const [attachment, setAttachment] = React.useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Truck List", 10, 10);
    trucks.forEach((truck: any, index: any) => {
      doc.text(
        `${truck.name} - ${truck.manufacturer} - ${truck.year}`,
        10,
        20 + index * 10
      );
    });
    doc.save("trucks.pdf");
  };
  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(trucks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trucks");
    XLSX.writeFile(workbook, "trucks.xlsx");
  };

  const handlePrint = () => {
    const printContent = trucks
      .map(
        (truck: any) => `${truck.name} - ${truck.manufacturer} - ${truck.year}`
      )
      .join("\n");
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `<pre>${printContent}</pre>`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div>
      {" "}
      <div className="flex mb-4">
        <div className="flex ">
          <Button
            type="button"
            onClick={handleDownloadPDF}
            className="bg-blue-500"
          >
            Download PDF
          </Button>
          <Button
            type="button"
            onClick={handleDownloadXLSX}
            className="bg-green-500"
          >
            Download XLSX
          </Button>
          <Button type="button" onClick={handlePrint} className="bg-orange-500">
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadBar;
