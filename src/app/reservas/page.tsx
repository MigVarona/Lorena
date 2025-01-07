"use client"

import { useState, useEffect, useMemo } from "react";
import { FaTrashAlt, FaSort, FaEdit } from "react-icons/fa";
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
import { Badge } from "@/components/ui/badge";
import { EditReservationDialog } from "@/components/edit-reservation-dialog";

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
  const [editReservation, setEditReservation] = useState<Reservation | null>(null);

  const itemsPerPage = 10;

  // Reutilizamos la función para obtener reservas
  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservas");
      const { data } = await response.json();
      setReservations(data || []);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  // Llamamos a esta función en el `useEffect` inicial
  useEffect(() => {
    fetchReservations();
  }, []);

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

  const handleEdit = (reservation: Reservation) => {
    setEditReservation(reservation);
  };

  const updateReservation = async (id: string, date: string, time: string) => {
    try {
      const response = await fetch(`/api/reservas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });
      const result = await response.json();

      if (response.ok) {
        // Después de actualizar, volvemos a obtener las reservas
        fetchReservations();
      } else {
        console.error("Error al actualizar la reserva:", result.error);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
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
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Acciones</TableCell>
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
                    <TableCell>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(reservation)}
                      >
                        <FaEdit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modales */}
      <DeleteConfirmationDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
      
      {/* Mostrar el modal para editar la reserva */}
      {editReservation && (
        <EditReservationDialog
          reservation={editReservation} // Asegúrate de que editReservation tiene el id
          onClose={() => setEditReservation(null)}
          onSave={(id, date, time) => updateReservation(id, date, time)} // Pasamos el id al updateReservation
        />
      )}
    </div>
  );
}
