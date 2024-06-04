'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteClient(formData: any){
    const clientId = formData.get('id')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within deleteClient server action')
        return;
    }

    const {error} = await supabase
        .from('clients')
        .delete()
        .match({id: clientId, user_id: user.id})

    if (error){
        console.error('Error deleting data', error)
        return;
    }

    revalidatePath('/clients')

    return {message: 'Success'}
}