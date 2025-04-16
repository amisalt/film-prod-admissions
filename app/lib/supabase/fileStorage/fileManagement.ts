'use server'

import { createServerSideClient } from "../server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function uploadFileToBucket(file: File) : Promise<string>{
  const supabase = createServerSideClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if( !user ){
    revalidatePath("/")
    redirect('/auth')
  }

  const filename = new Date().getFullYear()

  const {
    data: bucketData, 
    error: bucketError
  } = await (await supabase).storage.from('admission-documents').upload(`${user?.id}/${filename}.${file.type.split("/")[1]}` , file, {contentType:file.type, upsert:true})

  if ( bucketError ){
    redirect(`/error?message=${bucketError.message}&error=${bucketError.name}`)
  }

  return bucketData.path
}

export async function downloadFileFromBucket(path: string) : Promise<Blob>{
  const supabase = createServerSideClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if( !user ){
    revalidatePath("/")
    redirect('/auth')
  }

  const {
    data: file,
    error: bucketError
  } = await (await supabase).storage.from('admission-documents').download(path)

  if ( bucketError ){
    redirect(`/error?message=${bucketError.message}&error=${bucketError.name}`)
  }

  return file
}

export async function deleteFileFromBucket(path: string) : Promise<void>{
  const supabase = createServerSideClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if( !user ){
    revalidatePath("/")
    redirect('/auth')
  }

  const {
    error: bucketError
  } = await (await supabase).storage.from('admission-documents').remove([path])

  if ( bucketError ){
    redirect(`/error?message=${bucketError.message}&error=${bucketError.name}`)
  }

}