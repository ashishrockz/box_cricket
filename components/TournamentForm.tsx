"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { toast } from "react-toastify";

type Form = {
  name: string;
  type: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
};

export default function TournamentForm({ onCreated }: { onCreated?: () => void }) {
  const { register, handleSubmit, reset } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    try {
      await api.post("/tournaments", data);
      toast.success("Tournament created");
      reset();
      onCreated?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create tournament");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-3">Create Tournament</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
        <input {...register("name")} placeholder="Tournament Name" className="border p-2 rounded" />
        <select {...register("type")} className="border p-2 rounded">
          <option value="League">League</option>
          <option value="Knockout">Knockout</option>
        </select>
        <input {...register("city")} placeholder="City" className="border p-2 rounded" />
        <input {...register("venue")} placeholder="Venue" className="border p-2 rounded" />
        <input type="date" {...register("startDate")} className="border p-2 rounded" />
        <input type="date" {...register("endDate")} className="border p-2 rounded" />
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Create Tournament
          </button>
        </div>
      </form>
    </div>
  );
}
