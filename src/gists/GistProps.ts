export default interface GistProps {
  id: string;
  languages: string[];
  files: FileProps[];
  avatarUrls: any;
}

interface FileProps {
  filename: string;
  url: string;
}
