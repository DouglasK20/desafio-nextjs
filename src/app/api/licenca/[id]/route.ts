import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para buscar uma licença pelo ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const licenca = await prisma.licenca.findUnique({
            where: { id },
            include: { empresa: true },
        });

        if (!licenca) {
            return NextResponse.json({ error: 'Licença não encontrada' }, { status: 404 });
        }

        return NextResponse.json(licenca);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar licença' }, { status: 500 });
    }
}

// Função para atualizar uma licença
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const body = await req.json();
        const licencaAtualizada = await prisma.licenca.update({
            where: { id },
            data: {
                numero: body.numero,
                orgao: body.orgao,
                emissao: new Date(body.emissao),
                validade: new Date(body.validade),
                empresaId: body.empresaId
            },
        });

        return NextResponse.json(licencaAtualizada);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar licença' }, { status: 500 });
    }
}

// Função para excluir uma licença
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        await prisma.licenca.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Licença excluída com sucesso' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao excluir licença' }, { status: 500 });
    }
}