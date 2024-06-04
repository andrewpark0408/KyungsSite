import { addClient } from "../server-actions/addClient";

export default function ClientForm() {
  return (
    <form action={addClient} className="mb-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-white mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white mb-2">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
        />
      </div>
      <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
        Add Client
      </button>
    </form>
  )
}