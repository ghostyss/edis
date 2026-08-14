import { Paths, Directory, File } from "expo-file-system";

export function testFileSystem() {
  console.log("Paths object:", Paths);

  const document = Paths.document;

  console.log("Document:", document);

  const folder = new Directory(document, "test");

  console.log("Folder:", folder);
}
