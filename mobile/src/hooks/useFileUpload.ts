import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase"; // adjust path

export type FileType = {
  uri: string;
  name: string;
  size: number;
};

type UploadType = "profile" | "proof";

export const useFileUpload = () => {

  const requestPermissions = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPerm.granted || !mediaPerm.granted) {
      Alert.alert("Permission required", "Allow camera and gallery access");
      return false;
    }

    return true;
  };

const pickFiles = async (
    source: "camera" | "gallery" | "files",
    uploadType: UploadType
  ): Promise<FileType[]> => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const allowed = await requestPermissions();
    if (!allowed) return [];

    let assets: any[] = [];

    try {
      if (source === "camera") {
        const res = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 0.7,
        });
        if (!res.canceled) assets = res.assets;
      }

      if (source === "gallery") {
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsMultipleSelection: uploadType === "proof",
          quality: 0.7,
        });
        if (!res.canceled) assets = res.assets;
      }

      if (source === "files") {
        const res = await DocumentPicker.getDocumentAsync({
          type: ["image/*"],
          multiple: uploadType === "proof",
        });
        if (res.assets) assets = res.assets;
      }

      if (assets.length === 0) return [];

      const files = assets.map((f) => ({
        uri: f.uri,
        name: f.name || f.fileName || "image.jpg",
        size: f.size || f.fileSize || 0,
      }));

      // 🔥 Upload to Supabase
      const uploadedFiles: FileType[] = [];

      for (const file of files) {
        const url = await uploadToSupabase(file);

        if (url) {
          uploadedFiles.push({
            uri: url, // ✅ Public URL
            name: file.name,
            size: file.size,
          });
        }
      }

      // 👀 Debug log
      console.log("FINAL FILES:", uploadedFiles);

      return uploadedFiles;

    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return { pickFiles };
  };



const uploadToSupabase = async (file: any) => {
  try {
    const fileExt = file.uri.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const formData = new FormData();

    formData.append("file", {
      uri: file.uri,
      name: fileName,
      type: "image/jpeg",
    } as any);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, formData, {
        contentType: "image/jpeg",
      });

    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  } catch (err) {
    console.log("Upload error:", err);
    return null;
  }
};