import React, { useState, useMemo } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { FcPrint, FcRules } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@inertiajs/react";

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};
const statusList = ["pending", "confirmed", "success", "cancelled"];
const limit = 10;

export default function OrderList({ orders }) {
    const [activeStatus, setActiveStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const { toast } = useToast();

    const [statuses, setStatuses] = useState(() =>
        orders.reduce((acc, order) => {
            acc[order.id] = order.status;
            return acc;
        }, {})
    );

    const handleStatusFilter = (status) => {
        setActiveStatus(status);
    };

    const resetFilters = () => {
        setActiveStatus(null);
        setSelectedDate(null);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios
            .patch(`/admin/orders/${orderId}/status`, { status: newStatus })
            .then(() => {
                setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
                toast({
                    title: "✅ Holat o‘zgartirildi",
                    description: `Buyurtma #${orderId} endi "${newStatus}" holatida.`,
                });
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "❌ Xatolik yuz berdi",
                    description: "Holatni yangilashda muammo yuz berdi.",
                });
            });
    };

    const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
        <Button variant="outline" onClick={onClick} ref={ref}>
            📅 {value || "Select Date"}
        </Button>
    ));
    CustomDateButton.displayName = "CustomDateButton";
    const filteredOrders = useMemo(() => {
        let result = orders;

        if (activeStatus) {
            result = result.filter((order) => statuses[order.id] === activeStatus);
        }

        if (selectedDate) {
            const selected = new Date(selectedDate);
            result = result.filter((order) => {
                const orderDate = new Date(order.created_at);
                return (
                    orderDate.getFullYear() === selected.getFullYear() &&
                    orderDate.getMonth() === selected.getMonth() &&
                    orderDate.getDate() === selected.getDate()
                );
            });
        }
        return result;
    }, [activeStatus, selectedDate, orders, statuses]);

    const totalPages = Math.ceil(filteredOrders.length / limit);
    const paginatedOrders = useMemo(() => {
        const startIndex = (activePage - 1) * limit;
        return filteredOrders.slice(startIndex, startIndex + limit);
    }, [filteredOrders, activePage]);

    const goToPreviousPage = () => {
        if (activePage > 1) {
            setActivePage((prev) => prev - 1);
        }
    };
    const goToNextPage = () => {
        if (activePage < totalPages) {
            setActivePage((prev) => prev + 1);
        }
    };

    return (
        <div className="p-6 mx-5 min-h-screen w-[1200px]">
            <h1 className="text-3xl font-bold mb-6">Order Lists</h1>

            <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                {activeStatus
                                    ? activeStatus.charAt(0).toUpperCase() + activeStatus.slice(1)
                                    : "Order Status"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {statusList.map((status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => handleStatusFilter(status)}
                                    className={statusStyles[status]}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        customInput={<CustomDateButton />}
                        dateFormat="dd MMM yyyy"
                    />
                </div>
                <Button variant="ghost" className="text-red-500" onClick={resetFilters}>
                    Reset Filter
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 font-medium">ID</th>
                            <th className="px-4 py-2 font-medium">Ismlar</th>
                            <th className="px-4 py-2 font-medium">Manzillar</th>
                            <th className="px-4 py-2 font-medium">Kun/oy/yil</th>
                            <th className="px-4 py-2 font-medium">Holati</th>
                            <th>Chop etish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-200">
                                <td className="px-4 py-3">{order.id}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">
                                    {order.user?.name || "—"}
                                </td>
                                <td className="px-4 py-3">
                                    {order.address
                                        ? `${order.address.city}, ${order.address.street}, ${order.address.house_number}`
                                        : "—"}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(order.created_at).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={statuses[order.id]}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                        className={`text-xs font-semibold px-2.5 py-0.5 rounded ${statusStyles[statuses[order.id]]}`}
                                    >
                                        {statusList.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <div className="flex">
                                        <Link href={`/admin/orders/${order.id}`} className="text-2xl px-2 rounded hover:bg-slate-200" aria-label="Print Button">
                                            <FcPrint />
                                        </Link>
                                        <Link href={`/admin/orders/pos/${order.id}`} className="text-2xl px-2 rounded hover:bg-slate-200" aria-label="POS View Button">
                                            <FcRules   />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex gap-2 items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPreviousPage}
                        disabled={activePage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>
                        Page {activePage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextPage}
                        disabled={activePage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
