import { Carrito } from "@/lib/modelo/carrito";
import { ItemCarrito } from "@/lib/modelo/itemCarrito";
import {
    addItemCarrito,
    createCarrito,
    getCarritoByCliente,
    getCarritoById,
    listCarritos,
    removeCarrito,
    removeItemCarrito,
    updateCarrito as updateCarritoStore,
    updateItemCarrito as updateItemCarritoStore,
} from "@/lib/mock/store";


export async function getCarritos(): Promise<Carrito[]> {
    return listCarritos();
}

export async function getCarritoPorId(id: number): Promise<Carrito> {
    return getCarritoById(id);
}

export async function getCarritoPorCliente(clienteId: number): Promise<Carrito | undefined> {
    return getCarritoByCliente(clienteId);
}

export async function crearCarrito(carrito: Carrito): Promise<Carrito> {
    return createCarrito(carrito);
}

export async function agregarItemAlCarrito(nuevoItem: Omit<ItemCarrito, 'id'>): Promise<Carrito> {
    return addItemCarrito(nuevoItem);
}

export async function actualizarItemCarrito(item: ItemCarrito): Promise<Carrito> {
    return updateItemCarritoStore(item);
}

export async function eliminarItemDelCarrito(itemId: number, carritoId: number): Promise<Carrito> {
    return removeItemCarrito(itemId, carritoId);
}

export async function actualizarCarrito(id: number, carrito: Carrito): Promise<Carrito> {
    return updateCarritoStore(id, carrito);
}

export async function eliminarCarrito(id: number): Promise<void> {
    await removeCarrito(id);
}
