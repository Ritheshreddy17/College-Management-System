import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportStudentsToExcel = (students) => {
  const exportData = students.map((student) => ({
    USN: student.usn,
    Name: student.name,
    Email: student.email,
    Phone: student.phone,
    Department: student.department,
    Course: student.course,
  }));

  const worksheet =
    XLSX.utils.json_to_sheet(exportData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Students"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    fileData,
    "students.xlsx"
  );
};