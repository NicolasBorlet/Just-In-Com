export default interface ImageTextType {
    __component: "elements.image-text";
    id: number;
    text: {
        title: string;
        content: string;
    }
    image: {
        url: string;
    }
    reversed: boolean;
}