"use client";

import { useState, useMemo } from "react";
import { FaTrashAlt, FaSort } from "react-icons/fa";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

interface Reservation {
  _id: string;
  name: string;
  email: string;
  date: string;
  service: string;
  message: string;
  status: "pendiente" | "confirmada" | "cancelada";
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      _id: "1",
      name: "Juan Pérez",
      email: "juan@example.com",
      date: "2024-12-30",
      service: "Corte de Cabello",
      message: "Preferiría un corte de cabello corto y moderno.",
      status: "pendiente",
    },
    {
      _id: "2",
      name: "María López",
      email: "maria@example.com",
      date: "2024-12-31",
      service: "Color de Cabello",
      message: "Tengo el cabello oscuro y quiero algo más claro.",
      status: "confirmada",
    },
    // Add more reservations here...
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Reservation>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const itemsPerPage = 5;

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) =>
      Object.values(reservation).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [reservations, search]);

  const sortedReservations = useMemo(() => {
    return [...filteredReservations].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredReservations, sortColumn, sortDirection]);

  const paginatedReservations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedReservations.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedReservations, currentPage]);

  const totalPages = Math.ceil(sortedReservations.length / itemsPerPage);

  const handleSort = (column: keyof Reservation) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setReservations(reservations.filter((r) => r._id !== deleteId));
      setDeleteId(null);
    }
  };

  const statusColors = {
    pendiente: "bg-yellow-200 text-yellow-800",
    confirmada: "bg-green-200 text-green-800",
    cancelada: "bg-red-200 text-red-800",
  };

  return (
    <div className="font-sans text-black p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Dashboard de Reservas
      </h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar reservas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      {paginatedReservations.length === 0 ? (
        <div className="text-center py-4">No se encontraron reservas.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Nombre <FaSort className="inline ml-1" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Correo <FaSort className="inline ml-1" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Fecha <FaSort className="inline ml-1" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("service")}
                >
                  Servicio <FaSort className="inline ml-1" />
                </TableHead>
                <TableHead>Comentarios</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Estado <FaSort className="inline ml-1" />
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReservations.map((reservation) => (
                <TableRow key={reservation._id}>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.service}</TableCell>
                  <TableCell>{reservation.message}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[reservation.status]}>
                      {reservation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      <FaTrashAlt className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
                className={currentPage === i + 1 ? "text-blue-600" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`cursor-pointer ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <DeleteConfirmationDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
