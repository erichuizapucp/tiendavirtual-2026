import { Producto } from "@/lib/modelo/producto";
import {
  addProducto,
  listProductos,
  removeProducto,
  updateProducto,
} from "@/lib/mock/store";

export async function getProductos(): Promise<Producto[]> {
  return listProductos();
}

export async function agregarProducto(producto: Omit<Producto, 'id'>): Promise<Producto> {
  return addProducto(producto);
}

export async function actualizarProducto(productoActualizado: Producto): Promise<Producto> {
  return updateProducto(productoActualizado);
}

export async function eliminarProducto(id: number): Promise<void> {
  await removeProducto(id);
}
