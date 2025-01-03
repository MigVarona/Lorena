"use client";

import { useState, useEffect, useMemo } from "react";
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
  phone: string;
  time: string;
  service: string;
  message: string;
  status: "pendiente" | "confirmada" | "cancelada";
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Reservation>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Obtener reservas desde la API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reservas");
        const { data } = await response.json();
        setReservations(data || []);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };
    fetchReservations();
  }, []); // Solo se ejecuta al montar el componente

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
                  onClick={() => handleSort("time")}
                >
                  Hora <FaSort className="inline ml-1" />
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
                <TableHead>Teléfono</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReservations.map((reservation, index) => {
                const key =
                  reservation._id ||
                  `${reservation.name}-${reservation.date}-${index}`;
                return (
                  <TableRow key={key}>
                    <TableCell>{reservation.name}</TableCell>
                    <TableCell>{reservation.email}</TableCell>
                    <TableCell>{reservation.date}</TableCell>
                    <TableCell>{reservation.time}</TableCell>
                    <TableCell>{reservation.service}</TableCell>
                    <TableCell>{reservation.message}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[reservation.status]}>
                        {reservation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{reservation.phone}</TableCell>
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
                );
              })}
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
