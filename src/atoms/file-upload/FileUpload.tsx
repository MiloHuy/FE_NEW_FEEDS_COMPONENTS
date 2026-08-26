import React, { useRef, useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import Input from "../input/Input";
import { validateFile } from "../../utils/validate-file.utils";
import { FileItem } from "./FileItem";
import type { FileEntry, FileUploadProps } from "./type";
import { uploadFileCaller } from "../../services/upload/upload-file.svc";

const DEFAULT_MAX_SIZE_MB = 2;
const IMAGE_ACCEPT = "image/png,image/jpeg,image/jpg";
const IMAGE_LABEL = "PNG, JPG";

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      multiple = false,
      maxSizeMB = DEFAULT_MAX_SIZE_MB,
      onFileChange,
      onError,
      label = "Upload image",
      helperText,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const onFileChangeRef = useRef<FileUploadProps["onFileChange"]>(onFileChange);
    const didMountRef = useRef(false);
    
    const [entries, setEntries] = useState<FileEntry[]>([]);
    const [validationError, setValidationError] = useState<string | null>(null);

    const maxBytes = maxSizeMB * 1024 * 1024;

    useEffect(() => {
      onFileChangeRef.current = onFileChange;
    }, [onFileChange]);

    useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }

      onFileChangeRef.current?.(entries);
    }, [entries]);

    const handleChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const incoming = Array.from(e.target.files ?? []);
        setValidationError(null);

        if (!incoming.length) {
          setEntries([]);
          return;
        }

        const validationErrors: string[] = [];
        const validFiles: File[] = [];

        for (const file of incoming) {
          const result = validateFile(file, maxBytes);
          if (result.valid) {
            validFiles.push(file);
          } else {
            validationErrors.push(result.message!);
          }
        }

        if (validationErrors.length) {
          const msg = validationErrors.join(" ");
          setValidationError(msg);
          onError?.(msg);
          e.target.value = "";
          setEntries([]);
          return;
        }

        const next = multiple ? validFiles : [validFiles[validFiles.length - 1]];

        const initialEntries: FileEntry[] = next.map((file) => ({
          file,
          status: "uploading",
        }));
        setEntries(initialEntries);

        try {
          const formData = new FormData();
          next.forEach((file) => {
            formData.append("file", file);
          });

          const response = await uploadFileCaller.execute(formData);
          
          const urls = Array.isArray(response) 
            ? response.map((r) => r.url) 
            : [response?.url];

          setEntries((current) => {
            return current.map((entry, index) => ({
              ...entry,
              status: "success",
              url: urls[index] || urls[0],
            }));
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Upload failed";
          setEntries((current) =>
            current.map((entry) => ({ ...entry, status: "error" as const, error: msg }))
          );
        }
      },
      [multiple, maxBytes, onError]
    );

    const handleRemove = useCallback(
      (target: File) => {
        setEntries((prev) => {
          const next = prev.filter((e) => e.file !== target);
          if (!next.length && inputRef.current) inputRef.current.value = "";
          return next;
        });
      },
      []
    );

    const handleClear = useCallback(() => {
      setEntries([]);
      setValidationError(null);
      if (inputRef.current) inputRef.current.value = "";
    }, []);

    const hasEntries = entries.length > 0;
    const isUploading = entries.some((e) => e.status === "uploading");
    const hasUploadError = entries.some((e) => e.status === "error");

    const inputState = validationError
      ? "error"
      : hasUploadError
      ? "error"
      : isUploading
      ? "default"
      : hasEntries
      ? "success"
      : "default";

    const displayValue = !hasEntries
      ? ""
      : isUploading
      ? "Uploading…"
      : entries.length === 1
      ? entries[0].file.name
      : `${entries.length} files selected`;

    return (
      <div className={clsx("file-upload", className)}>
        <input
          ref={(node) => {
            inputRef.current = node;

            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="file"
          accept={IMAGE_ACCEPT}
          multiple={multiple}
          disabled={disabled || isUploading}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          aria-hidden="true"
        />

        <Input
          {...rest}
          ref={undefined}
          label={label}
          readOnly
          disabled={disabled}
          value={displayValue}
          state={inputState}
          helperText={
            validationError ??
            helperText ??
            `${IMAGE_LABEL} — Max ${maxSizeMB} MB${multiple ? " · Multiple allowed" : ""}`
          }
          className="file-upload__input"
          onClick={() => !disabled && !isUploading && inputRef.current?.click()}
          style={{ cursor: disabled || isUploading ? "not-allowed" : "pointer" }}
          rightIcon={
            hasEntries
              ? ({ className: cn }) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className={clsx("file-upload__clear", cn)}
                    aria-label="Clear all"
                    tabIndex={0}
                    disabled={isUploading}
                  >
                    ✕
                  </button>
                )
              : ({ className: cn }) => (
                  <span className={clsx("file-upload__icon", cn)}>📎</span>
                )
          }
        />

        {hasEntries && !validationError && (
          <div className="file-upload__list">
            {entries.map((entry) => (
              <FileItem
                key={entry.file.name + entry.file.size}
                file={entry.file}
                status={entry.status}       
                uploadError={entry.error}   
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
export default FileUpload;
