import { cookies } from "next/headers";
import EditClient from "../components/EditClient";
import ClientForm from "../components/ClientForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteClient } from "../server-actions/deleteClient";

export default async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching clients')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Client List</h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </form>
        </div>
        <ClientForm />
        <div className="mt-6">
          {clients.map((client) => (
            <div key={client.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl text-white mb-2">{client.name} - {client.email} - {client.phone}</h2>
              <div className="flex space-x-2">
                <form action={deleteClient}>
                  <input type="hidden" name="id" value={client.id} />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </form>
                <EditClient client={client} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}