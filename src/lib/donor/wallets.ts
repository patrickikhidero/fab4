import { api } from "@/lib/api/client";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type StudentWallet = {
  id: number;
  student: number;
  balance: string;
  status: string;
  currency: string;
  created_at?: string;
  updated_at?: string;
};

export async function listStudentWallets(params?: {
  limit?: number;
  offset?: number;
}) {
  const res = await api.get<Paginated<StudentWallet>>("/students/wallet/", {
    params,
  });
  return res.data;
}

export async function getWalletForStudent(studentId: number) {
  const data = await listStudentWallets({ limit: 100 });

  return (
    data.results.find((wallet) => Number(wallet.student) === Number(studentId)) ??
    null
  );
}