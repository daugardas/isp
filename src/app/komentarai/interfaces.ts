export interface CommentView {
  id: number;
    komentaras: string;
    data: Date;
    naudotojasId: number;
}

export interface KomentaraiProps {
  komentarai: CommentView[];
}
