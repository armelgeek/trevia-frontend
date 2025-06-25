"use client";
import { LabeledSection } from "./ui-section";
import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface SampleUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface SampleOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
}

const userColumns: ColumnDef<SampleUser>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Rôle',
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variants = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
      };
      return (
        <Badge className={variants[status as keyof typeof variants]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Créé le',
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Voir
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const orderColumns: ColumnDef<SampleOrder>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'customer',
    header: 'Client',
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return `€${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const config = {
        completed: { icon: CheckCircle, class: 'bg-green-100 text-green-800' },
        pending: { icon: Clock, class: 'bg-yellow-100 text-yellow-800' },
        cancelled: { icon: XCircle, class: 'bg-red-100 text-red-800' }
      };
      const { icon: Icon, class: className } = config[status as keyof typeof config];
      return (
        <Badge className={className}>
          <Icon className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
];

export function AdminTableSample() {
    const [searchUsers, setSearchUsers] = useState<string | null>('');
    const [searchOrders, setSearchOrders] = useState<string | null>('');

    const sampleUsers: SampleUser[] = [
        {
            id: '1',
            name: 'Jean Dupont',
            email: 'jean.dupont@example.com',
            role: 'Admin',
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: '2',
            name: 'Marie Martin',
            email: 'marie.martin@example.com',
            role: 'Utilisateur',
            status: 'pending',
            createdAt: '2024-01-20'
        },
        {
            id: '3',
            name: 'Pierre Bernard',
            email: 'pierre.bernard@example.com',
            role: 'Modérateur',
            status: 'inactive',
            createdAt: '2024-01-10'
        }
    ];

    const sampleOrders: SampleOrder[] = [
        {
            id: 'ORD-001',
            customer: 'Jean Dupont',
            amount: 125.50,
            status: 'completed',
            date: '2024-01-15'
        },
        {
            id: 'ORD-002',
            customer: 'Marie Martin',
            amount: 89.99,
            status: 'pending',
            date: '2024-01-20'
        },
        {
            id: 'ORD-003',
            customer: 'Pierre Bernard',
            amount: 245.00,
            status: 'cancelled',
            date: '2024-01-18'
        }
    ];

    const mockTableProps = {
        meta: { total: 100, totalPages: 10 },
        sortBy: null,
        sortDir: null,
        page: 1,
        pageSize: 10,
        onSortByChange: () => {},
        onSortDirChange: () => {},
        onPageChange: () => {},
        onPageSizeChange: () => {},
        isLoading: false,
        isError: false
    };

    return (
        <div className="space-y-8">
            <LabeledSection label="Users Data Table">
                <DataTable
                    columns={userColumns}
                    data={sampleUsers}
                    search={searchUsers}
                    onSearchChange={setSearchUsers}
                    {...mockTableProps}
                />
            </LabeledSection>

            <LabeledSection label="Orders Data Table">
                <DataTable
                    columns={orderColumns}
                    data={sampleOrders}
                    search={searchOrders}
                    onSearchChange={setSearchOrders}
                    {...mockTableProps}
                />
            </LabeledSection>
        </div>
    );
}
