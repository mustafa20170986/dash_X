"use client";

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridExample = () => {
  const rowData = useMemo(() => [
    { id: 1, event: 'Login', user: 'alice@example.com', time: '2026-07-16 10:00', status: 'Success' },
    { id: 2, event: 'Purchase', user: 'bob@example.com', time: '2026-07-16 10:05', status: 'Success' },
    { id: 3, event: 'Logout', user: 'alice@example.com', time: '2026-07-16 10:30', status: 'Success' },
    { id: 4, event: 'Login', user: 'charlie@example.com', time: '2026-07-16 11:00', status: 'Failed' },
    { id: 5, event: 'Password Reset', user: 'bob@example.com', time: '2026-07-16 11:15', status: 'Success' },
  ], []);

  const columnDefs = useMemo(() => [
    { field: 'id', width: 70 },
    { field: 'event', filter: true, sortable: true },
    { field: 'user', filter: true, sortable: true, flex: 1 },
    { field: 'time', sortable: true },
    { 
      field: 'status', 
      cellClassRules: {
        'text-emerald-500 font-bold': (params: any) => params.value === 'Success',
        'text-rose-500 font-bold': (params: any) => params.value === 'Failed',
      }
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine w-full h-[300px]">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
};

export default AgGridExample;
