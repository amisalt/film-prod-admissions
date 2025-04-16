'use server'

import { createServerSideClient } from "../server"

export async function getUserInfo(){
  const supabase = createServerSideClient()

  const {
    data: {user}
  } = await (await supabase).auth.getUser()

  
}