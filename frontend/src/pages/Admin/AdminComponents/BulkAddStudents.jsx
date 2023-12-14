import React from 'react'
import CSVReader from 'react-csv-reader';

const BulkAddStudents = ({ onImport }) => {
  const handleImportCSV = (data, fileInfo) => {
    // Pass the imported data to the parent component
    
    const cleanedData = data.filter(row =>
        row.studentID && row.fullname && row.email && row.gender && row.yearLevel && row.userType
      );
    onImport(cleanedData);
  };

  return (
    <>
      <CSVReader
        onFileLoaded={handleImportCSV}
        parserOptions={{ header: true }}
        inputId="csv-input"
        inputStyle={{ display: 'none' }}
      />
      <label htmlFor="csv-input" className='p-2 bg-green-300 m-2 cursor-pointer text-center'>
        Import from CSV
      </label>
    </>
  )
}

export default BulkAddStudents