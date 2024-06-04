'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addClient(formData: any){
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within addClient server action')
        return;
    }

    const {data, error} = await supabase
        .from('clients')
        .insert([
            {
                user_id: user.id,
                name,
                email,
                phone,
            }
        ])

    if (error){
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/clients')

    return {message: 'Success'}
}