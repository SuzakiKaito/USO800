export interface Thread {
  id: string; // FirebaseなどのデータベースではIDはstringが一般的
  text: string;
  niceCount: number;
  isLiked: boolean;
  postTime: string; // ISO 8601フォーマット推奨
}