import { createContext, useContext, useState } from "react";

import {
  pedidosRecentes as pedidosIniciais,
  clientesRecentes as clientesIniciais,
  gastosIniciais,
} from "./mockData";

const DataContext = createContext(null);

function proximoIdPedido(pedidos) {
  const numeros = pedidos
    .map((p) => parseInt(p.id.split("-").pop(), 10))
    .filter((n) => !Number.isNaN(n));
  const proximo = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `PD-2026-${String(proximo).padStart(3, "0")}`;
}

function proximoIdCliente(clientes) {
  const numeros = clientes
    .map((c) => parseInt(c.id.split("-").pop(), 10))
    .filter((n) => !Number.isNaN(n));
  const proximo = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `CL-${String(proximo).padStart(3, "0")}`;
}

function proximoIdGasto(gastos) {
  const numeros = gastos
    .map((g) => parseInt(g.id.split("-").pop(), 10))
    .filter((n) => !Number.isNaN(n));
  const proximo = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `GS-${String(proximo).padStart(3, "0")}`;
}

function hojeFormatado() {
  return new Date().toLocaleDateString("pt-BR");
}

export function DataProvider({ children }) {
  const [pedidos, setPedidos] = useState(pedidosIniciais);
  const [clientes, setClientes] = useState(clientesIniciais);
  const [gastos, setGastos] = useState(gastosIniciais);

  function addPedido({ cliente, material, valor, status }) {
    const novoPedido = {
      id: proximoIdPedido(pedidos),
      cliente,
      material,
      valor: Number(valor) || 0,
      status,
      data: hojeFormatado(),
    };
    setPedidos((atuais) => [novoPedido, ...atuais]);

    // mantém o contador de pedidos do cliente e a data do último pedido em dia
    setClientes((atuais) =>
      atuais.map((c) =>
        c.nome === cliente
          ? { ...c, pedidos: c.pedidos + 1, ultimoPedido: novoPedido.data }
          : c
      )
    );

    return novoPedido;
  }

  function addCliente({ nome, tipo, telefone }) {
    const novoCliente = {
      id: proximoIdCliente(clientes),
      nome,
      tipo,
      telefone,
      pedidos: 0,
      ultimoPedido: "—",
    };
    setClientes((atuais) => [novoCliente, ...atuais]);
    return novoCliente;
  }

  function addGasto({ titulo, categoria, valor, data, descricao, pedidoId, notaFiscal, anexo }) {
    const novoGasto = {
      id: proximoIdGasto(gastos),
      titulo,
      categoria,
      valor: Number(valor) || 0,
      data: data || hojeFormatado(),
      descricao,
      pedidoId: pedidoId || null,
      notaFiscal: notaFiscal || "",
      // O arquivo fica só em memória (URL temporária), sem backend ainda.
      anexoNome: anexo ? anexo.name : null,
      anexoUrl: anexo ? URL.createObjectURL(anexo) : null,
    };
    setGastos((atuais) => [novoGasto, ...atuais]);
    return novoGasto;
  }

  return (
    <DataContext.Provider value={{ pedidos, clientes, gastos, addPedido, addCliente, addGasto }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData precisa ser usado dentro de um <DataProvider>");
  }
  return context;
}
