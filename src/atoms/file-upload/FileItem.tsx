import { formatBytes } from "../../utils/format.utils";
import Button from "../button";
import type { FileUploadStatus } from "./type";

interface FileItemProps {
  file: File;
  onRemove: (file: File) => void;
  status: FileUploadStatus
  uploadError?: string
}

export function FileItem({ file, onRemove, status, uploadError }: FileItemProps) {
  const preview = URL.createObjectURL(file);
  const statusLabel = status === "uploading"
    ? "Uploading"
    : status === "success"
    ? "Uploaded"
    : uploadError ?? "Upload failed";

  return (
    <div className="file-upload__item">
      <img
        src={preview}
        alt={file.name}
        className="file-upload__item-thumb"
        onLoad={() => URL.revokeObjectURL(preview)}
      />

      <div className="file-upload__item-info">
        <span className="file-upload__item-name">{file.name}</span>
        <span className="file-upload__item-size">{formatBytes(file.size)}</span>
        <span className="file-upload__item-status">{statusLabel}</span>
      </div>
      
      <Button
        type="button"
        className="file-upload__item-remove"
        aria-label={`Remove ${file.name}`}
        onClick={() => onRemove(file)}
      >
        ✕
      </Button>
    </div>
  );
}
