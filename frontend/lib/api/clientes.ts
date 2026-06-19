import { Cliente } from "@/lib/modelo/cliente";
import {
    addCliente,
    listClientes,
    removeCliente,
    updateCliente,
} from "@/lib/mock/store";


export async function getClientes(): Promise<Cliente[]> {
    return listClientes();
}

export async function registrarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    return addCliente(cliente);
}

export async function actualizarCliente(clienteActualizado: Cliente): Promise<Cliente> {
    return updateCliente(clienteActualizado);
}

export async function eliminarCliente(id: number): Promise<void> {
    await removeCliente(id);
}
