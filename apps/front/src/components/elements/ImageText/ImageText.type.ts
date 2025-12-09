export default interface ImageTextType {
    __component: "blocks.image-text";
    id: number;
    Texte: {
        title: string;
        content: string;
    }
    Image: {
        url: string;
    }
    reversed: boolean;
}