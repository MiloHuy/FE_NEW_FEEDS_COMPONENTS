import type { TApiResult } from "../type";

export type TUploadFileType = "IMAGE" | "VIDEO" | "OTHER"

export type IUploadFileRequest = FormData | {
  file: File[]
}

export type IUploadFileResponse = TApiResult<{
  url: string
  type: TUploadFileType
}>
