'use client'

import { useState } from "react"
import { updateClient } from "../server-actions/updateClient"

export default function EditClient({ client }: { client: any }) {

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone
  })

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })


  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Edit
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
          <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <span className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span>
            <form action={updateClient} onSubmit={() => setShowModal(false)} className="mt-4">
              <input
                type="hidden"
                name="id"
                value={client.id}
              />
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Client
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}