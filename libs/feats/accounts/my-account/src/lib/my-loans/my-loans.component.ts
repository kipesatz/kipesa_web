import { Component } from '@angular/core';
import { Loan } from '@kps/data/finances';
import { DataTableComponent, TableColumn } from '@kps/material/table';

@Component({
  selector: 'kps-my-loans',
  imports: [DataTableComponent],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.scss',
})
export class MyLoansComponent {
  loading = false;
  loans: Loan[] = [];

  columns: TableColumn[] = [
    { key: 'loanNumber', label: 'Loan Number' },
    {
      key: 'association.name',
      label: 'Association',
      sortable: true,
    },
    { key: 'loanType', label: 'Type' },
    {
      key: 'disbursedAmount',
      label: 'Amount',
      template: (value) => `KES ${(value as number).toLocaleString()}`,
      align: 'right',
      sortable: true,
    },
    {
      key: 'remainingBalance',
      label: 'Balance',
      template: (value) => `KES ${(value as number).toLocaleString()}`,
      align: 'right',
    },
    {
      key: 'issueDate',
      label: 'Issue Date',
      template: (value) => new Date(value as string).toLocaleDateString(),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      template: (value) => new Date(value as string).toLocaleDateString(),
    },
    {
      key: 'loanStatus',
      label: 'Status',
      align: 'center',
    },
  ];

  visibleColumns = [
    'loanNumber',
    'association.name',
    'loanType',
    'disbursedAmount',
    'remainingBalance',
    'issueDate',
    'dueDate',
    'loanStatus',
  ];

  filters = [
    {
      key: 'loanStatus',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'defaulted', label: 'Defaulted' },
      ],
    },
    {
      key: 'loanType',
      label: 'Loan Type',
      options: [
        { value: 'personal', label: 'Personal' },
        { value: 'business', label: 'Business' },
        { value: 'emergency', label: 'Emergency' },
      ],
    },
  ];

  loadLoans() {
    // Implement loans loading logic
  }

  handleFilterChange(filters: Record<string, unknown>) {
    // Handle filter changes
  }
}
