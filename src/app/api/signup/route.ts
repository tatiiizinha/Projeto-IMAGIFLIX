import { NextResponse } from 'next/server'
import { NewUserInputData } from '../../../types/user.dto'
import { users } from '../data/user'

export async function POST(req: Request) {
  const userData: NewUserInputData = await req.json()
  users.push(userData)
  return NextResponse.json({ message: 'Usuário criado com sucesso' }, { status: 201 })
}
