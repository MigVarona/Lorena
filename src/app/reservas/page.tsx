"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaTrashAlt,
  FaSort,
  FaEdit,
  FaSearch,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/Calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  phone: string;
  time: string;
  service: string;
  message: string;
  status: "pendiente" | "confirmada" | "cancelada";
}

interface BlockedDate {
  id: string;
  date: string;
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: "pendiente" | "confirmada" | "cancelada" }>({});

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Reservation>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editReservation, setEditReservation] = useState<Reservation | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [isAddingDate, setIsAddingDate] = useState(false);

  const itemsPerPage = 10;

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch("/api/blocked-dates");
      const { data } = await response.json();
      setBlockedDates(data);
    } catch (error) {
      console.error("Error al obtener fechas bloqueadas:", error);
    }
  };

  const updateReservationStatus = async (id: string, status: "pendiente" | "confirmada" | "cancelada") => {
    try {
      const response = await fetch(`/api/reservas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
  
      if (response.ok) {
        // Actualizar la reserva en el estado local
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id ? { ...reservation, status } : reservation
          )
        );
      } else {
        console.error("Error al actualizar el estado de la reserva:", result.error);
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };


  const addBlockedDate = async (date: Date | undefined) => {
    if (!date) return;

    const formattedDate = format(date, "yyyy-MM-dd");

    try {
      const response = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate }),
      });

      if (response.ok) {
        await fetchBlockedDates();
        setIsAddingDate(false);
      } else {
        const { error } = await response.json();
        console.error("Error al bloquear la fecha:", error);
      }
    } catch (error) {
      console.error("Error al bloquear la fecha:", error);
    }
  };

  const removeBlockedDate = async (date: string) => {
    try {
      const response = await fetch("/api/blocked-dates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        await fetchBlockedDates();
      } else {
        const { error } = await response.json();
        console.error("Error al desbloquear la fecha:", error);
      }
    } catch (error) {
      console.error("Error al desbloquear la fecha:", error);
    }
  };

  useEffect(() => {
    fetchBlockedDates();
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservas");
      const { data } = await response.json();
      setReservations(data || []);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const filteredReservations = useMemo(() => {
    return reservations
      .filter((reservation) =>
        Object.values(reservation).some((value) =>
          value?.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter((reservation) =>
        statusFilter === "all" ? true : reservation.status === statusFilter
      );
  }, [reservations, search, statusFilter]);

  const sortedReservations = useMemo(() => {
    return [...filteredReservations].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === "asc" ? -1 : 1;
      if (bValue == null) return sortDirection === "asc" ? 1 : -1;
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
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
      setReservations(reservations.filter((r) => r.id !== deleteId));
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
        fetchReservations();
      } else {
        console.error("Error al actualizar la reserva:", result.error);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="font-sans text-black p-8 bg-gray-100 min-h-screen">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">
            Dashboard de Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Fechas Bloqueadas</h2>
              <Popover open={isAddingDate} onOpenChange={setIsAddingDate}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <FaPlus className="mr-2" /> Agregar Fecha Bloqueada
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="end">
                  <Calendar
                    selected={
                      newBlockedDate ? new Date(newBlockedDate) : undefined
                    }
                    onSelect={(date) => {
                      addBlockedDate(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {blockedDates.map((blockedDate) => (
                <div
                  key={blockedDate.id}
                  className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="font-medium">
                      {format(new Date(blockedDate.date), "d MMM yyyy", {
                        locale: es,
                      })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBlockedDate(blockedDate.date)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Buscar reservas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paginatedReservations.length === 0 ? (
            <div className="text-center py-4">No se encontraron reservas.</div>
          ) : (
            <div className="overflow-x-auto rounded-lg border bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Nombre{" "}
                      {sortColumn === "name" && (
                        <FaSort className="inline ml-1" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sortColumn === "email" && (
                        <FaSort className="inline ml-1" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      Fecha{" "}
                      {sortColumn === "date" && (
                        <FaSort className="inline ml-1" />
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("time")}
                    >
                      Hora{" "}
                      {sortColumn === "time" && (
                        <FaSort className="inline ml-1" />
                      )}
                    </TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Estado{" "}
                      {sortColumn === "status" && (
                        <FaSort className="inline ml-1" />
                      )}
                    </TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
      {reservations.map((reservation, index) => {
        const key = reservation.id || `${reservation.name}-${reservation.date}-${index}`;
        return (
          <TableRow key={key}>
            <TableCell>{reservation.name || "N/A"}</TableCell>
            <TableCell>{reservation.email || "N/A"}</TableCell>
            <TableCell>{reservation.date || "N/A"}</TableCell>
            <TableCell>{reservation.time || "N/A"}</TableCell>
            <TableCell>{reservation.phone || "N/A"}</TableCell>
            <TableCell>{reservation.service || "N/A"}</TableCell>
            <TableCell>{reservation.message || "N/A"}</TableCell>
            <TableCell>
              <Badge
                variant={
                  reservation.status === "pendiente"
                    ? "warning"
                    : reservation.status === "confirmada"
                    ? "success"
                    : "destructive"
                }
              >
                {reservation.status || "N/A"}
              </Badge>
            </TableCell>
            <TableCell>
              {/* Aquí va el menú desplegable para cambiar el estado */}
              <select
                value={selectedStatus[reservation.id] || reservation.status}
                onChange={(e) => {
                  const newStatus = e.target.value as "pendiente" | "confirmada" | "cancelada";
                  setSelectedStatus((prev) => ({
                    ...prev,
                    [reservation.id]: newStatus,
                  }));
                  updateReservationStatus(reservation.id, newStatus);
                }}
              >
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </TableCell>
            <TableCell>
              <Button variant="secondary" size="sm">
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
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          Anterior
        </Button>
        <span className="mx-4 self-center">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          Siguiente
        </Button>
      </div>

      <DeleteConfirmationDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      {editReservation && (
        <EditReservationDialog
          reservation={{
            id: editReservation.id,
            date: editReservation.date,
            time: editReservation.time,
          }}
          onClose={() => setEditReservation(null)}
          onSave={(id, date, time) => updateReservation(id, date, time)}
        />
      )}
    </div>
  );
}
