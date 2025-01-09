"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ArrowUpDown, Edit } from "lucide-react";
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

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Reservation>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editReservation, setEditReservation] = useState<Reservation | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const itemsPerPage = 10;

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservas");
      const { data } = await response.json();
      setReservations(data || []);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) =>
      Object.values(reservation).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    ).filter((reservation) => 
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 animate-fade-in">
      <Card className="mb-8 shadow-lg border-0">
        <CardHeader className="space-y-1 bg-white rounded-t-xl border-b border-gray-100">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent text-center">
            Dashboard de Reservas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Reservas</p>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reservations.filter(r => r.status === "pendiente").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Confirmadas</p>
                <p className="text-2xl font-bold text-green-600">
                  {reservations.filter(r => r.status === "confirmada").length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Canceladas</p>
                <p className="text-2xl font-bold text-red-600">
                  {reservations.filter(r => r.status === "cancelada").length}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Buscar reservas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-purple-500 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-200">
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
            <div className="text-center py-8 text-gray-500">
              No se encontraron reservas.
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="cursor-pointer font-semibold" onClick={() => handleSort("name")}>
                      Nombre {sortColumn === "name" && <ArrowUpDown className="inline ml-1 h-4 w-4" />}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold" onClick={() => handleSort("email")}>
                      Email {sortColumn === "email" && <ArrowUpDown className="inline ml-1 h-4 w-4" />}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold" onClick={() => handleSort("date")}>
                      Fecha {sortColumn === "date" && <ArrowUpDown className="inline ml-1 h-4 w-4" />}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold" onClick={() => handleSort("time")}>
                      Hora {sortColumn === "time" && <ArrowUpDown className="inline ml-1 h-4 w-4" />}
                    </TableHead>
                    <TableHead className="font-semibold">Teléfono</TableHead>
                    <TableHead className="font-semibold">Servicio</TableHead>
                    <TableHead className="font-semibold">Mensaje</TableHead>
                    <TableHead className="cursor-pointer font-semibold" onClick={() => handleSort("status")}>
                      Estado {sortColumn === "status" && <ArrowUpDown className="inline ml-1 h-4 w-4" />}
                    </TableHead>
                    <TableHead className="font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReservations.map((reservation, index) => {
                    if (!reservation) return null;
                    const key = reservation.id || `${reservation.name}-${reservation.date}-${index}`;
                    return (
                      <TableRow key={key} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{reservation.name || 'N/A'}</TableCell>
                        <TableCell>{reservation.email || 'N/A'}</TableCell>
                        <TableCell>{reservation.date || 'N/A'}</TableCell>
                        <TableCell>{reservation.time || 'N/A'}</TableCell>
                        <TableCell>{reservation.phone || 'N/A'}</TableCell>
                        <TableCell>{reservation.service || 'N/A'}</TableCell>
                        <TableCell>{reservation.message || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.status === "pendiente"
                                ? "secondary"
                                : reservation.status === "confirmada"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              reservation.status === "pendiente"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : reservation.status === "confirmada"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {reservation.status || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(reservation)}
                            className="hover:bg-purple-50 hover:text-purple-600"
                          >
                            <Edit className="mr-2 h-4 w-4" />
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

          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              Anterior
            </Button>
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

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

