import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para buscar uma empresa pelo ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const empresa = await prisma.empresa.findUnique({
            where: { id },
        });

        if (!empresa) {
            return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
        }

        return NextResponse.json(empresa);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar empresa' }, { status: 500 });
    }
}

// Função para atualizar uma empresa
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const body = await req.json();
        const empresaAtualizada = await prisma.empresa.update({
            where: { id },
            data: {
                razao: body.razao,
                cnpj: body.cnpj,
                cep: body.cep,
                cidade: body.cidade,
                estado: body.estado,
                bairro: body.bairro,
                complemento: body.complemento
            },
        });
        return NextResponse.json(empresaAtualizada);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar empresa' }, { status: 500 });
    }
}

// Função para excluir uma empresa
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        await prisma.empresa.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Empresa excluída com sucesso' }, { status: 200 });
    } catch (error) {
        console.error("Erro ao excluir empresa:", error);
        return NextResponse.json({ error: 'Erro ao excluir empresa' }, { status: 500 });
    }
}