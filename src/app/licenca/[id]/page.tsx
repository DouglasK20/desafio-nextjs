'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Empresa {
    id: number;
    razao: string;
}

const EditarLicencaPage = ({ params }: { params: { id: string } }) => {
    const [numero, setNumero] = useState("");
    const [orgao, setOrgao] = useState("");
    const [emissao, setEmissao] = useState("");
    const [validade, setValidade] = useState("");
    const [empresaId, setEmpresaId] = useState<number | null>(null);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        const fetchLicenca = async () => {
            const response = await fetch(`/api/licenca/${id}`);
            if (response.ok) {
                const data = await response.json();
                setNumero(data.numero);
                setOrgao(data.orgao);
                setEmissao(data.emissao.split('T')[0]); 
                setValidade(data.validade.split('T')[0]); 
                setEmpresaId(data.empresaId);
            } else {
                console.error("Erro ao buscar licença");
            }
        }

        const fetchEmpresas = async () => {
            const response = await fetch("/api/empresa");
            const data = await response.json();
            setEmpresas(data);
        };

        fetchLicenca();
        fetchEmpresas();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`/api/licenca/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numero,
                orgao,
                emissao,
                validade,
                empresaId,
            }),
        });

        if (response.ok) {
            router.push("/licenca");
        } else {
            console.error("Erro ao atualizar licença");
        }
    };
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Editar Licença
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Empresa</label>
                <select
                    value={empresaId ?? ''}
                    onChange={(e) => setEmpresaId(parseInt(e.target.value))}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="">Selecione uma empresa</option>
                    {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                        {empresa.razao}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Número da Licença</label>
                <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Órgão Ambiental</label>
                <input
                    type="text"
                    value={orgao}
                    onChange={(e) => setOrgao(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Data de Emissão</label>
                <input
                    type="date"
                    value={emissao}
                    onChange={(e) => setEmissao(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
                <input
                    type="date"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Atualizar Licença
            </button>
            <button
                type="button"
                onClick={() => router.push('/licenca')}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Cancelar
            </button>
            </form>
            </div>
        </main>
    );
};

export default EditarLicencaPage;