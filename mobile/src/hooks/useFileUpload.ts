import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";

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

      return assets.map((f) => ({
        uri: f.uri,
        name: f.name || f.fileName || "image.jpg",
        size: f.size || f.fileSize || 0,
      }));

    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return { pickFiles };
};