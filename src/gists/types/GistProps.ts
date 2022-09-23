export interface FileProps {
  filename: string;
  url: string;
  content?: string;
}

export default interface GistProps {
  id: string;
  languages: string[];
  files: FileProps[];
  avatarUrls?: string[];
}
