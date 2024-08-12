'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Empresa {
    id: number;
    razao: string;
}

const NovaLicencaPage = () => {

    const [numero, setNumero] = useState("");
    const [orgao, setOrgao] = useState("");
    const [emissao, setEmissao] = useState("");
    const [validade, setValidade] = useState("");
    const [empresaId, setEmpresaId] = useState<number | null>(null);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryEmpresaId = searchParams.get('empresaId');

    useEffect(() => {
        if (queryEmpresaId) {
            setEmpresaId(parseInt(queryEmpresaId, 10));
          }
        const fetchEmpresas = async () => {
            const response = await fetch("/api/empresa");
            const data = await response.json();
            setEmpresas(data);
        }

        fetchEmpresas();
    }, [queryEmpresaId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/licenca", {
            method: "POST",
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
            console.error("Erro ao criar licença");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Cadastro de Licenças Ambientais
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="empresaId" className="block text-sm font-medium text-gray-700">Empresa</label>
                        <select
                            value={empresaId ?? ''}
                            onChange={(e) => setEmpresaId(parseInt(e.target.value))}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">Selecione uma empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>{empresa.razao}</option>
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
                        <label htmlFor="emissao" className="block text-sm font-medium text-gray-700">Data de Emissão</label>
                        <input
                            type="date"
                            value={emissao}
                            onChange={(e) => setEmissao(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="validade" className="block text-sm font-medium text-gray-700">Data de Validade</label>
                        <input
                            type="date"
                            value={validade}
                            onChange={(e) => setValidade(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">Salvar Licença</button>
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

export default NovaLicencaPage;