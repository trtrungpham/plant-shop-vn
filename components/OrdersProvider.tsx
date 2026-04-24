"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  shop: string;
  qty: number;
};

export type OrderStatus = "pending" | "packing" | "shipping" | "delivered" | "review" | "cancelled";

export type Order = {
  id: string;
  createdAt: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: string;
  voucherCode?: string;
  status: OrderStatus;
};

type Ctx = {
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => Order;
  getOrder: (id: string) => Order | undefined;
  setStatus: (id: string, status: OrderStatus) => void;
  cancelOrder: (id: string) => void;
};

const OrdersCtx = createContext<Ctx | null>(null);
const KEY = "plantshop_orders_v1";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const addOrder: Ctx["addOrder"] = (input) => {
    const order: Order = {
      id: "PS" + Date.now().toString(36).toUpperCase(),
      createdAt: Date.now(),
      status: "pending",
      ...input,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);
  const setStatus = (id: string, status: OrderStatus) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  const cancelOrder = (id: string) => setStatus(id, "cancelled");

  return (
    <OrdersCtx.Provider value={{ orders, addOrder, getOrder, setStatus, cancelOrder }}>
      {children}
    </OrdersCtx.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersCtx);
  if (!ctx) throw new Error("useOrders must be inside OrdersProvider");
  return ctx;
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  packing: "Đang đóng gói",
  shipping: "Đang giao",
  delivered: "Đã giao",
  review: "Đợi đánh giá",
  cancelled: "Đã huỷ",
};

export const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  packing: "bg-blue-100 text-blue-700",
  shipping: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  review: "bg-purple-100 text-purple-700",
  cancelled: "bg-gray-200 text-gray-600",
};
