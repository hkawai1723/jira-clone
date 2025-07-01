import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, storageBucket } from "@firebase";

export const uploadImage = async (
  file: File,
  path: string,
): Promise<string> => {
  console.log("uploadImage called with:", {
    fileName: file.name,
    size: file.size,
    type: file.type,
    path,
    storageBucket,
  });

  try {
    // ファイルタイプの検証
    if (!file.type.startsWith("image/")) {
      throw new Error(`Invalid file type: ${file.type}`);
    }

    const storageRef = ref(storage, path);
    console.log("Storage ref created:", {
      bucket: storageRef.bucket,
      fullPath: storageRef.fullPath,
      name: storageRef.name,
    });

    console.log("Starting upload...");
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful:", {
      metadata: snapshot.metadata,
      fullPath: snapshot.ref.fullPath,
    });

    console.log("Getting download URL...");
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL obtained:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};
