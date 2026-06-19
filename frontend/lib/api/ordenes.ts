import { ItemOrden } from "@/lib/modelo/itemOrden";
import { Orden } from "@/lib/modelo/orden";
import {
  createOrden,
  getOrdenById,
  listOrdenes,
  removeOrden,
  updateOrden,
} from "@/lib/mock/store";


export async function listarPedidos(): Promise<Orden[]> {
    return listOrdenes();
}

export async function listarPedidosPorFecha(fecha: string): Promise<Orden[]> {
    return listOrdenes(fecha);
}

export async function obtenerPedidoPorId(id: number): Promise<Orden> {
  return getOrdenById(id);
}

export async function realizarPedido(
    orden: Omit<Orden, 'id' | 'numero' | 'items'> & {
    items: Omit<ItemOrden, 'id' | 'orden'>[]}): Promise<Orden> 
{
  const payload = {
    ...orden,
    items: orden.items
  };

  return createOrden(payload);
}

export async function actualizarPedido(orden: Orden): Promise<Orden> {
    return updateOrden(orden.id, orden);
}

export async function eliminarPedido(id: number): Promise<void> {
    await removeOrden(id);
}
