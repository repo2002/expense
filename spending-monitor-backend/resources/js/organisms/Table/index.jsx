import React from 'react';
import './Table.scss';

const Table = ({ columns, data, onRowClick }) => {
    const renderCell = (column, row) => {
        const value = row[column.key];
        
        // If there's a custom render function, use it
        if (column.render) {
            return column.render(value, row);
        }
        
        // Handle empty values
        if (value === null || value === undefined || value === '') {
            return '-';
        }
        
        return value;
    };

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th 
                                key={column.key}
                                className={column.align ? `text-${column.align}` : ''}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr 
                                key={row.id || index}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={onRowClick ? 'clickable' : ''}
                            >
                                {columns.map((column) => (
                                    <td 
                                        key={`${row.id || index}-${column.key}`}
                                        className={column.align ? `text-${column.align}` : ''}
                                    >
                                        {renderCell(column, row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table; 